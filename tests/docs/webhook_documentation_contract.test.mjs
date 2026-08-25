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
const SCHEMA_PATH = path.join(ROOT, 'graphql/api.graphql');
const WEBHOOK_EXAMPLES_PATH = path.join(ROOT, 'graphql/examples/webhooks.json');
const GUIDE = fs.readFileSync(GUIDE_PATH, 'utf8');
const SAMPLES = fs.readFileSync(SAMPLE_PATH, 'utf8');
const SCHEMA = fs.readFileSync(SCHEMA_PATH, 'utf8');
const WEBHOOK_EXAMPLES = JSON.parse(
  fs.readFileSync(WEBHOOK_EXAMPLES_PATH, 'utf8'),
);

const GENERATED_API_TARGETS = [
  path.join(ROOT, 'docs/api/_data'),
  path.join(ROOT, 'versioned_docs/version-lab/api/_data'),
];

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
  assert.match(GUIDE, /Cache this trusted JWKS/);
  assert.match(GUIDE, /select the verification key whose `kid` matches/);
  assert.match(GUIDE, /does not currently provide a public JWKS URL/);
  assert.match(GUIDE, /query WebhookVerificationKeys/);
  assert.match(GUIDE, /data\.jwks\.keys/);
  assert.doesNotMatch(GUIDE, /Webhook verification/);
  assert.match(GUIDE, /Perform every validation step locally/);
  assert.match(GUIDE, /requires no Pay Theory API call/);
  assert.match(GUIDE, /do not send the request body, signature/);
  assert.match(GUIDE, /payload\.merchant_uid/);
  assert.match(GUIDE, /Deduplicate atomically on `event_id`/);
  const removedOperation = ['validate', 'Payload'].join('');
  const removedType = ['Payload', 'Validation'].join('');
  assert.doesNotMatch(GUIDE, new RegExp(`${removedOperation}|${removedType}`));
});

test('documents the three delivery-history lookup modes and identity fields', () => {
  assert.match(GUIDE, /webhookEvents\(\s*endpoint: \$endpoint/);
  for (const field of [
    'id',
    'event_id',
    'endpoint',
    'event',
    'retry_count',
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
  assert.match(GUIDE, /`id` field is the unique Attempt ID/);
  assert.match(GUIDE, /nullable `event_id` field is the stable public ID/);
  assert.match(GUIDE, /return `null` for `event_id`/);
  assert.match(GUIDE, /show `id` and label it as the Attempt ID/);
  assert.match(GUIDE, /webhookEvents\(id: \$id\)/);
  assert.match(GUIDE, /returns zero or one record/);
  assert.match(GUIDE, /webhookEvents\(event_id: \$eventId\)/);
  assert.match(GUIDE, /returns every available attempt with the newest first/);
  assert.match(GUIDE, /no public pagination cursor or limit/);
  assert.match(GUIDE, /rejects mixed lookup modes before reading/);
  assert.match(GUIDE, /returns `events: \[\]`/);
  assert.match(
    GUIDE,
    /does not expose any separate internal attempt or source-event ID/,
  );
});

test('generated GraphQL references match the public webhook schema', () => {
  assert.match(SCHEMA, /webhookEvents\([\s\S]*?event_id: ID/);
  assert.match(SCHEMA, /type WebhookEvent[\s\S]*?event_id: ID/);
  assert.doesNotMatch(SCHEMA, /\b(?:validatePayload|PayloadValidation)\b/);

  const webhookEventsExample = WEBHOOK_EXAMPLES.find(
    operation => operation.operation === 'webhookEvents',
  ).examples[0];
  assert.equal(webhookEventsExample.variables.id, null);
  assert.equal(typeof webhookEventsExample.variables.endpoint, 'string');
  assert.equal(webhookEventsExample.variables.last_evaluated_key, null);

  for (const dataDirectory of GENERATED_API_TARGETS) {
    const operations = JSON.parse(
      fs.readFileSync(path.join(dataDirectory, 'operations.json'), 'utf8'),
    );
    const types = JSON.parse(
      fs.readFileSync(path.join(dataDirectory, 'types.json'), 'utf8'),
    );
    const webhookEvents = operations.query.webhookEvents;

    assert.deepEqual(
      webhookEvents.arguments.map(argument => argument.name),
      ['id', 'event_id', 'endpoint', 'result', 'last_evaluated_key', 'limit'],
    );
    assert.match(
      webhookEvents.arguments.find(argument => argument.name === 'id')
        .description,
      /exact matching attempt/,
    );
    assert.match(
      webhookEvents.arguments.find(argument => argument.name === 'event_id')
        .description,
      /all matching attempts newest first without public pagination/,
    );
    assert.deepEqual(
      webhookEvents.examples[0].variables,
      webhookEventsExample.variables,
    );

    const webhookEventFields = Object.fromEntries(
      types.WebhookEvent.fields.map(field => [field.name, field]),
    );
    assert.equal(webhookEventFields.id.typeString, 'ID!');
    assert.equal(webhookEventFields.event_id.typeString, 'ID');
    assert.equal(webhookEventFields.attempt_id, undefined);
    assert.equal(webhookEventFields.source_event_id, undefined);

    assert.deepEqual(
      types.JWK.fields.map(field => field.name),
      ['alg', 'crv', 'kid', 'kty', 'use', 'x'],
    );
    assert.deepEqual(
      types.JWKS.fields.map(field => field.name),
      ['keys'],
    );
    assert.equal(types.JWKS.fields[0].typeString, '[JWK!]!');
    assert.equal(operations.query.validatePayload, undefined);
    assert.equal(operations.mutation.validatePayload, undefined);
    assert.equal(types.PayloadValidation, undefined);
  }
});

test('every sample JSON envelope includes a branded delivery ID', () => {
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
    assert.match(example.event_id, /^pt(?:l|s)?_webh_/);
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
