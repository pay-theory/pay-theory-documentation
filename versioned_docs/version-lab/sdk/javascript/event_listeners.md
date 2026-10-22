---
sidebar_position: 6
sidebar_label: 'Event Listeners'
title: "Event Listeners"
---

# Event Listeners

Event listeners report what happens in the hosted fields and the SDK. Each one takes a callback and returns a function that removes the listener. Add them before you call [`payTheoryFields`](functions#paytheoryfields) so you don't miss early events.

```javascript
const removeListener = window.paytheory.errorObserver(error => {
  // Respond to the error
})

// Later, stop listening
removeListener()
```

***
## readyObserver

Fires when the hosted fields are connected and ready for `transact` or `tokenizePaymentMethod`.

```javascript
const removeListener = window.paytheory.readyObserver(ready => {
  // Enable your pay button
})
```

**Callback parameter**

`true`.

To show each field as soon as it renders, before the fields are ready, use [`iframeLoaded`](#field-state) in the state observer.

***
## errorObserver

Fires when an error happens anywhere in the SDK.

```javascript
const removeListener = window.paytheory.errorObserver(error => {
  // Respond to the error
})
```

**Callback parameter**

An error string. SDK errors start with one of the [error codes](errors). Field validation messages, such as an invalid card number, arrive without a code, and an empty string means a field's error cleared.

Most errors need the payor to reload the page and try again. `NOT_VALID` is the exception: the payor fixes the data in the fields, and you can call `transact` or `tokenizePaymentMethod` again once the [valid observer](#validobserver) reports the fields as valid.

***
## stateObserver

Fires when any hosted field's state changes: focus, input, validation or loading. It also fires when the service fee changes.

```javascript
const removeListener = window.paytheory.stateObserver(state => {
  const cardNumber = state['card-number']
  if (cardNumber.iframeLoaded) {
    document.getElementById('card-skeleton').hidden = true
  }
})
```

**Callback parameter**

An object with one key per hosted field and a `service_fee` key.

### Field state

Each field key holds:

| Key | type | description |
|-----|------|-------------|
| isFocused | Boolean | `true` while the field has focus. |
| isDirty | Boolean | `true` once the field has input. |
| errorMessages | String[] | Validation messages for the field. Empty when the field is valid. |
| iframeLoaded | Boolean | `false` while the field loads. Turns `true` once that field's iframe has loaded and reported its state. |

`iframeLoaded` is set per field, so you can show each field as it renders instead of waiting for [`readyObserver`](#readyobserver).

### Field keys

The object includes every field key, whether or not you mounted that field.

| Payment type | Keys |
|--------------|------|
| Card | `card-number`, `card-exp`, `card-cvv`, `card-name` |
| Billing address | `billing-line1`, `billing-line2`, `billing-city`, `billing-state`, `billing-zip` |
| Bank (USA) | `account-name`, `account-type`, `account-number`, `routing-number` |
| Bank (Canada) | `account-name`, `account-type`, `account-number`, `institution-number`, `transit-number` |
| Cash | `cash-name`, `cash-contact` |

### Service fee

`service_fee` holds the fees for the current amount:

| Key | type | description |
|-----|------|-------------|
| amount | Int | Amount of the payment, in cents. |
| card_fee | Int | Service fee for a card payment, in cents. |
| bank_fee | Int | Service fee for a bank payment, in cents. |
| ach_fee | Int | Same value as `bank_fee`. Kept for older integrations. |

The fee keys are `undefined` until the SDK has an amount and has calculated the fee. Pass the amount to [`payTheoryFields`](functions#paytheoryfields) or [`updateAmount`](functions#updateamount).

***
## validObserver

Fires when a group of hosted fields becomes valid or invalid. Use it to enable your pay button once the payor has filled in the fields.

```javascript
const removeListener = window.paytheory.validObserver(valid => {
  if (valid.includes('card')) {
    // The card fields are valid
  }
})
```

**Callback parameter**

A string naming the payment types whose fields are valid, separated by spaces: `card`, `bank` or `cash`. When the bank fields are valid it also includes `ach`. With several payment types mounted it can name more than one, and it's empty when none are valid. Check for a type with `includes`.
