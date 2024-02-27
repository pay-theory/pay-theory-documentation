---
sidebar_position: 4
sidebar_label: 'Authorization'
title: ""
---

# Authorization  

An authorization is used to reserve funds on a card for a future transaction.  It is not a charge, but it does reserve the funds on the card for a period of time.  The authorization will expire after a period of time if it is not captured.  

*Authorizations are currently only available for certain processors.  Please contact Pay Theory for more information.*
***
## The Authorization Object

```graphql
{
    account_code: String
    amount: Int!
    authorization_date: AWSDateTime!
    authorization_id: String!
    currency: String!
    expiration_date: AWSDateTime
    failure_reasons: [String]
    fee_mode: FeeMode!
    fees: Int!
    invoice: Invoice
    merchant_uid: String!
    metadata: AWSJSON
    payment_method: PaymentMethodToken!
    reference: String
    sale_id: String
    status: AuthorizationStatus!
    timezone: String
    updated_row_at: AWSDateTime
}
```

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|account_code       |String       |Custom defined value passed in as the account code for the authorization.|
|amount             |Int!         |The amount of the authorization in cents.|
|authorization_date |AWSDateTime! |The date and time the authorization was created.|
|authorization_id   |String!      |The Pay Theory unique identifier assigned to the authorization.|
|currency           |String!      |The currency of the authorization.  Currently only `USD` is supported.|
|expiration_date    |AWSDateTime  |The date and time the authorization will expire.|
|failure_reasons    |[String]     |Array of failure reasons for the authorization.  If the authorization is successful, this will be null.|
|fee_mode           |FeeMode!     |The fee mode for the authorization.  It can be one of the following: `SERVICE_FEE`, `MERCHANT_FEE`|
|fees               |Int!         |The amount of fees for the authorization in cents.|
|invoice            |Invoice      |The invoice object for the invoice that the authorization belongs to.  More information on the invoice object can be found [here](invoice.md).|
|merchant_uid       |String!      |The Pay Theory unique identifier assigned to the merchant that the authorization belongs to.|
|metadata           |AWSJSON      |Any additional data that was stored with the authorization.|
|payment_method     |PaymentMethodToken!|The payment method token object for the payment method that the authorization belongs to.  More information on the payment method token object can be found [here](payment_method_token.md).|
|reference          |String       |Custom defined value passed in as the reference for the authorization.|
|sale_id            |String       |The Pay Theory unique identifier assigned to the sale that the authorization belongs to. Sales can be used to tie together multiple auths and captures.|
|status             |AuthorizationStatus!|The status of the authorization.  It can be one of the following: `CANCELLED`, `FAILED`, `SUCCEEDED`|
|timezone           |String       |The timezone of the authorization.|
|updated_row_at     |AWSDateTime  |The date and time the authorization was last updated.|

***
## Query Authorizations

