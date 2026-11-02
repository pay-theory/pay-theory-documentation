---
sidebar_position: 2
sidebar_label: 'Functions'
title: "Functions"
---

# Functions

These functions mount the hosted fields and run payments and tokenization through them. Each one is on `window.paytheory`. The [TypeScript declarations](typescript) type every parameter and response on this page.

***
## payTheoryFields

Mounts the hosted fields on the page and connects them to Pay Theory.

```javascript
paytheory.payTheoryFields({
  apiKey: 'YOUR_API_KEY',
  amount: 1000,
  country: 'USA',
  placeholders: PLACEHOLDERS,
  styles: STYLES,
})
```

| Key | type | description |
|-----|------|-------------|
| apiKey | String | Required. Your Pay Theory API Key. |
| amount | Int | Amount of the payment, in cents. Pass it to have the SDK calculate the service fee and report it to the [state observer](event_listeners#stateobserver). Change it later with [`updateAmount`](#updateamount). |
| country | String | `USA` or `CAN`. Match the merchant's `country_code` on the [merchant](../../api/types/types/merchant) object. Defaults to `USA`. |
| placeholders | Object | Placeholder text, keyed by field name such as `card-number` or `billing-zip`. |
| styles | [Styles object](hosted_fields#styles-object) | How the hosted fields look. |

`payTheoryFields` returns a Promise. It resolves to `{ type: 'READY', body: true }` when the fields are connected, or an [error response](#error-response).

***
## transact

Submits a payment with the mounted card or ACH fields, or creates a barcode with the cash fields.

```javascript
// Amount in cents
const AMOUNT = 1000

// Optional details about the payor
const PAYOR_INFO = {
  first_name: "Pat",
  last_name: "Theodore",
  email: "pat@example.com",
  phone: "+15555550123",
  personal_address: {
    line1: "123 Main Street",
    city: "Cincinnati",
    region: "OH",
    postal_code: "45209",
    country: "USA"
  }
}

const PAYMENT_METADATA = {
  "student-name": "Pat Theodore"
};

const TRANSACTING_PARAMETERS = {
  amount: AMOUNT,
  payorInfo: PAYOR_INFO, // optional
  metadata: PAYMENT_METADATA, // optional
  feeMode: paytheory.MERCHANT_FEE, // optional
  idempotencyKey: "order-1042", // optional
  accountCode: "code-123456789", // optional
  reference: "field-trip", // optional
  invoiceId: "ptl_inv_2O0yTY3k5AIyDc8NQ2SvhC", // optional
  receiptDescription: "School Technology Fees", // optional
  sendReceipt: true, // optional
}

const result = await paytheory.transact(TRANSACTING_PARAMETERS)
```

Pass either `payorInfo` or `payorId`, not both. Pass either `invoiceId` or `recurringId`, not both. The SDK returns an `INVALID_PARAM` error for either pair.

| Key | type | description |
|-----|------|-------------|
| amount | Int | Required. Amount of the payment, in cents. |
| accountCode | String | Code for tracking a payment or group of payments. Shows on the transaction and in the Pay Theory portal. |
| billingInfo | [Billing info](#billing-info-object) | Billing name and address. Required for cards if you don't mount the `zip` hosted field. |
| expandedResponse | Boolean | Defaults to `false`. With `true`, `SUCCESS` and `FAILED` responses return the full [Transaction](#expanded-responses). |
| fee | Int | Fee to charge, in cents. With `SERVICE_FEE`, pass the fee the [state observer](event_listeners#service-fee) reports. Pay Theory checks it against the fee it calculates and returns an error if they don't match. |
| feeMode | String | `paytheory.MERCHANT_FEE` (default) or `paytheory.SERVICE_FEE`. With `SERVICE_FEE`, Pay Theory adds the fee to the amount and charges it to the payor. |
| healthExpenseType | String | Healthcare category: `HEALTHCARE`, `RX`, `VISION`, `CLINICAL`, `COPAY`, `DENTAL` or `TRANSIT`. |
| idempotencyKey | String | Your key for this payment. If you retry with the same key and the same details, Pay Theory returns the first response instead of charging again. Cash payments ignore it. See [Idempotency](../../main/online_payments/idempotency). |
| invoiceId | String | ID of the invoice this payment pays. |
| level3DataSummary | [Level 3 data summary](#level-3-data-summary-object) | Level 3 summary data for the transaction. |
| metadata | Object | Key-value data stored with the transaction. |
| oneTimeUseToken | Boolean | Defaults to `false`. With `true`, Pay Theory sets the payment method's `is_active` to `false` after the payment, so it can't be charged again. |
| payorId | String | ID of an existing payor. |
| payorInfo | [Payor info](#payor-info-object) | Details for a new payor. |
| receiptDescription | String | Description on the receipt. Defaults to "Payment from your merchant". |
| recurringId | String | ID of the recurring payment this payment pays. The amount must be a multiple of the recurring amount per payment. |
| reference | String | Your own description of the payment. Shows on the transaction and in the Pay Theory portal. |
| sendReceipt | Boolean | Pass `true` to email a receipt. The payor needs an email address, from `payorInfo` or the payor with `payorId`. |

`transact` returns a Promise that resolves to an object with a `type`:

- [`SUCCESS`](#success-response): The payment succeeded. Details are in `body`.
- [`FAILED`](#failed-response): The payment was declined. Details are in `body`.
- [`CASH`](#cash-response): The cash barcode was created. Details are in `body`.
- [`ERROR`](#error-response): The SDK couldn't run the payment. The message is in `error`.

If you retry with the same `idempotencyKey` and the same details, `transact` returns the first response. With changed details, it returns an `ERROR` whose message includes `IDEMPOTENCY_KEY_PAYLOAD_MISMATCH` and the original `transaction_id`. Either way, no new payment is created. On the same page, you can retry after an `ERROR` or `FAILED` response. After `SUCCESS` or `CASH`, the fields are used up and `transact` returns `ACTION_COMPLETE`.

For a cash barcode, the SDK asks the browser for the payor's location to build the map URL. The first time, the browser asks the payor to allow it.

***
## tokenizePaymentMethod

Saves the card or bank account in the mounted fields as a payment method token, without charging it.

```javascript
const TOKENIZE_PAYMENT_METHOD_PARAMETERS = {
  payorInfo: PAYOR_INFO, // optional
  metadata: { "system_id": "123456789" }, // optional
  expandedResponse: true, // optional
}

const result = await paytheory.tokenizePaymentMethod(TOKENIZE_PAYMENT_METHOD_PARAMETERS)
```

| Key | type | description |
|-----|------|-------------|
| payorInfo | [Payor info](#payor-info-object) | Details for a new payor. Don't combine with `payorId`. |
| payorId | String | ID of an existing payor. |
| billingInfo | [Billing info](#billing-info-object) | Billing name and address. Required for cards if you don't mount the `zip` hosted field. |
| metadata | Object | Key-value data stored with the payment method token. |
| skipValidation | Boolean | Defaults to `false`. With `true`, Pay Theory saves the payment method without validating it first. |
| expandedResponse | Boolean | Defaults to `false`. With `true`, a `TOKENIZED` response returns the full [payment method](#expanded-responses), and a processor rejection returns `FAILED` with the reason. |

`tokenizePaymentMethod` returns a Promise that resolves to an object with a `type`:

- [`TOKENIZED`](#tokenized-response): The payment method was saved. Details are in `body`.
- [`FAILED`](#failed-tokenization-response): The processor rejected the payment method. Only returned with `expandedResponse: true`.
- [`ERROR`](#error-response): The SDK couldn't save the payment method. The message is in `error`.

Without `expandedResponse`, a processor rejection comes back as an `ERROR` that starts with `SOCKET_ERROR: Token validation failed:`.

***
## updateAmount

Changes the amount on every mounted hosted field and recalculates the service fee.

```javascript
// Amount in cents
const result = await paytheory.updateAmount(2000)

if (result !== true) {
  console.error('Could not update the amount:', result.error)
}
```

| Key | type | description |
|-----|------|-------------|
| amount | Int | The new amount, in cents. |

`updateAmount` returns a Promise that resolves to `true`, or an [error response](#error-response) that starts with one of these codes:

- `INVALID_PARAM`: The amount isn't a number, is `0` or has a decimal.
- `NOT_READY`: The fields aren't ready yet.
- `NO_FIELDS`: There are no hosted fields on the page.
- `SOCKET_ERROR`: The SDK couldn't reconnect to Pay Theory.

After an update, the [state observer](event_listeners#stateobserver) fires with the new amount and fees.

***
## Parameter schemas

### Payor info object

Pay Theory creates a payor from this data and returns its ID as `payor_id`.

```json
{
  "first_name": "Pat",
  "last_name": "Theodore",
  "email": "pat@example.com",
  "phone": "+15555550123",
  "personal_address": {
    "line1": "123 Main Street",
    "city": "Cincinnati",
    "region": "OH",
    "postal_code": "45209",
    "country": "USA"
  }
}
```

| Key | type | description |
|-----|------|-------------|
| first_name | String | Payor's first name. |
| last_name | String | Payor's last name. |
| email | String | Payor's email address. Needed for `sendReceipt`. |
| phone | String | Payor's phone number. |
| personal_address | [Address](#address-object) | Payor's address. |
| same_as_billing | Boolean | With `true`, Pay Theory uses the billing address as the payor's address. Pass only `email` and `phone` with it. |

### Billing info object

The billing name and address for the payment method. Required for cards if you don't mount the billing hosted fields.

| Key | type | description |
|-----|------|-------------|
| name | String | Name on the card or account. |
| address | [Address](#address-object) | Billing address. |

### Address object

```json
{
  "line1": "123 Main Street",
  "line2": "Suite 200",
  "city": "Cincinnati",
  "region": "OH",
  "postal_code": "45209",
  "country": "USA"
}
```

| Key | type | description |
|-----|------|-------------|
| line1 | String | Street address. |
| line2 | String | Second address line. |
| city | String | City. |
| region | String | State or province. |
| postal_code | String | Postal code. |
| country | String | Country. |

### Level 3 data summary object

Summary data for Level 3 card processing. All amounts are in cents.

| Key | type | description |
|-----|------|-------------|
| tax_amt | Int | Total tax amount. |
| tax_ind | String | How tax applies: `TAX_AMOUNT_PROVIDED`, `NOT_TAXABLE` or `NO_TAX_INFO_PROVIDED`. |
| purch_idfr | String | Purchase identifier. |
| order_num | String | Merchant's order number. |
| discnt_amt | Int | Total discount amount. |
| frght_amt | Int | Total freight or shipping amount. |
| duty_amt | Int | Total duty amount. |
| dest_postal_code | String | Postal code the goods ship to. |
| prod_desc | String[] | Descriptions of the products in the transaction. |

***
## Responses

### Success response

The `body` of a `SUCCESS` response. With `expandedResponse: true`, `body` is the full [Transaction](#expanded-responses) instead.

| Key | type | description |
|-----|------|-------------|
| receipt_number | String | The transaction ID. |
| amount | Int | Amount charged, in cents. Includes the service fee. |
| service_fee | Int | Service fee, in cents. |
| last_four | String | Last four digits of the card or account number. |
| brand | String | Card brand. |
| created_at | String | When the transaction was created. |
| state | String | Status of the transaction. |
| metadata | Object | The metadata you passed. |
| payor_id | String | ID of the payor. |
| payment_method_id | String | ID of the payment method token. |

### Failed response

The `body` of a `FAILED` response. With `expandedResponse: true`, `body` is the full [Transaction](#expanded-responses) instead.

| Key | type | description |
|-----|------|-------------|
| receipt_number | String | The transaction ID. |
| last_four | String | Last four digits of the card or account number. |
| brand | String | Card brand. |
| state | String | Status of the transaction. This is `FAILURE`. |
| type | String | Description of the failure. |
| payor_id | String | ID of the payor. |
| reason | Object | Why the payment failed. See below. |

**Reason object**

| Key | type | description |
|-----|------|-------------|
| failure_code | String | Failure code. See [Failure codes](../../main/after_payments/failed_transactions). |
| failure_text | String | Failure message. |

### Cash response

The `body` of a `CASH` response.

| Key | type | description |
|-----|------|-------------|
| barcodeUrl | String | URL of the barcode image. |
| mapUrl | String | URL of a map of retail locations that accept the barcode. |

### Tokenized response

The `body` of a `TOKENIZED` response. With `expandedResponse: true`, `body` is the full [payment method](#expanded-responses) instead.

| Key | type | description |
|-----|------|-------------|
| payment_method_id | String | ID of the payment method token. |
| payor_id | String | ID of the payor. |
| last_four | String | Last four digits of the card or account number. |
| brand | String | Card brand. |
| expiration | String | Card expiration date, as `MMYY`. |
| payment_type | String | `card` or `ach`. |
| metadata | Object | The metadata you passed. |

### Failed tokenization response

The `body` of a `FAILED` response from `tokenizePaymentMethod`. Returned only with `expandedResponse: true`.

```json
{
  "type": "FAILED",
  "body": {
    "failure_code": "GENERIC_DECLINE",
    "failure_text": "The transaction was declined for an unknown reason."
  }
}
```

| Key | type | description |
|-----|------|-------------|
| failure_code | String | Failure code. See [Failure codes](../../main/after_payments/failed_transactions). |
| failure_text | String | Failure message. |

### Error response

An `ERROR` response has an `error` string instead of a `body`. The string starts with one of the [error codes](errors).

```json
{
  "type": "ERROR",
  "error": "NOT_READY: Error message"
}
```

### Expanded responses

With `expandedResponse: true`, the SDK returns the same objects as the API:

- `transact`: `SUCCESS` and `FAILED` bodies are a [Transaction](../../api/types/types/transaction), with its `payment_method` and payor. `status` tells you which one you got.
- `tokenizePaymentMethod`: a `TOKENIZED` body is a [payment method](../../api/types/types/payment-method-token), with its payor.

Use expanded responses when your system already stores the API's objects, so you don't need a second query.
