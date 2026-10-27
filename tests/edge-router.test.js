/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {
  LLM_DOCS_PUBLIC_PREFIX,
  LLMS_TXT_PATH,
} = require('../edge/markdown-redirect/constants');
const {
  MAX_FUNCTION_BYTES,
  renderFormationTemplate,
} = require('../scripts/render-formation-template');
const {
  HTML_ONLY,
  buildRouteEntries,
  chunk,
  planRouteSync,
} = require('../scripts/lib/edge-routes');

const FUNCTION_SOURCE = fs.readFileSync(
  path.join(__dirname, '../edge/markdown-redirect/function.js'),
  'utf8',
);

const manifest = {
  version: 1,
  routes: {
    '/': '/llm-docs/home.md',
    '/docs/api': '/llm-docs/index.md',
    '/docs/main/testing': '/llm-docs/source/docs/main/testing.md',
  },
  htmlRoutes: ['/', '/docs/main/testing', '/docs/sdk/javascript/main'],
};

// Runs function.js the way CloudFront does, with `cf.kvs()` backed by a map.
const loadFunction = (entries = buildRouteEntries(manifest), kvsError) => {
  const kvsReads = [];
  const kvs = {
    exists: async key => {
      kvsReads.push(key);
      if (kvsError) {
        throw kvsError;
      }
      return Object.prototype.hasOwnProperty.call(entries, key);
    },
    get: async key => {
      if (!Object.prototype.hasOwnProperty.call(entries, key)) {
        throw new Error(`Key ${key} not found`);
      }
      return entries[key];
    },
  };
  const context = vm.createContext({ cf: { kvs: () => kvs } });
  vm.runInContext(
    FUNCTION_SOURCE.replace("import cf from 'cloudfront';", ''),
    context,
  );
  return {
    kvsReads,
    run: event => context.handler(event),
    constant: name => vm.runInContext(name, context),
  };
};

const makeRequest = (uri, headers = {}, method = 'GET') => ({
  method,
  uri,
  querystring: {},
  headers: { host: { value: 'docs.paytheory.com' }, ...headers },
  cookies: {},
});

const viewerRequest = request => ({
  version: '1.0',
  context: { eventType: 'viewer-request' },
  request,
});

const viewerResponse = (headers, uri = '/index.html') => ({
  version: '1.0',
  context: { eventType: 'viewer-response' },
  request: makeRequest(uri),
  response: { statusCode: 200, headers },
});

const markdownAccept = { accept: { value: 'text/markdown' } };
const htmlAccept = {
  accept: { value: 'text/html,application/xhtml+xml,*/*;q=0.8' },
};

const edge = loadFunction();
const route = (uri, headers, method) =>
  edge.run(viewerRequest(makeRequest(uri, headers, method)));

test('rewrites pretty HTML routes to their index.html object', async () => {
  for (const uri of [
    '/docs/main/testing',
    '/docs/main/testing/',
    '/docs/sdk/javascript/main',
  ]) {
    const result = await route(uri, htmlAccept);
    assert.equal(result.uri, `${uri.replace(/\/$/, '')}/index.html`);
  }
  assert.equal((await route('/', htmlAccept)).uri, '/index.html');
});

test('HTML requests never read the key value store', async () => {
  const fresh = loadFunction();
  await fresh.run(viewerRequest(makeRequest('/docs/main/testing', htmlAccept)));
  await fresh.run(viewerRequest(makeRequest('/does-not-exist', htmlAccept)));
  assert.deepEqual(fresh.kvsReads, []);
});

test('serves Markdown for routes in the store, including the homepage', async () => {
  assert.equal((await route('/', markdownAccept)).uri, '/llm-docs/home.md');
  assert.equal(
    (await route('/docs/main/testing/', markdownAccept)).uri,
    '/llm-docs/source/docs/main/testing.md',
  );
  assert.equal(
    (await route('/docs/main/testing', { 'x-format': { value: 'md' } })).uri,
    '/llm-docs/source/docs/main/testing.md',
  );
  const repeatedAccept = {
    accept: {
      value: 'text/html',
      multiValue: [{ value: 'text/html' }, { value: 'text/markdown' }],
    },
  };
  assert.equal(
    (await route('/docs/main/testing', repeatedAccept)).uri,
    '/llm-docs/source/docs/main/testing.md',
  );
});

test('falls back to HTML when a page has no Markdown twin', async () => {
  const result = await route('/docs/sdk/javascript/main', markdownAccept);
  assert.equal(result.uri, '/docs/sdk/javascript/main/index.html');
});

test('answers unknown routes with a Markdown 404 when Markdown is requested', async () => {
  const result = await route('/does-not-exist', markdownAccept);
  assert.equal(result.statusCode, 404);
  assert.equal(
    result.headers['content-type'].value,
    'text/markdown; charset=utf-8',
  );
  assert.equal(result.headers.vary.value, 'Accept');
  assert.equal(result.body.encoding, 'text');
  assert.match(result.body.data, /^# Page not found/);
  assert.match(result.body.data, /`\/does-not-exist`/);
  assert.match(result.body.data, /https:\/\/docs\.paytheory\.com\/llms\.txt/);
  assert.match(
    result.body.data,
    /https:\/\/docs\.paytheory\.com\/sitemap\.xml/,
  );
});

test('lets unknown HTML routes miss in S3 so CloudFront serves /404.html', async () => {
  const result = await route('/does-not-exist', htmlAccept);
  assert.equal(result.uri, '/does-not-exist/index.html');
  assert.equal(result.statusCode, undefined);
});

test('serves HTML instead of a 404 when the key value store fails', async () => {
  const broken = loadFunction(undefined, new Error('store unavailable'));
  const result = await broken.run(
    viewerRequest(makeRequest('/docs/main/testing', markdownAccept)),
  );
  assert.equal(result.uri, '/docs/main/testing/index.html');
});

test('looks up the decoded route when the raw one is missing', async () => {
  const encoded = loadFunction({ '/docs/main/a b': '/llm-docs/source/a.md' });
  const result = await encoded.run(
    viewerRequest(makeRequest('/docs/main/a%20b', markdownAccept)),
  );
  assert.equal(result.uri, '/llm-docs/source/a.md');
});

test('redirects trust and portal paths', async () => {
  const cases = {
    '/privacy': 'https://www.paytheory.com/privacy-policy',
    '/about/': 'https://www.paytheory.com/about',
    '/Contact': 'https://www.paytheory.com/contact',
    '/developers': '/docs/main/getting_started/quickstart',
  };
  for (const [uri, location] of Object.entries(cases)) {
    const result = await route(uri, markdownAccept);
    assert.equal(result.statusCode, 301, uri);
    assert.equal(result.headers.location.value, location, uri);
  }
});

test('passes files, llm-docs, and non-GET requests through untouched', async () => {
  for (const uri of [
    '/img/logo.svg',
    '/llms.txt',
    '/llm-docs/index.md',
    '/llm-docs/schema.graphql',
    '/404.html',
    '/sitemap.xml',
  ]) {
    assert.equal((await route(uri, markdownAccept)).uri, uri);
  }
  const post = await route('/docs/main/testing', markdownAccept, 'POST');
  assert.equal(post.uri, '/docs/main/testing');
});

test('fails open on a malformed request', async () => {
  const request = { method: 'GET', uri: 42, headers: {} };
  assert.equal(await edge.run(viewerRequest(request)), request);
  assert.equal(request.uri, 42);
});

test('viewer-response adds Vary: Accept to HTML and Markdown only', async () => {
  const html = await edge.run(
    viewerResponse({ 'content-type': { value: 'text/html' } }),
  );
  assert.equal(html.headers.vary.value, 'Accept');

  const markdown = await edge.run(
    viewerResponse({
      'content-type': { value: 'text/markdown' },
      vary: { value: 'Origin' },
    }),
  );
  assert.equal(markdown.headers.vary.value, 'Origin, Accept');

  const image = await edge.run(
    viewerResponse({ 'content-type': { value: 'image/svg+xml' } }),
  );
  assert.equal(image.headers.vary, undefined);
});

test('viewer-response does not duplicate an existing Vary: Accept', async () => {
  const response = await edge.run(
    viewerResponse({
      'content-type': { value: 'text/html' },
      vary: { value: 'accept' },
    }),
  );
  assert.equal(response.headers.vary.value, 'accept');
});

test('function.js matches the shared path constants', () => {
  assert.equal(edge.constant('LLM_DOCS_PREFIX'), LLM_DOCS_PUBLIC_PREFIX);
  assert.equal(edge.constant('LLMS_TXT_PATH'), LLMS_TXT_PATH);
});

test('function.js stays within the CloudFront Functions runtime', () => {
  assert.ok(Buffer.byteLength(FUNCTION_SOURCE) <= MAX_FUNCTION_BYTES);
  const code = FUNCTION_SOURCE.replace(/\/\/.*$/gm, '');
  for (const [pattern, feature] of [
    [/\brequire\(/, 'require'],
    [/\?\./, 'optional chaining'],
    [/\?\?/, 'nullish coalescing'],
    [/\.\.\./, 'spread'],
    [/\bfor\s*\([^)]*\bof\b/, 'for...of'],
    [/\bnew (Set|Map|WeakMap)\b/, 'Set and Map'],
    [/async\s*\(|async\s+\w+\s*=>/, 'async closures'],
  ]) {
    assert.doesNotMatch(code, pattern, `${feature} isn't supported`);
  }
});

test('renders function.js into the formation template', () => {
  const rendered = renderFormationTemplate();
  assert.doesNotMatch(rendered, /EDGE_FUNCTION_CODE/);
  assert.match(
    rendered,
    /\n {6}FunctionCode: \|\n {8}\/\/ CloudFront Function/,
  );
  assert.match(rendered, /\n {8}async function handler\(event\) \{\n/);

  assert.throws(
    () => renderFormationTemplate('Resources: {}\n', '// code\n'),
    /no `FunctionCode: EDGE_FUNCTION_CODE` line/,
  );
  assert.throws(
    () =>
      renderFormationTemplate(
        '      FunctionCode: EDGE_FUNCTION_CODE\n',
        'x'.repeat(MAX_FUNCTION_BYTES + 1),
      ),
    /limit is/,
  );
});

test('builds store entries from the manifest', () => {
  assert.deepEqual(buildRouteEntries(manifest), {
    '/': '/llm-docs/home.md',
    '/docs/api': '/llm-docs/index.md',
    '/docs/main/testing': '/llm-docs/source/docs/main/testing.md',
    '/docs/sdk/javascript/main': HTML_ONLY,
  });
  assert.throws(
    () => buildRouteEntries({ routes: manifest.routes, htmlRoutes: [] }),
    /refusing to sync/,
  );
});

test('plans puts before deletes and skips unchanged keys', () => {
  const plan = planRouteSync(
    { '/a': 'html', '/b': '/llm-docs/b.md', '/c': 'html' },
    { '/a': 'html', '/b': 'html', '/old': 'html' },
  );
  assert.deepEqual(plan, {
    puts: [
      { Key: '/b', Value: '/llm-docs/b.md' },
      { Key: '/c', Value: 'html' },
    ],
    deletes: [{ Key: '/old' }],
  });
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});
