---
sidebar_position: 7
sidebar_label: 'Settlement'
title: ""
---

# Settlement

Settlements are a batch of payments, disputes, and refunds that are grouped together and paid out to a merchant.

## The Settlement Object

```js
{
    currency: String
    gross_amount: Int
    merchant_uid: String
    net_amount: Int
    settlement_batch: Int
    settlement_date: AWSDateTime
    status: String
    transaction_debit_count: Int
    transaction_dispute_count: Int
    transaction_reversal_count: Int
    transfer_date: AWSDateTime
    total_adjustments: Int
    total_fees: Int
    updated_row_at: AWSDateTime
}
```

|Key                |type         | description                                                                               |
|-------------------|-------------|-------------------------------------------------------------------------------------------|     
|currency           |String       | The currency of the settlement.                                                           |
|gross_amount       |Int          | The total amount of the settlement before any fees and adjustments.                       |
|merchant_uid       |String       | The Pay Theory unique identifier assigned to the merchant that the settlement belongs to. |
|net_amount         |Int          | The total amount of the settlement after any fees and adjustments.                        |
|settlement_batch   |Int          | The unique settlement batch number.                                                       |
|settlement_date    |String       | The date the settlement was created in an ISO 8601 String format.                         |
|status             |String       | The status of the settlement. Will be either `PENDING` or `SUCCEEDED`.                    |
|transaction_debit_count|Int      | The number of transactions of type DEBIT that were included in the settlement.            |
|transaction_dispute_count|Int    | The number of transactions of type DISPUTE that were included in the settlement.          |
|transaction_reversal_count|Int    | The number of transactions of type REVERSAL that were included in the settlement.         |
|transfer_date      |String       | The date the settlement was transferred to the merchant in an ISO 8601 String format.     |
|total_adjustments  |Int          | The total amount of adjustments that were applied to the settlement.                      |
|total_fees         |Int          | The total amount of fees that were applied to the settlement.                             |
|updated_row_at     |String       | The date the settlement was last updated in an ISO 8601 String format.                    |


## Query Settlements
```js
{
    settlements(limit: Int, direction: MoveDirection, offset: String, offset_id: String, query: QueryObject) {
        items {
            currency
            gross_amount
            merchant_uid
            net_amount
            settlement_batch
            settlement_date
            status
            total_adjustments
            total_fees
            transaction_dispute_count
            transaction_debit_count
            transaction_reversal_count
        }
        total_row_count
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|limit              |Int          |The number of settlements to return.|
|direction          |MoveDirection|The direction of the pagination. Makes sure the results are returned in the correct order.|
|offset             |String       |The value of the offset item for which the list is being sorted.|
|offset_id          |String       |The `settlement_batch` of the offset item.|
|query              |QueryObject  |The query to filter the settlements with based on Pay Theory defined data.|

**Returns**

```js
{
    "data": {
        "settlements": {
            "items": [
                {
                    "settlement_batch": "42"
                },
                {
                    "settlement_batch": "41"
                },
                ...
            ],
                "total_row_count": 256
        }
    }
}
```
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|items              |[Settlement] |The list of settlements that are returned from the query.|
|total_row_count    |Int          |The total number of settlements that match the query. Used to help with pagination.|