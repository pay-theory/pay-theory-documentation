# Users

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### users

Returns users.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `user_pool` | `UserPool!` | Yes | The user pool to query. One of the following: MERCHANT, SYSTEM, PARTNER. |
| `merchant_uid` | `String` | No | The merchant uid to query users for. Only used when querying users in the Merchant and System Portal. |

**Returns:** `[User]`

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` | The email address of the user. |
| `full_name` | `String` | The full name of the user. |
| `phone` | `String` | The phone number of the user. |
| `user_status` | `String` | The status of the user. Likely to be one of the following: CONFIRMED, FORCE_CHANGE_PASSWORD |
| `username` | `String` | The cognito username id of the user. |

**Example: Example users**

Returns users.

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


## Mutations

### createUser

Creates user.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `UserInput!` | Yes | Input payload. |

**Returns:** `User`

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` | The email address of the user. |
| `full_name` | `String` | The full name of the user. |
| `phone` | `String` | The phone number of the user. |
| `user_status` | `String` | The status of the user. Likely to be one of the following: CONFIRMED, FORCE_CHANGE_PASSWORD |
| `username` | `String` | The cognito username id of the user. |

**Example: Example createUser**

Creates user.

```graphql
mutation CreateUser($input: UserInput!) {
  createUser(input: $input) {
  email
  full_name
  phone
  user_status
  username
  }
}
```

```json
{
  "data": {
    "createUser": {
      "email": "example",
      "full_name": "example",
      "phone": "example",
      "user_status": "example",
      "username": "example"
    }
  }
}
```


### deleteUser

Deletes user.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `username` | `String!` | Yes | The cognito username id of the user to delete. |
| `user_pool` | `UserPool!` | Yes | The user pool to delete the user from. One of the following: MERCHANT, SYSTEM, PARTNER. |

**Returns:** `Boolean`


**Example: Example deleteUser**

Deletes user.

```graphql
mutation DeleteUser($username: String!, $user_pool: UserPool!) {
  deleteUser(username: $username, user_pool: $user_pool)
}
```

```json
{
  "data": {
    "deleteUser": true
  }
}
```



## Types Reference

### User

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` | The email address of the user. |
| `full_name` | `String` | The full name of the user. |
| `phone` | `String` | The phone number of the user. |
| `user_status` | `String` | The status of the user. Likely to be one of the following: CONFIRMED, FORCE_CHANGE_PASSWORD |
| `username` | `String` | The cognito username id of the user. |

### UserPool

| UserPool Value | Description |
| --- | --- |
| `MERCHANT` | The user is a merchant. |
| `PARTNER` | The user is a partner. |
| `SYSTEM` | The user is a system. |
