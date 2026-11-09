/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const ROOT = path.resolve(__dirname, '..');
const read = relativePath =>
  fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
const EXAMPLE_JS = 'examples/webhooks/verify_webhook.mjs';
const EXAMPLE_PY = 'examples/webhooks/verify_webhook.py';
const GUIDE_DIRS = [
  'docs/main/webhooks',
  'versioned_docs/version-lab/main/webhooks',
];

// Deterministic Ed25519 vector from the PRD-619/PRD-620 signing work (also used by PR #144).
const VECTOR = {
  jwks: {
    keys: [
      {
        alg: 'EdDSA',
        crv: 'Ed25519',
        kid: 'default',
        kty: 'OKP',
        use: 'sig',
        x: 'A6EHv_POEL4dcN0Y50vAmWfk1jCbpQ1fHdyGZBJVMbg',
      },
    ],
  },
  timestamp: '1700000000',
  body: '{"ok":true}',
  signature:
    'gDQLsgE1shaHLWmIHzVasn4XGLLdIAlcjEl3x/lrmUdkhbZpIOnj2udn6K4/l0+pM/C8sH6cy0Ifu5hkeZbdCg==',
};

const loadExample = () => import(path.join(ROOT, EXAMPLE_JS));

function signed(body, { timestamp = '1700000000', kid = 'key-1' } = {}) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
  const { x } = publicKey.export({ format: 'jwk' });
  const rawBody = Buffer.from(body);
  const signature = crypto
    .sign(
      null,
      Buffer.concat([Buffer.from(`${timestamp}.`), rawBody]),
      privateKey,
    )
    .toString('base64');
  return {
    rawBody,
    headers: {
      'x-webhook-signature': signature,
      'x-webhook-timestamp': timestamp,
      'x-webhook-key-id': kid,
    },
    jwks: {
      keys: [{ kid, kty: 'OKP', crv: 'Ed25519', alg: 'EdDSA', use: 'sig', x }],
    },
    nowSeconds: Number(timestamp),
  };
}

test('Node example verifies the shared Ed25519 vector', async () => {
  const { verifyWebhook } = await loadExample();
  const event = verifyWebhook({
    rawBody: Buffer.from(VECTOR.body),
    headers: {
      'X-Webhook-Signature': VECTOR.signature,
      'X-Webhook-Timestamp': VECTOR.timestamp,
      'X-Webhook-Key-Id': 'default',
    },
    jwks: VECTOR.jwks,
    nowSeconds: Number(VECTOR.timestamp),
  });
  assert.deepEqual(event, { ok: true });
});

test('Node example rejects tampered, re-serialized, stale and unknown-key requests', async () => {
  const { verifyWebhook } = await loadExample();
  const body =
    '{"event":"PAYOR","event_id":"ptl_webh_1","payload":{"merchant_uid":"m"},"subtype":"CREATED"}';

  assert.equal(verifyWebhook(signed(body)).event_id, 'ptl_webh_1');

  const tampered = signed(body);
  tampered.rawBody = Buffer.from(body.replace('PAYOR', 'MERCHANT'));
  assert.throws(() => verifyWebhook(tampered), /Invalid webhook signature/);

  const reserialized = signed(body);
  reserialized.rawBody = Buffer.from(JSON.stringify(JSON.parse(body), null, 2));
  assert.throws(() => verifyWebhook(reserialized), /Invalid webhook signature/);

  const stale = signed(body);
  stale.nowSeconds += 301;
  assert.throws(() => verifyWebhook(stale), /5-minute window/);

  const unknownKey = signed(body);
  unknownKey.headers['x-webhook-key-id'] = 'key-2';
  assert.throws(() => verifyWebhook(unknownKey), /Unknown webhook key ID/);

  const parsed = signed(body);
  parsed.rawBody = JSON.parse(body);
  assert.throws(() => verifyWebhook(parsed), /raw request Buffer/);
});

