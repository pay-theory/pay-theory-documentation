---
sidebar_position: 55
sidebar_label: 'Split'
title: "Split"
---

# Split

Splits are a way to distribute funds from a transaction to different accounts. When a transaction is created or captured, you can specify splits to allocate portions of the transaction amount to different accounts.

***
## The Split Object

```js
{
  account_code: String
  amount: Int!
  currency: String!
  created_at: AWSDateTime!
  id: String!
  merchant_uid: ID!
  metadata: AWSJSON!
  reference: String
  settlement_batch: Int
  transaction_id: String!
  updated_row_at: AWSDateTime!
}
```

| Key              | type        | description                                                                   |
|------------------|-------------|-------------------------------------------------------------------------------|
| account_code     | String      | Customer defined account code for the split.                                  |
| amount           | Int!        | The amount of the split in cents.                                             |
| currency         | String!     | The currency of the split.                                                    |
| created_at       | AWSDateTime!| The date and time the split was created.                                      |
| id               | String!     | The Pay Theory unique identifier for the split.                               |
| merchant_uid     | ID!         | The Pay Theory unique identifier for the merchant the split belongs to.       |
| metadata         | AWSJSON!    | Custom defined JSON object to be stored with the split.                       |
| reference        | String      | Customer defined reference for the split.                                     |
| settlement_batch | Int         | The unique settlement batch number the split belongs to if settled.           |
| transaction_id   | String!     | The Pay Theory unique identifier for the transaction the split belongs to.    |
| updated_row_at   | AWSDateTime!| The date and time the split was last updated.                                 |

***
## Query Splits

```graphql
{
  splits(direction: FORWARD, limit: 10, offset: "", offset_id: "", query: SqlQuery) {
    account_code
    amount
    currency
    created_at
    id
    merchant_uid
    metadata
    reference
    settlement_batch
    transaction_id
    updated_row_at
  }
}
```

**Arguments**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|
|direction          |MoveDirection|The direction of the pagination. Makes sure the results are returned in the correct order.|
|limit              |Int          |The number of splits to return.        |
|offset             |String       |The value of the offset item for which the list is being sorted.|
|offset_id          |String       |The `id` of the offset item.           |
|query              |SqlQuery     |The query to filter the splits with based on Pay Theory defined data. Detailed information about the query object can be found [here](query).|

**Returns**

```js
{
    "data": {
        "splits": [
            {
                "id": "pt-split-paytheorylab-abc123",
                "amount": 1000,
                "transaction_id": "pt-start-paytheorylab-xyz789",
                // ... other fields
            },
            {
                "id": "pt-split-paytheorylab-def456",
                "amount": 500,
                "transaction_id": "pt-start-paytheorylab-xyz789",
                // ... other fields
            },
            // ... more splits
        ]
    }
}
```

***
## Creating Splits

Splits can be created when making a transaction or when capturing an authorization. You can specify multiple splits for a single transaction, allowing you to distribute funds to different accounts.

### Split Input

When creating a transaction or capturing an authorization, you can include splits using the following input format:

```js
{
  account_code: String
  amount: Int!
  metadata: AWSJSON
  merchant_uid: ID!
  reference: String
}
```

| Key          | type    | description                                                             |
|--------------|---------|-------------------------------------------------------------------------|
| account_code | String  | Customer defined account code for the split.                            |
| amount       | Int!    | The amount of the split in cents. Required.                             |
| metadata     | AWSJSON | Custom defined JSON object to be stored with the split.                 |
| merchant_uid | ID!     | The Pay Theory unique identifier for the merchant the split belongs to. Required. |
| reference    | String  | Customer defined reference for the split.                               |
