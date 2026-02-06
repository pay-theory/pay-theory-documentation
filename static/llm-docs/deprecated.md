# Deprecated

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### serviceFeeAmount

> Deprecated: Use serviceFee instead.

This call was deprecated in favor of the serviceFee query. The serviceFee query returns a single fee object that contains the fee, total, and adjusted total for the transaction based on the amount and payment method details passed in.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `String!` | Yes | The Pay Theory unique identifier for the merchant the transaction is for. |
| `amount` | `Int!` | Yes | The amount of the transaction. |

**Returns:** `ServiceFeeAmount`

| Field | Type | Description |
| --- | --- | --- |
| `ach` | `ServiceFeeCalculation` | — |
| `card` | `ServiceFeeCalculation` | — |


**ServiceFeeCalculation fields:**

| Field | Type | Description |
| --- | --- | --- |
| `fee_limit_reached` | `Boolean` | The fee limit reached. |
| `fee` | `Int` | The amount that the service fee should be based on the amount passed in. |
| `total` | `Int` | The total amount of the transaction before the service fee. This is what you would want to pass in the amount argument for the createOneTimePayment call. |
| `adjusted_total` | `Int` | The total amount of the transaction after the service fee. This is what you would want to show the payor the total amount of the transaction will be. |

**Example: Example serviceFeeAmount**

This call was deprecated in favor of the serviceFee query. The serviceFee query returns a single fee object that contains the fee, total, and adjusted total for the transaction based on the amount and payment method details passed in.

```graphql
query ServiceFeeAmount($merchant_uid: String!, $amount: Int!) {
  serviceFeeAmount(merchant_uid: $merchant_uid, amount: $amount) {
  ach {
    adjusted_total
    fee
    fee_limit_reached
    total
  }
  card {
    adjusted_total
    fee
    fee_limit_reached
    total
  }
  }
}
```

```json
{
  "data": {
    "serviceFeeAmount": {
      "ach": {
        "adjusted_total": 123,
        "fee": 123,
        "fee_limit_reached": true,
        "total": 123
      },
      "card": {
        "adjusted_total": 123,
        "fee": 123,
        "fee_limit_reached": true,
        "total": 123
      }
    }
  }
}
```


## Mutations

### createOneTimePayment

> Deprecated: Use createTransaction instead.

This call was deprecated in favor of the createTransaction mutation. The createTransaction mutation returns a more detailed response than this call.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `String!` | Yes | The Pay Theory unique identifier for the merchant the transaction is for. |
| `amount` | `Int!` | Yes | The amount of the transaction. If the FeeMode is SERVICE_FEE, this is the amount of the transaction before fees. |
| `payment_method_id` | `String` | No | The Pay Theory unique identifier for the payment method the transaction will be charged to. |
| `payment_method` | `PaymentMethodInput` | No | The payment method to be used for the transaction. This is required if you are not passing in a payment_method_id. |
| `recurring_id` | `String` | No | The Pay Theory unique identifier for the recurring payment the transaction is for. |
| `invoice_id` | `String` | No | The Pay Theory unique identifier for the invoice the transaction is for. |
| `fee` | `Int` | No | The amount of the fee that will be charged to the payor for the transaction if the FeeMode is SERVICE_FEE. |
| `fee_mode` | `FeeMode` | No | The fee mode on the transaction. SERVICE_FEE charges the fees to the payor. MERCHANT_FEE charges the fees to the merchant. Options are: |
| `payment_parameters_name` | `String` | No | — |
| `account_code` | `String` | No | Customer defined account code for the transaction. |
| `reference` | `String` | No | Customer defined reference for the transaction. |
| `send_receipt` | `Boolean` | No | If the receipt should be sent to the payor. Defaults to false. It is sent to the email address on file with the payment method. |
| `receipt_description` | `String` | No | The description of the transaction that will be displayed on the receipt. |
| `metadata` | `AWSJSON` | No | Custom defined JSON object to be stored with the transaction. |
| `health_expense_type` | `HealthExpenseType` | No | The health expense type. |
| `additional_purchase_data` | `AdditionalPurchaseDataInput` | No | The additional purchase data. |

