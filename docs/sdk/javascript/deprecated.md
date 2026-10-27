---
sidebar_position: 9
sidebar_label: 'Deprecations'
title: "Deprecations"
---

# Deprecations


## Create and mount

[`payTheoryFields`](functions#paytheoryfields) replaces `create` and `mount`. It takes the API Key and styles object and mounts the fields in one call.

### create

`create` initializes a Pay Theory controller. It takes the API Key and the [styles object](hosted_fields#styles-object).

```javascript
const API_KEY = "YOUR_API_KEY"
const STYLES = {
    ...style_options
}

const myPayTheory = await window.paytheory.create(API_KEY, STYLES)
```

It returns a Promise that resolves to a controller with `mount`, the action functions and the [event listeners](event_listeners).

### mount

`mount` adds the hosted fields to the page. It takes one object.

```javascript
const customPlaceholders = {
    "card-number": "Card Number",
    "card-cvv": "CVV",
    "card-exp": "MM/YY"
}

myPayTheory.mount({
    placeholders: customPlaceholders
})
```

The object accepts:

- **placeholders**: Custom placeholder text, keyed by field:
  - **card-number**
  - **card-cvv**
  - **card-exp**
  - **card-name**
  - **billing-line1**
  - **billing-line2**
  - **billing-city**
  - **billing-state**
  - **billing-zip**
  - **routing-number**
  - **account-number**
  - **account-name**
  - **cash-name**
  - **cash-contact**

  These keys set the labels of the account type radio buttons:
  - **checking**
  - **savings**


## Confirmation flow

The confirmation flow is deprecated. To show the payor the service fee before you charge, read it from the [state observer](event_listeners#service-fee) and pass it to `transact` as `fee`.

In the confirmation flow, `transact` with `confirmation: true` returns a `CONFIRMATION` response instead of charging. Its `body` has `first_six`, `last_four`, `brand`, `amount`, `service_fee` and `receipt_number`. You then call `confirm()` to charge the payment or `cancel()` to drop it.

```javascript
const result = await paytheory.transact({ amount: 1000, confirmation: true })

if (result.type === 'CONFIRMATION') {
  // Show result.body.service_fee, then:
  await paytheory.confirm() // or paytheory.cancel()
}
```

`confirm` returns `SUCCESS`, `FAILED` or `ERROR`, like `transact`. `cancel` returns `true` or an `ERROR`.

## Event listeners

You don't need these listeners. [`transact`](functions#transact) and [`tokenizePaymentMethod`](functions#tokenizepaymentmethod) return the same data in their Promise. The SDK still fires them for older integrations.

### tokenizeObserver

`tokenizeObserver` fires when `transact` runs with `confirmation: true` and the payment is waiting for `confirm`. See the [confirmation flow](#confirmation-flow).

```javascript
myPayTheory.tokenizeObserver(token => {
    // Logic to respond to payment tokenization
})
```

#### Callback argument

The callback receives this object. `amount` includes the service fee.

- **first_six** (String): The first six digits of the card number
- **last_four** (String): The last four digits of the card number or account number
- **amount** (Int): The amount of the transaction
- **service_fee** (Int): The service fee of the transaction
- **receipt_number** (String): The unique transaction_id assigned to a transaction by Pay Theory


### captureObserver

`captureObserver` fires when `confirm` completes a payment that was waiting for confirmation. See the [confirmation flow](#confirmation-flow).

```javascript
myPayTheory.captureObserver(capture => {
    // Logic to respond to payment capture
})
```

#### Callback argument

A successful payment passes this object. `amount` includes the service fee.

- **last_four** (String): The last four digits of the card number or account number
- **amount** (Int): The amount of the transaction
- **service_fee** (Int): The service fee of the transaction
- **receipt_number** (String): The unique transaction_id assigned to a transaction by Pay Theory
- **brand** (String): The brand of the card
- **created_at** (String): The date and time the transaction was created
- **state** (String): The status of the transaction
- **metadata** (JSON): The metadata of the transaction
- **payor_id** (String): The ID of the payor that was used for the transaction
- **payment_method_id** (String): The ID of the payment method token

A failed or declined payment passes this object:

- **receipt_number** (String): The unique transaction_id assigned to a transaction by Pay Theory
- **last_four** (String): The last four digits of the card number or account number
- **brand** (String): The brand of the card
- **state** (String): The state of the transaction
    - This is `FAILURE`
- **type** (String): Description of the failure

### transactedObserver

`transactedObserver` fires when `transact` completes a payment without `confirmation: true`. It also fires when `tokenizePaymentMethod` completes.

```javascript
myPayTheory.transactedObserver(result => {
    // Logic to respond when you receive the transaction result
})
```

After `transact`, a successful payment passes this object. `amount` includes the service fee.

- **last_four** (String): The last four digits of the card number or account number
- **amount** (Int): The amount of the transaction
- **service_fee** (Int): The service fee of the transaction
- **receipt_number** (String): The unique transaction_id assigned to a transaction by Pay Theory
- **brand** (String): The brand of the card
- **created_at** (String): The date and time the transaction was created
- **state** (String): The status of the transaction
- **metadata** (JSON): The metadata of the transaction
- **payor_id** (String): The ID of the payor that was used for the transaction
- **payment_method_id** (String): The ID of the payment method token

A failed or declined payment passes this object:

- **receipt_number** (String): The unique transaction_id assigned to a transaction by Pay Theory
- **last_four** (String): The last four digits of the card number or account number
- **brand** (String): The brand of the card
- **state** (String): The state of the transaction
    - This is `FAILURE`
- **type** (String): Description of the failure

After `tokenizePaymentMethod`, the callback receives this object. With `expandedResponse: true`, a rejected payment method passes `failure_code` and `failure_text` instead.

- **payment_method_id** (String): The ID of the payment method token
- **payor_id** (String): The ID of the payor that was used for the payment method token
- **last_four** (String): The last four digits of the card number or account number
- **brand** (String): The brand of the card
- **expiration** (String): The expiration date of the card formatted as MMYY
- **payment_type** (String): `card` or `ach`
- **metadata** (JSON): The metadata that was passed in when tokenizing the payment method

### cashObserver

`cashObserver` fires when `transact` creates a cash barcode from the cash fields. `transact` returns the same data as a [`CASH` response](functions#cash-response).

```javascript
myPayTheory.cashObserver(result => {
    // Logic to respond when you receive the cash barcode result
})
```

#### Callback argument

To build the map URL, the SDK asks the browser for the payor's location. The first time, the browser asks the payor to allow it.

The callback receives this object:

- **barcodeUrl** (String): The url for the barcode image
- **mapUrl** (String): The url for the map to find retail locations to pay the barcode


## initTransaction

Use [`transact`](functions#transact) instead. `initTransaction` submits a payment from a controller made with `create`.

```javascript
myPayTheory.initTransaction(amount, payorInfo, confirmation)
```

### Arguments

- **amount** (Int): The amount of the transaction
- **payorInfo** (Object): The payor information. You can see more on the payorInfo object [here](functions#payor-info-object)
- **confirmation** (Boolean): Whether to require confirmation of the payment. With `true`, `tokenizeObserver` fires when the payment is waiting for confirmation and `captureObserver` fires when it completes. With `false`, `transactedObserver` fires when it completes.
