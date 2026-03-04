# serviceFeeAmount

> **Group:** Deprecated
> **Operation Type:** QUERY

> Deprecated: Use serviceFee instead.

This call was deprecated in favor of the serviceFee query. The serviceFee query returns a single fee object that contains the fee, total, and adjusted total for the transaction based on the amount and payment method details passed in.

## GraphQL Signature

```graphql
query serviceFeeAmount($merchant_uid: String!, $amount: Int!) {
  serviceFeeAmount(merchant_uid: $merchant_uid, amount: $amount) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `String!` | Yes | The Pay Theory unique identifier for the merchant the transaction is for. |
| `amount` | `Int!` | Yes | The amount of the transaction. |

## Return Type

**Returns:** `ServiceFeeAmount`

| Field | Type | Description |
| --- | --- | --- |
| `ach` | `ServiceFeeCalculation` | No description available. See type definition: ServiceFeeCalculation. |
| `card` | `ServiceFeeCalculation` | No description available. See type definition: ServiceFeeCalculation. |

## Examples

### Example serviceFeeAmount

This call was deprecated in favor of the serviceFee query. The serviceFee query returns a single fee object that contains the fee, total, and adjusted total for the transaction based on the amount and payment method details passed in.

**Query:**

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

**Variables:**

```json
{
  "merchant_uid": "example",
  "amount": 123
}
```

**Response:**

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


## Type Definitions

### ServiceFeeAmount

Service fee amount object.

| Field | Type | Description |
| --- | --- | --- |
| `ach` | `ServiceFeeCalculation` | No description available. See type definition: ServiceFeeCalculation. |
| `card` | `ServiceFeeCalculation` | No description available. See type definition: ServiceFeeCalculation. |

### ServiceFeeCalculation

Service fee calculation object.

| Field | Type | Description |
| --- | --- | --- |
| `fee_limit_reached` | `Boolean` | The fee limit reached. |
| `fee` | `Int` | The amount that the service fee should be based on the amount passed in. |
| `total` | `Int` | The total amount of the transaction before the service fee. This is what you would want to pass in the amount argument for the createOneTimePayment call. |
| `adjusted_total` | `Int` | The total amount of the transaction after the service fee. This is what you would want to show the payor the total amount of the transaction will be. |