import assert from 'node:assert/strict';
import { createPrivateKey, generateKeyPairSync, sign } from 'node:crypto';
import test from 'node:test';

import {
  verifyEd25519Signature,
  verifyWebhookDelivery,
} from '../../examples/webhooks/verify_webhook.mjs';

const FIXED_TIMESTAMP = '1700000000';
const FIXED_BODY = Buffer.from('{"ok":true}');
const FIXED_SIGNATURE =
  'gDQLsgE1shaHLWmIHzVasn4XGLLdIAlcjEl3x/lrmUdkhbZpIOnj2udn6K4/' +
  'l0+pM/C8sH6cy0Ifu5hkeZbdCg==';
const FIXED_JWK = {
  alg: 'EdDSA',
  crv: 'Ed25519',
  kid: 'default',
  kty: 'OKP',
  use: 'sig',
  x: 'A6EHv_POEL4dcN0Y50vAmWfk1jCbpQ1fHdyGZBJVMbg',
};

test('verifies the deterministic PRD-619 and PRD-620 Ed25519 vector', () => {
  assert.equal(
    verifyEd25519Signature(
      FIXED_JWK,
      FIXED_TIMESTAMP,
      FIXED_BODY,
      FIXED_SIGNATURE,
    ),
    true,
  );
});

function signedDelivery(overrides = {}) {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  const publicJwk = publicKey.export({ format: 'jwk' });
  const privateJwk = privateKey.export({ format: 'jwk' });
  const jwk = {
    alg: 'EdDSA',
    crv: 'Ed25519',
    kid: 'current',
    kty: 'OKP',
    use: 'sig',
    x: publicJwk.x,
  };
  const timestamp = '1700000000';
  const event = {
    event: 'PAYOR',
    subtype: 'CREATED',
    payload: { merchant_uid: 'merchant-1' },
    event_id: 'event-1',
    occurred_at: '2023-11-14T22:13:20Z',
    ...overrides.event,
  };
  const rawBody = overrides.rawBody ?? Buffer.from(JSON.stringify(event));
  const signingInput = Buffer.concat([
    Buffer.from(`${timestamp}.`, 'ascii'),
    rawBody,
  ]);
  const signature = sign(
    null,
    signingInput,
    createPrivateKey({ key: privateJwk, format: 'jwk' }),
  ).toString('base64');
  const processedEventIds = overrides.processedEventIds ?? new Set();
  return {
    rawBody,
    headers: {
      'x-webhook-signature': overrides.signature ?? signature,
      'x-webhook-timestamp': overrides.timestamp ?? timestamp,
      'x-webhook-key-id': 'current',
    },
    jwks: { keys: [jwk] },
    expectedMerchantUid: overrides.expectedMerchantUid ?? 'merchant-1',
    processedEventIds,
    claimEventId:
      overrides.claimEventId ??
      (eventId => {
        if (processedEventIds.has(eventId)) return false;
        processedEventIds.add(eventId);
        return true;
      }),
    nowSeconds: overrides.nowSeconds ?? Number(timestamp),
  };
}

test('accepts a signed, fresh, tenant-matched delivery once', () => {
  const delivery = signedDelivery();

  const event = verifyWebhookDelivery(delivery);

  assert.equal(event.event_id, 'event-1');
  assert.equal(delivery.processedEventIds.has('event-1'), true);
});

test('rejects an invalid signature before attempting to parse JSON', () => {
  const delivery = signedDelivery({ rawBody: Buffer.from('not-json') });
  delivery.headers['x-webhook-signature'] = Buffer.alloc(64).toString('base64');

  assert.throws(
    () => verifyWebhookDelivery(delivery),
    /Invalid webhook signature/,
  );
});

test('rejects stale timestamps, merchant mismatches, and duplicate event IDs', () => {
  const stale = signedDelivery({ nowSeconds: 1700000301 });
  assert.throws(() => verifyWebhookDelivery(stale), /Stale webhook timestamp/);

  const wrongMerchant = signedDelivery({ expectedMerchantUid: 'merchant-2' });
  assert.throws(
    () => verifyWebhookDelivery(wrongMerchant),
    /does not match this route/,
  );

  const duplicate = signedDelivery({ processedEventIds: new Set(['event-1']) });
  assert.throws(
    () => verifyWebhookDelivery(duplicate),
    /Duplicate webhook event/,
  );
});
