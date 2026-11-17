/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const { buildLlmsTxt } = require('../scripts/build-agent-docs-artifacts');

const manifest = {
  version: 1,
  routes: {
    '/': '/llm-docs/home.md',
    '/docs/api/transaction': '/llm-docs/transaction.md',
  },
};

const sectionHeadings = content =>
  content
    .split('\n')
    .filter(line => line.startsWith('#'))
    .map(line => line.trim());

test('llms.txt follows the llms.txt layout: H1, then a summary blockquote', () => {
  const lines = buildLlmsTxt(manifest).split('\n');
  assert.equal(lines[0], '# Pay Theory Documentation');
  assert.equal(lines[1], '');
  assert.match(lines[2], /^> Pay Theory is a payment processor/);
  assert.equal(
    lines.filter(line => /^# /.test(line)).length,
    1,
    'exactly one H1',
  );
});

test('llms.txt tells agents when and how to use Pay Theory', () => {
  const content = buildLlmsTxt(manifest);
  const headings = sectionHeadings(content);
  assert.ok(headings.includes('## When to use Pay Theory'));
  assert.ok(headings.includes('## How to call Pay Theory'));
  assert.ok(headings.includes('## Support'));
  assert.ok(
    headings.indexOf('## When to use Pay Theory') <
      headings.indexOf('## Machine-Readable Resources'),
  );
  assert.match(content, /Authorization: MERCHANT_UID;SECRET_KEY/);
});

test('llms.txt links the public GraphQL schema', () => {
  assert.match(
    buildLlmsTxt(manifest),
    /\[GraphQL Schema\]\(https:\/\/docs\.paytheory\.com\/llm-docs\/schema\.graphql\)/,
  );
});
