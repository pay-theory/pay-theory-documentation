---
sidebar_position: 9
sidebar_label: 'Sandbox'
title: "Sandbox"
---

# Sandbox

Sandbox-only GraphQL mutations for triggering test events in lab environments.

:::warning Sandbox Only
These mutations only work with sandbox API keys (paytheorylab or paytheorystudy).
:::

***

## Create Sandbox ACH Return

Use this mutation to create an ACH return for a completed ACH transaction.

```graphql
mutation CreateSandboxAchReturn($input: CreateSandboxAchReturnInput!) {
    createSandboxAchReturn(input: $input) {
        success
        ach_return_transaction_id
        return_code
    }
}
```

**Parameters**

| Key   | type                       | description                          |
|-------|----------------------------|--------------------------------------|
| input | CreateSandboxAchReturnInput| The ACH return request details.      |

**CreateSandboxAchReturnInput**

| Key            | type          | description                                           |
|----------------|---------------|-------------------------------------------------------|
| transaction_id | String!       | The ACH transaction ID to return.                     |
| return_code    | AchReturnCode!| The ACH return code (for example, `R01`, `R02`, `R03`). |

**Returns**

```json
{
    "data": {
        "createSandboxAchReturn": {
            "success": true,
            "ach_return_transaction_id": "pt_txn_return_123",
            "return_code": "R01"
        }
    }
}
```

| Key                      | type    | description                                 |
|--------------------------|---------|---------------------------------------------|
| success                  | Boolean | Whether the return was created successfully. |
| ach_return_transaction_id| String  | The transaction ID of the ACH return.       |
| return_code              | String  | The ACH return code used.                   |

:::note ACH return codes
Use standard ACH return codes from the `AchReturnCode` enum (R01-R85). Common test codes include `R01` (insufficient funds) and `R02` (account closed).
:::

***

## Create Sandbox Dispute

Use this mutation to create a dispute for a card transaction.

```graphql
mutation CreateSandboxDispute($input: CreateSandboxDisputeInput!) {
    createSandboxDispute(input: $input) {
        success
        dispute_id
        transaction_id
    }
}
```

**Parameters**

| Key   | type                     | description                         |
|-------|--------------------------|-------------------------------------|
| input | CreateSandboxDisputeInput| The dispute creation details.       |

**CreateSandboxDisputeInput**

