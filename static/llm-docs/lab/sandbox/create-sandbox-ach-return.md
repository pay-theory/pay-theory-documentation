# createSandboxAchReturn

> **Group:** Sandbox
> **Operation Type:** MUTATION

Use this mutation to create an ACH return for a completed ACH transaction.

## GraphQL Signature

```graphql
mutation createSandboxAchReturn($input: CreateSandboxAchReturnInput!) {
  createSandboxAchReturn(input: $input) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `CreateSandboxAchReturnInput!` | Yes | The ACH return request details. |

## Return Type

**Returns:** `SandboxAchReturnResult!`

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |
| `ach_return_transaction_id` | `String!` | Unique identifier for the ACH return transaction. |
| `return_code` | `String!` | The return code. |

## Examples

### Example createSandboxAchReturn

Use this mutation to create an ACH return for a completed ACH transaction.

**Query:**

```graphql
mutation CreateSandboxAchReturn($input: CreateSandboxAchReturnInput!) {
  createSandboxAchReturn(input: $input) {
  ach_return_transaction_id
  return_code
  success
  }
}
```

**Variables:**

```json
{
  "input": {
    "transaction_id": "example",
    "return_code": "R01"
  }
}
```

**Response:**

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


## Type Definitions

### CreateSandboxAchReturnInput

Input for create sandbox ACH return.

| Field | Type | Description |
| --- | --- | --- |
| `transaction_id` | `String!` | Pay Theory unique identifier for the transaction. |
| `return_code` | `AchReturnCode!` | The ACH return code used. See type definition: AchReturnCode. |

### AchReturnCode

Possible values for ACH return code.

| AchReturnCode Value | Description |
| --- | --- |
| `R01` | No description available. |
| `R02` | No description available. |
| `R03` | No description available. |
| `R04` | No description available. |
| `R05` | No description available. |
| `R06` | No description available. |
| `R07` | No description available. |
| `R08` | No description available. |
| `R09` | No description available. |
| `R10` | No description available. |
| `R11` | No description available. |
| `R12` | No description available. |
| `R13` | No description available. |
| `R14` | No description available. |
| `R15` | No description available. |
| `R16` | No description available. |
| `R17` | No description available. |
| `R18` | No description available. |
| `R19` | No description available. |
| `R20` | No description available. |
| `R21` | No description available. |
| `R22` | No description available. |
| `R23` | No description available. |
| `R24` | No description available. |
| `R25` | No description available. |
| `R26` | No description available. |
| `R27` | No description available. |
| `R28` | No description available. |
| `R29` | No description available. |
| `R30` | No description available. |
| `R31` | No description available. |
| `R32` | No description available. |
| `R33` | No description available. |
| `R34` | No description available. |
| `R35` | No description available. |
| `R36` | No description available. |
| `R37` | No description available. |
| `R38` | No description available. |
| `R39` | No description available. |
| `R40` | No description available. |
| `R41` | No description available. |
| `R42` | No description available. |
| `R43` | No description available. |
| `R44` | No description available. |
| `R45` | No description available. |
| `R46` | No description available. |
| `R47` | No description available. |
| `R50` | No description available. |
| `R51` | No description available. |
| `R52` | No description available. |
| `R53` | No description available. |
| `R61` | No description available. |
| `R62` | No description available. |
| `R67` | No description available. |
| `R68` | No description available. |
| `R69` | No description available. |
| `R70` | No description available. |
| `R71` | No description available. |
| `R72` | No description available. |
| `R73` | No description available. |
| `R74` | No description available. |
| `R75` | No description available. |
| `R76` | No description available. |
| `R77` | No description available. |
| `R80` | No description available. |
| `R81` | No description available. |
| `R82` | No description available. |
| `R83` | No description available. |
| `R84` | No description available. |
| `R85` | No description available. |

### SandboxAchReturnResult

Result for sandbox ACH return.

| Field | Type | Description |
| --- | --- | --- |
| `success` | `Boolean!` | If the action succeeded . |
| `ach_return_transaction_id` | `String!` | Unique identifier for the ACH return transaction. |
| `return_code` | `String!` | The return code. |