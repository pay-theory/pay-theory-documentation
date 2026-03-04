# createRetryForFailedRecurringPayment

> **Group:** Recurring Payment
> **Operation Type:** MUTATION

This call will allow you to retry a payment for a recurring payment that is in a Failed state. This should be used when the state is INSTRUMENT_FAILURE and the issue with the payment method has been addressed. EX: Payment failed for insufficient funds on the card, but the customer has since made a payment on the balance to resolve the issue.

## GraphQL Signature

```graphql
mutation createRetryForFailedRecurringPayment($recurring_id: String!) {
  createRetryForFailedRecurringPayment(recurring_id: $recurring_id)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `recurring_id` | `String!` | Yes | The recurring_id of the recurring payment to be retried. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example createRetryForFailedRecurringPayment

This call will allow you to retry a payment for a recurring payment that is in a Failed state. This should be used when the state is INSTRUMENT_FAILURE and the issue with the payment method has been addressed. EX: Payment failed for insufficient funds on the card, but the customer has since made a payment on the balance to resolve the issue.

**Query:**

```graphql
mutation CreateRetryForFailedRecurringPayment($recurring_id: String!) {
  createRetryForFailedRecurringPayment(recurring_id: $recurring_id)
}
```

**Variables:**

```json
{
  "recurring_id": "example"
}
```

**Response:**

```json
{
  "data": {
    "createRetryForFailedRecurringPayment": true
  }
}
```