import base64
import binascii
import json
import time

from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey

TOLERANCE_SECONDS = 5 * 60


class WebhookVerificationError(Exception):
    pass


def _header(headers, name):
    for key, value in headers.items():
        if key.lower() == name.lower() and value:
            return value
    raise WebhookVerificationError(f"Missing {name} header")


def verify_webhook(raw_body: bytes, headers: dict, jwks: dict, now_seconds: int | None = None) -> dict:
    """Verify a Pay Theory webhook and return the parsed event.

    raw_body: the exact request body bytes. Do not parse it first.
    headers: the request headers.
    jwks: the result of the `jwks` GraphQL query, for example {"keys": [...]}.
    """
    signature = _header(headers, "X-Webhook-Signature")
    timestamp = _header(headers, "X-Webhook-Timestamp")
    key_id = _header(headers, "X-Webhook-Key-Id")

    # 1. Reject old or future timestamps to stop replayed requests.
    if not timestamp.isdigit():
        raise WebhookVerificationError("Invalid webhook timestamp")
    now = int(time.time()) if now_seconds is None else now_seconds
    if abs(now - int(timestamp)) > TOLERANCE_SECONDS:
        raise WebhookVerificationError("Webhook timestamp is outside the 5-minute window")

    # 2. Find the public key named in the X-Webhook-Key-Id header.
    jwk = next((key for key in jwks["keys"] if key["kid"] == key_id), None)
    if jwk is None or jwk["kty"] != "OKP" or jwk["crv"] != "Ed25519":
        raise WebhookVerificationError("Unknown webhook key ID")
    x = jwk["x"] + "=" * (-len(jwk["x"]) % 4)
    public_key = Ed25519PublicKey.from_public_bytes(base64.urlsafe_b64decode(x))

    # 3. Verify the signature over `<timestamp>.<raw body>`.
    try:
        public_key.verify(
            base64.b64decode(signature, validate=True),
            timestamp.encode("ascii") + b"." + raw_body,
        )
    except (InvalidSignature, binascii.Error, ValueError) as error:
        raise WebhookVerificationError("Invalid webhook signature") from error

    # 4. Only now parse the JSON.
    return json.loads(raw_body)
