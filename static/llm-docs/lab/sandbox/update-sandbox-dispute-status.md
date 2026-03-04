# updateSandboxDisputeStatus

> **Group:** Sandbox
> **Operation Type:** MUTATION

Use this mutation to move a dispute through its lifecycle.

## GraphQL Signature

```graphql
mutation updateSandboxDisputeStatus($input: UpdateSandboxDisputeStatusInput!) {
  updateSandboxDisputeStatus(input: $input) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `UpdateSandboxDisputeStatusInput!` | Yes | The dispute status update details. |

## Return Type

**Returns:** `SandboxDisputeUpdateResult!`

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |

## Examples

### Example updateSandboxDisputeStatus

Use this mutation to move a dispute through its lifecycle.

**Query:**

```graphql
mutation UpdateSandboxDisputeStatus($input: UpdateSandboxDisputeStatusInput!) {
  updateSandboxDisputeStatus(input: $input) {
  success
  }
}
```

**Variables:**

```json
{
  "input": {
    "dispute_id": "example",
    "status": "INQUIRY"
  }
}
```

**Response:**

```json
{
  "data": {
    "updateSandboxDisputeStatus": {
      "success": true
    }
  }
}
```


## Type Definitions

### UpdateSandboxDisputeStatusInput

Input for update sandbox dispute status.

| Field | Type | Description |
| --- | --- | --- |
| `dispute_id` | `String!` | Unique identifier for the dispute. |
| `status` | `DisputeStatus!` | Status value. See type definition: DisputeStatus. |

### DisputeStatus

Possible values for dispute status.

| DisputeStatus Value | Description |
| --- | --- |
| `INQUIRY` | The dispute is in the inquiry stage. The cardholder has requested more information about the charge. |
| `LOST` | The dispute has been lost. The cardholder has won the dispute and the funds have been withdrawn from the merchants account. |
| `PENDING` | The dispute is in the pending stage. The cardholder has requested a chargeback. |
| `WON` | The dispute has been won. The merchant has won the dispute and the funds have been deposited into the merchants account. |

### SandboxDisputeUpdateResult

Result for sandbox dispute update.

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |