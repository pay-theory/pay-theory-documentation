'use strict';

const {
  BYPASS_PATH_PREFIXES,
  MARKDOWN_ACCEPT_TYPES,
  MARKDOWN_HEADER_NAMES,
  MARKDOWN_HEADER_VALUES,
} = require('./constants');
const { normalizeRoute, resolveTargetFromManifest } = require('./manifest');

function getHeaderValue(headers, name) {
  const entry = headers?.[name];
  if (!entry || !entry.length || !entry[0]?.value) {
    return '';
  }
  return String(entry[0].value).trim().toLowerCase();
}

function requestWantsMarkdown(headers) {
  const accept = getHeaderValue(headers, 'accept');
  if (MARKDOWN_ACCEPT_TYPES.some((mime) => accept.includes(mime))) {
    return true;
  }

  return MARKDOWN_HEADER_NAMES.some((headerName) =>
    MARKDOWN_HEADER_VALUES.has(getHeaderValue(headers, headerName)),
  );
}

function shouldBypass(uri) {
  if (uri === '/llms.txt' || uri === '/favicon.ico') {
    return true;
  }
  if (BYPASS_PATH_PREFIXES.some((prefix) => uri === prefix || uri.startsWith(`${prefix}/`))) {
    return true;
  }
  return false;
}

/**
 * CloudFront Lambda@Edge origin-request handler.
 * Rewrites markdown-aware docs requests to static markdown artifacts when an
 * exact route match exists in the packaged manifest. Unknown/missing routes
 * pass through to default HTML behavior.
 */
exports.handler = async (event) => {
  const request = event?.Records?.[0]?.cf?.request;
  if (!request) {
    return event;
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return request;
  }

  if (!requestWantsMarkdown(request.headers || {})) {
    return request;
  }

  const uri = normalizeRoute(request.uri || '/');
  if (shouldBypass(uri)) {
    return request;
  }

  try {
    const resolvedTarget = resolveTargetFromManifest(uri);
    if (!resolvedTarget) {
      return request;
    }
    request.uri = resolvedTarget;
    return request;
  } catch (error) {
    console.warn(
      `[markdown-edge] manifest resolution failed; returning HTML fallback: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return request;
  }
};
