# instruction

> **Group:** Settlement
> **Operation Type:** QUERY

Returns instruction.

## GraphQL Signature

```graphql
query instruction($merchant_uid: ID!, $date: AWSDate!) {
  instruction(merchant_uid: $merchant_uid, date: $date) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `ID!` | Yes | The Pay Theory unique identifier assigned to the merchant. |
| `date` | `AWSDate!` | Yes | The instruction date in YYYY-MM-DD format (UTC). |

## Return Type

**Returns:** `[Instruction]`

| Field | Type | Description |
| --- | --- | --- |
| `id` | `ID!` | The unique instruction identifier. |
| `merchant_uid` | `ID!` | The Pay Theory unique identifier assigned to the merchant. |
| `date` | `AWSDate!` | The instruction date in YYYY-MM-DD format (UTC). |
| `amount` | `String!` | The instruction amount, in cents as a 64-bit string. |
| `status` | `InstructionStatus!` | The current status of the instruction. See type definition: InstructionStatus. |
| `scheduled_processing_date` | `AWSDateTime!` | The scheduled processing date/time for the instruction (UTC). |
| `settlement_batch` | `Int` | The settlement batch number assigned after processing (if any). |
| `metadata` | `AWSJSON` | Optional metadata attached to the instruction. |

## Examples

### Example instruction

Returns instruction.

**Query:**

```graphql
query Instruction($merchant_uid: ID!, $date: AWSDate!) {
  instruction(merchant_uid: $merchant_uid, date: $date) {
  id
  date
  amount
  merchant_uid
  metadata
  }
}
```

**Variables:**

```json
{
  "merchant_uid": "id_123",
  "date": "2025-01-01"
}
```

**Response:**

```json
{
  "data": {
    "instruction": {
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


## Type Definitions

### Instruction

Instruction object.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `ID!` | The unique instruction identifier. |
| `merchant_uid` | `ID!` | The Pay Theory unique identifier assigned to the merchant. |
| `date` | `AWSDate!` | The instruction date in YYYY-MM-DD format (UTC). |
| `amount` | `String!` | The instruction amount, in cents as a 64-bit string. |
| `status` | `InstructionStatus!` | The current status of the instruction. See type definition: InstructionStatus. |
| `scheduled_processing_date` | `AWSDateTime!` | The scheduled processing date/time for the instruction (UTC). |
| `settlement_batch` | `Int` | The settlement batch number assigned after processing (if any). |
| `metadata` | `AWSJSON` | Optional metadata attached to the instruction. |

### InstructionStatus

Possible values for instruction status.

| InstructionStatus Value | Description |
| --- | --- |
| `CANCELED` | The instruction was canceled. |
| `FAILED` | The instruction failed to process. |
| `PENDING` | The instruction is scheduled for processing. |
| `PROCESSED` | The instruction was processed successfully. |