**Returns:** `OneTimePayment`

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Int` | Amount in minor units (for example cents). |
| `card_brand` | `String` | The card brand. |
| `created_at` | `AWSDateTime` | The date and time this was created. |
| `currency` | `String` | Currency code. |
| `failure_reason` | `String` | The failure reason. |
| `last_four` | `String` | The last four. |
| `service_fee` | `Int` | The service fee. |
| `status` | `TransactionStatus` | Status value. |
| `transaction_id` | `String` | Pay Theory unique identifier for the transaction. |


**TransactionStatus values:**

| TransactionStatus Value | Description |
| --- | --- |
| `CANCELED` | The transaction was canceled. |
| `FAILED` | The transaction failed to pass initial checks and authorization was not successful. |
| `PARTIALLY_REFUNDED` | The transaction has been refunded for a portion of the amount. |
| `PENDING` | The transaction is succesfull pending capture. This is what will be returned for all transactions that did not fail. |
| `REFUNDED` | The transaction has been fully refunded. |
| `RETURNED` | The transaction is an ACH transaction that has had an ACH_RETURN created for it. |
| `SETTLED` | The transaction has been added to a settlement batch and will settle to the merchant. |
| `SUCCEEDED` | The transaction has been captured. |
| `VOIDED` | The transaction has been voided which means it was never captured and will not be settled. |

**Example: Example createOneTimePayment**

This call was deprecated in favor of the createTransaction mutation. The createTransaction mutation returns a more detailed response than this call.

```graphql
mutation CreateOneTimePayment($merchant_uid: String!, $amount: Int!, $payment_method_id: String, $payment_method: PaymentMethodInput, $recurring_id: String, $invoice_id: String, $fee: Int, $fee_mode: FeeMode, $payment_parameters_name: String, $account_code: String, $reference: String, $send_receipt: Boolean, $receipt_description: String, $metadata: AWSJSON, $health_expense_type: HealthExpenseType, $additional_purchase_data: AdditionalPurchaseDataInput) {
  createOneTimePayment(merchant_uid: $merchant_uid, amount: $amount, payment_method_id: $payment_method_id, payment_method: $payment_method, recurring_id: $recurring_id, invoice_id: $invoice_id, fee: $fee, fee_mode: $fee_mode, payment_parameters_name: $payment_parameters_name, account_code: $account_code, reference: $reference, send_receipt: $send_receipt, receipt_description: $receipt_description, metadata: $metadata, health_expense_type: $health_expense_type, additional_purchase_data: $additional_purchase_data) {
  transaction_id
  created_at
  amount
  card_brand
  currency
  }
}
```

```json
{
  "data": {
    "createOneTimePayment": {
      "transaction_id": "example",
      "created_at": "2025-01-01T00:00:00Z",
      "amount": 123,
      "card_brand": "example",
      "currency": "example"
    }
  }
}
```


### createRefund

> Deprecated: Use createReversal instead.

This call will create a refund for a transaction.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `transaction_id` | `String!` | Yes | The Pay Theory unique identifier for the transaction to refund. |
| `amount` | `Int!` | Yes | The amount of the refund. This must be less than or equal to the amount of the transaction. |
| `refund_reason` | `RefundReasonInput!` | Yes | The reason for the refund. This is required for all refunds and is made up of the following. |
| `refund_email` | `String` | No | The email address to send the refund receipt to. If not provided an email will not be sent out. |

**Returns:** `Boolean`


**Example: Example createRefund**

This call will create a refund for a transaction.

```graphql
mutation CreateRefund($transaction_id: String!, $amount: Int!, $refund_reason: RefundReasonInput!, $refund_email: String) {
  createRefund(transaction_id: $transaction_id, amount: $amount, refund_reason: $refund_reason, refund_email: $refund_email)
}
```

```json
{
  "data": {
    "createRefund": true
  }
}
```

