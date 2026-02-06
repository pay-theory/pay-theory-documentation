# Settlement

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### settlements

Returns settlements.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `SqlQuery` | No | The query to filter the settlements with based on Pay Theory defined data. |
| `limit` | `Int` | No | The number of settlements to return. |
| `offset` | `String` | No | The value of the offset item for which the list is being sorted. |
| `direction` | `MoveDirection` | No | The direction of the pagination. Makes sure the results are returned in the correct order. |
| `offset_id` | `String` | No | The settlement_batch of the offset item. |

**Returns:** `Settlements`

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[Settlement]` | List of items. |
| `total_row_count` | `Int` | Total number of rows matching the query. |


**Settlement fields:**

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `String` | The currency of the settlement. |
| `gross_amount` | `Int` | The gross amount. (deprecated: Use gross_amount_64bit instead) |
| `gross_amount_64bit` | `String` | The total amount of the settlement before any fees in a string format to support 64-bit Int |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the settlement belongs to. |
| `net_amount` | `Int` | The net amount. (deprecated: Use net_amount_64bit instead) |
| `net_amount_64bit` | `String` | The total amount of the settlement after any fees in a string format to support 64-bit Int |
| `settlement_batch` | `Int` | The unique settlement batch number. |
| `settlement_date` | `AWSDateTime` | The date the settlement was created in an ISO 8601 String format. |
| `status` | `String` | The status of the settlement. Will be one of PENDING, SUCCEEDED, or HOLD. |
| `transaction_debit_count` | `Int` | The number of transactions of type DEBIT that were included in the settlement. |
| `transaction_dispute_count` | `Int` | The number of transactions of type DISPUTE that were included in the settlement. |
| `transaction_reversal_count` | `Int` | The number of transactions of type REVERSAL that were included in the settlement. |
| `transfer_date` | `AWSDateTime` | The date the settlement was transferred to the merchant in an ISO 8601 String format. |
| `total_adjustments` | `Int` | The total adjustments. (deprecated: Use total_adjustments_64bit instead) |
| `total_adjustments_64bit` | `String` | The total amount of adjustments that were applied to the settlement in a string format to support 64-bit Int |
| `total_fees` | `Int` | The total fees. (deprecated: Use total_fees_64bit instead) |
| `total_fees_64bit` | `String` | The total amount of fees that were applied to the settlement in a string format to support 64-bit Int |
| `updated_row_at` | `AWSDateTime` | The date the settlement was last updated in an ISO 8601 String format. |

**Example: Example settlements**

Returns settlements.

```graphql
query Settlements($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  settlements(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
  items {
    merchant_uid
    settlement_date
    currency
    gross_amount
    gross_amount_64bit
  }
  total_row_count
  }
}
```

```json
{
  "data": {
    "settlements": {
      "items": [
        {
          "merchant_uid": "example",
          "settlement_date": "2025-01-01T00:00:00Z",
          "currency": "example",
          "gross_amount": 123,
          "gross_amount_64bit": "example"
        }
      ],
      "total_row_count": 123
    }
  }
}
```


### availableFundsBalance

This query returns the instructional hold and reserve balances for a merchant, along with the instruction window status.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `ID!` | Yes | The Pay Theory unique identifier assigned to the merchant. |

**Returns:** `[AvailableFundsBalance]`

| Field | Type | Description |
| --- | --- | --- |
| `instructional_hold_balance` | `String!` | Available funds held for instructional funding, in cents as a 64-bit string. |
| `reserve_balance` | `String!` | Reserve balance for the merchant, in cents as a 64-bit string. |
| `instruction_window_status` | `WindowStatus!` | The current instruction window status. |
| `instructional_hold_balance_updated` | `Boolean!` | Whether the latest instructional hold balance update has been applied. |


**WindowStatus values:**

| WindowStatus Value | Description |
| --- | --- |
| `OPEN` | The instruction window is open. |
| `CLOSED` | The instruction window is closed. |

**Example: Example availableFundsBalance**

This query returns the instructional hold and reserve balances for a merchant, along with the instruction window status.

```graphql
query AvailableFundsBalance($merchant_uid: ID!) {
  availableFundsBalance(merchant_uid: $merchant_uid) {
  instructional_hold_balance_updated
  instruction_window_status
  instructional_hold_balance
  reserve_balance
  }
}
```

```json
{
  "data": {
    "availableFundsBalance": {
      "instructional_hold_balance_updated": true,
      "instruction_window_status": "example",
      "instructional_hold_balance": "example",
      "reserve_balance": "example"
    }
  }
}
```


### fundingTransfers

Returns funding transfers.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `ID!` | Yes | The Pay Theory unique identifier assigned to the merchant. |
| `settlement_batch` | `Int!` | Yes | The settlement batch number to fetch funding transfers for. |

**Returns:** `FundingTransfers`

| Field | Type | Description |
| --- | --- | --- |
| `transfers` | `[FundingTransfer!]!` | — |


**FundingTransfer fields:**

| Field | Type | Description |
| --- | --- | --- |
| `id` | `ID!` | The unique funding transfer identifier. |
| `merchant_uid` | `ID!` | The Pay Theory unique identifier assigned to the merchant. |
| `amount` | `String!` | The transfer amount, in cents as a 64-bit string. |
| `origin` | `FundingTransferEndpoint!` | The origin endpoint for the funds. Funds will be debited from this endpoint. |
| `destination` | `FundingTransferEndpoint!` | The destination endpoint for the funds. Funds will be credited to this endpoint. |
| `status` | `TransferStatus!` | The transfer status. |
| `reason` | `FundingTransferReason!` | The reason for the transfer (net, gross, fees, reserve, etc.). |
| `transfer_date` | `AWSDateTime!` | The transfer date/time in ISO 8601 format. |
| `funds_received_date` | `AWSDateTime` | The date funds were received, if available. |
| `payment_method_id` | `ID!` | The payment method used for the transfer. |
| `parent_id` | `ID` | The parent transfer identifier, if applicable. |
| `settlement_batch` | `Int!` | The settlement batch associated with the transfer. |
| `reserve_account_type` | `ReserveAccountType` | The reserve account type, if applicable. |
| `ach_return` | `AWSJSON` | ACH return data related to the transfer, if any. |
| `reserve_reason_object` | `AWSJSON` | Reserve-related data for the transfer, if applicable. |
| `created_at` | `AWSDateTime!` | The created date/time in ISO 8601 format. |
| `updated_at` | `AWSDateTime!` | The last updated date/time in ISO 8601 format. |


**FundingTransferEndpoint values:**

| FundingTransferEndpoint Value | Description |
| --- | --- |
| `MERCHANT` | Funds move to or from the merchant. |
| `PLATFORM` | Funds move to or from the platform. |
| `SETTLEMENT_BATCH` | Funds move as part of a settlement batch. |
| `RESERVE` | Funds move to or from reserve. |

**TransferStatus values:**

| TransferStatus Value | Description |
| --- | --- |
| `RETURNED` | The transfer was returned. |
| `SUCCEEDED` | The transfer completed successfully. |

**FundingTransferReason values:**

| FundingTransferReason Value | Description |
| --- | --- |
| `FEES` | Transfer for fees. |
| `EXCEPTION` | Transfer for exceptions or adjustments. |
| `GROSS` | Transfer based on gross settlement amounts. |
| `NET` | Transfer based on net settlement amounts. |
| `RESERVE` | Transfer related to reserve balances. |

**ReserveAccountType values:**

| ReserveAccountType Value | Description |
| --- | --- |
| `ACH` | Reserve balance for ACH. |
| `CARD` | Reserve balance for card. |
| `COMBINED` | Combined reserve balance. |

**Example: Example fundingTransfers**

Returns funding transfers.

```graphql
query FundingTransfers($merchant_uid: ID!, $settlement_batch: Int!) {
  fundingTransfers(merchant_uid: $merchant_uid, settlement_batch: $settlement_batch) {
  transfers {
    id
    transfer_date
    ach_return
    amount
    created_at
  }
  }
}
```

```json
{
  "data": {
    "fundingTransfers": {
      "transfers": [
        {
          "id": "id_123",
          "transfer_date": "2025-01-01T00:00:00Z",
          "ach_return": {
            "key": "value"
          },
          "amount": "example",
          "created_at": "2025-01-01T00:00:00Z"
        }
      ]
    }
  }
}
```


### instruction

Returns instruction.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `ID!` | Yes | The Pay Theory unique identifier assigned to the merchant. |
| `date` | `AWSDate!` | Yes | The instruction date in YYYY-MM-DD format (UTC). |

**Returns:** `[Instruction]`

| Field | Type | Description |
| --- | --- | --- |
| `id` | `ID!` | The unique instruction identifier. |
| `merchant_uid` | `ID!` | The Pay Theory unique identifier assigned to the merchant. |
| `date` | `AWSDate!` | The instruction date in YYYY-MM-DD format (UTC). |
| `amount` | `String!` | The instruction amount, in cents as a 64-bit string. |
| `status` | `InstructionStatus!` | The current status of the instruction. |
| `scheduled_processing_date` | `AWSDateTime!` | The scheduled processing date/time for the instruction (UTC). |
| `settlement_batch` | `Int` | The settlement batch number assigned after processing (if any). |
| `metadata` | `AWSJSON` | Optional metadata attached to the instruction. |


**InstructionStatus values:**

| InstructionStatus Value | Description |
| --- | --- |
| `CANCELED` | The instruction was canceled. |
| `FAILED` | The instruction failed to process. |
| `PENDING` | The instruction is scheduled for processing. |
| `PROCESSED` | The instruction was processed successfully. |

**Example: Example instruction**

Returns instruction.

```graphql
query Instruction($merchant_uid: ID!, $date: AWSDate!) {
  instruction(merchant_uid: $merchant_uid, date: $date) {
  id
  date
  amount
  merchant_uid
  metadata
  }
}
```

```json
{
  "data": {
    "instruction": {
      "id": "id_123",
      "date": "2025-01-01",
      "amount": "example",
      "merchant_uid": "id_123",
      "metadata": {
        "key": "value"
      }
    }
  }
}
```


## Mutations

### createBatchCapture

This mutation will capture all PENDING transactions for a merchant in a batch and shortly after create a settlement for the merchant.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `String!` | Yes | The Pay Theory unique identifier assigned to the merchant to batch for. |

**Returns:** `Boolean`


**Example: Example createBatchCapture**

This mutation will capture all PENDING transactions for a merchant in a batch and shortly after create a settlement for the merchant.

```graphql
mutation CreateBatchCapture($merchant_uid: String!) {
  createBatchCapture(merchant_uid: $merchant_uid)
}
```

```json
{
  "data": {
    "createBatchCapture": true
  }
}
```

