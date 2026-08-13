import { createPublicKey, verify as verifySignature } from 'node:crypto';

const MAX_TIMESTAMP_AGE_SECONDS = 5 * 60;
const ED25519_SIGNATURE_BYTES = 64;

/**
 * Read one required webhook header without depending on header-name casing.
 *
 * @param {Record<string, string | string[] | undefined>} headers
 * @param {string} name
 * @returns {string}
 */
function requiredHeader(headers, name) {
  const entry = Object.entries(headers).find(
    ([headerName]) => headerName.toLowerCase() === name.toLowerCase(),
  );
  const value = entry?.[1];
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Missing ${name} header`);
  }
  return value;
}

/**
 * Decode a canonical base64 signature instead of accepting Node's permissive
 * decoder, which otherwise ignores some malformed characters.
 *
 * @param {string} value
 * @returns {Buffer}
 */
function decodeSignature(value) {
  const canonicalBase64 =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  if (!canonicalBase64.test(value)) {
    throw new Error('Invalid webhook signature encoding');
  }
  const decoded = Buffer.from(value, 'base64');
  if (decoded.length !== ED25519_SIGNATURE_BYTES) {
    throw new Error('Invalid webhook signature length');
  }
  return decoded;
}

/**
 * Verify the exact bytes covered by a Pay Theory Ed25519 signature.
 *
 * @param {{alg: string, crv: string, kid: string, kty: string, use: string, x: string}} jwk
 * @param {string} timestamp
 * @param {Buffer} rawBody
 * @param {string} signature
 * @returns {boolean}
 */
export function verifyEd25519Signature(jwk, timestamp, rawBody, signature) {
  if (
    jwk.alg !== 'EdDSA' ||
    jwk.crv !== 'Ed25519' ||
    jwk.kty !== 'OKP' ||
    jwk.use !== 'sig'
  ) {
    throw new Error('Unsupported webhook verification key');
  }
  const publicKey = createPublicKey({
    key: {
      alg: jwk.alg,
      crv: jwk.crv,
      kid: jwk.kid,
      kty: jwk.kty,
      use: jwk.use,
      x: jwk.x,
    },
    format: 'jwk',
  });
  const signingInput = Buffer.concat([
    Buffer.from(`${timestamp}.`, 'ascii'),
    rawBody,
  ]);
  return verifySignature(
    null,
    signingInput,
    publicKey,
    decodeSignature(signature),
  );
}

/**
 * Verify and validate one delivery before handing the parsed event to business
 * logic. The claim callback must atomically insert event_id with a unique
 * constraint so concurrent deliveries cannot both start work.
 *
 * @param {object} options
 * @param {Buffer} options.rawBody Exact bytes read from the HTTP request.
 * @param {Record<string, string | string[] | undefined>} options.headers
 * @param {{keys: Array<{alg: string, crv: string, kid: string, kty: string, use: string, x: string}>}} options.jwks
 * @param {string} options.expectedMerchantUid Merchant that owns this route.
 * @param {(id: string) => boolean} options.claimEventId Returns true only when this call claims a new ID.
 * @param {number} [options.nowSeconds]
 * @returns {Record<string, unknown>}
 */
export function verifyWebhookDelivery({
  rawBody,
  headers,
  jwks,
  expectedMerchantUid,
  claimEventId,
  nowSeconds = Math.floor(Date.now() / 1000),
}) {
  if (!Buffer.isBuffer(rawBody)) {
    throw new Error('rawBody must be the unparsed request Buffer');
  }

  const signature = requiredHeader(headers, 'X-Webhook-Signature');
  const timestamp = requiredHeader(headers, 'X-Webhook-Timestamp');
  const keyId = requiredHeader(headers, 'X-Webhook-Key-Id');

  if (!/^[0-9]+$/.test(timestamp)) {
    throw new Error('Invalid webhook timestamp');
  }
  const deliverySeconds = Number(timestamp);
  if (
    !Number.isSafeInteger(deliverySeconds) ||
    Math.abs(nowSeconds - deliverySeconds) > MAX_TIMESTAMP_AGE_SECONDS
  ) {
    throw new Error('Stale webhook timestamp');
  }

  const jwk = jwks.keys.find(key => key.kid === keyId);
  if (!jwk) {
    throw new Error('Unknown webhook key ID');
  }
  // Signature verification must happen before JSON parsing: parsing and
  // re-serializing the body changes the signed bytes.
  if (!verifyEd25519Signature(jwk, timestamp, rawBody, signature)) {
    throw new Error('Invalid webhook signature');
  }

  const event = JSON.parse(rawBody.toString('utf8'));
  if (event?.payload?.merchant_uid !== expectedMerchantUid) {
    throw new Error('Webhook merchant does not match this route');
  }
  if (typeof event.event_id !== 'string' || event.event_id.length === 0) {
    throw new Error('Webhook event_id is missing');
  }
  if (!claimEventId(event.event_id)) {
    throw new Error('Duplicate webhook event');
  }
  return event;
}
