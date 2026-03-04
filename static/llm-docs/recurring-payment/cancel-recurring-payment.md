# cancelRecurringPayment

> **Group:** Recurring Payment
> **Operation Type:** MUTATION

Once a recurring payment is cancelled, it cannot be reactivated.

## GraphQL Signature

```graphql
mutation cancelRecurringPayment($recurring_id: String!) {
  cancelRecurringPayment(recurring_id: $recurring_id)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `recurring_id` | `String!` | Yes | The recurring_id of the recurring payment to be cancelled. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example cancelRecurringPayment

Once a recurring payment is cancelled, it cannot be reactivated.

**Query:**

```graphql
mutation CancelRecurringPayment($recurring_id: String!) {
  cancelRecurringPayment(recurring_id: $recurring_id)
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
    "cancelRecurringPayment": true
  }
}
```