---
sidebar_position: 7
sidebar_label: 'Payment Button'
title: "Payment Button"
---

# Payment Button

This is a function initializes a payment session based on the `checkoutDetails` you pass in. It then generates a Button that can be clicked to open a checkout page and accept a payment.

## button
```javascript
//Amount passed in is in cents
const AMOUNT = 1000

const PAYMENT_METADATA = {
  "student-name": "Jane Doe"
};

// Parameters that you will pass in to configure the checkout page that opens when the button is clicked.
const CHECKOUT_DETAILS = { 
        amount: AMOUNT, 
        paymentName: "School Technology Fees",
        paymentDescription: "Technology Fee for the 2019-2020 school year", 
        requirePhone: true, 
        callToAction: paytheory.DONATE, 
        acceptedPaymentMethods: paytheory.CARD_ONLY, 
        payorId: "pt_pay_XXXXXXXXX", 
        metadata: PAYMENT_METADATA,  
        feeMode: paytheory.MERCHANT_FEE, 
        accountCode: "code-123456789",  
        invoiceId: "pt_inv_XXXXXXXXX", 
        recurringId: "pt_rec_XXXXXXXXX", 
}

// Object that will style the payment button
const STYLE_OBJECT = { 
    color: paytheory.WHITE, 
    callToAction: paytheory.DONATE, 
    pill: true, 
    height: "48px"
}

const OPTIONS = {
  apiKey: "PT_API_KEY",
  checkoutDetails: CHECKOUT_DETAILS,
  style: STYLE_OBJECT,
  onReady: () => {},
  onClick: () => {},
  onError: () => {},
  onCancel: () => {},
  onSuccess: () => {},
  onBarcode: () => {}
}

paytheory.button(OPTIONS)
```

These are the parameters that you can pass into the `button` function to customize the payment session.  
You pass a single object into the function with the following keys.

**Required Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|apiKey             |String       |The API key for your Pay Theory account. You can find this in your Pay Theory Portal.|
|checkoutDetails    |Object       |The details for the checkout page that opens when the button is clicked. Details Below.|


**Optional Parameters**

|Key                |type         | description                                                                                                                                                 |
|-------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|     
|style              |Object       | The style object that will style the payment button. Details Below.                                                                                         |
|onReady            |Function     | A function that will be called when the button is ready to be clicked.                                                                                      |
|onClick            |Function     | A function that will be called when the button is clicked.                                                                                                  |
|onError            |Function     | A function that will be called when an error occurs. It is passed an error string.                                                                          |
|onCancel           |Function     | A function that will be called when the user cancels the payment from the pop-up window.                                                                    |
|onSuccess          |Function     | A function that will be called when the payment is successful. It is passed a [success](#success-response) response.                                        |
|onBarcode          |Function     | A function that will be called when a barcode is successfully created and the user closes the window. It is passed a [barcode](#barcode-response) response. |

## Success Response

|Key                |type         | description                                                       |
|-------------------|-------------|-------------------------------------------------------------------|     
|last_four          |String       | The last four digits of the card number or account number         |
|amount             |Int          | The amount of the transaction **(service fee is included)**       |
|service_fee        |Int          | The service fee of the transaction                                |
|receipt_number     |String       | The Pay Theory receipt number                                     |
|brand              |String       | The brand of the card                                             |
|created_at         |String       | The date and time the transaction was created                     |
|state              |String       | The status of the transaction                                     |
|metadata           |JSON         | The metadata of the transaction                                   |
|payor_id           |String       | The Pay Theory id for the payor that was used for the transaction |
|payment_method_id  |String       | The Pay Theory id for the payment method token                    |

## Barcode Response

|Key                |type         | description                                                     |
|-------------------|-------------|-----------------------------------------------------------------|
|barcodeUrl         |String       | The url for the barcode image                                   |
|mapUrl             |String       | The url for the map to find retail locations to pay the barcode |


**Checkout Details**

These are the parameters that you can pass into the `checkoutDetails` object to customize the checkout page that opens when the button is clicked.

**Required Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|amount             |Int          |The amount of the payment in cents.|
|paymentName        |String       |The name of the payment that will be displayed on the checkout page. Will also be passed in to the `reference` field of the transaction.|

**Optional Parameters**

| Key                    | type     | description                                                                                                                             |
|------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------|     
| paymentDescription     | String   | The description of the payment that will be displayed on the checkout page.                                                             |
| requirePhone           | Boolean  | Pass `true` to require the user to enter a phone number on the checkout page.                                                           |
| callToAction           | String   | The call to action that will be displayed on the payment button. Defaults to `paytheory.PAY`. All Options [Here](#call-to-action)       |
| acceptedPaymentMethods | String   | The payment methods that will be accepted for the payment. Defaults to `paytheory.ALL`.   All Options [Here](#accepted-payment-methods) |
| payorId                | String   | The Pay Theory id for the payor that will be used for the payment. If this is not passed in a new payor will be created.                |
| metadata               | JSON     | The metadata that will be passed in to the transaction.                                                                                 |
| feeMode                | String   | The fee mode that will be used for the payment. Defaults to `paytheory.MERCHANT_FEE`.                                                   |
| accountCode            | String   | The account code that will be used for the payment.                                                                                     |

**Style Object**  
These are the parameters that you can pass into the `style` object to customize the payment button.

**Optional Parameters**

|Key                |type         | description                                                                                                                             |
|-------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------|
|color              |String       | The color of the payment button. Defaults to `paytheory.PURPLE`. All Options [Here](#color)                                             |
|callToAction       |String       | The call to action that will be displayed on the payment button. Defaults to `paytheory.PAY`. All Options [Here](#call-to-action)       |
|pill               |Boolean      | Pass `true` to make the payment button a pill shape. Defaults to `false`.                                                               |
|height             |String       | The height of the payment button. Defaults to `48px`. min-height is `30px` and max-height is `55px`                                     |

## Call To Action

- `DONATE` - The call to action will be `Donate`. Constant is available from the SDK as `paytheory.DONATE`.
- `PAY` - The call to action will be `Pay`. Constant is available from the SDK as `paytheory.PAY`.
- `BOOK` - The call to action will be `Book`. Constant is available from the SDK as `paytheory.BOOK`.

## Accepted Payment Methods

- `ONLY_CARD` - Only card payments will be accepted. Constant is available from the SDK as `paytheory.ONLY_CARD`.
- `ONLY_ACH` - Only ACH payments will be accepted. Constant is available from the SDK as `paytheory.ONLY_ACH`.
- `ONLY_CASH` - Only cash payments will be accepted. Constant is available from the SDK as `paytheory.ONLY_CASH`.
- `NOT_CARD` - Card payments will not be accepted. Constant is available from the SDK as `paytheory.NOT_CARD`.
- `NOT_ACH` - ACH payments will not be accepted. Constant is available from the SDK as `paytheory.NOT_ACH`.
- `NOT_CASH` - Cash payments will not be accepted. Constant is available from the SDK as `paytheory.NOT_CASH`.
- `ALL` - All payment methods will be accepted. Constant is available from the SDK as `paytheory.ALL`.

## Color

- `PURPLE` - The button color will be purple. Constant is available from the SDK as `paytheory.PURPLE`.
- `WHITE` - The button color will be white. Constant is available from the SDK as `paytheory.WHITE`.
- `BLACK` - The button color will be black. Constant is available from the SDK as `paytheory.BLACK`.
- `GREY` - The button color will be grey. Constant is available from the SDK as `paytheory.GREY`.