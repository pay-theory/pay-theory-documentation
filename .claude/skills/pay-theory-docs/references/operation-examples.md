# Operation examples

The request and response examples on every generated API reference page come from `graphql/examples/<group>.json`. The generator (`npm run graphql:generate:all`) copies them into `docs/api/_data/operations.json`, the lab copy under `versioned_docs/version-lab/api/_data/`, the LLM docs and the AI agent skill. A developer or an agent copies these examples literally, so each one must be a request that works and a response the API really returns.

Never hand-edit `operations.json`. Edit the source file and regenerate both targets.

## File shape

```json
[
  {
    "operation": "createBarcode",
    "operationType": "mutation",
    "examples": [
      {
        "name": "Create a barcode",
        "description": "Creates a barcode a payor can use to pay cash at a retail location.",
        "query": "mutation CreateBarcode($input: BarcodeInput!) {\n  createBarcode(input: $input) {\n    barcode_id\n  }\n}",
        "variables": { "input": { "merchant_uid": "e9f2387b-8727-450a-w3g2-fee9b49e42a1", "amount": 500 } },
        "response": {
          "type": "success",
          "httpStatus": 200,
          "body": { "data": { "createBarcode": { "barcode_id": "ptl_barc_nFevCQ42c7PuKAZ3kQ8Zn" } } }
        }
      }
    ]
  }
]
```

`response.type` is `success` or `error`. `body` is exactly what the GraphQL endpoint returned.

## Rules

Each rule below came out of a real review. `scripts/lint_examples.py` checks the ones marked *(lint)*.

### Each example stands alone

A reader lands on one example, copies it, and runs it. It can't rely on an example above it having run first.

- Don't write "the create example", "used in the void example", "read it back afterward", or "after deleteInvoice" *(lint)*.
- Don't file a follow-up read under a mutation, such as a `transactions` query under `createReversal`. If the read is worth showing, put it under its own operation.
- IDs inside an example may come from an earlier capture, but the example must read correctly on its own.

### One idea per example, common path first

- The first example for an operation is the call most integrators make, with the fewest optional arguments.
- Each optional feature (idempotency key, metadata, a future start date) gets its own example. Don't fold idempotency into the plain saved-payment-method charge.
- Keep the success path plus the errors people actually hit. Drop edge cases nobody reaches (an unsupported wallet type, a below-minimum amount next to an above-maximum one) and examples that exist only to show a backend quirk.

### Error examples come from Pay Theory, not the schema

Document errors that Pay Theory's backend returns for a request that is valid GraphQL: a declined card, an amount over the merchant maximum, a payor that doesn't exist, a merchant key calling a partner-only operation. Those are the errors an integration hits in production and needs to handle.

Leave out errors the GraphQL layer raises before the request reaches Pay Theory *(lint)*: a value that isn't in an enum, a wrong type, a missing non-null argument, malformed `AWSJSON`, an unknown field. The schema and the developer's tooling already report these, and they never make it out of a sandbox. They usually come back with no `errorType`, a `null` path and messages like "Variable 'metadata' has an invalid value."

Before keeping an error example, check the request against `graphql/api.graphql`. If the input is valid there, the error came from the backend and may be worth documenting.

### Variables match the query

- Every variable the operation declares appears in `variables`, and nothing extra *(lint)*. A missing required variable fails the request. An unused optional one (`offset_id`, `direction` on a first-page list) is noise. Remove it from the query or send a value.
- Use real enum values from `graphql/api.graphql`. For example, boolean filters use `EQUAL_TRUE` / `EQUAL_FALSE`. There is no `IS_TRUE`.
- When a sent field matters to the point of the example (`metadata`, `max_amount`, `address_line2`), select it in the response so the reader sees it come back.
- 2-space indents and LF line endings in queries *(lint)*.

### Responses are captured, never written

