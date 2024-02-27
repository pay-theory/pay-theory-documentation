---
sidebar_position: 8
sidebar_label: 'Dispute'
title: ""
---

# Disputes

Disputes are charges that have been contested by a cardholder to their card issuer.

They could be an `INQUIRY` which is just a request for information, or an actual chargeback in the status `PENDING` which is a request for a charge to be reversed.

***
## The Dispute Object

```graphql
{
    merchant_uid: ID
    transaction: Transaction
    dispute_id: String
    status: DisputeStatus
    reason: DisputeReason
    amount: Int
    dispute_date: AWSDateTime
    evidence_last_send_date: AWSDateTime
    updated_date: AWSDateTime
    expiration_date: AWSDateTime
    reason_message: String
    settlement_withdrawal_batch: String
    settlement_deposit_batch: String
    updated_row_at: AWSDateTime
}
```

|Key                | type                             | description                                                                                                                                 |
|-------------------|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|     
|merchant_uid       | ID                               | The Pay Theory unique identifier assigned to the merchant that the dispute belongs to.                                                      |
|transaction        | Transaction                      | The transaction object for the transaction that is in dispute. More information on the transaction object can be found [here](transaction). |
|dispute_id         | String                           | The Pay Theory unique dispute identifier.                                                                                                   |
|status             | [DisputeStatus](#dispute-status) | The status of the dispute.                                                                                                                  |
|reason             | [DisputeReason](#dispute-reason) | The reason code for the dispute as passed by the card issuer.                                                                               |
|amount             | Int                              | The amount of the transaction in dispute.                                                                                                   |
|dispute_date       | String                           | The date the dispute was created.                                                                                                           |
|evidence_last_send_date| String                           | The last date evidence was sent to the processor. If no evidence was sent, this will be null.                                               |
|updated_date       | String                           | The date the dispute was last updated.                                                                                                      |
|expiration_date    | String                           | The final date to submit evidence to contest a dispute.                                                                                     |
|reason_message     | String                           | A more detailed reason provided by the card issuer for the dispute.                                                                         |
|settlement_withdrawal_batch| String                           | The settlement batch number where funds were withdrawn from the merchants account for the dispute.                                          |
|settlement_deposit_batch| String                           | The settlement batch number where funds were deposited into the merchants account if a dispute is `WON`.                                    |
|updated_row_at     | String                           | The date the dispute was last updated in the database.                                                                                      |

***
## Dispute Status

- `INQUIRY` - The dispute is in the inquiry stage. The cardholder has requested more information about the charge.
- `LOST` - The dispute has been lost. The cardholder has won the dispute and the funds have been withdrawn from the merchants account.
- `PENDING` - The dispute is in the pending stage. The cardholder has requested a chargeback.
- `WON` - The dispute has been won. The merchant has won the dispute and the funds have been deposited into the merchants account.

***
## Dispute Reason

- `CLERICAL`
- `FRAUD` 
- `INQUIRY`
- `QUALITY`
- `TECHNICAL` 

***
## Query Disputes

```graphql
query DisputeQuery($direction: MoveDirection, $limit: Int, $offset: String, $offset_id: String, $query: SqlQuery) {
  disputes(direction: $direction, limit: $limit, offset: $offset, offset_id: $offset_id, query: $query) {
    items {
        merchant_uid
        transaction {
            ...
        }
        dispute_id
        status
        amount
        dispute_date
        evidence_last_send_date
        updated_date
        expiration_date
        reason_message
        settlement_withdrawal_batch
        settlement_deposit_batch
    }
    total_row_count
  }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|direction          |MoveDirection|The direction of the pagination. Makes sure the results are returned in the correct order.|
|limit              |Int          |The number of disputes to return.|
|offset             |String       |The value of the offset item for which the list is being sorted.|
|offset_id          |String       |The `dispute_id` of the offset item.|
|query              |QueryObject  |The query to filter the disputes with based on Pay Theory defined data.|


**Returns**
```json
{
    "data": {
        "disputes": {
            "items": [
                {
                    "dispute_id": "pt_disp_xxxx"
                },
                {
                    "dispute_id": "pt_disp_xxxx"
                }
            ],
            "total_row_count": 256
        }
    }
}
```
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|items              |[Dispute]    |The list of disputes that are returned from the query.|
|total_row_count    |Int          |The total number of disputes that match the query. Used to help with pagination.|