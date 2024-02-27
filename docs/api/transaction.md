---
sidebar_position: 3
sidebar_label: 'Transaction'
title: ""
---

# Transaction

Transactions are a data object that can represent a payment, failed or successful, or a refund.

***
## The Transaction Object

```js
{
  account_code: String
  ach_return_details: AchReturnDetails
  currency: String
  dispute_status: DisputeStatus
  failure_reasons: [String]
  fee_mode: FeeMode
  fees: Int
  invoice: Invoice
  is_settled: Boolean
  gross_amount: Int
  merchant_uid: String
  metadata: AWSJSON
  net_amount: Int
  parent_id: String
  payment_method: PaymentMethodToken
  recurring: RecurringPayment
  reference: String
  refund_reason: RefundReason
  refund_voidable: Boolean
  refunded_amount: Int
  settlement_batch: Int
  status: TransactionStatus
  timezone: String
  transaction_date: AWSDateTime
  transaction_id: String
  transaction_type: TransactionType
  updated_row_at: AWSDateTime
}
```

|Key                | type                                                                       |       description                     |
|-------------------|----------------------------------------------------------------------------|---------------------------------------|     
|account_code       | String                                                                     |Customer defined account code for the transaction.|
|ach_return_details | AchReturnDetails                                                           |The details of the ACH return if any.|
|currency           | String                                                                     |The type of currency for the transaction.|
|dispute_status     | [DisputeStatus](dispute#dispute-status)                                    |The status of the dispute if any.|
|failure_reasons    | [String]                                                                   |List of strings, if any, detailing the reason a transaction failed.|
|fee_mode           | FeeMode                                                                    |The fee mode on the transaction.|
|fees               | Int                                                                        |The amount of the fees charged for the transaction.|
|invoice            | [Invoice](invoice#the-invoice-object)                                      |The invoice object for the transaction if any.|
|is_settled         | Boolean                                                                    |Whether the transaction has been settled.|
|gross_amount       | Int                                                                        |The total amount of the transaction.|
|merchant_uid       | String                                                                     |The Pay Theory unique identifier for the merchant the transaction is for.|
|metadata           | AWSJSON                                                                    |Custom defined JSON object to be stored with the transaction.|
|net_amount         | Int                                                                        |The total amount of the transaction after fees.|
|parent_id          | String                                                                     |The Pay Theory unique identifier for the parent transaction if any.|
|payment_method     | [PaymentMethodToken](payment_method_token#the-payment-method-token-object) |The payment method used to make the transaction.|
|recurring          | [RecurringPayment](recurring#the-recurring-payment-object)                 |The recurring payment that the transaction belongs to if any.|
|reference          | String                                                                     |Customer defined reference for the transaction.|
|refund_reason      | RefundReason                                                               |The reason for the refund if any.|
|refund_voidable    | Boolean                                                                    |Whether the refund can be voided.|
|refunded_amount    | Int                                                                        |The amount of the transaction that has been refunded if any.|
|settlement_batch   | Int                                                                        |The unique settlement batch number the transaction belongs to if settled.|
|status             | [TransactionStatus](#transaction-status)                                   |The status of the transaction.|
|timezone           | String                                                                     |The timezone the transaction was made in.|
|transaction_date   | AWSDateTime                                                                |The date the transaction was made.|
|transaction_id     | String                                                                     |The Pay Theory unique identifier for the transaction.|
|transaction_type   | [TransactionType](#transaction-type)                                       |The type of transfer that was made.|
|updated_row_at     | AWSDateTime                                                                |The date and time the transaction was last updated.|

***
## Ach Return Details

```graphql
{
  return_code: String
  return_details: String
  transfer_type: AchReturnTransferType
}
```

|Key                | type                           | description                                                                          |
|-------------------|--------------------------------|--------------------------------------------------------------------------------------|
|return_code        | String                         |The return code for the ACH return.                                                   |
|return_details     | String                         |The details of the ACH return.                                                        |
|transfer_type      | [AchReturnTransferType](#ach-return-transfer-type) |The type of transfer that the ACH return is for.|

***
## Ach Return Transfer Type

- `DEBIT` - The ACH return is going to debit the merchant funds.
- `CREDIT` - The ACH return is going to credit the merchant funds.

***
## Refund Reason

```graphql
{
    reason_code: RefundReasonCode
    reason_details: String
}
```

|Key                | type                           | description                                                                          |
|-------------------|--------------------------------|--------------------------------------------------------------------------------------|
|reason_code        | [RefundReasonCode](#refund-reason-code) |The reason code for the refund.|
|reason_details     | String                         |The details of the refund reason.|

***
## Refund Reason Code
    
- `DUPLICATE`
- `FRAUDULENT`
- `OTHER`
- `REQUESTED_BY_CUSTOMER`


***
## Transaction Status

- `PENDING` - The transaction is pending capture. For a sale this automatically changes to `SUCCEEDED` typically within the hour. For an auth that has been set to capture, this will change to `SUCCEEDED` when the settlement batch is created.
- `SUCCEEDED` - The transaction has been captured.
- `FAILED` - The transaction failed to authorize.
- `SETTLED` - The transaction has been settled.
- `REFUNDED` - The transaction has been refunded.
- `PARTIALLY_REFUNDED` - The transaction has been refunded for a portion of the amount.
- `VOIDED` - The transaction has been voided which means it was never captured and will not be settled.
- `RETURNED` - The transaction is an ACH transaction that has had an `ACH_RETURN` created for it.

***
## Transaction Type

- `ACH_RETURN` - The transaction is an ACH return for an ACH Debit or Reversal. Check `parent_id` to find origin.
- `DEBIT` - The transaction is a debit to a payors payment method.
- `FAILURE` - The transaction is a failed debit to a payors payment method.
- `REVERSAL` - The transaction is a reversal on a debit to a payors payment method. Check `parent_id` to find origin.

***
## Query Transactions
```graphql
{
  transactions(direction: FORWARD, limit: 10, offset: "", offset_id: "", query: QueryObject) {
    items {
      account_code
      currency
      dispute_status
      failure_reasons
      fee_mode
      fees
      gross_amount
      is_settled
      merchant_uid
      metadata(query_list: [])
      net_amount
      parent_id
      payment_method(query_list: []) {
        payment_method_id
        payor(query_list: []) {
            payor_id
        }
      }
      recurring {
        recurring_id
      }
      reference
      refund_reason {
        reason_code
        reason_details
        transfer_type
      }
      refunded_amount
      settlement_batch
      status
      timezone
      transaction_date
      transaction_id
      transaction_type
    }
    total_row_count
  }
}
```

**Arguments**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|direction          |MoveDirection|The direction of the pagination. Makes sure the results are returned in the correct order.|
|limit              |Int          |The number of transactions to return.|
|offset             |String       |The value of the offset item for which the list is being sorted.|
|offset_id          |String       |The `transaction_id` of the offset item.|
|query              |QueryObject  |The query to filter the transactions with based on Pay Theory defined data. Detailed information about the query object can be found [here](query).|

**Nested Queries**  
Transactions can also be filtered by passing a query_list to the metadata, payment method, or payor tied to the payment method.

This will only return Transactions that have Metadata, Payment Methods, or Payors that match these queries.  Detailed information about the query list can be found [here](query).


**Returns**

```js
{
    "data": {
        "transactions": {
            "items": [
                {
                    "transaction_id": "pt-start-paytheorylab-rbdg98004adg"
                },
                {
                    "transaction_id": "pt-start-paytheorylab-rbdgaf004adh"
                },
              ...
            ],
            "total_row_count": 256
        }
    }
}
```

|Key                | type          | description                                                                          |
|-------------------|---------------|--------------------------------------------------------------------------------------|     
|items              | [Transaction] | The list of transactions that are returned from the query.                           |
|total_row_count    | Int           | The total number of transactions that match the query. Used to help with pagination. |

***
## Create One Time Payment

```graphql
mutation {
  createOneTimePayment(amount: Int, 
          merchant_uid: String, 
          payment_method_id: String, 
          payment_method: PaymentMethodInput,
          account_code: String, 
          currency: String, 
          fee: Int, 
          fee_mode: FeeMode,
          invoice_id: String, 
          metadata: JSON, 
          receipt_description: String, 
          recurring_id: String, 
          reference: String, 
          send_receipt: Boolean) {
    amount
    card_brand
    created_at
    currency
    last_four
    service_fee
    status
    transaction_id
  }
}
```

**Arguments**

| Key                 | type                   | description                                                                                                                                                                                                                   |
|---------------------|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|     
| amount              | Int!                   | The amount of the transaction. If the FeeMode is `SERVICE_FEE`, this is the amount of the transaction before fees.                                                                                                            |
| merchant_uid        | String!                | The Pay Theory unique identifier for the merchant the transaction is for.                                                                                                                                                     |
| payment_method_id   | String                 | The Pay Theory unique identifier for the payment method the transaction will be charged to.                                                                                                                                   |
| payment_method      | [PaymentMethodInput](payment_method_token.md#payment-method-input-object) | The payment method to be used for the transaction. This is required if you are not passing in a `payment_method_id`. |
| account_code        | String                 | Customer defined account code for the transaction.                                                                                                                                                                            |
| currency            | String                 | The type of currency for the transaction. Defaults to `USD`.                                                                                                                                                                  |
| fee                 | Int                    | The amount of the fee that will be charged to the payor for the transaction if the FeeMode is `SERVICE_FEE`.                                                                                                                  |
| fee_mode            | FeeMode                | The fee mode on the transaction. `SERVICE_FEE` charges the fees to the payor. `MERCHANT_FEE` charges the fees to the merchant. Options are:                                                                                   |
| invoice_id          | String                 | The Pay Theory unique identifier for the invoice the transaction is for.                                                                                                                                                      |
| metadata            | JSON                   | Custom defined JSON object to be stored with the transaction.                                                                                                                                                                 |
| receipt_description | String                 | The description of the transaction that will be displayed on the receipt.                                                                                                                                                     |
| recurring_id        | String                 | The Pay Theory unique identifier for the recurring payment the transaction is for.                                                                                                                                            |
| reference           | String                 | Customer defined reference for the transaction.                                                                                                                                                                               |
| send_receipt        | Boolean                | If the receipt should be sent to the payor. Defaults to `false`. It is sent to the email address on file with the payment method.                                                                                             |


**Returns**

```js
{
    "data": {
        "createOneTimePayment": {
            status: TransactionStatus
            amount: Int
            card_brand: String
            last_four: String
            service_fee: Int
            currency: String
            transaction_id: String
            created_at: DateTime
        }
    }
}
```

|Key                | type                                     | description                                                                |
|-------------------|------------------------------------------|----------------------------------------------------------------------------|     
|status             | [TransactionStatus](#transaction-status) | The status of the transaction.                                             |
|amount             | Int                                      | The amount of the transaction.                                             |
|card_brand         | String                                   | The brand of the card used for the transaction.                            |
|last_four          | String                                   | The last four digits of the card or bank account used for the transaction. |
|service_fee        | Int                                      | The amount of the service fee charged for the transaction.                 |
|currency           | String                                   | The type of currency for the transaction.                                  |
|transaction_id     | String                                   | The Pay Theory unique identifier for the transaction.                      |
|created_at         | DateTime                                 | The date and time the transaction was created.                             |

***
## Create Refund

This call will create a refund for a transaction.

```graphql
mutation {
  createRefund(amount: Int, 
               refund_reason: { reason_code: RefundReasonCode, reason_details: String }, 
               transaction_id: String, 
               refund_email: String )
}
```

**Arguments**

|Key                | type                           |       description                     |
|-------------------|--------------------------------|---------------------------------------|     
|amount             | Int                            |The amount of the refund. This must be less than or equal to the amount of the transaction.|
|refund_reason      | [RefundReason](#refund-reason) |The reason for the refund. This is required for all refunds and is made up of the following.|
|transaction_id     | String                         |The Pay Theory unique identifier for the transaction to refund.|
|refund_email       | String                         |The email address to send the refund receipt to. If not provided an email will not be sent out.|


**Returns**

The call will return a boolean `true` if the refund was created successfully or errors if it fails.

***
## Calculate Service Fee Amount

This call will allow you to calculate what the fee amount should be if using `SERVICE_FEE` for a transaction.

```graphql
{
  serviceFeeAmount(amount: Int, merchant_uid: String) {
    ach {
      adjusted_total
      fee
      total
    }
    card {
      adjusted_total
      fee
      total
    }
  }
}
```

**Arguments**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|amount             |Int          |The amount of the transaction.|
|merchant_uid       |String       |The Pay Theory unique identifier for the merchant the transaction is for.|


**Returns**

```js
{
    "data": {
        "serviceFeeAmount": {
            ach: {
              fee: Int
              total: Int
              adjusted_total: Int
            },
            card: {
              fee: Int
              total: Int
              adjusted_total: Int
            }
        }
    }
}
```

You are returned two objects, one for ACH and one for Card. Each object contains the following fields:

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|fee                |Int          |The amount that the service fee should be based on the amount passed in.|
|total              |Int          |The total amount of the transaction before the service fee. This is what you would want to pass in the `amount` argument for the `createOneTimePayment` call.|
|adjusted_total     |Int          |The total amount of the transaction after the service fee. This is what you would want to show the payor the total amount of the transaction will be.|

***
## Send Transaction Receipt

This call will send a receipt for a transaction to the email address on file with the payor or an email passed in.

```graphql
mutation MyMutation($email: AWSEmail, $receipt_description: String, $transaction_id: String!) {
  createReceiptEmail(transaction_id: $transaction_id, 
                     email: $email,
                     receipt_description: $receipt_description)
}
```

**Arguments**  

| Key                  | type     | description                                                                                                                               |
|----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------|     
| transaction_id       | String!  | The Pay Theory unique identifier for the transaction to send the receipt for.                                                             |
| email                | AWSEmail | The email address to send the receipt to. If not provided the email address on file with the payor will be used.                          |
| receipt_description  | String   | The description of the transaction that will be displayed on the receipt. If not provided it will just say "Payment to `merchant_name`".  |

**Returns**

The call will return a boolean `true` if the receipt was sent successfully or errors if it fails.

