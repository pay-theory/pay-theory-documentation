---
sidebar_position: 8
sidebar_label: 'Payment QR Code'
title: ""
---

# Payment QR Code

This is a function initializes a payment session based on the `checkoutDetails` you pass in. It then generates a QR Code that can be scanned to open a checkout page and accept a payment.

***
## qrCode

```javascript
//Amount passed in is in cents
const AMOUNT = 1000

const PAYMENT_METADATA = {
  "student-name": "Jane Doe"
};

// Parameters that you will pass in to configure the checkout page that opens when the qrCode is scanned.
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

const OPTIONS = {
  apiKey: "PT_API_KEY",
  checkoutDetails: CHECKOUT_DETAILS,
  size: 150,
  onReady: () => {},
  onError: () => {},
  onSuccess: () => {}
}

paytheory.qrCode(OPTIONS)
```

These are the values that you can pass into the `qrCode` function to customize the payment session.  
You pass a single object into the function with the following keys.

**Required Values**

| Key             | type   | description                                                                                               |
|-----------------|--------|-----------------------------------------------------------------------------------------------------------|     
| apiKey          | String | The API key for your Pay Theory account. You can find this in your Pay Theory Portal.                     |
| checkoutDetails | Object | The details for the checkout page that opens when the qrCode is scanned. Details [Below](#checkout-details). |

**Optional Values**

| Key              | type        | description                                                                                                             |
|------------------|-------------|-------------------------------------------------------------------------------------------------------------------------|     
| size             | Int         | This is the size, height and width, of the qrCode in pixels. Defaults to `128` and must be above `128` and below `300`. |
| onReady          | Function    | A function that will be called when the qrCode is ready to be displayed.                                                |
| onError          | Function    | A function that will be called when an error occurs. It is passed an error string.                                      |
| onSuccess        | Function    | A function that will be called when the payment is successful. It is passed a [success](#success-response) response.    |

***
## Success Response

| Key               | type     | description                                                       |
|-------------------|----------|-------------------------------------------------------------------|     
| last_four         | String   | The last four digits of the card number or account number         |
| amount            | Int      | The amount of the transaction **(service fee is included)**       |
| service_fee       | Int      | The service fee of the transaction                                |
| receipt_number    | String   | The Pay Theory receipt number                                     |
| brand             | String   | The brand of the card                                             |
| created_at        | String   | The date and time the transaction was created                     |
| state             | String   | The status of the transaction                                     |
| metadata          | JSON     | The metadata of the transaction                                   |
| payor_id          | String   | The Pay Theory id for the payor that was used for the transaction |
| payment_method_id | String   | The Pay Theory id for the payment method token                    |

***
## Checkout Details

These are the values that you can pass into the `checkoutDetails` object to customize the checkout page that opens when the qrCode is scanned.

**Required Values**

| Key         | type   | description                                                                                                                              |
|-------------|--------|------------------------------------------------------------------------------------------------------------------------------------------|     
| amount      | Int    | The amount of the payment in cents.                                                                                                      |
| paymentName | String | The name of the payment that will be displayed on the checkout page. Will also be passed in to the `reference` field of the transaction. |

**Optional Values**

| Key                    | type    | description                                                                                                                                                                                                                              |
|------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|     
| paymentDescription     | String  | The description of the payment that will be displayed on the checkout page.                                                                                                                                                              |
| requirePhone           | Boolean | Pass `true` to require the user to enter a phone number on the checkout page.                                                                                                                                                            |
| callToAction           | String  | The call to action that will be displayed on the payment button. Defaults to `paytheory.PAY`. All Options [Here](#call-to-action)                                                                                                        |
| acceptedPaymentMethods | String  | The payment methods that will be accepted for the payment. Defaults to `paytheory.ALL`.   All Options [Here](#accepted-payment-methods)                                                                                                  |
| payorId                | String  | The Pay Theory id for the payor that will be used for the payment. If this is not passed in a new payor will be created.                                                                                                                 |
| metadata               | JSON    | The metadata that will be passed in to the transaction.                                                                                                                                                                                  |
| feeMode                | String  | The fee mode that will be used for the payment. Defaults to `paytheory.MERCHANT_FEE`. Constants are available from the SDK. Available options are `paytheory.SERVICE_FEE` and `paytheory.MERCHANT_FEE`                                   |
| accountCode            | String  | The account code that will be used for the payment.                                                                                                                                                                                      |
| invoiceId              | String  | The Pay Theory invoice ID to use for the payment. Allows for user to assign a payment to an invoice.                                                                                                                                     |
| recurringId            | String  | The Pay Theory recurring ID to use for the payment. Allows for user to assign a payment to a recurring payment. If you pass in a recurring ID, the transactions amount must be an interval of the recurring payments amount per payment. |

***
## Call To Action

- `DONATE` - The call to action will be `Donate`. Constant is available from the SDK as `paytheory.DONATE`.
- `PAY` - The call to action will be `Pay`. Constant is available from the SDK as `paytheory.PAY`.
- `BOOK` - The call to action will be `Book`. Constant is available from the SDK as `paytheory.BOOK`.

***
## Accepted Payment Methods

- `ONLY_CARD` - Only card payments will be accepted. Constant is available from the SDK as `paytheory.ONLY_CARD`.
- `ONLY_ACH` - Only ACH payments will be accepted. Constant is available from the SDK as `paytheory.ONLY_ACH`.
- `ONLY_CASH` - Only cash payments will be accepted. Constant is available from the SDK as `paytheory.ONLY_CASH`.
- `NOT_CARD` - Card payments will not be accepted. Constant is available from the SDK as `paytheory.NOT_CARD`.
- `NOT_ACH` - ACH payments will not be accepted. Constant is available from the SDK as `paytheory.NOT_ACH`.
- `NOT_CASH` - Cash payments will not be accepted. Constant is available from the SDK as `paytheory.NOT_CASH`.
- `ALL` - All payment methods will be accepted. Constant is available from the SDK as `paytheory.ALL`.