/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('node:path');
const manifest = require('./manifest');
const {
  DIRECT_MARKDOWN_PATHS,
  DIRECT_MARKDOWN_PREFIXES,
  LLM_DOCS_PUBLIC_PREFIX,
  MARKDOWN_ACCEPT_TYPES,
  MARKDOWN_HEADER_NAMES,
  MARKDOWN_HEADER_VALUES,
  STATIC_ASSET_EXTENSIONS,
} = require('./constants');

const SUPPORTED_METHODS = new Set(['GET', 'HEAD']);
const MARKDOWN_HEADER_VALUE_SET = new Set(MARKDOWN_HEADER_VALUES);

const normalizeRoute = value => {
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  return withLeadingSlash.replace(/\/+$/, '') || '/';
};

const getHeaderValue = (headers, name) => {
  const values = headers?.[name.toLowerCase()];
  if (!Array.isArray(values)) {
    return '';
  }
  return values
    .map(entry => `${entry?.value ?? ''}`)
    .join(',')
    .toLowerCase()
    .trim();
};

const requestWantsMarkdown = headers => {
  const acceptHeader = getHeaderValue(headers, 'accept');
  if (
    MARKDOWN_ACCEPT_TYPES.some(contentType =>
      acceptHeader.includes(contentType),
    )
  ) {
    return true;
  }

  return MARKDOWN_HEADER_NAMES.some(headerName =>
    MARKDOWN_HEADER_VALUE_SET.has(getHeaderValue(headers, headerName)),
  );
};

const isStaticAssetRequest = uri => {
  const extension = path.extname(uri).toLowerCase();
  return extension.length > 0 && STATIC_ASSET_EXTENSIONS.has(extension);
};

const isDirectMarkdownRequest = uri =>
  DIRECT_MARKDOWN_PATHS.includes(uri) ||
  DIRECT_MARKDOWN_PREFIXES.some(prefix => uri.startsWith(prefix));

const getRoutes = routesManifest => {
  if (
    !routesManifest ||
    typeof routesManifest !== 'object' ||
    !routesManifest.routes ||
    typeof routesManifest.routes !== 'object'
  ) {
    return {};
  }
  return routesManifest.routes;
};

const getManifestTarget = (routesManifest, uri) => {
  const target = getRoutes(routesManifest)[normalizeRoute(uri)];
  if (
    typeof target !== 'string' ||
    !target.startsWith(LLM_DOCS_PUBLIC_PREFIX)
  ) {
    return undefined;
  }
  return target;
};

const rewriteRequest = (request, routesManifest = manifest) => {
  if (!request || !SUPPORTED_METHODS.has(request.method)) {
    return request;
  }

  const uri = request.uri || '/';
  if (
    isDirectMarkdownRequest(uri) ||
    isStaticAssetRequest(uri) ||
    !requestWantsMarkdown(request.headers)
  ) {
    return request;
  }

  const target = getManifestTarget(routesManifest, uri);
  if (!target) {
    return request;
  }

  request.uri = target;
  return request;
};

const handler = (event, _context, callback) => {
  const request = event?.Records?.[0]?.cf?.request;
  try {
    callback(null, rewriteRequest(request));
  } catch {
    // Fail open: Markdown negotiation is optional, but the docs page should
    // still load if a malformed edge event or manifest ever reaches runtime.
    callback(null, request);
  }
};

module.exports = {
  handler,
  rewriteRequest,
  requestWantsMarkdown,
};
