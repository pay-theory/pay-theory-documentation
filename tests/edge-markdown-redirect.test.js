/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const {
  decorateResponse,
  handler,
  rewriteRequest,
} = require('../edge/markdown-redirect/index');

const manifest = {
  version: 1,
  routes: {
    '/': '/llm-docs/home.md',
    '/docs/api': '/llm-docs/index.md',
    '/docs/main/testing': '/llm-docs/source/docs/main/testing.md',
  },
  htmlRoutes: ['/', '/docs/main/testing', '/docs/sdk/javascript/main'],
};

const header = (key, value) => [{ key, value }];

const makeRequest = (uri, headers = {}, method = 'GET') => ({
  method,
  uri,
  querystring: '',
  headers: { host: header('Host', 'docs.paytheory.com'), ...headers },
});

const markdownAccept = { accept: header('Accept', 'text/markdown') };
const htmlAccept = {
  accept: header('Accept', 'text/html,application/xhtml+xml,*/*;q=0.8'),
};

test('rewrites pretty HTML routes to their index.html object', () => {
  for (const uri of [
    '/docs/main/testing',
    '/docs/main/testing/',
    '/docs/sdk/javascript/main',
  ]) {
    const result = rewriteRequest(makeRequest(uri, htmlAccept), manifest);
    assert.equal(result.uri, `${uri.replace(/\/$/, '')}/index.html`);
  }
  assert.equal(
    rewriteRequest(makeRequest('/', htmlAccept), manifest).uri,
    '/index.html',
  );
});

test('serves Markdown for routes in the manifest, including the homepage', () => {
  assert.equal(
    rewriteRequest(makeRequest('/', markdownAccept), manifest).uri,
    '/llm-docs/home.md',
  );
  assert.equal(
    rewriteRequest(makeRequest('/docs/main/testing/', markdownAccept), manifest)
      .uri,
    '/llm-docs/source/docs/main/testing.md',
  );
  assert.equal(
    rewriteRequest(
      makeRequest('/docs/main/testing', {
        'x-format': header('x-format', 'md'),
      }),
      manifest,
    ).uri,
    '/llm-docs/source/docs/main/testing.md',
  );
});

test('falls back to HTML when a page has no Markdown twin', () => {
  const result = rewriteRequest(
    makeRequest('/docs/sdk/javascript/main', markdownAccept),
    manifest,
  );
  assert.equal(result.uri, '/docs/sdk/javascript/main/index.html');
});

