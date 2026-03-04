# availableFundsBalance

> **Group:** Settlement
> **Operation Type:** QUERY

This query returns the instructional hold and reserve balances for a merchant, along with the instruction window status.

## GraphQL Signature

```graphql
query availableFundsBalance($merchant_uid: ID!) {
  availableFundsBalance(merchant_uid: $merchant_uid) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `ID!` | Yes | The Pay Theory unique identifier assigned to the merchant. |

## Return Type

**Returns:** `[AvailableFundsBalance]`

| Field | Type | Description |
| --- | --- | --- |
| `instructional_hold_balance` | `String!` | Available funds held for instructional funding, in cents as a 64-bit string. |
| `reserve_balance` | `String!` | Reserve balance for the merchant, in cents as a 64-bit string. |
| `instruction_window_status` | `WindowStatus!` | The current instruction window status. See type definition: WindowStatus. |
| `instructional_hold_balance_updated` | `Boolean!` | Whether the latest instructional hold balance update has been applied. |

## Examples

### Example availableFundsBalance

This query returns the instructional hold and reserve balances for a merchant, along with the instruction window status.

**Query:**

```graphql
query AvailableFundsBalance($merchant_uid: ID!) {
  availableFundsBalance(merchant_uid: $merchant_uid) {
  instructional_hold_balance_updated
  instruction_window_status
  instructional_hold_balance
  reserve_balance
  }
}
```

**Variables:**

```json
{
  "merchant_uid": "id_123"
}
```

**Response:**

```json
{
  "data": {
    "availableFundsBalance": {
      "instructional_hold_balance_updated": true,
      "instruction_window_status": "example",
      "instructional_hold_balance": "example",
      "reserve_balance": "example"
    }
  }
}
```


## Type Definitions

### AvailableFundsBalance

Available funds balance object.

| Field | Type | Description |
| --- | --- | --- |
| `instructional_hold_balance` | `String!` | Available funds held for instructional funding, in cents as a 64-bit string. |
| `reserve_balance` | `String!` | Reserve balance for the merchant, in cents as a 64-bit string. |
| `instruction_window_status` | `WindowStatus!` | The current instruction window status. See type definition: WindowStatus. |
| `instructional_hold_balance_updated` | `Boolean!` | Whether the latest instructional hold balance update has been applied. |

### WindowStatus

Possible values for window status.

| WindowStatus Value | Description |
| --- | --- |
| `OPEN` | The instruction window is open. |
| `CLOSED` | The instruction window is closed. |