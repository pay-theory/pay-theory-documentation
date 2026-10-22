---
sidebar_position: 1
sidebar_label: 'Pay Theory Javascript SDK'
title: "Pay Theory Javascript SDK"
---

# Pay Theory Javascript SDK

The Pay Theory Javascript SDK puts [hosted fields](hosted_fields) on your page and runs payments through them. The fields are Pay Theory iframes, so card and bank details never touch your page. You call [functions](functions) such as `transact`, and [event listeners](event_listeners) tell you what the fields are doing.

These steps take a page from no SDK to a card payment.

***
## 1. Import the SDK

Add the SDK script to your page's `<head>`. Your SDK Import URL is in the Pay Theory portal under the settings tab.

```html
<script src="{SDK Import URL}"></script>
```

The SDK is then on the window as `paytheory`:

```javascript
window.paytheory
```

Using TypeScript? Download the declaration file from the same host. See [TypeScript](typescript).

***
## 2. Add the hosted field containers

Add an empty `div` for each field you want, anywhere in your form. The SDK mounts each field into the `div` with the matching ID.

```html
<form>
  <div id="pay-theory-credit-card"></div>
  <div id="pay-theory-credit-card-zip"></div>
</form>
```

See [hosted fields](hosted_fields) for the card, ACH, EFT and cash field IDs.

***
## 3. Add event listeners

Add listeners before you mount the fields, so you don't miss early events.

```javascript
paytheory.errorObserver(error => {
  // Respond to errors
})

paytheory.validObserver(valid => {
  // Enable your pay button when valid includes 'card'
})
```

See all [event listeners](event_listeners).

***
## 4. Mount the hosted fields

Call `payTheoryFields` with your API Key.

```javascript
paytheory.payTheoryFields({
  apiKey: 'YOUR_API_KEY'
})
```

***
## 5. Submit the payment

When the [valid observer](event_listeners#validobserver) reports the fields as valid, call `transact`. `amount` is the only required parameter. See all [transact parameters](functions#transact).

```javascript
// Amount in cents
const result = await paytheory.transact({
  amount: 1000,
  idempotencyKey: 'order-1042'
})

if (result.type === 'SUCCESS') {
  // The payment succeeded
} else if (result.type === 'FAILED') {
  // The payment was declined. See result.body.reason
} else if (result.type === 'ERROR') {
  // The SDK couldn't run the payment. See result.error
}
```

With `idempotencyKey`, a retry can't charge the payor twice. Pay Theory creates one payment per key. See [Idempotency](../../main/online_payments/idempotency).
