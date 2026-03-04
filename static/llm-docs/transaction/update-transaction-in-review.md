# updateTransactionInReview

> **Group:** Transaction
> **Operation Type:** MUTATION

This call can be used by a partner to approve or decline a transcation that is in review for reason POTEENTIAL_DUPLICATE.

## GraphQL Signature

```graphql
mutation updateTransactionInReview($transaction_id: String!, $action: TransactionReviewAction!) {
  updateTransactionInReview(transaction_id: $transaction_id, action: $action)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `transaction_id` | `String!` | Yes | The Pay Theory unique identifier for the transaction to accept or reject. |
| `action` | `TransactionReviewAction!` | Yes | The action to take on the transaction. Options are: ACCEPT or REJECT. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example updateTransactionInReview

This call can be used by a partner to approve or decline a transcation that is in review for reason POTEENTIAL_DUPLICATE.

**Query:**

```graphql
mutation UpdateTransactionInReview($transaction_id: String!, $action: TransactionReviewAction!) {
  updateTransactionInReview(transaction_id: $transaction_id, action: $action)
}
```

**Variables:**

```json
{
  "transaction_id": "example",
  "action": "ACCEPT"
}
```

**Response:**

```json
{
  "data": {
    "updateTransactionInReview": true
  }
}
```


## Type Definitions

### TransactionReviewAction

Possible values for transaction review action.

| TransactionReviewAction Value | Description |
| --- | --- |
| `ACCEPT` | Represents accept. |
| `REJECT` | Represents reject. |