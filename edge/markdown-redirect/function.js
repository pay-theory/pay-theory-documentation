// CloudFront Function (cloudfront-js-2.0) for the docs distribution. One
// function handles viewer-request and viewer-response. The runtime is ES 5.1
// plus a few later features: no require, Set, spread, for-of or `?.`.
// scripts/render-formation-template.js inlines this file into formation.yml.
import cf from 'cloudfront'; // eslint-disable-line import/no-unresolved
// CloudFront calls handler, and the runtime has no `catch {}` without a binding.
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

// Route list synced from the build manifest by scripts/sync-edge-routes.js.
// Key: route without trailing slash. Value: its Markdown object path, or
// `html` when the page has no Markdown twin.
const kvs = cf.kvs();

const LLM_DOCS_PREFIX = '/llm-docs/';
const LLMS_TXT_PATH = '/llms.txt';
const MARKDOWN_ACCEPT_TYPES = ['text/markdown', 'text/x-markdown'];
const MARKDOWN_HEADER_NAMES = [
  'x-accept-markdown',
  'x-doc-format',
  'x-format',
  'x-response-format',
  'x-return-format',
];
const MARKDOWN_HEADER_VALUES = ['1', 'true', 'markdown', 'md', 'text/markdown'];
const NEGOTIATED_CONTENT_TYPES = ['text/html', 'text/markdown'];

// Trust and portal paths agents probe before recommending a vendor. The docs
// site does not own these pages.
const REDIRECTS = {
  '/about': 'https://www.paytheory.com/about',
  '/contact': 'https://www.paytheory.com/contact',
  '/developers': '/docs/main/getting_started/quickstart',
  '/privacy': 'https://www.paytheory.com/privacy-policy',
};

const STATIC_ASSET_EXTENSIONS = [
  'avif',
  'css',
  'gif',
  'ico',
  'jpeg',
  'jpg',
  'js',
  'json',
  'map',
  'pdf',
  'png',
  'svg',
  'txt',
  'webp',
  'xml',
  'zip',
];

function headerValue(headers, name) {
  const header = headers && headers[name];
  if (!header) {
    return '';
  }
  const values = header.multiValue
    ? header.multiValue.map(entry => entry.value)
    : [header.value];
  return values.join(',').toLowerCase().trim();
}

function wantsMarkdown(headers) {
  const accept = headerValue(headers, 'accept');
  if (MARKDOWN_ACCEPT_TYPES.some(type => accept.includes(type))) {
    return true;
  }
  return MARKDOWN_HEADER_NAMES.some(name =>
    MARKDOWN_HEADER_VALUES.includes(headerValue(headers, name)),
  );
}

function normalizeRoute(uri) {
  return uri.replace(/\/+$/, '') || '/';
}

function extension(uri) {
  const name = uri.slice(uri.lastIndexOf('/') + 1);
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : '';
}

// Docusaurus emits every page as `<route>/index.html`. Anything else with an
// extension is a file request that S3 answers directly.
function isPageRequest(uri) {
  return uri.endsWith('/') || extension(uri) === '';
}

function decodeRoute(route) {
  try {
    return decodeURIComponent(route);
  } catch (e) {
    return route;
  }
}

// Resolves to the stored value, or undefined when the route doesn't exist.
async function lookupRoute(route) {
  if (await kvs.exists(route)) {
    return kvs.get(route);
  }
  const decoded = decodeRoute(route);
  if (decoded !== route && (await kvs.exists(decoded))) {
    return kvs.get(decoded);
  }
  return undefined;
}

function redirectResponse(location) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      location: { value: location },
      'cache-control': { value: 'max-age=3600' },
    },
  };
}

function markdownNotFound(request) {
  const host = request.headers.host ? request.headers.host.value : '';
  const origin = host ? `https://${host}` : '';
  const body = [
    '# Page not found',
    '',
    `No documentation page exists at \`${request.uri.replace(/`/g, '')}\`.`,
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
    statusCode: 404,
    statusDescription: 'Not Found',
    headers: {
      'content-type': { value: 'text/markdown; charset=utf-8' },
      vary: { value: 'Accept' },
      'cache-control': { value: 'max-age=60' },
    },
    body: { encoding: 'text', data: body },
  };
}

async function rewriteRequest(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return request;
  }
  const uri = request.uri || '/';
  const route = normalizeRoute(uri);
  const redirect = REDIRECTS[route.toLowerCase()];
  if (redirect) {
    return redirectResponse(redirect);
  }
  if (
    uri === LLMS_TXT_PATH ||
    uri.startsWith(LLM_DOCS_PREFIX) ||
    STATIC_ASSET_EXTENSIONS.includes(extension(uri))
  ) {
    return request;
  }

  // HTML requests never read the store, so a store problem can't break pages.
  if (wantsMarkdown(request.headers)) {
    let target;
    try {
      target = await lookupRoute(route);
    } catch (e) {
      // Store unavailable: serve the HTML page instead of a false 404.
      target = 'html';
    }
    if (target && target.startsWith(LLM_DOCS_PREFIX)) {
      request.uri = target;
      return request;
    }
    if (!target && isPageRequest(uri)) {
      return markdownNotFound(request);
    }
  }

  if (!isPageRequest(uri)) {
    return request;
  }
  // Unknown HTML routes miss in S3, and CloudFront serves /404.html with a 404.
  request.uri = route === '/' ? '/index.html' : `${route}/index.html`;
  return request;
}

function addVaryAccept(response) {
  const contentType = headerValue(response.headers, 'content-type');
  if (!NEGOTIATED_CONTENT_TYPES.some(type => contentType.startsWith(type))) {
    return response;
  }
  const vary = response.headers.vary;
  const values = vary
    ? (vary.multiValue
        ? vary.multiValue.map(entry => entry.value)
        : [vary.value]
      )
        .join(',')
        .split(',')
        .map(value => value.trim())
        .filter(value => value)
    : [];
  if (values.some(value => value.toLowerCase() === 'accept')) {
    return response;
  }
  values.push('Accept');
  response.headers.vary = { value: values.join(', ') };
  return response;
}

async function handler(event) {
  if (event.context.eventType === 'viewer-response') {
    return addVaryAccept(event.response);
  }
  try {
    return await rewriteRequest(event.request);
  } catch (e) {
    return event.request;
  }
}
