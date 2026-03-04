# updatePaymentMethodToDisabled

> **Group:** Payment Method Token
> **Operation Type:** MUTATION

This mutation can be used to disable a payment method token. This will prevent the payment method token from being used to create a payment. Once a payment method token is disabled, it cannot be re-enabled.

## GraphQL Signature

```graphql
mutation updatePaymentMethodToDisabled($merchant_uid: ID!, $payment_method_id: String!) {
  updatePaymentMethodToDisabled(merchant_uid: $merchant_uid, payment_method_id: $payment_method_id)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `ID!` | Yes | The Pay Theory unique identifier assigned to the merchant that the payment_method_token belongs to. |
| `payment_method_id` | `String!` | Yes | The unique payment method id. |

## Return Type

**Returns:** `Boolean!`

## Examples

### Example updatePaymentMethodToDisabled

This mutation can be used to disable a payment method token. This will prevent the payment method token from being used to create a payment. Once a payment method token is disabled, it cannot be re-enabled.

**Query:**

```graphql
mutation UpdatePaymentMethodToDisabled($merchant_uid: ID!, $payment_method_id: String!) {
  updatePaymentMethodToDisabled(merchant_uid: $merchant_uid, payment_method_id: $payment_method_id)
}
```

**Variables:**

```json
{
  "merchant_uid": "id_123",
  "payment_method_id": "example"
}
```

**Response:**

```json
{
  "data": {
    "updatePaymentMethodToDisabled": true
  }
}
```