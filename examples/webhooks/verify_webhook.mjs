import { createPublicKey, verify } from 'node:crypto';

const TOLERANCE_SECONDS = 5 * 60;
const BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

function header(headers, name) {
  const match = Object.entries(headers).find(
    ([key]) => key.toLowerCase() === name.toLowerCase(),
  );
  const value = match?.[1];
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Missing ${name} header`);
  }
  return value;
}

/**
 * Verify a Pay Theory webhook and return the parsed event.
 *
 * @param {object} options
 * @param {Buffer} options.rawBody The exact request body bytes. Do not parse it first.
 * @param {Record<string, string | string[] | undefined>} options.headers The request headers.
 * @param {{keys: Array<{kid: string, kty: string, crv: string, alg: string, use: string, x: string}>}} options.jwks
 *   The result of the `jwks` GraphQL query.
 * @param {number} [options.nowSeconds] Current Unix time in seconds.
 * @returns {{event: string, subtype: string, payload: object, event_id: string, occurred_at: string}}
 */
export function verifyWebhook({
  rawBody,
  headers,
  jwks,
  nowSeconds = Math.floor(Date.now() / 1000),
}) {
  if (!Buffer.isBuffer(rawBody)) {
    throw new Error('rawBody must be the raw request Buffer');
  }
  const signature = header(headers, 'X-Webhook-Signature');
  const timestamp = header(headers, 'X-Webhook-Timestamp');
  const keyId = header(headers, 'X-Webhook-Key-Id');

  // 1. Reject old or future timestamps to stop replayed requests.
  if (!/^[0-9]+$/.test(timestamp)) {
    throw new Error('Invalid webhook timestamp');
  }
  if (Math.abs(nowSeconds - Number(timestamp)) > TOLERANCE_SECONDS) {
    throw new Error('Webhook timestamp is outside the 5-minute window');
  }

  // 2. Find the public key named in the X-Webhook-Key-Id header.
  const jwk = jwks.keys.find((key) => key.kid === keyId);
  if (!jwk || jwk.kty !== 'OKP' || jwk.crv !== 'Ed25519') {
    throw new Error('Unknown webhook key ID');
  }
  const publicKey = createPublicKey({
    key: { kty: jwk.kty, crv: jwk.crv, x: jwk.x },
    format: 'jwk',
  });

  // 3. Verify the signature over `<timestamp>.<raw body>`.
  if (!BASE64.test(signature)) {
    throw new Error('Invalid webhook signature encoding');
  }
  const signedBytes = Buffer.concat([Buffer.from(`${timestamp}.`), rawBody]);
  const valid = verify(null, signedBytes, publicKey, Buffer.from(signature, 'base64'));
  if (!valid) {
    throw new Error('Invalid webhook signature');
  }

  // 4. Only now parse the JSON.
  return JSON.parse(rawBody.toString('utf8'));
}
