---
sidebar_position: 14
sidebar_label: 'Payment Links'
title: ""
---

# Payment Links

Payment links are a used to create a checkout page without having to write any code. You can create a payment link and send it to your customers to pay for your products or services.

***
## The Payment Link Object
```graphql
{
    accepted_payment_methods: AcceptedPaymentMethodsEnum
    account_code: String
    amount: Int
    amount_is_variable: Boolean
    call_to_action: CallToActionType
    created_date: AWSDateTime
    currency: String
    custom_success_message: String
    fee_mode: FeeMode
    is_active: Boolean
    link_id: String
    link_name: String
    link_url: String
    max_amount: Int
    merchant_uid: String
    min_amount: Int
    payment_name: String
    payment_description: String
    redirect_url: String
    require_phone: Boolean
}
```
|Key                | type                                                      |       description                     |
|-------------------|-----------------------------------------------------------|---------------------------------------|     
|accepted_payment_methods| [AcceptedPaymentMethodsEnum](#acceptedpaymentmethodsenum) |The payment methods that will be available to a payor when making a payment.|
|account_code       | String                                                    |Account Code that will be passed in to every transaction made with this payment link.|
|amount             | Int                                                       |The amount of the payment that the payor will be asked to pay or if `amount_is_variable` is set to the amount that will be the default amount.|
|amount_is_variable | Boolean                                                   |If set to `true` the payor will be able to enter the amount they want to pay.|
|call_to_action     | [CallToActionType](#calltoactiontype)                     |The call to action that will be displayed on the button at the time of checkout.|
|created_date       | AWSDateTime                                               |The date and time the payment link was created.|
|currency           | String                                                    |The type of currency for the payment.|
|custom_success_message| String                                                    |The message that will be displayed to the payor after a successful payment.|
|fee_mode           | FeeMode                                                   |The fee mode of the payments that will be made with the payment link.|
|is_active          | Boolean                                                   |If set to `true` the payment link will be active and available to payors. If set to `false` the payment link will not be available to payors.|
|link_id            | String                                                    |The unique id of the payment link.|
|link_name          | String                                                    |The name you give to the payment link for internal tracking purposes.|
|link_url           | String                                                    |The url of the payment link.|
|max_amount         | Int                                                       |The maximum amount the payor can pay if `amount_is_variable` is set to `true`.|
|merchant_uid       | String                                                    |The Pay Theory unique identifier assigned to the merchant that the transaction belongs to.|
|min_amount         | Int                                                       |The minimum amount the payor can pay if `amount_is_variable` is set to `true`.|
|payment_name       | String                                                    |The name of the payment that will be displayed to the customer. This will be passed in as the `reference` at the time of the transaction.|
|payment_description| String                                                    |The description of the payment that will be displayed to the customer.|
|redirect_url       | String                                                    |The url that the payor will be redirected to after a successful payment.|
|require_phone      | Boolean                                                   |If set to `true` the payor will be required to enter their phone number before making the payment.|

***
## AcceptedPaymentMethodsEnum
The payment methods that will be available to a payor when making a payment.
* `ALL`
* `NOT_CASH`
* `NOT_CARD`
* `NOT_ACH`
* `ONLY_CASH`
* `ONLY_CARD`
* `ONLY_ACH`

***
## CallToActionType
The call to action that will be displayed on the button at the time of checkout.
* `PAY`
* `DONATE`
* `BOOK`

***
## Query Payment Links
```js
{
    paymentLinks(direction: FORWARD, limit: 10, offset: "", offset_id: "", query: QueryObject) {
        total_row_count
        items {
            merchant_uid
            link_id
            link_url
            link_name
            payment_name
            payment_description
            amount
            currency
            fee_mode
            amount_is_variable
            min_amount
            max_amount
            require_phone
            call_to_action
            accepted_payment_methods
            account_code
            custom_success_message
            redirect_url
            is_active
            created_date
        }
    }
}
```
**Parameters**
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|limit              |Int          |The number of payment links to return.|
|direction          |MoveDirection|The direction of the pagination. Makes sure the results are returned in the correct order.|
|offset             |String       |The value of the offset item for which the list is being sorted.|
|offset_id          |String       |The `link_id` of the offset item.|
|query              |QueryObject  |The query to filter the payment links with based on Pay Theory defined data. Detailed information about the query object can be found [here](query)|


**Returns**

```js
{
    "data": {
        "paymentLinks": {
            "items": [
                {
                    "link_id": "pt_link_XXXXX",
                    ...
                },
                {
                    "link_id": "pt_link_XXXXX",
                    ...
                },
                ...
            ],
                "total_row_count": 256
        }
    }
}
```
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|items              |[PaymentLink] |The list of payment links that are returned from the query.|
|total_row_count    |Int          |The total number of payment links that match the query. Used to help with pagination.|

***
## Create a Payment Link

```js
mutation {
    createPaymentLink(input: {
        accepted_payment_methods: AcceptedPaymentMethodsEnum,
            account_code: String,
            amount: Int,
            amount_is_variable: Boolean,
            call_to_action: CallToActionType,
            currency: String,
            custom_success_message: String,
            fee_mode: FeeMode,
            link_name: String,
            max_amount: Int,
            merchant_uid: String,
            min_amount: Int,
            payment_description: String,
            payment_name: String,
            redirect_url: String,
            require_phone: Boolean
    }) {
        accepted_payment_methods
        account_code
        amount
        amount_is_variable
        call_to_action
        created_date
        currency
        custom_success_message
        fee_mode
        link_id
        is_active
        link_name
        link_url
        max_amount
        merchant_uid
        min_amount
        payment_description
        payment_name
        redirect_url
        require_phone
    }
}
```

**Parameters**
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|input              |PaymentLinkInput|This object contains all the details needed to create a payment link.|

**PaymentLinkInput**
|Key                | type                                                      | description                                                                                                                                    |
|-------------------|-----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|     
|accepted_payment_methods| [AcceptedPaymentMethodsEnum](#acceptedpaymentmethodsenum) | The payment methods that will be available to a payor when making a payment.                                                                   |
|account_code       | String                                                    | Account Code that will be passed in to every transaction made with this payment link.                                                          |
|amount             | Int!                                                       | The amount of the payment that the payor will be asked to pay or if `amount_is_variable` is set to the amount that will be the default amount. |
|amount_is_variable | Boolean                                                   | If set to `true` the payor will be able to enter the amount they want to pay.                                                                  |
|call_to_action     | [CallToActionType](#calltoactiontype)                     | The call to action that will be displayed on the button at the time of checkout.                                                               |
|currency           | String                                                    | The currency of the payment.                                                                                                                   |    
|custom_success_message| String                                                    | The message that will be displayed to the payor after they have successfully paid.                                                             |
|fee_mode           | FeeMode                                                   | The fee mode of the payments that will be made with the payment link.                                                                          |
|link_name          | String!                                                    | The name you give to the payment link for internal tracking purposes.                                                                          |
|max_amount         | Int                                                       | The maximum amount the payor can pay if `amount_is_variable` is set to `true`.                                                                 |
|merchant_uid       | String!                                                    | The merchant uid of the merchant that will be creating the payment link.                                                                       |
|min_amount         | Int                                                       | The minimum amount the payor can pay if `amount_is_variable` is set to `true`.                                                                 |
|payment_description| String                                                    | The description of the payment that will be displayed to the customer.                                                                         |
|payment_name       | String!                                                    | The name of the payment that will be displayed to the customer. This will be passed in as the `reference` at the time of the transaction.      |
|redirect_url       | String                                                    | The url that the payor will be redirected to after they have successfully paid.                                                                |
|require_phone      | Boolean                                                   | If set to `true` the payor will be required to enter their phone number before making the payment.                                             |



**Returns**

```js
{
    "data": {
        "createPaymentLink": {
        ... // Payment Link Object
        }
    }
}
```

***
## Update a Payment Link

```js
mutation {
    updatePaymentLink(input: {
        accepted_payment_methods: AcceptedPaymentMethodsEnum,
            account_code: String,
            amount: Int,
            amount_is_variable: Boolean,
            call_to_action: CallToActionType,
            currency: String,
            custom_success_message: String,
            fee_mode: FeeMode,
            link_id: String,
            link_name: String,
            max_amount: Int,
            merchant_uid: String,
            min_amount: Int,
            payment_description: String,
            payment_name: String,
            redirect_url: String,
            require_phone: Boolean
    }) {
        accepted_payment_methods
        account_code
        amount
        amount_is_variable
        call_to_action
        created_date
        currency
        custom_success_message
        fee_mode
        link_id
        is_active
        link_name
        link_url
        max_amount
        merchant_uid
        min_amount
        payment_description
        payment_name
        redirect_url
        require_phone
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|input              |UpdatePaymentLinkInput|This object contains all the details needed to update a payment link.|

**UpdatePaymentLinkInput**

|Key                | type                                                      |       description                     |
|-------------------|-----------------------------------------------------------|---------------------------------------|     
|accepted_payment_methods| [AcceptedPaymentMethodsEnum](#acceptedpaymentmethodsenum) |The payment methods that will be available to a payor when making a payment.|
|account_code       | String                                                    |Account Code that will be passed in to every transaction made with this payment link.|
|amount             | Int                                                       |The amount of the payment that the payor will be asked to pay or if `amount_is_variable` is set to the amount that will be the default amount.|
|amount_is_variable | Boolean                                                   |If set to `true` the payor will be able to enter the amount they want to pay.|
|call_to_action     | [CallToActionType](#calltoactiontype)                     |The call to action that will be displayed on the button at the time of checkout.|
|currency           | String                                                    |The currency of the payment.|
|custom_success_message| String                                                    |The message that will be displayed to the payor after they have successfully paid.|
|fee_mode           | FeeMode                                                   |The fee mode of the payments that will be made with the payment link.|
|link_id            | String!                                                   |The id of the payment link that will be updated.|
|link_name          | String                                                    |The name you give to the payment link for internal tracking purposes.|
|max_amount         | Int                                                       |The maximum amount the payor can pay if `amount_is_variable` is set to `true`.|
|merchant_uid       | String!                                                   |The merchant uid of the merchant that will be creating the payment link.|
|min_amount         | Int                                                       |The minimum amount the payor can pay if `amount_is_variable` is set to `true`.|
|payment_description| String                                                    |The description of the payment that will be displayed to the customer.|
|payment_name       | String                                                    |The name of the payment that will be displayed to the customer. This will be passed in as the `reference` at the time of the transaction.|
|redirect_url       | String                                                    |The url that the payor will be redirected to after they have successfully paid.|
|require_phone      | Boolean                                                   |If set to `true` the payor will be required to enter their phone number before making the payment.|

**Returns**

```js
{
    "data": {
        "updatePaymentLink": {
        ... // Payment Link Object
        }
    }
}
```