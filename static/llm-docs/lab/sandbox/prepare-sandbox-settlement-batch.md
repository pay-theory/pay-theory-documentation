# prepareSandboxSettlementBatch

> **Group:** Sandbox
> **Operation Type:** MUTATION

Prepare a settlement batch to lock in line items and calculate totals for a merchant.

## GraphQL Signature

```graphql
mutation prepareSandboxSettlementBatch($input: PrepareSandboxSettlementBatchInput!) {
  prepareSandboxSettlementBatch(input: $input) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `PrepareSandboxSettlementBatchInput!` | Yes | The batch prep details. |

## Return Type

**Returns:** `SandboxSettlementBatchPrepResult!`

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |
| `prep_id` | `ID!` | Unique identifier for the prep. |
| `merchant_uid` | `ID!` | Pay Theory unique identifier for the merchant. |
| `debit_ids` | `[String!]!` | The debit ids. |
| `reversal_ids` | `[String!]!` | The reversal ids. |
| `ach_return_ids` | `[String!]!` | The ACH return ids. |
| `dispute_withdrawal_ids` | `[String!]!` | The dispute withdrawal ids. |
| `dispute_deposit_ids` | `[String!]!` | The dispute deposit ids. |
| `split_ids` | `[String!]!` | The split ids. |
| `calculated_gross_amount` | `Int!` | The calculated gross amount. |
| `calculated_net_amount` | `Int!` | The calculated net amount. |
| `instructional_hold_balance` | `Int` | The instructional hold balance. |
| `reserve_balance` | `Int` | The reserve balance. |

## Examples

### Example prepareSandboxSettlementBatch

Prepare a settlement batch to lock in line items and calculate totals for a merchant.

**Query:**

```graphql
mutation PrepareSandboxSettlementBatch($input: PrepareSandboxSettlementBatchInput!) {
  prepareSandboxSettlementBatch(input: $input) {
  prep_id
  ach_return_ids
  calculated_gross_amount
  calculated_net_amount
  debit_ids
  }
}
```

**Variables:**

```json
{
  "input": {
    "merchant_uid": "id_123"
  }
}
```

**Response:**

```json
{
  "data": {
    "prepareSandboxSettlementBatch": {
      "prep_id": "id_123",
      "ach_return_ids": [
        "example"
      ],
      "calculated_gross_amount": 123,
      "calculated_net_amount": 123,
      "debit_ids": [
        "example"
      ]
    }
  }
}
```


## Type Definitions

### PrepareSandboxSettlementBatchInput

Input for prepare sandbox settlement batch.

| Field | Type | Description |
| --- | --- | --- |
| `merchant_uid` | `ID!` | The Pay Theory unique identifier for the merchant. |

### SandboxSettlementBatchPrepResult

Result for sandbox settlement batch prep.

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |
| `prep_id` | `ID!` | Unique identifier for the prep. |
| `merchant_uid` | `ID!` | Pay Theory unique identifier for the merchant. |
| `debit_ids` | `[String!]!` | The debit ids. |
| `reversal_ids` | `[String!]!` | The reversal ids. |
| `ach_return_ids` | `[String!]!` | The ACH return ids. |
| `dispute_withdrawal_ids` | `[String!]!` | The dispute withdrawal ids. |
| `dispute_deposit_ids` | `[String!]!` | The dispute deposit ids. |
| `split_ids` | `[String!]!` | The split ids. |
| `calculated_gross_amount` | `Int!` | The calculated gross amount. |
| `calculated_net_amount` | `Int!` | The calculated net amount. |
| `instructional_hold_balance` | `Int` | The instructional hold balance. |
| `reserve_balance` | `Int` | The reserve balance. |