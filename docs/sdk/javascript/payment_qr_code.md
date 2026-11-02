---
sidebar_position: 8
sidebar_label: 'Payment QR Code'
title: "Payment QR Code"
---

# Payment QR Code

`qrCode` starts a payment session from the `checkoutDetails` you pass and mounts a QR code in the `pay-theory-checkout-qr` [hosted field](hosted_fields#qr-code-field). When the payor scans it, a Pay Theory checkout page opens on their phone where they pick a payment method and pay.

***
## qrCode

```javascript
// Amount in cents
const AMOUNT = 1000

const PAYMENT_METADATA = {
  "student-name": "Pat Theodore"
};

// Configures the checkout page that opens when the payor scans the code
const CHECKOUT_DETAILS = {
  amount: AMOUNT,
  paymentName: "School Technology Fees",
  paymentDescription: "Technology fee for the 2026-2027 school year",
  requirePhone: true,
  callToAction: paytheory.DONATE,
  acceptedPaymentMethods: paytheory.ONLY_CARD,
  payorId: "ptl_pay_2NM2STwd3pWznLo1hGnUSc",
  metadata: PAYMENT_METADATA,
  feeMode: paytheory.MERCHANT_FEE,
  accountCode: "code-123456789",
  invoiceId: "ptl_inv_2O0yTY3k5AIyDc8NQ2SvhC",
}

const OPTIONS = {
  apiKey: "YOUR_API_KEY",
  checkoutDetails: CHECKOUT_DETAILS,
  size: 150,
  onReady: () => {},
  onError: error => {},
  onSuccess: result => {}
}

paytheory.qrCode(OPTIONS)
```

Pass `qrCode` one object with these keys.

**Required**

| Key | type | description |
|-----|------|-------------|
| apiKey | String | Your Pay Theory API Key, from the Pay Theory portal. |
| checkoutDetails | [Checkout details](#checkout-details) | What the checkout page charges and shows. |

**Optional**

| Key | type | description |
|-----|------|-------------|
| size | Int | Width and height of the QR code, in pixels. Defaults to `128`. Values below `128` become `128` and values above `300` become `300`. |
| onReady | Function | Called with `true` when the QR code is ready to scan. |
| onError | Function | Called with an error string. The string starts with one of the [error codes](errors). |
| onSuccess | Function | Called with the [success response](#success-response) when the payment succeeds. |

`qrCode` returns a Promise. If a parameter is invalid, it resolves to `false` and sends the error to `onError`.

***
## Checkout details

`qrCode` takes the same `checkoutDetails` as [`button`](payment_button#checkout-details).

**Required**

| Key | type | description |
|-----|------|-------------|
| amount | Int | Amount of the payment, in cents. |
| paymentName | String | Name shown on the checkout page. It's also saved as the transaction's `reference`. |

**Optional**

| Key | type | description |
|-----|------|-------------|
| paymentDescription | String | Description shown on the checkout page. |
| requirePhone | Boolean | Pass `true` to make the payor enter a phone number. |
| callToAction | String | Call to action for the checkout. Defaults to `paytheory.PAY`. See [call to action](#call-to-action). |
| acceptedPaymentMethods | String | Payment methods the page offers. Defaults to `paytheory.ALL`. See [accepted payment methods](#accepted-payment-methods). |
| payorId | String | ID of an existing payor. If you leave it out, Pay Theory creates a new payor. |
| metadata | Object | Key-value data stored with the transaction. |
| feeMode | String | `paytheory.MERCHANT_FEE` (default) or `paytheory.SERVICE_FEE`. |
| accountCode | String | Code for tracking a payment or group of payments. |
| invoiceId | String | ID of the invoice this payment pays. Don't combine with `recurringId`. |
| recurringId | String | ID of the recurring payment this payment pays. The amount must be a multiple of the recurring amount per payment. |
| healthExpenseType | String | Healthcare category: `HEALTHCARE`, `RX`, `VISION`, `CLINICAL`, `COPAY`, `DENTAL` or `TRANSIT`. |
| level3DataSummary | [Level 3 data summary](functions#level-3-data-summary-object) | Level 3 summary data for the transaction. |

***
## Success response

`onSuccess` receives this object.

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

***
## Call to action

| Value | Button text on the checkout page | Constant |
|-------|------|----------|
| `PAY` | Pay with | `paytheory.PAY` |
| `DONATE` | Donate with | `paytheory.DONATE` |
| `BOOK` | Book with | `paytheory.BOOK` |

***
## Accepted payment methods

| Value | The page accepts | Constant |
|-------|------------------|----------|
| `ALL` | Card, ACH and cash | `paytheory.ALL` |
| `ONLY_CARD` | Card | `paytheory.ONLY_CARD` |
| `ONLY_ACH` | ACH | `paytheory.ONLY_ACH` |
| `ONLY_CASH` | Cash | `paytheory.ONLY_CASH` |
| `NOT_CARD` | ACH and cash | `paytheory.NOT_CARD` |
| `NOT_ACH` | Card and cash | `paytheory.NOT_ACH` |
| `NOT_CASH` | Card and ACH | `paytheory.NOT_CASH` |
