# createSandboxDispute

> **Group:** Sandbox
> **Operation Type:** MUTATION

Use this mutation to create a dispute for a card transaction.

## GraphQL Signature

```graphql
mutation createSandboxDispute($input: CreateSandboxDisputeInput!) {
  createSandboxDispute(input: $input) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `CreateSandboxDisputeInput!` | Yes | The dispute creation details. |

## Return Type

**Returns:** `SandboxDisputeResult!`

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |
| `dispute_id` | `String!` | Unique identifier for the dispute. |
| `transaction_id` | `String!` | Pay Theory unique identifier for the transaction. |

## Examples

### Example createSandboxDispute

Use this mutation to create a dispute for a card transaction.

**Query:**

```graphql
mutation CreateSandboxDispute($input: CreateSandboxDisputeInput!) {
  createSandboxDispute(input: $input) {
  dispute_id
  success
  transaction_id
  }
}
```

**Variables:**

```json
{
  "input": {
    "transaction_id": "example",
    "reason": "CLERICAL"
  }
}
```

**Response:**

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


## Type Definitions

### CreateSandboxDisputeInput

Input for create sandbox dispute.

| Field | Type | Description |
| --- | --- | --- |
| `transaction_id` | `String!` | The transaction ID that is now in dispute. |
| `reason` | `DisputeReason!` | No description available. See type definition: DisputeReason. |

### DisputeReason

Possible values for dispute reason.

| DisputeReason Value | Description |
| --- | --- |
| `CLERICAL` | No description available. |
| `FRAUD` | No description available. |
| `INQUIRY` | No description available. |
| `QUALITY` | No description available. |
| `TECHNICAL` | No description available. |

### SandboxDisputeResult

Result for sandbox dispute.

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |
| `dispute_id` | `String!` | Unique identifier for the dispute. |
| `transaction_id` | `String!` | Pay Theory unique identifier for the transaction. |