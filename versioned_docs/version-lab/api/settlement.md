---
sidebar_position: 7
sidebar_label: 'Settlement'
title: "Settlement"
---

# Settlement

Settlements are a batch of payments, disputes, and refunds that are grouped together and paid out to a merchant.

## The Settlement Object

```graphql
{
    currency: String
    gross_amount: Int @deprecated(reason: "Use gross_amount_64bit instead")
    gross_amount_64bit: String
    merchant_uid: String
    net_amount: Int @deprecated(reason: "Use net_amount_64bit instead")
    net_amount_64bit: String
    settlement_batch: Int
    settlement_date: AWSDateTime
    status: String
    transaction_debit_count: Int
    transaction_dispute_count: Int
    transaction_reversal_count: Int
    transfer_date: AWSDateTime
    total_adjustments: Int @deprecated(reason: "Use total_adjustments_64bit instead")
    total_adjustments_64bit: String
    total_fees: Int @deprecated(reason: "Use total_fees_64bit instead")
    total_fees_64bit: String
    updated_row_at: AWSDateTime
}
```

| Key                        | type   | description                                                                                                  |
|----------------------------|--------|--------------------------------------------------------------------------------------------------------------|
| currency                   | String | The currency of the settlement.                                                                              |
| ~~gross_amount~~           | Int    | The total amount of the settlement before any fees and adjustments.                                          |
| gross_amount_64bit         | String | The total amount of the settlement before any fees in a string format to support 64-bit Int                  |
| merchant_uid               | String | The Pay Theory unique identifier assigned to the merchant that the settlement belongs to.                    |
| ~~net_amount~~             | Int    | The total amount of the settlement after any fees and adjustments.                                           |
| net_amount_64bit           | String | The total amount of the settlement after any fees in a string format to support 64-bit Int                   |
| settlement_batch           | Int    | The unique settlement batch number.                                                                          |
| settlement_date            | String | The date the settlement was created in an ISO 8601 String format.                                            |
| status                     | String | The status of the settlement. Will be one of `PENDING`, `SUCCEEDED`, or `HOLD`.                          |
| transaction_debit_count    | Int    | The number of transactions of type DEBIT that were included in the settlement.                               |
| transaction_dispute_count  | Int    | The number of transactions of type DISPUTE that were included in the settlement.                             |
| transaction_reversal_count | Int    | The number of transactions of type REVERSAL that were included in the settlement.                            |
| transfer_date              | String | The date the settlement was transferred to the merchant in an ISO 8601 String format.                        |
| ~~total_adjustments~~      | Int    | The total amount of adjustments that were applied to the settlement.                                         |
| total_adjustments_64bit    | String | The total amount of adjustments that were applied to the settlement in a string format to support 64-bit Int |
| ~~total_fees~~             | Int    | The total amount of fees that were applied to the settlement.                                                |
| total_fees_64bit           | String | The total amount of fees that were applied to the settlement in a string format to support 64-bit Int        |
| updated_row_at             | String | The date the settlement was last updated in an ISO 8601 String format.                                       |

:::note Deprecations
The `@deprecated` directive is used to indicate that the field is deprecated and will be removed in a future version.
GraphQL does not support Int64, so we use a string to support 64-bit Integers.
A 32-bit Int is between 2,147,483,647 and -2,147,483,648. Any value outside of this range will be passed in as a 0 to the deprecated Int fields to avoid the call failing.
:::

***

## The Available Funds Balance Object

```graphql
{
    instructional_hold_balance: String!
    reserve_balance: String!
    instruction_window_status: WindowStatus!
    instructional_hold_balance_updated: Boolean!
}
```

| Key                             | type        | description                                                                 |
|---------------------------------|-------------|-----------------------------------------------------------------------------|
| instructional_hold_balance      | String      | Available funds held for instructional funding, in cents as a 64-bit string. |
| reserve_balance                 | String      | Reserve balance for the merchant, in cents as a 64-bit string.              |
| instruction_window_status       | WindowStatus | The current instruction window status.                                    |
| instructional_hold_balance_updated | Boolean    | Whether the latest instructional hold balance update has been applied.    |