test('Python example verifies the shared vector and rejects a tampered body', t => {
  const probe = spawnSync('python3', ['-c', 'import cryptography'], {
    encoding: 'utf8',
  });
  if (probe.status !== 0) {
    t.skip('python3 with the cryptography package is not available');
    return;
  }
  const script = `
import json, sys
sys.path.insert(0, ${JSON.stringify(path.join(ROOT, 'examples/webhooks'))})
from verify_webhook import verify_webhook, WebhookVerificationError
v = json.loads(sys.argv[1])
headers = {"X-Webhook-Signature": v["signature"], "X-Webhook-Timestamp": v["timestamp"], "X-Webhook-Key-Id": "default"}
assert verify_webhook(v["body"].encode(), headers, v["jwks"], now_seconds=int(v["timestamp"])) == {"ok": True}
try:
    verify_webhook(b'{"ok":false}', headers, v["jwks"], now_seconds=int(v["timestamp"]))
    raise SystemExit("tampered body verified")
except WebhookVerificationError:
    pass
try:
    verify_webhook(v["body"].encode(), headers, v["jwks"], now_seconds=int(v["timestamp"]) + 301)
    raise SystemExit("stale timestamp verified")
except WebhookVerificationError:
    pass
print("ok")
`;
  const result = spawnSync('python3', ['-c', script, JSON.stringify(VECTOR)], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test('verify guide embeds the example modules unchanged, in main and lab', () => {
  for (const dir of GUIDE_DIRS) {
    const guide = read(`${dir}/verify_webhooks.mdx`);
    for (const [file, lang] of [
      [EXAMPLE_JS, 'javascript'],
      [EXAMPLE_PY, 'python'],
    ]) {
      const name = path.basename(file);
      const block = guide.match(
        new RegExp('```' + lang + ' title="' + name + '"\\n([\\s\\S]*?)\\n```'),
      );
      assert.ok(block, `${dir}: missing ${name} code block`);
      assert.equal(
        block[1],
        read(file).replace(/\n$/, ''),
        `${dir}: ${name} drifted from ${file}`,
      );
    }
  }
});

test('webhook guides state the current delivery contract', () => {
  for (const dir of GUIDE_DIRS) {
    const overview = read(`${dir}/overview.mdx`);
    for (const delay of [
      '1 minute',
      '5 minutes',
      '30 minutes',
      '2 hours',
      '6 hours',
      '12 hours',
      '24 hours',
      '48 hours',
    ]) {
      assert.ok(
        overview.includes(delay),
        `${dir}: retry delay ${delay} missing`,
      );
    }
    assert.match(overview, /up to 10 seconds/);
    assert.match(overview, /at least once and unordered/);
    assert.match(overview, /15 days/);
    const all = fs
      .readdirSync(path.join(ROOT, dir))
      .filter(f => f.endsWith('.mdx'))
      .map(f => read(`${dir}/${f}`))
      .join('\n');
    assert.doesNotMatch(all, /(?:three|3) retries/i);
    assert.doesNotMatch(all, /automatically (?:deactivate|disable)/i);
    assert.doesNotMatch(all, /validatePayload|jwks_uri/);
  }
});

test('sample payloads are valid webhook envelopes', () => {
  for (const dir of GUIDE_DIRS) {
    const page = read(`${dir}/event_payloads.mdx`);
    const blocks = [
      ...page.matchAll(/```json title="([A-Z_]+)\.([A-Z]+)"\n([\s\S]*?)\n```/g),
    ];
    assert.ok(blocks.length >= 10, `${dir}: expected a sample per event`);
    for (const [, event, subtype, json] of blocks) {
      const body = JSON.parse(json);
      assert.equal(body.event, event);
      assert.equal(body.subtype, subtype);
      assert.match(body.event_id, /^pt[ls]?_webh_/);
      assert.match(body.occurred_at, /^\d{4}-\d\d-\d\dT/);
      assert.equal(typeof body.payload, 'object');
      assert.deepEqual(
        Object.keys(body),
        [...Object.keys(body)].sort(),
        `${event}.${subtype}: keys must be sorted like real deliveries`,
      );
    }
  }
});

// Wire types confirmed from the DynamoDB attribute types of live outbox rows.
test('sample payloads use the wire types of real deliveries', () => {
  const expected = {
    TRANSACTION: {
      gross_amount: 'number',
      fees: 'number',
      net_amount: 'number',
      refunded_amount: 'number',
      is_settled: 'boolean',
    },
    SETTLEMENT: {
      gross_amount: 'number',
      total_fees: 'number',
      settlement_batch: 'number',
      gross_amount_64bit: 'string',
    },
    FUNDING_TRANSFER: { amount: 'string', settlement_batch: 'number' },
    DISPUTE: { amount: 'number' },
    MERCHANT: { ach_active: 'boolean', card_active: 'boolean' },
    PAYMENT_METHOD: { is_active: 'boolean' },
  };
  for (const dir of GUIDE_DIRS) {
    const page = read(`${dir}/event_payloads.mdx`);
    for (const [, event, json] of page.matchAll(
      /```json title="([A-Z_]+)\.[A-Z]+"\n([\s\S]*?)\n```/g,
    )) {
      const { payload } = JSON.parse(json);
      for (const [key, type] of Object.entries(expected[event] ?? {})) {
        if (payload[key] === null) continue;
        assert.equal(typeof payload[key], type, `${dir}: ${event}.${key}`);
      }
    }
  }
});