| Key            | type           | description                                             |
|----------------|----------------|---------------------------------------------------------|
| transaction_id | String!        | The card transaction ID to dispute.                     |
| reason         | DisputeReason! | The dispute reason. See [Dispute Reason](dispute#dispute-reason). |

**Returns**

```json
{
    "data": {
        "createSandboxDispute": {
            "success": true,
            "dispute_id": "pt_disp_123",
            "transaction_id": "pt_txn_123"
        }
    }
}
```

| Key           | type    | description                                   |
|---------------|---------|-----------------------------------------------|
| success       | Boolean | Whether the dispute was created successfully. |
| dispute_id    | String  | The Pay Theory dispute identifier.            |
| transaction_id| String  | The transaction ID that is now in dispute.    |

***

## Update Sandbox Dispute Status

Use this mutation to move a dispute through its lifecycle.

```graphql
mutation UpdateSandboxDisputeStatus($input: UpdateSandboxDisputeStatusInput!) {
    updateSandboxDisputeStatus(input: $input) {
        success
    }
}
```

**Parameters**

| Key   | type                         | description                          |
|-------|------------------------------|--------------------------------------|
| input | UpdateSandboxDisputeStatusInput | The dispute status update details. |

**UpdateSandboxDisputeStatusInput**

| Key        | type           | description                                         |
|------------|----------------|-----------------------------------------------------|
| dispute_id | String!        | The Pay Theory dispute identifier.                  |
| status     | DisputeStatus! | The new dispute status. See [Dispute Status](dispute#dispute-status). |

**Returns**

```json
{
    "data": {
        "updateSandboxDisputeStatus": {
            "success": true
        }
    }
}
```

| Key     | type    | description                                   |
|---------|---------|-----------------------------------------------|
| success | Boolean | Whether the dispute status update succeeded.  |

:::note Status transitions
Supported transitions are `INQUIRY` to `PENDING`, and `PENDING` to `WON` or `LOST`. `WON` and `LOST` are terminal states.
:::

***

## Prepare Sandbox Settlement Batch

Prepare a settlement batch to lock in line items and calculate totals for a merchant.

```graphql
mutation PrepareSandboxSettlementBatch($input: PrepareSandboxSettlementBatchInput!) {
    prepareSandboxSettlementBatch(input: $input) {
        success
        prep_id
        merchant_uid
        debit_ids
        reversal_ids
        ach_return_ids
        dispute_withdrawal_ids
        dispute_deposit_ids
        split_ids
        calculated_gross_amount
        calculated_net_amount
        instructional_hold_balance
        reserve_balance
    }
}
```

**Parameters**

| Key   | type                         | description                         |
|-------|------------------------------|-------------------------------------|
| input | PrepareSandboxSettlementBatchInput | The batch prep details.         |

**PrepareSandboxSettlementBatchInput**

| Key          | type  | description                                      |
|--------------|-------|--------------------------------------------------|
| merchant_uid | ID!   | The Pay Theory unique identifier for the merchant. |

**Returns**

```json
{
    "data": {
        "prepareSandboxSettlementBatch": {
            "success": true,
            "prep_id": "prep_123",
            "merchant_uid": "mer_123",
            "calculated_gross_amount": 250000,
            "calculated_net_amount": 240000
        }
    }
}
```

| Key                       | type     | description                                                |
|---------------------------|----------|------------------------------------------------------------|
| success                   | Boolean  | Whether the prep record was created.                       |
| prep_id                   | ID       | The prep record identifier for the settlement batch.       |
| merchant_uid              | ID       | The Pay Theory unique identifier for the merchant.         |
| debit_ids                 | [String] | Debit transaction IDs included in the batch.               |
| reversal_ids              | [String] | Reversal transaction IDs included in the batch.            |
| ach_return_ids            | [String] | ACH return transaction IDs included in the batch.          |
| dispute_withdrawal_ids    | [String] | Dispute IDs for withdrawals included in the batch.         |
| dispute_deposit_ids       | [String] | Dispute IDs for deposits included in the batch.            |
| split_ids                 | [String] | Split IDs included in the batch.                           |
| calculated_gross_amount   | Int      | Calculated gross amount in cents.                          |
| calculated_net_amount     | Int      | Calculated net amount in cents.                            |
| instructional_hold_balance| Int      | Current instructional hold balance in cents, if available. |
| reserve_balance           | Int      | Current reserve balance in cents, if available.            |

***

## Create Sandbox Settlement

Create a settlement from a prepared sandbox batch.

```graphql
mutation CreateSandboxSettlement($input: CreateSandboxSettlementInput!) {
    createSandboxSettlement(input: $input) {
        success
    }
}
```

**Parameters**

| Key   | type                      | description                         |
|-------|---------------------------|-------------------------------------|
| input | CreateSandboxSettlementInput | The settlement creation details. |

**CreateSandboxSettlementInput**

| Key          | type | description                                       |
|--------------|------|---------------------------------------------------|
| merchant_uid | ID!  | The Pay Theory unique identifier for the merchant. |

**Returns**

```json
{
    "data": {
        "createSandboxSettlement": {
            "success": true
        }
    }
}
```

| Key     | type    | description                                  |
|---------|---------|----------------------------------------------|
| success | Boolean | Whether the settlement was created.          |

:::note Typical flow
Run `prepareSandboxSettlementBatch` first, then `createSandboxSettlement` to generate a full settlement in sandbox.
:::
