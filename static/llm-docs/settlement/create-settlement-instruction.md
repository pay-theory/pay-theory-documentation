# createSettlementInstruction

> **Group:** Settlement
> **Operation Type:** MUTATION

This mutation creates an instructional funding request for a merchant.

## GraphQL Signature

```graphql
mutation createSettlementInstruction($input: CreateSettlementInstructionInput!) {
  createSettlementInstruction(input: $input) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `CreateSettlementInstructionInput!` | Yes | The instruction details to create. |

## Return Type

**Returns:** `CreateSettlementInstructionResponse`

| Field | Type | Description |
| --- | --- | --- |
| `instruction_id` | `ID!` | Unique identifier for the instruction. |
| `status` | `InstructionStatus!` | Status value. See type definition: InstructionStatus. |
| `scheduled_processing_date` | `AWSDateTime!` | Date for scheduled processing. |
| `settlement_batch` | `Int` | The settlement batch. |
| `projected_reserve_balance` | `String!` | The projected reserve balance. |
| `metadata` | `AWSJSON` | Metadata associated with this object. |

## Examples

### Example createSettlementInstruction

This mutation creates an instructional funding request for a merchant.

**Query:**

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

**Variables:**

```json
{
  "input": {
    "merchant_uid": "id_123",
    "amount": "example",
    "metadata": {
      "key": "value"
    }
  }
}
```

**Response:**

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


## Type Definitions

### CreateSettlementInstructionInput

Input for create settlement instruction.

| Field | Type | Description |
| --- | --- | --- |
| `merchant_uid` | `ID!` | Pay Theory unique identifier for the merchant. |
| `amount` | `String!` | Amount in minor units (for example cents). |
| `metadata` | `AWSJSON` | Optional metadata returned from the instruction. |

### CreateSettlementInstructionResponse

Response for create settlement instruction.

| Field | Type | Description |
| --- | --- | --- |
| `instruction_id` | `ID!` | Unique identifier for the instruction. |
| `status` | `InstructionStatus!` | Status value. See type definition: InstructionStatus. |
| `scheduled_processing_date` | `AWSDateTime!` | Date for scheduled processing. |
| `settlement_batch` | `Int` | The settlement batch. |
| `projected_reserve_balance` | `String!` | The projected reserve balance. |
| `metadata` | `AWSJSON` | Metadata associated with this object. |

### InstructionStatus

Possible values for instruction status.

| InstructionStatus Value | Description |
| --- | --- |
| `CANCELED` | The instruction was canceled. |
| `FAILED` | The instruction failed to process. |
| `PENDING` | The instruction is scheduled for processing. |
| `PROCESSED` | The instruction was processed successfully. |