/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('node:path');
const manifest = require('./manifest');
const {
  DIRECT_MARKDOWN_PATHS,
  DIRECT_MARKDOWN_PREFIXES,
  LLM_DOCS_PUBLIC_PREFIX,
  LLMS_TXT_PATH,
  MARKDOWN_ACCEPT_TYPES,
  MARKDOWN_HEADER_NAMES,
  MARKDOWN_HEADER_VALUES,
  REDIRECTS,
  STATIC_ASSET_EXTENSIONS,
} = require('./constants');

const SUPPORTED_METHODS = new Set(['GET', 'HEAD']);
const MARKDOWN_HEADER_VALUE_SET = new Set(MARKDOWN_HEADER_VALUES);
const NEGOTIATED_CONTENT_TYPES = ['text/html', 'text/markdown'];

const normalizeRoute = value => {
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  return withLeadingSlash.replace(/\/+$/, '') || '/';
};

const decodeRoute = route => {
  try {
    return decodeURIComponent(route);
  } catch {
    return route;
  }
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

// Docusaurus emits every page as `<route>/index.html`. Anything else with an
// extension is a file request that S3 answers directly.
const isPageRequest = uri => uri.endsWith('/') || path.extname(uri) === '';

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

const htmlRouteSets = new WeakMap();

// Returns undefined when the manifest has no HTML route list (local fallback
// manifest or an older artifact), which disables 404 detection.
const getHtmlRoutes = routesManifest => {
  if (!routesManifest || !Array.isArray(routesManifest.htmlRoutes)) {
    return undefined;
  }
  if (routesManifest.htmlRoutes.length === 0) {
    return undefined;
  }
  let routeSet = htmlRouteSets.get(routesManifest);
  if (!routeSet) {
    routeSet = new Set(routesManifest.htmlRoutes);
    htmlRouteSets.set(routesManifest, routeSet);
  }
  return routeSet;
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

const getRedirectTarget = uri => {
  const target = REDIRECTS[normalizeRoute(uri).toLowerCase()];
  return typeof target === 'string' ? target : undefined;
};

const toPageObjectUri = uri => {
  const route = normalizeRoute(uri);
  return route === '/' ? '/index.html' : `${route}/index.html`;
};

const buildRedirectResponse = location => ({
  status: '301',
  statusDescription: 'Moved Permanently',
  headers: {
    location: [{ key: 'Location', value: location }],
    'cache-control': [{ key: 'Cache-Control', value: 'max-age=3600' }],
  },
});

const getSiteOrigin = request => {
  const host = request.headers?.host?.[0]?.value;
  return host ? `https://${host}` : '';
};

const buildMarkdownNotFoundResponse = request => {
  const origin = getSiteOrigin(request);
  const requestedPath = `${request.uri || '/'}`.replace(/`/g, '');
  const body = [
    '# Page not found',
    '',
    `No documentation page exists at \`${requestedPath}\`.`,
    '',
    'Find Pay Theory documentation with these resources:',
    '',
    `- [llms.txt](${origin}${LLMS_TXT_PATH}): curated index of guides, SDK references, and the GraphQL API`,
    `- [Full Markdown index](${origin}/llms-full.txt): every page available as Markdown`,
    `- [Sitemap](${origin}/sitemap.xml): every HTML page`,
    `- [Documentation home](${origin}/)`,
    '',
  ].join('\n');

  return {
    status: '404',
    statusDescription: 'Not Found',
    headers: {
      'content-type': [
        { key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
      ],
      vary: [{ key: 'Vary', value: 'Accept' }],
      'cache-control': [{ key: 'Cache-Control', value: 'max-age=60' }],
    },
    body,
  };
};

// Viewer-request entry point. Returns either the (possibly rewritten) request
// or a generated response.
const rewriteRequest = (request, routesManifest = manifest) => {
  if (!request || !SUPPORTED_METHODS.has(request.method)) {
    return request;
  }

  const uri = request.uri || '/';
  const redirectTarget = getRedirectTarget(uri);
  if (redirectTarget) {
    return buildRedirectResponse(redirectTarget);
  }

  if (isDirectMarkdownRequest(uri) || isStaticAssetRequest(uri)) {
    return request;
  }

  const wantsMarkdown = requestWantsMarkdown(request.headers);
  if (wantsMarkdown) {
    const target = getManifestTarget(routesManifest, uri);
    if (target) {
      request.uri = target;
      return request;
    }
  }

  if (!isPageRequest(uri)) {
    return request;
  }

  const htmlRoutes = getHtmlRoutes(routesManifest);
  const route = normalizeRoute(uri);
  const routeExists =
    !htmlRoutes || htmlRoutes.has(route) || htmlRoutes.has(decodeRoute(route));
  if (!routeExists && wantsMarkdown) {
    return buildMarkdownNotFoundResponse(request);
  }

  // Unknown HTML routes fall through to S3, which misses and lets the
  // CloudFront custom error response serve /404.html with a 404 status.
  request.uri = toPageObjectUri(uri);
  return request;
};

const appendVaryAccept = headers => {
  const existing = (headers.vary || [])
    .map(entry => entry.value)
    .join(',')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);
  if (existing.some(value => value.toLowerCase() === 'accept')) {
    return;
  }
  headers.vary = [{ key: 'Vary', value: [...existing, 'Accept'].join(', ') }];
};

// Origin-response entry point. Runs on cache misses, so the headers it adds
// are cached with the object.
const decorateResponse = (request, response) => {
  if (!response) {
    return response;
  }
  if (!response.headers) {
    response.headers = {};
  }

  if (path.extname(request?.uri || '').toLowerCase() === '.graphql') {
    // S3 has no MIME type for .graphql; serve the schema as readable text.
    response.headers['content-type'] = [
      { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
    ];
  }

  const contentType = getHeaderValue(response.headers, 'content-type');
  if (NEGOTIATED_CONTENT_TYPES.some(type => contentType.startsWith(type))) {
    appendVaryAccept(response.headers);
  }
  return response;
};

const handler = async event => {
  const cf = event?.Records?.[0]?.cf;
  const request = cf?.request;
  if (cf?.config?.eventType === 'origin-response') {
    try {
      return decorateResponse(request, cf.response);
    } catch {
      return cf.response;
    }
  }

  try {
    return rewriteRequest(request);
  } catch {
    // Fail open: Markdown negotiation is optional, but the docs page should
    // still load if a malformed edge event or manifest ever reaches runtime.
    return request;
  }
};

module.exports = {
  decorateResponse,
  handler,
  rewriteRequest,
  requestWantsMarkdown,
};