test('answers unknown routes with a Markdown 404 when Markdown is requested', () => {
  const result = rewriteRequest(
    makeRequest('/does-not-exist', markdownAccept),
    manifest,
  );
  assert.equal(result.status, '404');
  assert.equal(
    result.headers['content-type'][0].value,
    'text/markdown; charset=utf-8',
  );
  assert.equal(result.headers.vary[0].value, 'Accept');
  assert.match(result.body, /^# Page not found/);
  assert.match(result.body, /`\/does-not-exist`/);
  assert.match(result.body, /https:\/\/docs\.paytheory\.com\/llms\.txt/);
  assert.match(result.body, /https:\/\/docs\.paytheory\.com\/sitemap\.xml/);
});

test('lets unknown HTML routes miss in S3 so CloudFront serves /404.html', () => {
  const result = rewriteRequest(
    makeRequest('/does-not-exist', htmlAccept),
    manifest,
  );
  assert.equal(result.uri, '/does-not-exist/index.html');
  assert.equal(result.status, undefined);
});

test('treats every route as existing when the manifest has no HTML routes', () => {
  const legacyManifest = { version: 1, routes: manifest.routes };
  const result = rewriteRequest(
    makeRequest('/does-not-exist', markdownAccept),
    legacyManifest,
  );
  assert.equal(result.uri, '/does-not-exist/index.html');
});

test('redirects trust and portal paths', () => {
  const cases = {
    '/privacy': 'https://www.paytheory.com/privacy-policy',
    '/about/': 'https://www.paytheory.com/about',
    '/Contact': 'https://www.paytheory.com/contact',
    '/developers': '/docs/main/getting_started/quickstart',
  };
  for (const [uri, location] of Object.entries(cases)) {
    const result = rewriteRequest(makeRequest(uri, markdownAccept), manifest);
    assert.equal(result.status, '301', uri);
    assert.equal(result.headers.location[0].value, location, uri);
  }
});

test('passes files, llm-docs, and non-GET requests through untouched', () => {
  for (const uri of [
    '/img/logo.svg',
    '/llms.txt',
    '/llm-docs/index.md',
    '/llm-docs/schema.graphql',
    '/404.html',
    '/sitemap.xml',
  ]) {
    assert.equal(
      rewriteRequest(makeRequest(uri, markdownAccept), manifest).uri,
      uri,
    );
  }
  const post = makeRequest('/docs/main/testing', markdownAccept, 'POST');
  assert.equal(rewriteRequest(post, manifest).uri, '/docs/main/testing');
});

test('decorateResponse adds Vary: Accept to HTML and Markdown only', () => {
  const html = decorateResponse(
    { uri: '/index.html' },
    {
      status: '200',
      headers: { 'content-type': header('Content-Type', 'text/html') },
    },
  );
  assert.equal(html.headers.vary[0].value, 'Accept');

  const markdown = decorateResponse(
    { uri: '/llm-docs/home.md' },
    {
      status: '200',
      headers: {
        'content-type': header('Content-Type', 'text/markdown'),
        vary: header('Vary', 'Origin'),
      },
    },
  );
  assert.equal(markdown.headers.vary[0].value, 'Origin, Accept');

  const image = decorateResponse(
    { uri: '/img/logo.svg' },
    {
      status: '200',
      headers: { 'content-type': header('Content-Type', 'image/svg+xml') },
    },
  );
  assert.equal(image.headers.vary, undefined);
});

test('decorateResponse does not duplicate an existing Vary: Accept', () => {
  const response = decorateResponse(
    { uri: '/index.html' },
    {
      status: '200',
      headers: {
        'content-type': header('Content-Type', 'text/html'),
        vary: header('Vary', 'accept'),
      },
    },
  );
  assert.equal(response.headers.vary[0].value, 'accept');
});

test('decorateResponse serves the GraphQL schema as text', () => {
  const response = decorateResponse(
    { uri: '/llm-docs/schema.graphql' },
    {
      status: '200',
      headers: {
        'content-type': header('Content-Type', 'binary/octet-stream'),
      },
    },
  );
  assert.equal(
    response.headers['content-type'][0].value,
    'text/plain; charset=utf-8',
  );
});

test('handler dispatches on the CloudFront event type and fails open', async () => {
  const request = makeRequest('/docs/sdk/javascript/main', htmlAccept);
  const viewerEvent = {
    Records: [{ cf: { config: { eventType: 'viewer-request' }, request } }],
  };
  // The packaged fallback manifest has no HTML routes, so pages still rewrite.
  const rewritten = await handler(viewerEvent);
  assert.equal(rewritten.uri, '/docs/sdk/javascript/main/index.html');

  const response = {
    status: '200',
    headers: { 'content-type': header('Content-Type', 'text/html') },
  };
  const originEvent = {
    Records: [
      {
        cf: {
          config: { eventType: 'origin-response' },
          request: { uri: '/index.html' },
          response,
        },
      },
    ],
  };
  const decorated = await handler(originEvent);
  assert.equal(decorated.headers.vary[0].value, 'Accept');

  const malformedRequest = { method: 'GET', uri: 42 };
  const malformed = { Records: [{ cf: { request: malformedRequest } }] };
  assert.equal(await handler(malformed), malformedRequest);
  assert.equal(malformedRequest.uri, 42);
});
