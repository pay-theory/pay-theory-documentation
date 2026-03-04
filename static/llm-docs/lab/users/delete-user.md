# deleteUser

> **Group:** Users
> **Operation Type:** MUTATION

Deletes user.

## GraphQL Signature

```graphql
mutation deleteUser($username: String!, $user_pool: UserPool!) {
  deleteUser(username: $username, user_pool: $user_pool)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `username` | `String!` | Yes | The cognito username id of the user to delete. |
| `user_pool` | `UserPool!` | Yes | The user pool to delete the user from. One of the following: MERCHANT, SYSTEM, PARTNER. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example deleteUser

Deletes user.

**Query:**

```graphql
mutation DeleteUser($username: String!, $user_pool: UserPool!) {
  deleteUser(username: $username, user_pool: $user_pool)
}
```

**Variables:**

```json
{
  "username": "example",
  "user_pool": "MERCHANT"
}
```

**Response:**

```json
{
  "data": {
    "deleteUser": true
  }
}
```


## Type Definitions

### UserPool

Possible values for user pool.

| UserPool Value | Description |
| --- | --- |
| `MERCHANT` | The user is a merchant. |
| `PARTNER` | The user is a partner. |
| `SYSTEM` | The user is a system. |