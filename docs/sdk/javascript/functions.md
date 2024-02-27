---
sidebar_position: 2
sidebar_label: 'Functions'
title: ""
---

# Functions

The Pay Theory SDK provides a set of functions that can be used to perform actions in tandem with the Hosted Fields.

***
## payTheoryFields

This function is used to initialize the Pay Theory Hosted Fields.

```javascript
paytheory.payTheoryFields({
  apiKey: string,
  styles: StyleObject,
  placeholders: PlaceholderObject
})
```

These are the parameters that you can pass into the `payTheoryFields` function to customize the Hosted Fields.

|Key                | type                                        |       description                     |
|-------------------|---------------------------------------------|---------------------------------------|     
|apiKey             | String                                      |Your Pay Theory API key. This is required to initialize the Hosted Fields.|
|styles             | [Style Object](hosted_fields#styles-object) |An object that contains the styles for the Hosted Fields.|
|placeholders       | Object                                      |An object that contains any custom placeholders you would like to use for the fields.|

***
## transact

This function is used to submit a payment to Pay Theory or generate a barcode using the cash hosted fields. It returns a Promise with the result or an error.

```javascript
//Amount passed in is in cents
const AMOUNT = 1000

// optionally provide details about the payor
const PAYOR_INFO = {
  "first_name": "Some",
  "last_name": "Body",
  "email": "somebody@gmail.com",
  "phone": "3335554444",
  "personal_address": {
    "city": "Somewhere",
    "country": "USA",
    "region": "OH",
    "line1": "123 Street St",
    "line2": "Apartment 17",
    "postal_code": "12345"
  }
}

const BILLING_INFO = {
    name: "Some Body",
    address: {
        line1: "123 Street St",
        line2: "Apartment 17",
        city: "Somewhere",
        region: "OH",
        postal_code: "12345",
        country: "USA"
    }
}

const PAYMENT_METADATA = {
  "student-name": "Jane Doe"
};

// Parameters that you will pass into the transact function. More details below.
const TRANSACTING_PARAMETERS = { 
        amount: AMOUNT, 
        payorInfo: PAYOR_INFO, // optional
        billingInfo: BILLING_INFO, // optional
        payorId: "pt_pay_XXXXXXXXX", // optional
        metadata: PAYMENT_METADATA, // optional 
        feeMode: FEE_MODE, // optional
        fee: 100, // optional
        confirmation: false, // optional 
        accountCode: "code-123456789", // optional 
        reference: "field-trip", // optional
        invoiceId: "pt_inv_XXXXXXXXX", // optional
        sendReceipt: true, // optional 
        receiptDescription: "School Technology Fees", // optional
        recurringId: "pt_rec_XXXXXXXXX", // optional
}

paytheory.transact(TRANSACTING_PARAMETERS)
```

These are the parameters that you can pass into the `transact` function to customize the payment.

| Key                | type                                 | description                                                                                                                                                                                                                                                                                             |
|--------------------|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|     
| amount             | Int                                  | The amount of the transaction in cents.                                                                                                                                                                                                                                                                 |
| payorInfo          | [Payor Info](#payor-info-object)     | Details of the payor who is making the transaction.                                                                                                                                                                                                                                                     |
| billingInfo        | [Billing Info](#billing-info-object) | Billing info for the payment method. This is required if you are not using the `zip` hosted field.                                                                                                                                                                                                      |
| metadata           | Object                               | An object that will be stored with the transaction and can be used to track the payment.                                                                                                                                                                                                                |
| feeMode            | String                               | Defaults to `window.paytheory.MERCHANT_FEE`. If available to merchant and set to `window.paytheory.SERVICE_FEE` the fee will be added to the amount and charged to the payor. More details about the fee modes in your Pay Theory Portal.                                                               |
| fee                | Int                                  | Represents the fee to be charged in cents. If you are using `SERVICE_FEE` mode and want to skip the confirmation step, you must provide the fee amount. This will be validated to make sure it matches the fee amount that would be charged. If the fee amount does not match, an error will be thrown. |
| confirmation       | Boolean                              | Defaults to `false`. If set to `true` the payment will return a response to the tokenizeObserver before it needs to be confirmed. Required if using `SERVICE_FEE` fee mode.                                                                                                                             |
| accountCode        | String                               | Code that can be used to track a payment or group of payments. Will be included in the transaction schema and in the Pay Theory Portal.                                                                                                                                                                 |
| reference          | String                               | Custom description assigned to a payment. Will be included in the transaction schema and in the Pay Theory Portal.                                                                                                                                                                                      |
| payorId            | String                               | The Pay Theory payor ID to use for the payment. Allows for user to manage identities. This cannot be used if also using the `payorInfo` parameter.                                                                                                                                                      |
| invoiceId          | String                               | The Pay Theory invoice ID to use for the payment. Allows for user to assign a payment to an invoice.                                                                                                                                                                                                    |
| recurringId        | String                               | The Pay Theory recurring ID to use for the payment. Allows for user to assign a payment to a recurring payment. If you pass in a recurring ID, the transactions amount must be an interval of the recurring payments amount per payment.                                                                |
| sendReceipt        | Boolean                              | Pass `true` to send a receipt to the payor. Must have an email address on the payorInfo object or pass in a payorId that has an email address tied to it.                                                                                                                                               |
| receiptDescription | String                               | Description to be included in the receipt. Defaults to "Payment from your merchant".                                                                                                                                                                                                                    |


The function returns a Promise that will contain an object with a key of `type`. You can expect the following values for `type`:
- [`SUCCESS`](#success-response): The transaction was successful and the transaction details will be in the `body` key.
- [`FAILED`](#failed-response): The transaction failed and the details will be in the `body` key.
- [`CONFIRMATION`](#confirmation-response): The transaction requires confirmation and the transaction details will be in the `body` key.
- [`CASH`](#cash-response): The transact call successfully generated a barcode and the barcode details will be in the `body` key.
- [`ERROR`](#error-response): The transact call had an error while processing and the error details will be in the `error` key.

While generating the Barcode it will use the geoloaction to return a map url for the users specific location.

If this is the first time it has been requested the user will have the opportunity to accept or decline the request.

***
## confirm

This function is used to confirm a payment that has been created and required the confirmation step.

```javascript
paytheory.confirm()
```

The function returns a Promise that will contain an object with a key of `type`. You can expect the following values for `type`:
- [`SUCCESS`](#success-response): The transaction was successful and the transaction details will be in the `body` key.
- [`FAILED`](#failed-response): The transaction failed and the details will be in the `body` key.
- [`ERROR`](#error-response): The transact call had an error while processing and the error details will be in the `error` key.

***
## cancel

This function is used to cancel a payment that has been created and required the confirmation step.

```javascript
paytheory.cancel()
```

The function returns a Promise that will contain `true` if the transaction was cancelled successfully or an [`ERROR`](#error-response) Response.

Once you click cancel the transaction will be cancelled, and you will be able to run `transact` again.

***
## tokenizePaymentMethod

This function is used to tokenize a card or bank account.

```javascript
/ optionally provide details about the payor
const PAYOR_INFO = {
  "first_name": "Some",
  "last_name": "Body",
  "email": "somebody@gmail.com",
  "phone": "3335554444",
  "personal_address": {
    "city": "Somewhere",
    "country": "USA",
    "region": "OH",
    "line1": "123 Street St",
    "line2": "Apartment 17",
    "postal_code": "12345"
  }
}

const BILLING_INFO = {
  name: "Some Body",
  address: {
    line1: "123 Street St",
    line2: "Apartment 17",
    city: "Somewhere",
    region: "OH",
    postal_code: "12345",
    country: "USA"
  }
}

const TOKEN_METADATA = {
  "system_id": "123456789"
};

const TOKENIZE_PAYMENT_METHOD_PARAMETERS = {
  payorInfo: PAYOR_INFO, // optional
  billingInfo: BILLING_INFO, // optional
  payorId: "pt_pay_XXXXXXXXX", // optional
  metadata: TOKEN_METADATA, // optional 
}


paytheory.tokenizePaymentMethod(TOKENIZE_PAYMENT_METHOD_PARAMETERS)
```

These are the parameters that you can pass into the `tokenizePaymentMethod` function to tokenize a card or bank account.

|Key                | type                                 | description                                                                                                                                       |
|-------------------|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|     
|payorInfo          | [Payor Info](#payor-info-object)     | The details of the payor that you are tokenizing the payment method for.                                                                          |
|billingInfo        | [Billing Info](#billing-info-object) | Billing info for the payment method. This is required if you are not using the `zip` hosted field.                                                |
|metadata           | Object                               | An object that will be stored with the token and can be used to track the token.                                                                  |
|payorId            | String                               | The Pay Theory payor ID to use for the payment. Allows for user to manage identities. This cannot be used if also using the `payorInfo` parameter. |


The function returns a Promise that will contain an object with a key of `type`. You can expect the following values for `type`:

- [`TOKENIZED`](#tokenized-response): The payment method was tokenized successfully and the token will be in the `body` key.
- [`ERROR`](#error-response): The transact call had an error while processing and the error details will be in the `error` key.

***
## Payor Info Object

This data will be used to create a payor in Pay Theory system that will be represented by a Payor ID.

```json
{
  "first_name": "Some",
  "last_name": "Body",
  "email": "somebody@paytheory.com",
  "phone": "3335554444",
  "personal_address": {
    "city": "Somewhere",
    "country": "USA",
    "region": "OH",
    "line1": "123 Street St",
    "line2": "Apartment 17",
    "postal_code": "12345"
  }
}
```

|Key                | type                       | description                                                                                                              |
|-------------------|----------------------------|--------------------------------------------------------------------------------------------------------------------------|     
|first_name         | String                     | The first name of the payor                                                                                              |
|last_name          | String                     | The last name of the payor                                                                                               |
|email              | String                     | The email address of the payor                                                                                           |  
|phone              | String                     | The phone number of the payor                                                                                            |
|personal_address   | [Address](#address-object) | The address of the payor                                                                                                 |
|same_as_billing    | Boolean                    | Optional. If set to `true`, the address will be the same as the billing address. You only need to pass in `phone` and `email`. |

***
## Billing Info Object

This data will be used as the billing info for a card transaction. This is required if you are not using the billing hosted fields.

|Key                | type                       |       description                     |
|-------------------|----------------------------|---------------------------------------|     
|name               | String                     |The name on the card|
|address            | [Address](#address-object) |The billing address of the card|

***
## Address Object

This object is used to represent an address.

```json
{
  "line1": "123 Street St",
  "line2": "Apartment 17",
  "city": "Somewhere",
  "region": "OH",
  "postal_code": "12345",
  "country": "USA"
}
```

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|line1              |String       |The street address of the payor|
|line2              |String       |The street address of the payor|
|city               |String       |The city of the payor|
|region             |String       |The region (state) of the payor|
|postal_code        |String       |The postal code of the payor|
|country            |String       |The country of the payor|

***
## Responses

### Success Response

This is the value of the `body` key in the response if the `type` is `SUCCESS`:

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|last_four          |String       |The last four digits of the card number or account number|
|amount             |Int          |The amount of the transaction|
|service_fee        |Int          |The service fee of the transaction|
|receipt_number     |String       |The Pay Theory receipt number|
|brand              |String       |The brand of the card|
|created_at         |String       |The date and time the transaction was created|
|state              |String       |The status of the transaction|
|metadata           |JSON         |The metadata of the transaction|
|payor_id           |String       |The Pay Theory id for the payor that was used for the transaction|
|payment_method_id  |String       |The Pay Theory id for the payment method token|

*note that the service fee is included in amount*

### Failed Response

This is the value of the `body` key in the response if the `type` is `FAILED`:

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|receipt_number     |String       |The Pay Theory receipt number|
|last_four          |String       |The last four digits of the card number or account number|
|brand              |String       |The brand of the card|
|state              |String       |The state of the transaction. This will be `FAILURE`|
|reason             |Object       |The reason for the failure. More details below.|

**Reason Object**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|
|failure_code       |String       |The failure code for the failure. You can find a list of failure codes [here](ERRORS)|
|failure_text       |String       |The message for the failure|

### Confirmation Response

This is the value of the `body` key in the response if the `type` is `CONFIRMATION`:

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|first_six          |String       |The first six digits of the card number|
|last_four          |String       |The last four digits of the card number or account number|
|amount             |Int          |The amount of the transaction|
|service_fee        |Int          |The service fee of the transaction|
|receipt_number     |String       |The Pay Theory receipt number|

### Cash Response

This is the value of the `body` key in the response if the `type` is `CASH`:

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|barcodeUrl         |String       |The url for the barcode image|
|mapUrl             |String       |The url for the map to find retail locations to pay the barcode|

### Error Response

If the response has the `type` of `ERROR` it will have another key `error` with a string attached to it. The string will begin with one of the codes shown [here](ERRORS).

```json
{
  "type": "ERROR",
  "error": "NOT_READY: Error message"
}
```

### Tokenized Response

This is the value of the `body` key in the response if the `type` is `TOKENIZED`:

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|payment_method_id  |String       |The Pay Theory id for the payment method token|
|payor_id           |String       |The Pay Theory id for the payor that was used for the payment method token|
|last_four          |String       |The last four digits of the card number or account number|
|brand              |String       |The brand of the card|
|expiration         |String       |The expiration date of the card formatted as MMYY|
|payment_type       |String       |The type of payment method tokenized. This will be `card` or `ach`|
|metadata           |JSON         |The metadata that was passed in when tokenizing the payment method|