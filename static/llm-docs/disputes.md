# Disputes

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### disputes

Returns disputes.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `SqlQuery` | No | The query to filter the disputes with based on Pay Theory defined data. |
| `limit` | `Int` | No | The number of disputes to return. |
| `offset` | `String` | No | The value of the offset item for which the list is being sorted. |
| `direction` | `MoveDirection` | No | The direction of the pagination. Makes sure the results are returned in the correct order. |
| `offset_id` | `String` | No | The dispute_id of the offset item. |

**Returns:** `Disputes`

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[Dispute]` | List of Disputes. |
| `total_row_count` | `Int` | Total number of rows matching the query. |


**Dispute fields:**

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Int` | The amount of the transaction in dispute. |
| `dispute_date` | `AWSDateTime` | The date the dispute was created. |
| `dispute_id` | `String` | The Pay Theory unique dispute identifier. |
| `evidence_last_send_date` | `AWSDateTime` | The last date evidence was sent to the processor. If no evidence was sent, this will be null. |
| `expiration_date` | `AWSDateTime` | The final date to submit evidence to contest a dispute. |
| `merchant_uid` | `ID` | The Pay Theory unique identifier assigned to the merchant that the dispute belongs to. |
| `status` | `DisputeStatus` | The status of the dispute. |
| `reason` | `DisputeReason` | The reason code for the dispute as passed by the card issuer. |
| `reason_message` | `String` | A more detailed reason provided by the card issuer for the dispute. |
| `settlement_deposit_batch` | `String` | The settlement batch number where funds were deposited into the merchants account if a dispute is WON. |
| `settlement_withdrawal_batch` | `String` | The settlement batch number where funds were withdrawn from the merchants account for the dispute. |
| `transaction` | `Transaction` | The transaction object for the transaction that is in dispute. More information on the transaction object can be found here. |
| `updated_date` | `AWSDateTime` | The date the dispute was last updated. |
| `updated_row_at` | `AWSDateTime` | The date the dispute was last updated in the database. |


**DisputeStatus values:**

| DisputeStatus Value | Description |
| --- | --- |
| `INQUIRY` | The dispute is in the inquiry stage. The cardholder has requested more information about the charge. |
| `LOST` | The dispute has been lost. The cardholder has won the dispute and the funds have been withdrawn from the merchants account. |
| `PENDING` | The dispute is in the pending stage. The cardholder has requested a chargeback. |
| `WON` | The dispute has been won. The merchant has won the dispute and the funds have been deposited into the merchants account. |

**DisputeReason values:**

| DisputeReason Value | Description |
| --- | --- |
| `CLERICAL` | — |
| `FRAUD` | — |
| `INQUIRY` | — |
| `QUALITY` | — |
| `TECHNICAL` | — |

**Transaction fields:**

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Customer defined account code for the transaction. |
| `ach_return_details` | `AchReturnDetails` *(max depth reached)* | The details of the ACH return if any. |
| `additional_purchase_data` | `AdditionalPurchaseData` *(max depth reached)* | The additional purchase data. |
| `authorization_id` | `String` | The authorization id for the transaction. |
| `avs_status` | `String` | The AVS status for the transaction. |
| `currency` | `String` | The type of currency for the transaction. |
| `device_id` | `String` | — |
| `dispute_status` | `DisputeStatus` *(max depth reached)* | The status of the dispute if any. |
| `failure_reasons` | `[String]` | List of strings, if any, detailing the reason a transaction failed. See Failure Codes for a complete list of failure codes and descriptions. |
| `fee_mode` | `FeeMode` *(max depth reached)* | The fee mode on the transaction. |
| `fees` | `Int` | The amount of the fees charged for the transaction. |
| `flag_for_review` | `TransactionReviewStatus` *(max depth reached)* | A status indiciator for any transactions that are in review. When a transaction is in review the funds will not settle to the merchant until resolved. |
| `gross_amount` | `Int` | The total amount of the transaction. |
| `invoice` | `Invoice` *(max depth reached)* | The invoice object for the transaction if any. |
| `is_settled` | `Boolean` | Whether the transaction has been settled. |
| `merchant` | `ListMerchant` *(max depth reached)* | The merchant object of the merchant the transaction belongs to. |
| `merchant_uid` | `String` | The Pay Theory unique identifier for the merchant the transaction is for. |
| `metadata` | `AWSJSON` | Custom defined JSON object to be stored with the transaction. |
| `net_amount` | `Int` | The total amount of the transaction after fees. |
| `parent_id` | `String` | The Pay Theory unique identifier for the parent transaction if any. |
| `payment_method` | `PaymentMethodToken` *(max depth reached)* | The payment method used to make the transaction. |
| `processor` | `String` | — |
| `recurring` | `RecurringPayment` *(max depth reached)* | The recurring payment that the transaction belongs to if any. |
| `reference` | `String` | Customer defined reference for the transaction. |
| `refund_reason` | `RefundReason` *(max depth reached)* | The reason for the refund if any. |
| `refund_voidable` | `Boolean` | Whether the refund can be voided. |
| `refunded_amount` | `Int` | The amount of the transaction that has been refunded if any. |
| `sale_id` | `String` | The sale id for the transaction if any. |
| `settlement_batch` | `Int` | The unique settlement batch number the transaction belongs to if settled. |
| `splits` | `[Split]` *(max depth reached)* | An array of split objects associated with this transaction, if any. |
| `status` | `TransactionStatus` *(max depth reached)* | The status of the transaction. |
| `timezone` | `String` | The timezone the transaction was made in. |
| `transaction_date` | `AWSDateTime` | The date the transaction was made. |
| `transaction_id` | `String` | The Pay Theory unique identifier for the transaction. |
| `transaction_type` | `TransactionType` *(max depth reached)* | The type of transfer that was made. |
| `updated_row_at` | `AWSDateTime` | The date and time the transaction was last updated. |

**Example: Example disputes**

Returns disputes.

```graphql
query Disputes($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  disputes(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
  items {
    dispute_id
    dispute_date
    amount
    evidence_last_send_date
    expiration_date
  }
  total_row_count
  }
}
```

```json
{
  "data": {
    "disputes": {
      "items": [
        {
          "dispute_id": "example",
          "dispute_date": "2025-01-01T00:00:00Z",
          "amount": 123,
          "evidence_last_send_date": "2025-01-01T00:00:00Z",
          "expiration_date": "2025-01-01T00:00:00Z"
        }
      ],
      "total_row_count": 123
    }
  }
}
```

