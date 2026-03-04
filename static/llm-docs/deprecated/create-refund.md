# createRefund

> **Group:** Deprecated
> **Operation Type:** MUTATION

> Deprecated: Use createReversal instead.

This call will create a refund for a transaction.

## GraphQL Signature

```graphql
mutation createRefund($transaction_id: String!, $amount: Int!, $refund_reason: RefundReasonInput!, $refund_email: String) {
  createRefund(transaction_id: $transaction_id, amount: $amount, refund_reason: $refund_reason, refund_email: $refund_email)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `transaction_id` | `String!` | Yes | The Pay Theory unique identifier for the transaction to refund. |
| `amount` | `Int!` | Yes | The amount of the refund. This must be less than or equal to the amount of the transaction. |
| `refund_reason` | `RefundReasonInput!` | Yes | The reason for the refund. This is required for all refunds and is made up of the following. |
| `refund_email` | `String` | No | The email address to send the refund receipt to. If not provided an email will not be sent out. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example createRefund

This call will create a refund for a transaction.

**Query:**

```graphql
mutation CreateRefund($transaction_id: String!, $amount: Int!, $refund_reason: RefundReasonInput!, $refund_email: String) {
  createRefund(transaction_id: $transaction_id, amount: $amount, refund_reason: $refund_reason, refund_email: $refund_email)
}
```

**Variables:**

```json
{
  "transaction_id": "example",
  "amount": 123,
  "refund_reason": {
    "reason_code": "DUPLICATE",
    "reason_details": "example"
  },
  "refund_email": "example"
}
```

**Response:**

```json
{
  "data": {
    "createRefund": true
  }
}
```


## Type Definitions

### RefundReasonInput

Input for refund reason.

| Field | Type | Description |
| --- | --- | --- |
| `reason_code` | `RefundReasonCode!` | The reason code for the refund. See type definition: RefundReasonCode. |
| `reason_details` | `String` | The details of the refund reason. |

### RefundReasonCode

Possible values for refund reason code.

| RefundReasonCode Value | Description |
| --- | --- |
| `DUPLICATE` | Represents duplicate. |
| `FRAUDULENT` | Represents fraudulent. |
| `OTHER` | Represents other. |
| `REQUESTED_BY_CUSTOMER` | Represents requested by customer. |