- Capture every response from a sandbox call. Don't type or edit a response body by hand, including error `data` blocks. If the scrub of sample data would change a response, recapture instead.
- An error body has an `errors` array with `message`, `errorType` and `path` *(lint)*. A top-level `{errorType, message}` means the capture skipped the GraphQL layer. Recapture.
- Strip `locations` from errors. They point at the capture query's line numbers *(lint)*.
- An error that comes back `Lambda:Unhandled`, with a Python dict in the message, or with `errorInfo.upstream_service` is a backend bug *(lint)*. File it and hold the example until the error is clean.
- The data inside one example agrees with itself. A filter on `customer@example.com` returns a row with that email. A created object gets its own ID, not the sample merchant's. A list response doesn't show a row that contradicts its own filter.

### Confirm the behavior before you document it

If you aren't sure the API is supposed to behave the way the capture shows, ask before publishing. Write the question in the PR, not in the description. Things that needed confirming in past reviews:

- Whether an idempotent retry returns the original object or a `CONFLICT` error (it differed between `createAuthorization` and `createTransaction`).
- Whether `updateMerchantSettings` with only `website` clears the other settings.
- Whether a `true` from `deleteInvoice` or `cancelRecurringPayment` means anything for an unknown ID.

A response that only makes sense as a bug ("returns true for an ID that doesn't exist") becomes a backend ticket, not an example.

### Say who can call it

- Partner-key-only operations say so: "Requires a partner key."
- Charging raw card, ACH or EFT details in `payment_method` is only available to partners that complete a PCI Level 1 audit. Say so in those descriptions.
- Merchant lists are scoped to the caller's access: "Lists the merchants your API key can see."

### Names and descriptions

Follow [voice.md](voice.md). For examples specifically:

- **Names.** Sentence case, a few words *(lint)*. Successes name the action: "Get a barcode", "List merchants", "Void an authorization". Errors name the problem: "Invalid card number", "Missing merchant ID", "Merchant key not allowed", "Amount is over the merchant maximum".
- **Verbs.** Get for one record, List for many, then Create, Update, Delete, Cancel to match the operation.
- **Descriptions.** One or two sentences that add a fact the name doesn't give *(lint)*: the filter used, a field to watch, a limit, who can call it. Errors start "Returns an error when …".
- **No notes for us.** "Reaches the resolver", "the read model catches up", "the response highlights those fields" and "does not prove the record exists" are notes for the team, so they belong in the PR *(lint)*.

## Sample data

Use the same values everywhere so a reader learns them once *(lint checks emails and merchant IDs)*.

| Field | Value |
|-------|-------|
| `merchant_uid` | `e9f2387b-8727-450a-w3g2-fee9b49e42a1` (the `w3g2` segment marks it fake) |
| Second merchant, for cross-merchant errors | `6b0c1e4d-2f7a-4c9e-z1y2-8d3f5a7b9c10` |
| Merchant name | Northstar Books |
| Payor | Pat Theodore, `pat@example.com`, `+15555550123` |
| Address | 123 Main Street, Cincinnati, OH 45209, USA |
| Card | Visa `4835034598457895`, exp `12` / `30`, CVV `123` (from `docs/main/testing.mdx`) |
| ACH | Routing `122105278`, outcomes by account number per `docs/main/testing.mdx` |
| Not-found IDs | Obvious fakes with the right prefix: `ptl_txn_not_a_real_id`, `ptl_pmt_not_a_real_token` |
| `sale_id`, `reference` | Values Pay Theory or a merchant would really produce (`ptl_sale_…` from a real auth, barcode or transaction, or `order-1042`), never a run hash |

Scrub before committing: no `<TEST_RUN_ID>`, run hashes (`docs-56f51efc`, `p4 docs …`), "Updated Street", partner or environment hosts (`innovate.paytheorylab…`, `paytheorystudy.com`), or real merchant UUIDs. Replace hosts in URLs with `<HOSTED_CHECKOUT_HOST>`-style placeholders.

## Placeholders

An operation with no captured example shows a generated placeholder named "Example <operation>". Leave it until you have a real one. Don't delete the placeholder without adding a replacement, or the operation ships with no example. An operation with only error examples still needs one success example.

## Before you open the PR

1. `python3 .claude/skills/pay-theory-docs/scripts/lint_examples.py` is clean of errors, and you've read each warning.
2. `npm run graphql:generate:all`, then confirm main and lab `operations.json` both changed for every operation you touched.
3. List anything you need confirmed (behavior, error messages) in the PR description.