### Window Status

- `OPEN` - The instruction window is open.
- `CLOSED` - The instruction window is closed.

***

## The Instruction Object

```graphql
{
    id: ID!
    merchant_uid: ID!
    date: AWSDate!
    amount: String!
    status: InstructionStatus!
    scheduled_processing_date: AWSDateTime!
    settlement_batch: Int
    metadata: AWSJSON
}
```

| Key                       | type              | description                                                                 |
|---------------------------|-------------------|-----------------------------------------------------------------------------|
| id                        | ID                | The unique instruction identifier.                                          |
| merchant_uid              | ID                | The Pay Theory unique identifier assigned to the merchant.                  |
| date                      | String            | The instruction date in ISO 8601 format.                                    |
| amount                    | String            | The instruction amount, in cents as a 64-bit string.                        |
| status                    | InstructionStatus | The current status of the instruction.                                      |
| scheduled_processing_date | String            | The scheduled processing date/time for the instruction (UTC).               |
| settlement_batch          | Int               | The settlement batch number assigned after processing (if any).             |
| metadata                  | AWSJSON           | Optional metadata attached to the instruction.                              |

### Instruction Status

- `CANCELED` - The instruction was canceled.
- `FAILED` - The instruction failed to process.
- `PENDING` - The instruction is scheduled for processing.
- `PROCESSED` - The instruction was processed successfully.

***

## The Funding Transfer Object

```graphql
{
    id: ID!
    merchant_uid: ID!
    amount: String!
    origin: FundingTransferEndpoint!
    destination: FundingTransferEndpoint!
    status: TransferStatus!
    reason: FundingTransferReason!
    transfer_date: AWSDateTime!
    funds_received_date: AWSDateTime
    payment_method_id: ID!
    processor_transfer_id: ID
    parent_id: ID
    settlement_batch: Int!
    reserve_account_type: ReserveAccountType
    ach_return: AWSJSON
    processor_data: AWSJSON
    reserve_reason_object: AWSJSON
    created_at: AWSDateTime!
    updated_at: AWSDateTime!
}
```

| Key                 | type              | description                                                                 |
|---------------------|-------------------|-----------------------------------------------------------------------------|
| id                  | ID                | The unique funding transfer identifier.                                     |
| merchant_uid        | ID                | The Pay Theory unique identifier assigned to the merchant.                  |
| amount              | String            | The transfer amount, in cents as a 64-bit string.                           |
| origin              | FundingTransferEndpoint | The origin endpoint for the funds. Funds will be debited from this endpoint.                                    |
| destination         | FundingTransferEndpoint | The destination endpoint for the funds. Funds will be credited to this endpoint.                               |
| status              | TransferStatus    | The transfer status.                                                        |
| reason              | FundingTransferReason | The reason for the transfer (net, gross, fees, reserve, etc.).          |
| transfer_date       | String            | The transfer date/time in ISO 8601 format.                                  |
| funds_received_date | String            | The date funds were received, if available.                                 |
| payment_method_id   | ID                | The payment method used for the transfer.                                   |
| processor_transfer_id | ID              | The processor transfer identifier, if applicable.                           |
| parent_id           | ID                | The parent transfer identifier, if applicable.                              |
| settlement_batch    | Int               | The settlement batch associated with the transfer.                          |
| reserve_account_type| ReserveAccountType | The reserve account type, if applicable.                                   |
| ach_return          | AWSJSON           | ACH return data related to the transfer, if any.                            |
| processor_data      | AWSJSON           | Processor-specific data for the transfer.                                   |
| reserve_reason_object | AWSJSON         | Reserve-related data for the transfer, if applicable.                       |
| created_at          | String            | The created date/time in ISO 8601 format.                                   |
| updated_at          | String            | The last updated date/time in ISO 8601 format.                              |

