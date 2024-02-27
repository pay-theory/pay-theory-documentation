---
sidebar_position: 12
sidebar_label: 'Recurring'
title: ""
---

# Recurring Payment

A recurring payment represents a payment that will trigger on an interval.

You can create a recurring payment with a set number of payments to enable a payment plan for a payor.

You can also create a recurring payment with no set payment amounts to enable a subscription for a payor.

***
## The Recurring Payment Object

```graphql
{
    account_code: String
    amount_per_payment: Int
    created_date: AWSDateTime
    currency: String
    fee_mode: FeeMode
    fee_per_payment: Int
    is_active: Boolean
    is_processing: Boolean
    recurring_id: String
    merchant_uid: String
    metadata: AWSJSON
    mute_all_emails: Boolean
    next_payment_date: AWSDate
    payment_interval: RecurringInterval
    payment_method: PaymentMethodToken
    payor: Payor
    prev_payment_date: AWSDate
    recurring_description: String
    recurring_name: String
    reference: String
    remaining_payments: Int
    status: RecurringStatus
    total_amount_per_payment: Int
}
```

|Key                | type                                     |       description                     |
|-------------------|------------------------------------------|---------------------------------------|     
|account_code       | String                                   |Custom account code for the recurring payment that will be tied to each payment.|
|amount_per_payment| Int                                      |The amount of the recurring payment.|
|created_date       | DateTime                                 |The date the recurring payment was created.|
|currency           | String                                   |The type of currency for the recurring payment.|
|fee_mode           | FeeMode                                  |The fee mode for the recurring payment.|
|fee_per_payment    | Int                                      |The fee for the recurring payment.|
|is_active          | Boolean                                  |Whether the recurring payment is active or been disabled.|
|is_processing      | Boolean                                  |Whether the recurring payment is currently processing.|
|merchant_uid       | String                                   |The Pay Theory unique identifier assigned to the merchant that the recurring payment belongs to.|
|metadata           | JSON                                     |Custom metadata for the recurring payment that will be tied to each payment.|
|mute_all_emails    | Boolean                                  |Manage whether the payor will receive emails for the recurring payment from Pay Theory.|
|next_payment_date  | DateTime                                 |The date of the next payment to be made for the recurring payment.|
|payment_interval   | [RecurringInterval](#recurring-interval) |The interval of the recurring payment.|
|payment_method     | PaymentMethodToken                       |The payment method used to make the recurring payment.|
|payor              | Payor                                    |The payor that the recurring payment belongs to.|
|prev_payment_date  | DateTime                                 |The date of the last payment made for the recurring payment.|
|recurring_description| String                                   |Custom description for the recurring payment.|
|recurring_id       | String                                   |The Pay Theory unique identifier assigned to the recurring payment.|
|recurring_name     | String                                   |Custom name for the recurring payment.|
|reference          | String                                   |Custom reference for the recurring payment that will be tied to each payment.|
|remaining_payments | Int                                      |The number of payments remaining for the recurring payment.|
|status             | [RecurringStatus](#recurring-status)     |The status of the recurring payment.|
|total_amount_per_payment| Int                                      |The amount the payor will be charged for the recurring payment.|

***
## Recurring Interval

The interval of the recurring payment. The following intervals are available:

- `WEEKLY`
- `BI_WEEKLY`
- `MONTHLY`
- `QUARTERLY`
- `BI_ANNUAL`
- `ANNUAL`

***
## Recurring Status

The status of the recurring payment. The following statuses are available:

- `SYSTEM_FAILURE` 
  - The recurring payment failed due to a system error. Will retry automatically till system issue resolved.
- `INSTRUMENT_FAILURE`
  - The recurring payment failed due to a payment method error. Will not retry until payment method is updated.
- `SUCCESS`
  - The last payment was successful.

***
## Get Recurring Payments

```graphql
{
    recurringPayments(direction: MoveDirection, limit: Int, offset: String, offset_id: String, query: QueryObject) {
        items {
            account_code
            amount_per_payment
            created_date
            currency
            fee_mode
            fee_per_payment
            is_active
            is_processing
            merchant_uid
            metadata(query_list: $metadata_query)
            mute_all_emails
            next_payment_date
            payment_interval
            payment_method(query_list: $payment_method_query)) {
            ...payment_method_object
            }
            prev_payment_date
            payor(query_list: $payor_query) {
            ...payor_object
            }
            recurring_description
            recurring_id
            recurring_name
            reference
            remaining_payments
            status
            total_amount_per_payment
        }
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|direction          |MoveDirection|The direction of the pagination. Makes sure the results are returned in the correct order.|
|limit              |Int          |The number of recurring payments to return.|
|offset             |String       |The value of the offset item for which the list is being sorted.|
|offset_id          |String       |The `recurring_id` of the offset item.|
|query              |QueryObject  |The query to filter the recurring payments with based on Pay Theory defined data. Detailed information about the query object can be found [here](query).|


**Nested Queries**  
Recurring Payments can also be filtered by passing a query_list to the metadata, payment method, or payor.

This will only return Recurring Payments that have Metadata, Payment Methods, or Payors that match these queries.  Detailed information about the query list can be found [here](query).


**Returns**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|items              |[RecurringPayment] |The list of recurring payments that are returned from the query.|
|total_row_count    |Int          |The total number of recurring payments that match the query. Used to help with pagination.|

***
## Create Recurring Payment

```graphql
mutation {
    createRecurringPayment(input: {
            account_code: String,
            amount: Int,
            currency: String,
            fee_mode: FEE_MODE,
            first_payment_date: Date,
            merchant_uid: String,
            metadata: JSON,
            payment_count: Int,
            payment_interval: PAYMENT_INTERVAL,
            payment_method_id: String,
            payor_id: String,
            payor: Payor,
            recurring_description: String,
            recurring_name: String,
            reference: String,
            mute_all_emails: Boolean
    }) {
        account_code
        ...recuring_payment_object
    }
}
```

**Parameters**
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|
|input              |RecurringPaymentInput|The input object that contains the details to create a new recurring payment.|

**RecurringPaymentInput**

| Key                   | type                                      | description                                                                                              |
|-----------------------|-------------------------------------------|----------------------------------------------------------------------------------------------------------|     
| account_code          | String                                    | Custom account code for the recurring payment that will be tied to each payment.                         |
| amount                | Int!                                      | The amount of the recurring payment.                                                                     |
| currency              | String                                    | The type of currency for the recurring payment.                                                          |
| fee_mode              | FeeMode                                   | The fee mode for the recurring payment.                                                                  |
| first_payment_date    | Date                                      | The date of the first payment. If not provided, the first payment will be made immediately.              |
| merchant_uid          | String!                                   | The `merchant_uid` of the merchant that the recurring payment belongs to.                                |
| metadata              | JSON                                      | Custom metadata for the recurring payment that will be tied to each payment.                             |
| payment_count         | Int                                       | The number of payments to be made. If not provided, the recurring payment will continue until cancelled. |
| payment_interval      | [RecurringInterval!](#recurring-interval) | The interval of the recurring payment.                                                                   |
| payment_method_id     | String!                                   | The `payment_method_id` of the tokenized payment method that will be used for the recurring payment.     |
| payor_id              | String                                    | The `payor_id` of the payor that the recurring payment will be tied to.                                  |
| payor                 | Payor                                     | The payor object that the recurring payment will be tied to.                                             |
| recurring_description | String                                    | Custom description for the recurring payment that will be tied to each payment.                          |
| recurring_name        | String!                                   | Custom name for the recurring payment.                                                                   |
| reference             | String                                    | Custom reference for the recurring payment that will be tied to each payment.                            |
| mute_all_emails       | Boolean                                   | Manage whether the payor will receive emails for the recurring payment from Pay Theory.                  |


**Returns**

The call will return the newly created recurring payment.

***
## Update Recurring Payment

```graphql
mutation {
    updateRecurringPayment( 
      input: {
        payment_method_id: String,
        recurring_id: String,
        pay_all_missed_payments: Boolean
        mute_all_emails: Boolean
    }) {
        ... recurring_payment_object
    }
}
```

**Parameters**

|Key               | type                        | description                                                                 |
|------------------|-----------------------------|-----------------------------------------------------------------------------|     
|input             | UpdateRecurringPaymentInput | The input object that contains the details to update the recurring payment. |


**UpdateRecurringPaymentInput**

| Key                     | type    |       description                     |
|-------------------------|---------|---------------------------------------|     
| payment_method_id       | String  |The `payment_method_id` of the tokenized payment method that will be used for the recurring payment.|
| recurring_id            | String! |The `recurring_id` of the recurring payment to be updated.|
| pay_all_missed_payments | Boolean |If the recurring payment has a set number of payments &#40;Payment Plan&#41; and is in a Failed state, this will make a one time charge to account for all missed payments to get it back in to a Successful state.|
| mute_all_emails         | Boolean |If set to `true`, no emails will be sent to the payor for this recurring payment.|

**Returns**

The call will return the updated recurring payment object.

***
## Cancel Recurring Payment

*Once a recurring payment is cancelled, it cannot be reactivated.*

```graphql
mutation {
    cancelRecurringPayment(recurring_id: String)
}
```

**Parameters**

|Key                |type         | description                                                   |
|-------------------|-------------|---------------------------------------------------------------|     
|recurring_id       |String       | The `recurring_id` of the recurring payment to be cancelled.  |

**Returns**

The call will return `true` if the recurring payment was successfully cancelled.

***
## Get Missed Recurring Payment Data

This call will return details you need to display the proper amount to the customer to catch up on missed payments for a recurring payment.

```graphql
{
    missedRecurringPaymentData(recurring_id: String) {
        fee
        number_of_payments_missed
        total_amount_owed
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|recurring_id       |String       |The `recurring_id` of the recurring payment to get missed payment data for.|

**Returns**

| Key                       |type         | description                                                                                                                                                                                                                                          |
|---------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|     
| fee                       |Int          | If the recurring payment has fee_mode set to `SERVICE_FEE`, this will be the total amount of fees that will be charged to the customer to payoff the missed payments.  <br/><br/> If the recurring payment has fee_mode set to `MERCHANT_FEE`, this will be 0. |
| number_of_payments_missed |Int          | The number of payments that have been missed.                                                                                                                                                                                                        |
| total_amount_owed         |Int          | The total amount that the customer will owe to payoff the missed payments.                                                                                                                                                                           |

***
## Create Retry for Failed Recurring Payment

This call will allow you to retry a payment for a recurring payment that is in a Failed state.  
This should be used when the state is `INSTRUMENT_FAILURE` and the issue with the payment method has been addressed.  
*EX: Payment failed for insufficient funds on the card, but the customer has since made a payment on the balance to resolve the issue.*

```graphql
mutation {
    createRetryForFailedRecurringPayment(recurring_id: "")
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|recurring_id       |String       |The `recurring_id` of the recurring payment to be retried.|

**Returns**

The call will return `true` if the retry was successfully created.
