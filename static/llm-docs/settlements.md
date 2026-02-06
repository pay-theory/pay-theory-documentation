# Settlements

> Part of [GraphQL API](./index.md) GraphQL API

---

## Mutations

### cancelSettlementInstruction

Cancels settlement instruction.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `ID!` | Yes | Pay Theory unique identifier for the merchant. |

**Returns:** `Instruction`

| Field | Type | Description |
| --- | --- | --- |
| `id` | `ID!` | The unique instruction identifier. |
| `merchant_uid` | `ID!` | The Pay Theory unique identifier assigned to the merchant. |
| `date` | `AWSDate!` | The instruction date in YYYY-MM-DD format (UTC). |
| `amount` | `String!` | The instruction amount, in cents as a 64-bit string. |
| `status` | `InstructionStatus!` | The current status of the instruction. |
| `scheduled_processing_date` | `AWSDateTime!` | The scheduled processing date/time for the instruction (UTC). |
| `settlement_batch` | `Int` | The settlement batch number assigned after processing (if any). |
| `metadata` | `AWSJSON` | Optional metadata attached to the instruction. |


**InstructionStatus values:**

| InstructionStatus Value | Description |
| --- | --- |
| `CANCELED` | The instruction was canceled. |
| `FAILED` | The instruction failed to process. |
| `PENDING` | The instruction is scheduled for processing. |
| `PROCESSED` | The instruction was processed successfully. |

**Example: Example cancelSettlementInstruction**

Cancels settlement instruction.

```graphql
mutation CancelSettlementInstruction($merchant_uid: ID!) {
  cancelSettlementInstruction(merchant_uid: $merchant_uid) {
  id
  date
  amount
  merchant_uid
  metadata
  }
}
```

```json
{
  "data": {
    "cancelSettlementInstruction": {
      "id": "id_123",
      "date": "2025-01-01",
      "amount": "example",
      "merchant_uid": "id_123",
      "metadata": {
        "key": "value"
      }
    }
  }
}
```


### createSettlementInstruction

This mutation creates an instructional funding request for a merchant.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `CreateSettlementInstructionInput!` | Yes | The instruction details to create. |

**Returns:** `CreateSettlementInstructionResponse`

| Field | Type | Description |
| --- | --- | --- |
| `instruction_id` | `ID!` | Unique identifier for the instruction. |
| `status` | `InstructionStatus!` | Status value. |
| `scheduled_processing_date` | `AWSDateTime!` | Date for scheduled processing. |
| `settlement_batch` | `Int` | The settlement batch. |
| `projected_reserve_balance` | `String!` | The projected reserve balance. |
| `metadata` | `AWSJSON` | Metadata associated with this object. |


**InstructionStatus values:**

| InstructionStatus Value | Description |
| --- | --- |
| `CANCELED` | The instruction was canceled. |
| `FAILED` | The instruction failed to process. |
| `PENDING` | The instruction is scheduled for processing. |
| `PROCESSED` | The instruction was processed successfully. |

**Example: Example createSettlementInstruction**

This mutation creates an instructional funding request for a merchant.

```graphql
mutation CreateSettlementInstruction($input: CreateSettlementInstructionInput!) {
  createSettlementInstruction(input: $input) {
  instruction_id
  scheduled_processing_date
  metadata
  projected_reserve_balance
  settlement_batch
  }
}
```

```json
{
  "data": {
    "createSettlementInstruction": {
      "instruction_id": "id_123",
      "scheduled_processing_date": "2025-01-01T00:00:00Z",
      "metadata": {
        "key": "value"
      },
      "projected_reserve_balance": "example",
      "settlement_batch": 123
    }
  }
}
```

