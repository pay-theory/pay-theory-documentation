# createSandboxSettlement

> **Group:** Sandbox
> **Operation Type:** MUTATION

Create a settlement from a prepared sandbox batch.

## GraphQL Signature

```graphql
mutation createSandboxSettlement($input: CreateSandboxSettlementInput!) {
  createSandboxSettlement(input: $input) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `CreateSandboxSettlementInput!` | Yes | The settlement creation details. |

## Return Type

**Returns:** `SandboxSettlementResult!`

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |

## Examples

### Example createSandboxSettlement

Create a settlement from a prepared sandbox batch.

**Query:**

```graphql
mutation CreateSandboxSettlement($input: CreateSandboxSettlementInput!) {
  createSandboxSettlement(input: $input) {
  success
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
    "createSandboxSettlement": {
      "success": true
    }
  }
}
```


## Type Definitions

### CreateSandboxSettlementInput

Input for create sandbox settlement.

| Field | Type | Description |
| --- | --- | --- |
| `merchant_uid` | `ID!` | Pay Theory unique identifier for the merchant. |

### SandboxSettlementResult

Result for sandbox settlement.

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |