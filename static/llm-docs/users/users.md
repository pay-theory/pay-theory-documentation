# users

> **Group:** Users
> **Operation Type:** QUERY

Returns users.

## GraphQL Signature

```graphql
query users($user_pool: UserPool!, $merchant_uid: String) {
  users(user_pool: $user_pool, merchant_uid: $merchant_uid) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `user_pool` | `UserPool!` | Yes | The user pool to query. One of the following: MERCHANT, SYSTEM, PARTNER. |
| `merchant_uid` | `String` | No | The merchant uid to query users for. Only used when querying users in the Merchant and System Portal. |

## Return Type

**Returns:** `[User]`

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` | The email address of the user. |
| `full_name` | `String` | The full name of the user. |
| `phone` | `String` | The phone number of the user. |
| `user_status` | `String` | The status of the user. Likely to be one of the following: CONFIRMED, FORCE_CHANGE_PASSWORD |
| `username` | `String` | The cognito username id of the user. |

## Examples

### Example users

Returns users.

**Query:**

```graphql
query Users($user_pool: UserPool!, $merchant_uid: String) {
  users(user_pool: $user_pool, merchant_uid: $merchant_uid) {
  email
  full_name
  phone
  user_status
  username
  }
}
```

**Variables:**

```json
{
  "user_pool": "MERCHANT",
  "merchant_uid": "example"
}
```

**Response:**

```json
{
  "data": {
    "users": {
      "email": "example",
      "full_name": "example",
      "phone": "example",
      "user_status": "example",
      "username": "example"
    }
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

### User

User object.

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` | The email address of the user. |
| `full_name` | `String` | The full name of the user. |
| `phone` | `String` | The phone number of the user. |
| `user_status` | `String` | The status of the user. Likely to be one of the following: CONFIRMED, FORCE_CHANGE_PASSWORD |
| `username` | `String` | The cognito username id of the user. |