### Funding Transfer Endpoint

- `MERCHANT` - Funds move to or from the merchant.
- `PLATFORM` - Funds move to or from the platform.
- `SETTLEMENT_BATCH` - Funds move as part of a settlement batch.
- `RESERVE` - Funds move to or from reserve.

### Funding Transfer Reason

- `FEES` - Transfer for fees.
- `EXCEPTION` - Transfer for exceptions or adjustments.
- `GROSS` - Transfer based on gross settlement amounts.
- `NET` - Transfer based on net settlement amounts.
- `RESERVE` - Transfer related to reserve balances.

### Transfer Status

- `RETURNED` - The transfer was returned.
- `SUCCEEDED` - The transfer completed successfully.

### Reserve Account Type

- `ACH` - Reserve balance for ACH.
- `CARD` - Reserve balance for card.
- `COMBINED` - Combined reserve balance.

***

## Query Available Funds Balance

This query returns the instructional hold and reserve balances for a merchant, along with the instruction window status.

```graphql
query AvailableFundsBalance($merchant_uid: ID!) {
    availableFundsBalance(merchant_uid: $merchant_uid) {
        instructional_hold_balance
        reserve_balance
        instruction_window_status
        instructional_hold_balance_updated
    }
}
```

**Parameters**

| Key          | type | description                                                        |
|--------------|------|--------------------------------------------------------------------|
| merchant_uid | ID   | The Pay Theory unique identifier assigned to the merchant.         |

**Returns**

```json
{
    "data": {
        "availableFundsBalance": [
            {
                "instructional_hold_balance": "150000",
                "reserve_balance": "50000",
                "instruction_window_status": "OPEN",
                "instructional_hold_balance_updated": true
            }
        ]
    }
}
```

| Key                    | type                   | description                                                                 |
|------------------------|------------------------|-----------------------------------------------------------------------------|
| availableFundsBalance | [AvailableFundsBalance] | The list of balances returned for the merchant (typically a single item). |

***

## Query Settlement Instructions

```graphql
query Instruction($merchant_uid: ID!, $date: AWSDate!) {
    instruction(merchant_uid: $merchant_uid, date: $date) {
        id
        merchant_uid
        date
        amount
        status
        scheduled_processing_date
        settlement_batch
        metadata
    }
}
```

**Parameters**

| Key          | type    | description                                                        |
|--------------|---------|--------------------------------------------------------------------|
| merchant_uid | ID      | The Pay Theory unique identifier assigned to the merchant.         |
| date         | AWSDate | The instruction date in `YYYY-MM-DD` format (UTC).                  |

**Returns**

```json
{
    "data": {
        "instruction": [
            {
                "id": "inst_123",
                "status": "PENDING"
            }
        ]
    }
}
```

| Key         | type          | description                                                                  |
|-------------|---------------|------------------------------------------------------------------------------|
| instruction | [Instruction] | The list of instructions for the merchant/date (lab may return multiple).   |

***

## Query Funding Transfers

```graphql
query FundingTransfers($merchant_uid: ID!, $settlement_batch: Int!) {
    fundingTransfers(merchant_uid: $merchant_uid, settlement_batch: $settlement_batch) {
        transfers {
            id
            amount
            origin
            destination
            status
            reason
            transfer_date
            payment_method_id
            settlement_batch
        }
    }
}
```

**Parameters**

| Key              | type | description                                                               |
|------------------|------|---------------------------------------------------------------------------|
| merchant_uid     | ID   | The Pay Theory unique identifier assigned to the merchant.                |
| settlement_batch | Int  | The settlement batch number to fetch funding transfers for.               |

**Returns**

```json
{
    "data": {
        "fundingTransfers": {
            "transfers": [
                {
                    "id": "ft_123",
                    "amount": "100000",
                    "status": "SUCCEEDED"
                }
            ]
        }
    }
}
```

