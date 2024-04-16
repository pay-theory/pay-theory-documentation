---
sidebar_position: 11
sidebar_label: 'Users'
title: "Users"
---

# Users

Users are accounts that have access to PayTheory Portals. Users can be created with access to the Merchant, System, or Partner Portal.

## The User Object
```graphql
{
    username: String
    email: String
    user_status: String
    full_name: String
    phone: String
}
```

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|username           |String       |The cognito username id of the user.|
|email              |String       |The email address of the user.|
|user_status        |String       |The status of the user. Likely to be one of the following: `CONFIRMED`, `FORCE_CHANGE_PASSWORD`|
|full_name          |String       |The full name of the user.|
|phone              |String       |The phone number of the user.|



## Query Users
```graphql
{
    users(user_pool: UserPool, merchant_uid: String) {
        username
        email
        user_status
        full_name
        phone
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|user_pool          |UserPool     |The user pool to query. One of the following: `MERCHANT`, `SYSTEM`, `PARTNER`.|
|merchant_uid       |String       |The merchant uid to query users for. Only used when querying users in the Merchant and System Portal.|


**Returns**

```js
{
    "data": {
        "users": [
            {
                "username": "XXXXXX",
                "email": "XXXXXX",
                "user_status": "XXXXXX",
                "full_name": "XXXXXX",
                "phone": "XXXXXX"
            },
            {
                "username": "XXXXXX",
                "email": "XXXXXX",
                "user_status": "XXXXXX",
                "full_name": "XXXXXX",
                "phone": "XXXXXX"
            }
        ]
    }
}
```

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|users              |[User]       |The list of users that are returned from the query.|

## Create User
```js
mutation {
    createUser(input: { email: AWSEmail,
        first_name: String,
        last_name: String,
        merchant_uid: String,
        phone: AWSPhone,
        user_pool: UserPool
    }) {
        email
        full_name
        phone
        user_status
        username
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|intput             |UserInput    |An object containing the following|

**UserInput**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|email              |AWSEmail     |The email address of the user. Must be a valid email address or the mutation will fail. Can only have one user per email per user pool.|
|first_name         |String       |The first name of the user.|
|last_name          |String       |The last name of the user.|
|merchant_uid       |String       |The `merchant_uid` of the merchant to create the user for. Only used when creating a user for the Merchant or System Portal.|
|phone              |AWSPhone     |The phone number of the user. Must be a valid phone number or null or the mutation will fail.|
|user_pool          |UserPool     |The user pool to create the user in. One of the following: `MERCHANT`, `SYSTEM`, `PARTNER`.|

**Returns**

It will return the user object that was created.

## Delete User
```js
mutation {
    deleteUser(username: String, user_pool: UserPool)
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|username           |String       |The cognito username id of the user to delete.|
|user_pool          |UserPool     |The user pool to delete the user from. One of the following: `MERCHANT`, `SYSTEM`, `PARTNER`.|

**Returns**

It will return `true` if the user was deleted successfully or an error if it was not.
