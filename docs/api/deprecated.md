---
sidebar_position: 1000
sidebar_label: 'Deprecated'
title: "Deprecated"
---


## Create One Time Payment

This call was deprecated in favor of the [`createTransaction`](transaction.md#create-transaction) mutation.  
The `createTransaction` mutation returns a more detailed response than this call.

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
## Calculate Service Fee Amount

This call was deprecated in favor of the [`serviceFee`](transaction.md#calculate-service-fee) query.  
The `serviceFee` query returns a single fee object that contains the fee, total, and adjusted total for the transaction based on the amount and payment method details passed in.

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
