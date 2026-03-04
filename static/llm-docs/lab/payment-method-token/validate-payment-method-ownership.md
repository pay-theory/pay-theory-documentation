# validatePaymentMethodOwnership

> **Group:** Payment Method Token
> **Operation Type:** QUERY

This mutation validates whether a provided card or bank account number matches a specific payment method.

## GraphQL Signature

```graphql
query validatePaymentMethodOwnership($payment_method_id: String!, $number: String!) {
  validatePaymentMethodOwnership(payment_method_id: $payment_method_id, number: $number)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `payment_method_id` | `String!` | Yes | The unique payment method id that identifies the payment method to validate against. |
| `number` | `String!` | Yes | The card number or account number to validate. For card payment methods, this is the full card number. For ACH payment methods, this is the full account number. |

## Return Type

**Returns:** `Boolean!`

## Examples

### Example validatePaymentMethodOwnership

This mutation validates whether a provided card or bank account number matches a specific payment method.

**Query:**

```graphql
query ValidatePaymentMethodOwnership($payment_method_id: String!, $number: String!) {
  validatePaymentMethodOwnership(payment_method_id: $payment_method_id, number: $number)
}
```

**Variables:**

```json
{
  "payment_method_id": "example",
  "number": "example"
}
```

**Response:**

```json
{
  "data": {
    "validatePaymentMethodOwnership": true
  }
}
```