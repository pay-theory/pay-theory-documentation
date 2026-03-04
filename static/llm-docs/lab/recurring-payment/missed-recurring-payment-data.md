# missedRecurringPaymentData

> **Group:** Recurring Payment
> **Operation Type:** QUERY

This call will return details you need to display the proper amount to the customer to catch up on missed payments for a recurring payment.

## GraphQL Signature

```graphql
query missedRecurringPaymentData($recurring_id: String!) {
  missedRecurringPaymentData(recurring_id: $recurring_id) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `recurring_id` | `String!` | Yes | The recurring_id of the recurring payment to get missed payment data for. |

## Return Type

**Returns:** `MissedRecurringPaymentData`

| Field | Type | Description |
| --- | --- | --- |
| `fee` | `Int` | Fee amount in minor units (for example cents). |
| `number_of_payments_missed` | `Int` | The number of payments missed. |
| `total_amount_owed` | `Int` | The total amount owed. |

## Examples

### Example missedRecurringPaymentData

This call will return details you need to display the proper amount to the customer to catch up on missed payments for a recurring payment.

**Query:**

```graphql
query MissedRecurringPaymentData($recurring_id: String!) {
  missedRecurringPaymentData(recurring_id: $recurring_id) {
  fee
  number_of_payments_missed
  total_amount_owed
  }
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
    "missedRecurringPaymentData": {
      "fee": 123,
      "number_of_payments_missed": 123,
      "total_amount_owed": 123
    }
  }
}
```


## Type Definitions

### MissedRecurringPaymentData

Missed recurring payment data object.

| Field | Type | Description |
| --- | --- | --- |
| `fee` | `Int` | Fee amount in minor units (for example cents). |
| `number_of_payments_missed` | `Int` | The number of payments missed. |
| `total_amount_owed` | `Int` | The total amount owed. |