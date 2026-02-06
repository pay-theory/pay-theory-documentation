# Sandbox

> Part of [GraphQL API](./index.md) GraphQL API

---

## Mutations

### createSandboxAchReturn

Use this mutation to create an ACH return for a completed ACH transaction.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `CreateSandboxAchReturnInput!` | Yes | The ACH return request details. |

**Returns:** `SandboxAchReturnResult!`

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |
| `ach_return_transaction_id` | `String!` | Unique identifier for the ACH return transaction. |
| `return_code` | `String!` | The return code. |

**Example: Example createSandboxAchReturn**

Use this mutation to create an ACH return for a completed ACH transaction.

```graphql
mutation CreateSandboxAchReturn($input: CreateSandboxAchReturnInput!) {
  createSandboxAchReturn(input: $input) {
  ach_return_transaction_id
  return_code
  success
  }
}
```

```json
{
  "data": {
    "createSandboxAchReturn": {
      "ach_return_transaction_id": "example",
      "return_code": "example",
      "success": true
    }
  }
}
```


### createSandboxDispute

Use this mutation to create a dispute for a card transaction.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `CreateSandboxDisputeInput!` | Yes | The dispute creation details. |

**Returns:** `SandboxDisputeResult!`

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |
| `dispute_id` | `String!` | Unique identifier for the dispute. |
| `transaction_id` | `String!` | Pay Theory unique identifier for the transaction. |

**Example: Example createSandboxDispute**

Use this mutation to create a dispute for a card transaction.

```graphql
mutation CreateSandboxDispute($input: CreateSandboxDisputeInput!) {
  createSandboxDispute(input: $input) {
  dispute_id
  success
  transaction_id
  }
}
```

```json
{
  "data": {
    "createSandboxDispute": {
      "dispute_id": "example",
      "success": true,
      "transaction_id": "example"
    }
  }
}
```


### createSandboxSettlement

Create a settlement from a prepared sandbox batch.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `CreateSandboxSettlementInput!` | Yes | The settlement creation details. |

**Returns:** `SandboxSettlementResult!`

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |

**Example: Example createSandboxSettlement**

Create a settlement from a prepared sandbox batch.

```graphql
mutation CreateSandboxSettlement($input: CreateSandboxSettlementInput!) {
  createSandboxSettlement(input: $input) {
  success
  }
}
```

```json
{
  "data": {
    "createSandboxSettlement": {
      "success": true
    }
  }
}
```


### prepareSandboxSettlementBatch

Prepare a settlement batch to lock in line items and calculate totals for a merchant.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `PrepareSandboxSettlementBatchInput!` | Yes | The batch prep details. |

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

**Example: Example prepareSandboxSettlementBatch**

Prepare a settlement batch to lock in line items and calculate totals for a merchant.

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


### updateSandboxDisputeStatus

Use this mutation to move a dispute through its lifecycle.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `UpdateSandboxDisputeStatusInput!` | Yes | The dispute status update details. |

**Returns:** `SandboxDisputeUpdateResult!`

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |

**Example: Example updateSandboxDisputeStatus**

Use this mutation to move a dispute through its lifecycle.

```graphql
mutation UpdateSandboxDisputeStatus($input: UpdateSandboxDisputeStatusInput!) {
  updateSandboxDisputeStatus(input: $input) {
  success
  }
}
```

```json
{
  "data": {
    "updateSandboxDisputeStatus": {
      "success": true
    }
  }
}
```

