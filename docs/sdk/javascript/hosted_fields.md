---
sidebar_position: 3
sidebar_label: 'Hosted Fields'
title: "Hosted Fields"
---

# Hosted Fields

These Hosted Fields are used to collect sensitive payment information from the user.

## Card Fields

These fields are used to collect card information from the user. The card number, expiration date, and CVV are all required to collect a valid card payment.

You also need to ensure you are capturing the zip code for the card. You can do this by either using the `pay-theory-credit-card-zip` field or by passing the `billingInfo` into the `transact` or `tokenizePaymentMethod` fields.

### Separate Card Fields

These fields are used to collect the required info from the user for a valid card payment.

```html
<form>
...
<div id="pay-theory-credit-card-number"></div>
<div id="pay-theory-credit-card-exp"></div>
<div id="pay-theory-credit-card-cvv"></div>
...
</form>
```

### Combined Card Field

These fields are used to collect the required info from the user for a valid card payment while combining the card number and expiration date and CVV into one field.

```html
<form>
...
<div id="pay-theory-credit-card"></div>
...
</form>
```

### Optional Billing Detail Fields

These optional fields are used to collect billing information from the user.

```html
<form>
  ...
  <div id="pay-theory-credit-card-account-name"></div>
  ...
  <div id="pay-theory-credit-card-address-1"></div>
  <div id="pay-theory-credit-card-address-2"></div>
  <div id="pay-theory-credit-card-city"></div>
  <div id="pay-theory-credit-card-state"></div>
  <div id="pay-theory-credit-card-zip"></div>
  ...
</form>
```

## ACH Fields

These fields are all required to collect ACH information from the user for Bank Accounts in the USA.

```html
<form>
  ...
  <div id="pay-theory-ach-account-name"></div>
  <div id="pay-theory-ach-account-number"></div>
  <div id="pay-theory-ach-routing-number"></div>
  <div id="pay-theory-ach-account-type"></div>
  ...
</form>
```

## EFT Fields

These fields are all required to collect EFT information from the user for Bank Accounts in Canada.

```html
<form>
  ...
  <div id="pay-theory-bank-account-name"></div>
  <div id="pay-theory-bank-account-number"></div>
  <div id="pay-theory-bank-institution-number"></div>
  <div id="pay-theory-bank-transit-number"></div>
  <div id="pay-theory-bank-account-type"></div>
</form>
```

## Cash Fields

These fields are all required to collect Cash information from the user.

```html
<form>
  ...
  <div id="pay-theory-cash-name"></div>
  <div id="pay-theory-cash-contact"></div>
  ...
</form>
```

## Checkout Button Field

This div is used to mount an iframe that will include a checkout button.
This button will open a hosted checkout page that will allow the user to select a payment method and complete the payment.

```html
<div id="pay-theory-checkout-button"></div>
```


## QR Code Field

This div is used to mount an iframe that will include a QR Code.
This QR Code will open a hosted checkout page that will allow the user to select a payment method and complete the payment.

```html
<div id="pay-theory-checkout-qr"></div>
```

[//]: # (## Card Present Field)

[//]: # ()
[//]: # (This div is used to mount an iframe that will allow the SDK to communicate to Pay Theory.)

[//]: # ()
[//]: # (This div is required for card present to work but is not shown and is set to `display: none` by default.)

[//]: # ()
[//]: # (```html)

[//]: # (<form>)

[//]: # (...)

[//]: # (<div id="pay-theory-card-present"></div>)

[//]: # (...)

[//]: # (</form>)

[//]: # (```)


## Styling Hosted Fields

To style the input parent div simply provide your own CSS for the pay theory containers you create. This is best used to style the height, width, and border of the container.

*Individual pay-theory-credit-card-number containers should be at least 340px wide, pay-theory-credit-card combined input should be 400px*

```css
#pay-theory-credit-card-number,
#pay-theory-credit-card-exp,
#pay-theory-credit-card-cvv {
  height: 1.75em;
  border: solid 1px #ccc;
  border-radius: 5px;
  margin: 4px 0;
}
```

## Styles Object

To style the input fields you can pass in a custom style object to the create function in our SDK. This allows you to style the text inside the inputs as well as the style of the radio buttons for the ACH account type

```javascript
const STYLES = {
  default: {
    color: 'black',
    fontSize: '14px'
  },
  success: {
    color: '#5cb85c',
    fontSize: '14px'
  },
  error: {
    color: '#d9534f',
    fontSize: '14px'
  },
  radio: {
    width: 18,
    fill: "blue",
    stroke: "grey",
    text: {
      fontSize: "18px",
      color: "grey"
    }
  },
  hidePlaceholder: false
}
```

|Key                | type                          |       description                     |
|-------------------|-------------------------------|---------------------------------------|
|default            | CSS Style Object              |The way a text field look when it is not in state success or error.|
|success            | CSS Style Object              |The way a text field look when it is valid. Only applies to fields that go through validation.|
|error              | CSS Style Object              |The way a text field look when it is invalid. Only applies to fields that go through validation.|
|radio              | [Radio Object](#radio-object) |The way radio buttons look for the ACH account type|
|hidePlaceholder    | Boolean                       |that allows you to hide the placeholder text in the input fields|

## Radio Object

This style object will be used to style the labels for the radio buttons. It contains the following keys:

|Key                | type                        |       description                     |
|-------------------|-----------------------------|---------------------------------------|
|width              | Int                         |The width in pixels of the radio buttons|
|fill               | String                      |The color of the radio buttons|
|stroke             | String                      |The color of the radio buttons border|
|text               | [Text Object](#text-object) |This style object will be used to style the labels for the radio buttons|

## Text Object

This style object will be used to style the labels for the radio buttons. It contains the following keys:

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|
|fontSize           |String       |The font size of the radio button labels|
|color              |String       |The color of the radio button labels|
