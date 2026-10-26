---
sidebar_position: 3
sidebar_label: 'Hosted Fields'
title: 'Hosted Fields'
---

# Hosted Fields

Hosted fields collect card, bank and cash details in Pay Theory iframes, so the payment data never touches your page. Add an empty `div` with the field's ID where the field goes, then call [`payTheoryFields`](functions#paytheoryfields) to mount them.

To show each field as soon as it renders, watch [`iframeLoaded`](event_listeners#field-state) in the state observer.

***
## Card fields

A card payment needs the card number, expiration date and CVV.

It also needs the billing ZIP code. Mount the `pay-theory-credit-card-zip` field, or pass `billingInfo` to `transact` or `tokenizePaymentMethod`.

### Separate card fields

One field each for number, expiration and CVV.

```html
<form>
  ...
  <div id="pay-theory-credit-card-number"></div>
  <div id="pay-theory-credit-card-exp"></div>
  <div id="pay-theory-credit-card-cvv"></div>
  ...
</form>
```

### Combined card field

Number, expiration and CVV in one field.

```html
<form>
  ...
  <div id="pay-theory-credit-card"></div>
  ...
</form>
```

### Billing detail fields

Optional fields for the name on the card and the billing address.

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

***
## ACH fields

All four fields are required for a US bank account.

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

***
## EFT fields

All five fields are required for a Canadian bank account. Pass `country: 'CAN'` to `payTheoryFields`.

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

***
## Cash fields

Both fields are required to create a cash barcode.

```html
<form>
  ...
  <div id="pay-theory-cash-name"></div>
  <div id="pay-theory-cash-contact"></div>
  ...
</form>
```

***
## Checkout button field

[`button`](payment_button) mounts its button here. The button opens a Pay Theory checkout page where the payor picks a payment method and pays.

```html
<div id="pay-theory-checkout-button"></div>
```

***
## QR code field

[`qrCode`](payment_qr_code) mounts its QR code here. Scanning it opens a Pay Theory checkout page where the payor picks a payment method and pays.

```html
<div id="pay-theory-checkout-qr"></div>
```

[//]: # '## Card Present Field'
[//]: #
[//]: # 'This div is used to mount an iframe that will allow the SDK to communicate to Pay Theory.'
[//]: #
[//]: # 'This div is required for card present to work but is not shown and is set to `display: none` by default.'
[//]: #
[//]: # '```html'
[//]: # '<form>'
[//]: # '...'
[//]: # '<div id="pay-theory-card-present"></div>'
[//]: # '...'
[//]: # '</form>'
[//]: # '```'

***
## Styling hosted fields

Style the container `div`s with your own CSS. Use it for the height, width and border of each container.

Make each `pay-theory-credit-card-number` container at least 340px wide, and the combined `pay-theory-credit-card` container 400px.

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

### Styles object

To style the inputs inside the iframes, pass a styles object to `payTheoryFields`. It accepts only the keys in the tables below and ignores any other property.

```javascript
const STYLES = {
  default: {
    color: 'black',
    fontSize: '14px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
  },
  success: {
    color: '#5cb85c',
    borderColor: '#5cb85c',
  },
  error: {
    color: '#d9534f',
    borderColor: '#d9534f',
  },
  radio: {
    width: 18,
    fill: 'blue',
    stroke: 'grey',
    text: {
      fontSize: '14px',
      color: 'grey',
      fontFamily: 'Helvetica, Arial, sans-serif',
    },
  },
  hidePlaceholder: false,
};
```

| Key               | type                                      | description                                                                                                                                    |
| ----------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `default`         | [Field Style Object](#field-style-object) | Styling applied to text inputs when not in `success` or `error` state.                                                                         |
| `success`         | [Field Style Object](#field-style-object) | Styling applied to text inputs that pass validation. Merged on top of `default`, so any property not set here keeps its `default` value. |
| `error`           | [Field Style Object](#field-style-object) | Styling applied to text inputs that fail validation. Merged on top of `default` the same way as `success`.                         |
| `radio`           | [Radio Object](#radio-object)             | Styling for the ACH account-type radio buttons.                                                                                                |
| `hidePlaceholder` | Boolean                                   | When `true`, the placeholder text in the input fields is hidden. Defaults to `false`.                                                          |

To style the hosted checkout button, pass `style` to `button`. See [Style object](payment_button#style-object).

### Field style object

The `default`, `success`, and `error` keys each accept the same 18 properties. All values are CSS strings.

| Key                | type   | description                                                                                                                                                   |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`            | String | Text color. Accepts hex, `rgb()` / `rgba()`, `hsl()` / `hsla()`, named colors, CSS variables (`var(--x)`), `transparent`, `inherit`.                          |
| `fontSize`         | String | Font size. Numeric + unit (`px`, `em`, `rem`, `%`, `vh`, `vw`, `pt`, `pc`, `in`, `cm`, `mm`, `ex`, `ch`, `vmin`, `vmax`), or `calc(...)`, `var(...)`, `auto`. |
| `fontFamily`       | String | Font family stack. Capped at 100 characters.                                                                                                                  |
| `lineHeight`       | String | CSS `line-height` value.                                                                                                                                      |
| `padding`          | String | CSS `padding` shorthand. Same unit rules as `fontSize`.                                                                                                       |
| `margin`           | String | CSS `margin` shorthand. Same unit rules as `fontSize`.                                                                                                        |
| `textAlign`        | String | CSS `text-align` value (`left`, `right`, `center`, `justify`, `start`, `end`).                                                                                |
| `border`           | String | CSS `border` shorthand (e.g. `'1px solid #ccc'`).                                                                                                             |
| `borderColor`      | String | Border color only. Same value rules as `color`.                                                                                                               |
| `borderRadius`     | String | CSS `border-radius` value.                                                                                                                                    |
| `backgroundColor`  | String | Background color. Same value rules as `color`.                                                                                                                |
| `boxShadow`        | String | CSS `box-shadow` value.                                                                                                                                       |
| `outline`          | String | CSS `outline` shorthand.                                                                                                                                      |
| `width`            | String | CSS `width`. Same unit rules as `fontSize`.                                                                                                                   |
| `height`           | String | CSS `height`. Same unit rules as `fontSize`.                                                                                                                  |
| `transition`       | String | CSS `transition` shorthand.                                                                                                                                   |
| `opacity`          | String | CSS `opacity` (`'0'`–`'1'`).                                                                                                                                  |
| `webkitAppearance` | String | CSS `-webkit-appearance` value.                                                                                                                               |

### Radio object

Styles for the ACH account-type radio buttons.

| Key      | type                        | description                                                        |
| -------- | --------------------------- | ------------------------------------------------------------------ |
| `width`  | Int                         | Width of the radio button, in pixels.                              |
| `fill`   | String                      | Fill color of the selected indicator.                              |
| `stroke` | String                      | Color of the radio outline.                                        |
| `text`   | [Text Object](#text-object) | Styling for the radio button labels.                               |

### Text object

Styles for the radio button labels.

| Key          | type   | description                             |
| ------------ | ------ | --------------------------------------- |
| `fontSize`   | String | Font size of the radio button labels.   |
| `color`      | String | Color of the radio button labels.       |
| `fontFamily` | String | Font family of the radio button labels. |
| `fontWeight` | String | Font weight of the radio button labels. |