```graphql
{
    authorizations(direction: FORWARD, limit: 10, offset: "", offset_id: "", query: QueryObject) {
        items {
            account_code
            amount
            authorization_date
            authorization_id
            currency
            device_id
            expiration_date
            failure_reasons
            fee_mode
            fees
            invoice {
                invoice_id
            }
            merchant_uid
            metadata(query_list: [])
            payment_method(query_list: []) {
                payment_method_id
                payor(query_list: []) {
                    payor_id
                }
            }
            reference
            sale_id
            status
            timezone
            updated_row_at
        }
        total_row_count
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|limit              |Int          |The number of authorizations to return.|
|direction          |String       |The direction of the pagination. Makes sure the results are returned in the correct order.|
|offset             |String       |The value of the offset item for which the list is being sorted.  If the direction is `FORWARD`, the offset item is the last item in the previous list.  If the direction is `BACKWARD`, the offset is the first item in the previous list.|
|offset_id          |String       |The `authorization_id` of the offset item. If the direction is `FORWARD`, the offset item is the last item in the list. If the direction is `BACKWARD`, the offset is the first item in the list.|
|query              |QueryObject  |The query to filter the authorizations with based on Pay Theory defined data.  Detailed information about the query object can be found [here](query).|


**Nested Queries**  
Authorizations can also be filtered by passing a query_list to the metadata, payment method, or payor tied to the payment method.  

This will only return Authorizations that have Metadata, Payment Methods, or Payors that match these queries.  Detailed information about the query list can be found [here](query).

***
## Create Authorization

```graphql
mutation {
  createAuthorization( account_code: "", 
                       amount: 10, 
                       fee: 10, 
                       fee_mode: INTERCHANGE, 
                       health_expense_type: CLINICAL, 
                       invoice_id: "", 
                       merchant_uid: "", 
                       metadata: "false", 
                       payment_method: {}, 
                       payment_method_id: "", 
                       reference: "", 
                       sale_id: "") {
      authorization_id
      ...
  }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|account_code       |String       |Custom defined value passed in as the account code for the authorization.|
|amount             |Int!         |The amount of the authorization in cents.|
|fee                |Int          |The amount of the service fee in cents.|
|fee_mode           |FeeMode!     |The fee mode for the authorization.  It can be one of the following: `SERVICE_FEE`, `MERCHANT_FEE`|
|health_expense_type|HealthExpenseType|The health expense type for the authorization.  It can be one of the following: `CLINICAL`, `COPAY`, `DENTAL`, `HEALTHCARE`, `RX`, `TRANSIT`, `VISION`|
|invoice_id         |String       |The Pay Theory unique identifier assigned to the invoice that the authorization belongs to.|
|merchant_uid       |String!      |The Pay Theory unique identifier assigned to the merchant that the authorization belongs to.|
|metadata           |AWSJSON      |Any additional data that should be stored with the authorization.|
|payment_method     |PaymentMethodInput|The payment method input object for the payment method that will be used for the authorization.  More information on the payment method input object can be found [here](payment_method_token.md#payment-method-input-object).|
|payment_method_id  |String       |The Pay Theory unique identifier assigned to the payment method that will be used for the authorization.|
|reference          |String       |Custom defined value passed in as the reference for the authorization.|
|sale_id            |String       |The Pay Theory unique identifier assigned to the sale that the authorization belongs to. Sales can be used to tie together multiple auths and captures.|


**Returns**

The authorization object.  Refer to the [Authorization Object](#the-authorization-object) for more info.

***
## Capture Authorization

```graphql
mutation {
    createCapture( allow_exceeded_amount: false, 
                   allow_reauth: false, 
                   amount: 10, 
                   authorization_id: "", 
                   merchant_uid: "", 
                   receipt_description: "", 
                   send_receipt: false) {
        transaction_id
        ...
    }
}

```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|allow_exceeded_amount|Boolean    |Whether to allow the capture to exceed the amount of the authorization.  <br/><br/>If this is set to `true` Pay Theory will release the hold on the current auth and create a new auth for the amount of the capture.  <br/><br/>If this is set to `false` or left blank, the capture will fail if the amount is greater than the amount of the authorization.|
|allow_reauth       |Boolean      |Whether to allow the capture to be reauthorized in the case that it is expired.  <br/><br/>If this is set to `true` Pay Theory will reauthorize the capture if it is expired.  <br/><br/>If this is set to `false` or left blank, the capture will fail if it is expired.|
|amount             |Int!         |The amount of the capture in cents.|
|authorization_id   |String!      |The Pay Theory unique identifier assigned to the authorization that you are looking to capture.|
|merchant_uid       |String!      |The Pay Theory unique identifier assigned to the merchant that the authorization belongs to.|
|receipt_description|String       |A custom description that will be displayed on the receipt.|
|send_receipt       |Boolean      |Can be set to `true` to send a receipt to the payor.|


**Returns**

The transaction object.  Refer to the [Transaction Object](transaction.md) for more info.

***
## Void Authorization

This will void an authorization that has not been captured.  If the authorization has been captured, this call will fail. 

*Partial voids are not supported by all processors and cannot be processed on an Amex authorization.  Please contact Pay Theory for more information.*

```graphql
mutation {
    createVoidForAuthorization(authorization_id: String!, void_amount: Int!)
}
```

**Parameters**

|Key                |type         | description                                                                                  |
|-------------------|-------------|----------------------------------------------------------------------------------------------|     
|authorization_id   |String!      | The Pay Theory unique identifier assigned to the authorization that you are looking to void. |
|void_amount        |Int!         | The amount of the void in cents. <br/><br/>   *Partial voids are not supported by all processors and cannot be processed on an Amex authorization.  Please contact Pay Theory for more information.*                                               |

**Returns**  
This call returns a boolean indicating if the void was successful.
