import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);
const GUIDE_PATH = path.join(
  ROOT,
  'docs/main/after_payments/webhook_events.mdx',
);
const SAMPLE_PATH = path.join(
  ROOT,
  'docs/main/after_payments/webhook_sample_payloads.mdx',
);
const GUIDE = fs.readFileSync(GUIDE_PATH, 'utf8');
const SAMPLES = fs.readFileSync(SAMPLE_PATH, 'utf8');

test('states the additive envelope, delivery result, and retry contracts', () => {
  for (const field of [
    'event',
    'subtype',
    'payload',
    'event_id',
    'occurred_at',
  ]) {
    assert.match(GUIDE, new RegExp('\\\\| `' + field + '` \\\\|'));
  }

  assert.match(GUIDE, /at least once/i);
  assert.match(GUIDE, /unordered/i);
  assert.match(GUIDE, /Any `2xx` response is successful/);
  assert.match(GUIDE, /Redirects and every non-`2xx` response/);
  assert.match(GUIDE, /Timeouts and connection failures fail/);
  assert.match(GUIDE, /one 10-second response window/);

  const expectedDelays = [
    '1. 1 minute',
    '2. 5 minutes',
    '3. 30 minutes',
    '4. 2 hours',
    '5. 6 hours',
    '6. 12 hours',
    '7. 24 hours',
    '8. 48 hours',
  ];
  let previousIndex = -1;
  for (const delay of expectedDelays) {
    const index = GUIDE.indexOf(delay);
    assert.ok(index > previousIndex, `${delay} must appear once and in order`);
    previousIndex = index;
  }

  assert.doesNotMatch(GUIDE, /(?:three|3) retries/i);
  assert.doesNotMatch(GUIDE, /(?:will|does) automatically deactivate/i);
});

test('documents exact signature headers and local verification boundary', () => {
  for (const header of [
    'X-Webhook-Signature',
    'X-Webhook-Timestamp',
    'X-Webhook-Key-Id',
  ]) {
    assert.match(GUIDE, new RegExp(header));
  }
  assert.match(GUIDE, /timestamp \+ "\." \+ raw request body/);
  assert.match(GUIDE, /more than five minutes in the past or future/);
  assert.match(GUIDE, /verify locally with the copied public JWKS/);
  assert.match(GUIDE, /does not currently provide a public JWKS URL/);
  assert.match(GUIDE, /diagnostics; your receiver should verify locally/i);
  assert.match(GUIDE, /payload\.merchant_uid/);
  assert.match(GUIDE, /Deduplicate atomically on `event_id`/);
});

test('GraphQL examples use the reviewed operation names and arguments', () => {
  assert.match(GUIDE, /webhookEvents\(\s*endpoint: \$endpoint/);
  for (const field of [
    'id',
    'endpoint',
    'event',
    'result',
    'started_at',
    'finished_at',
    'status_code',
    'error',
    'request',
    'response',
  ]) {
    assert.match(GUIDE, new RegExp(`\\n      ${field}\\n`));
  }
  assert.match(
    GUIDE,
    /validatePayload\(\s*payload: \$payload\s*signature: \$signature\s*timestamp: \$timestamp\s*keyId: \$keyId/,
  );
  assert.match(GUIDE, /\n    is_valid\n/);
});

test('every sample JSON envelope includes stable logical-event metadata', () => {
  const jsonBlocks = [...SAMPLES.matchAll(/```json\n([\s\S]*?)\n```/g)];
  assert.ok(
    jsonBlocks.length >= 6,
    'expected all representative webhook samples',
  );
  for (const block of jsonBlocks) {
    const example = JSON.parse(block[1]);
    assert.equal(typeof example.event, 'string');
    assert.equal(typeof example.subtype, 'string');
    assert.equal(typeof example.payload, 'object');
    assert.equal(typeof example.event_id, 'string');
    assert.equal(typeof example.occurred_at, 'string');
  }
});

test('internal guide links resolve to documentation files', () => {
  const links = [...GUIDE.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
    .map(match => match[1])
    .filter(target => !target.startsWith('http'));

  for (const target of links) {
    const withoutAnchor = target.split('#', 1)[0];
    const resolved = path.resolve(path.dirname(GUIDE_PATH), withoutAnchor);
    // Generated API list pages use the category path (for example
    // /api/webhooks) while their source is /api/webhooks/webhooks.mdx.
    const candidates = [
      `${resolved}.md`,
      `${resolved}.mdx`,
      path.join(resolved, `${path.basename(resolved)}.mdx`),
    ];
    assert.ok(
      candidates.some(candidate => fs.existsSync(candidate)),
      `link target does not exist: ${target}`,
    );
  }
  assert.ok(
    fs.existsSync(path.join(ROOT, 'examples/webhooks/verify_webhook.mjs')),
    'the linked receiver example must remain executable source',
  );
});
