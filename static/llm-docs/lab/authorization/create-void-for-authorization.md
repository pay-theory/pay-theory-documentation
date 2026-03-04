# createVoidForAuthorization

> **Group:** Authorization
> **Operation Type:** MUTATION

This will void an authorization that has not been captured. If the authorization has been captured, this call will fail. The Authorization will have a status of CANCELED.

## GraphQL Signature

```graphql
mutation createVoidForAuthorization($authorization_id: String!, $void_amount: Int) {
  createVoidForAuthorization(authorization_id: $authorization_id, void_amount: $void_amount)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `authorization_id` | `String!` | Yes | The Pay Theory unique identifier assigned to the authorization that you are looking to void. |
| `void_amount` | `Int` | No | — |

## Return Type

**Returns:** `Boolean`

## Examples

### Example createVoidForAuthorization

This will void an authorization that has not been captured. If the authorization has been captured, this call will fail. The Authorization will have a status of CANCELED.

**Query:**

```graphql
mutation CreateVoidForAuthorization($authorization_id: String!, $void_amount: Int) {
  createVoidForAuthorization(authorization_id: $authorization_id, void_amount: $void_amount)
}
```

**Variables:**

```json
{
  "authorization_id": "example",
  "void_amount": 123
}
```

**Response:**

```json
{
  "data": {
    "createVoidForAuthorization": true
  }
}
```