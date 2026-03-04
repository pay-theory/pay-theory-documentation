# serviceFee

> **Group:** Transaction
> **Operation Type:** QUERY

This call will allow you to calculate what the fee amount should be if using SERVICE_FEE for a transaction.

## GraphQL Signature

```graphql
query serviceFee($merchant_uid: String!, $amount: Int!, $bank_id: String, $payment_type: String, $is_ach: Boolean, $payment_method_id: String) {
  serviceFee(merchant_uid: $merchant_uid, amount: $amount, bank_id: $bank_id, payment_type: $payment_type, is_ach: $is_ach, payment_method_id: $payment_method_id) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `String!` | Yes | The Pay Theory unique identifier for the merchant the transaction is for. |
| `amount` | `Int!` | Yes | The amount of the transaction. |
| `bank_id` | `String` | No | The first 6 to 8 digits of a card number. An error will be thrown if it is any other length. |
| `payment_type` | `String` | No | — |
| `is_ach` | `Boolean` | No | If the transaction is an ACH transaction. |
| `payment_method_id` | `String` | No | The Pay Theory unique identifier for a tokenized payment method to calculate fees for. |

## Return Type

**Returns:** `ServiceFeeCalculation!`

| Field | Type | Description |
| --- | --- | --- |
| `fee_limit_reached` | `Boolean` | The fee limit reached. |
| `fee` | `Int` | The amount that the service fee should be based on the amount passed in. |
| `total` | `Int` | The total amount of the transaction before the service fee. This is what you would want to pass in the amount argument for the createOneTimePayment call. |
| `adjusted_total` | `Int` | The total amount of the transaction after the service fee. This is what you would want to show the payor the total amount of the transaction will be. |

## Examples

### Example serviceFee

This call will allow you to calculate what the fee amount should be if using SERVICE_FEE for a transaction.

**Query:**

```graphql
query ServiceFee($merchant_uid: String!, $amount: Int!, $bank_id: String, $payment_type: String, $is_ach: Boolean, $payment_method_id: String) {
  serviceFee(merchant_uid: $merchant_uid, amount: $amount, bank_id: $bank_id, payment_type: $payment_type, is_ach: $is_ach, payment_method_id: $payment_method_id) {
  adjusted_total
  fee
  fee_limit_reached
  total
  }
}
```

**Variables:**

```json
{
  "merchant_uid": "example",
  "amount": 123,
  "bank_id": "example",
  "payment_type": "example",
  "is_ach": true,
  "payment_method_id": "example"
}
```

**Response:**

```json
{
  "data": {
    "serviceFee": {
      "adjusted_total": 123,
      "fee": 123,
      "fee_limit_reached": true,
      "total": 123
    }
  }
}
```


## Type Definitions

### ServiceFeeCalculation

Service fee calculation object.

| Field | Type | Description |
| --- | --- | --- |
| `fee_limit_reached` | `Boolean` | The fee limit reached. |
| `fee` | `Int` | The amount that the service fee should be based on the amount passed in. |
| `total` | `Int` | The total amount of the transaction before the service fee. This is what you would want to pass in the amount argument for the createOneTimePayment call. |
| `adjusted_total` | `Int` | The total amount of the transaction after the service fee. This is what you would want to show the payor the total amount of the transaction will be. |