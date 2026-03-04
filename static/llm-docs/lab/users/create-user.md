# createUser

> **Group:** Users
> **Operation Type:** MUTATION

Creates user.

## GraphQL Signature

```graphql
mutation createUser($input: UserInput!) {
  createUser(input: $input) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `UserInput!` | Yes | Input payload. |

## Return Type

**Returns:** `User`

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` | The email address of the user. |
| `full_name` | `String` | The full name of the user. |
| `phone` | `String` | The phone number of the user. |
| `user_status` | `String` | The status of the user. Likely to be one of the following: CONFIRMED, FORCE_CHANGE_PASSWORD |
| `username` | `String` | The cognito username id of the user. |

## Examples

### Example createUser

Creates user.

**Query:**

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

**Variables:**

```json
{
  "input": {
    "bypass_merchant_validation": true,
    "email": "user@example.com",
    "first_name": "example",
    "last_name": "example",
    "merchant_uid": "example",
    "phone": "+15555555555",
    "user_pool": "MERCHANT"
  }
}
```

**Response:**

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


## Type Definitions

### UserInput

Input for user.

| Field | Type | Description |
| --- | --- | --- |
| `bypass_merchant_validation` | `Boolean` | The bypass merchant validation. |
| `email` | `AWSEmail!` | Email address. |
| `first_name` | `String!` | First name. |
| `last_name` | `String!` | Last name. |
| `merchant_uid` | `String` | The merchant uid to query users for. Only used when querying users in the Merchant and System Portal. |
| `phone` | `AWSPhone` | Phone number. |
| `user_pool` | `UserPool!` | The user pool to query. One of the following: MERCHANT, SYSTEM, PARTNER. See type definition: UserPool. |

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