| Key      | type              | description                                     |
|----------|-------------------|-------------------------------------------------|
| transfers| [FundingTransfer] | The list of funding transfers for the batch.   |

***

## Create Settlement Instruction

This mutation creates an instructional funding request for a merchant.

```graphql
mutation CreateSettlementInstruction($input: CreateSettlementInstructionInput!) {
    createSettlementInstruction(input: $input) {
        instruction_id
        status
        scheduled_processing_date
        settlement_batch
        projected_reserve_balance
        metadata
    }
}
```

**Parameters**

| Key   | type                          | description                                             |
|-------|-------------------------------|---------------------------------------------------------|
| input | CreateSettlementInstructionInput | The instruction details to create.                   |

**CreateSettlementInstructionInput**

| Key          | type    | description                                                        |
|--------------|---------|--------------------------------------------------------------------|
| merchant_uid | ID      | The Pay Theory unique identifier assigned to the merchant.         |
| amount       | String  | The instruction amount, in cents as a 64-bit string.               |
| metadata     | AWSJSON | Optional metadata to attach to the instruction.                    |

**Returns**

```json
{
    "data": {
        "createSettlementInstruction": {
            "instruction_id": "inst_123",
            "status": "PENDING",
            "scheduled_processing_date": "2025-01-15T20:00:00.000Z",
            "projected_reserve_balance": "50000"
        }
    }
}
```

| Key                       | type    | description                                                                  |
|---------------------------|---------|------------------------------------------------------------------------------|
| instruction_id            | ID      | The unique instruction identifier.                                           |
| status                    | InstructionStatus | The instruction status.                                            |
| scheduled_processing_date | String  | The scheduled processing date/time in UTC.                                   |
| settlement_batch          | Int     | The settlement batch number once processed (if available).                   |
| projected_reserve_balance | String  | The projected reserve balance after instruction processing.                  |
| metadata                  | AWSJSON | Optional metadata returned from the instruction.                             |

:::note Instruction window
In sandbox/lab environments the instruction window is always open. In production, instructions are accepted only during the configured window (default 17:00-19:00 UTC).
:::

***

## Query Settlements
```js
{
    settlements(limit: Int, direction: MoveDirection, offset: String, offset_id: String, query: SqlQuery) {
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

| Key       | type          | description                                                                                |
|-----------|---------------|--------------------------------------------------------------------------------------------|
| limit     | Int           | The number of settlements to return.                                                       |
| direction | MoveDirection | The direction of the pagination. Makes sure the results are returned in the correct order. |
| offset    | String        | The value of the offset item for which the list is being sorted.                           |
| offset_id | String        | The `settlement_batch` of the offset item.                                                 |
| query     | SqlQuery   | The query to filter the settlements with based on Pay Theory defined data.                 |

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
| Key             | type         | description                                                                         |
|-----------------|--------------|-------------------------------------------------------------------------------------|
| items           | [Settlement] | The list of settlements that are returned from the query.                           |
| total_row_count | Int          | The total number of settlements that match the query. Used to help with pagination. |

## Create Batch Capture

This mutation will capture all `PENDING` transactions for a merchant in a batch and shortly after create a settlement for the merchant.

:::warning Sandbox Only
This mutation will only work in sandbox environments.
:::

```js
mutation {
    createBatchCapture(merchant_uid: String!): Boolean
}
```

**Parameters**

| Key          | type   | description                                                              |
|--------------|--------|--------------------------------------------------------------------------|
| merchant_uid | String | The Pay Theory unique identifier assigned to the merchant to batch for.  |

**Returns**

```js
{
    "data": {
        "createBatchCapture": true
    }
}
```

| Key               | type    | description                                            |
|-------------------|---------|--------------------------------------------------------|
| createBatchCapture| Boolean | Returns true if the batch capture was created successfully. |
