# createReceiptEmail

> **Group:** Transaction
> **Operation Type:** MUTATION

This call will send a receipt for a transaction to the email address on file with the payor or an email passed in.

## GraphQL Signature

```graphql
mutation createReceiptEmail($transaction_id: String!, $receipt_description: String, $email: AWSEmail) {
  createReceiptEmail(transaction_id: $transaction_id, receipt_description: $receipt_description, email: $email)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `transaction_id` | `String!` | Yes | The Pay Theory unique identifier for the transaction to send the receipt for. |
| `receipt_description` | `String` | No | The description of the transaction that will be displayed on the receipt. If not provided it will just say "Payment to merchant_name". |
| `email` | `AWSEmail` | No | The email address to send the receipt to. If not provided the email address on file with the payor will be used. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example createReceiptEmail

This call will send a receipt for a transaction to the email address on file with the payor or an email passed in.

**Query:**

```graphql
mutation CreateReceiptEmail($transaction_id: String!, $receipt_description: String, $email: AWSEmail) {
  createReceiptEmail(transaction_id: $transaction_id, receipt_description: $receipt_description, email: $email)
}
```

**Variables:**

```json
{
  "transaction_id": "example",
  "receipt_description": "example",
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "data": {
    "createReceiptEmail": true
  }
}
```