---
sidebar_position: 6
sidebar_label: 'Event Listeners'
title: "Event Listeners"
---

# Event Listeners

The Pay Theory SDK provides a set of event listeners that can be used to respond messages from the hosted fields and inside the SDK.

Each of these listeners takes a callback function as a parameter. Below we will detail the parameters that are passed to each callback function.

Each of these listeners will return a function that can be used to remove the listener.

***
## readyObserver

The `readyObserver` will fire when the hosted fields are ready to be used. This is where you should add any logic that should be executed when the hosted fields are ready.

```javascript
const cleanupFunction =  window.paytheory.readyObserver(ready => {
  // Logic to respond when the fields are ready
})
```

**Callback Parameter**

When the fields are ready it will pass a boolean value of `true` to the callback function.

**Returns**

A function that can be used to remove the listener.

***
## errorObserver

The `errorObserver` will fire when an error occurs anywhere inside the Pay Theory SDK. This is a good place to add any logic that should only be executed when an error occurs.

```javascript
const cleanupFunction =  window.paytheory.errorObserver(error => {
  // Logic to respond to errors
})
```

**Callback Parameter**

The callback will be passed a string indicating what happened in the SDK. The string should begin with one of the codes shown [here](errors).

Most errors will require the user to refresh the page and try again.

The exception to this is the `NOT_VALID` error which will require the user to change the data in the payment fields until you get a proper response to the valid observer, and then you may try and transact or tokenize again.

**Returns**

A function that can be used to remove the listener.

***
## stateObserver

The `stateObserver` fires when the state of any hosted field changes, providing updates about focus, input, and validation states.

```javascript
const cleanupFunction = window.paytheory.stateObserver(state => {
    // Logic to respond to state changes
})
```

### State Object Schema

The callback receives a state object containing information about all possible payment fields and service fees. Each field contains the following properties:

**Common Field Properties**

| Property | Type | Description |
|----------|------|-------------|
| isFocused | boolean | Whether the field currently has user focus |
| isDirty | boolean | Whether the field contains any input |
| errorMessages | string[] | Array of validation error messages |

**Field Types**

#### Card Payment Fields
- `card-number`
- `card-cvv`
- `card-exp`
- `card-name`

#### Billing Address Fields
- `billing-line1`
- `billing-line2`
- `billing-city`
- `billing-state`
- `billing-zip`

#### Bank Payment Fields
- `account-name`
- `account-type`
- `account-number`
- `routing-number`
- `institution-number` (Canadian accounts)
- `transit-number` (Canadian accounts)

#### Cash Payment Fields
- `cash-name`
- `cash-contact`

#### Service Fee Information

The state object includes a `service_fee` object with fee details:

| Property | Type | Description |
|----------|------|-------------|
| amount | number | Total transaction amount in cents |
| card_fee | number | Card processing fee in cents (undefined if not calculated or no amount) |
| bank_fee | number | Bank/ACH processing fee in cents (undefined if not calculated or no amount) |

Note: Both `card_fee` and `bank_fee` will be undefined if:
- No amount has been passed to the SDK
- Fees haven't been calculated yet
- The respective payment method isn't being used

**Returns**

A function that can be used to remove the listener.

***
## validObserver

The `validObserver` will fire when a set of hosted fields are valid. This is where you should add any logic that should be executed when the hosted fields are valid.

```javascript
const cleanupFunction = window.paytheory.validObserver(valid => {
  // Logic to respond when the form is valid
})
```

**Callback Parameter**

The callback function will be passed a string that will contain the name of the payment type that is valid. This will be one of the following:

- `card`
- `ach`
- `cash`

There is a possibility that if you have multiple payment types mounted, that the string may contain multiple payment types. You could check for a certain payment type by using the `includes` method on the string.

```javascript
const cleanupFunction = myPayTheory.validObserver(valid => {
  if (valid.includes("card")) {
    // Logic to respond when the card is valid
  }
})
```

**Returns**

A function that can be used to remove the listener.
