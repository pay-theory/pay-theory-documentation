# fundingTransfers

> **Group:** Settlement
> **Operation Type:** QUERY

Returns funding transfers.

## GraphQL Signature

```graphql
query fundingTransfers($merchant_uid: ID!, $settlement_batch: Int!) {
  fundingTransfers(merchant_uid: $merchant_uid, settlement_batch: $settlement_batch) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `ID!` | Yes | The Pay Theory unique identifier assigned to the merchant. |
| `settlement_batch` | `Int!` | Yes | The settlement batch number to fetch funding transfers for. |

## Return Type

**Returns:** `FundingTransfers`

| Field | Type | Description |
| --- | --- | --- |
| `transfers` | `[FundingTransfer!]!` | No description available. See type definition: FundingTransfer. |

## Examples

### Example fundingTransfers

Returns funding transfers.

**Query:**

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

**Variables:**

```json
{
  "merchant_uid": "id_123",
  "settlement_batch": 123
}
```

**Response:**

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


## Type Definitions

### FundingTransfers

Funding transfers object.

| Field | Type | Description |
| --- | --- | --- |
| `transfers` | `[FundingTransfer!]!` | No description available. See type definition: FundingTransfer. |

### FundingTransfer

Funding transfer object.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `ID!` | The unique funding transfer identifier. |
| `merchant_uid` | `ID!` | The Pay Theory unique identifier assigned to the merchant. |
| `amount` | `String!` | The transfer amount, in cents as a 64-bit string. |
| `origin` | `FundingTransferEndpoint!` | The origin endpoint for the funds. Funds will be debited from this endpoint. See type definition: FundingTransferEndpoint. |
| `destination` | `FundingTransferEndpoint!` | The destination endpoint for the funds. Funds will be credited to this endpoint. See type definition: FundingTransferEndpoint. |
| `status` | `TransferStatus!` | The transfer status. See type definition: TransferStatus. |
| `reason` | `FundingTransferReason!` | The reason for the transfer (net, gross, fees, reserve, etc.). See type definition: FundingTransferReason. |
| `transfer_date` | `AWSDateTime!` | The transfer date/time in ISO 8601 format. |
| `funds_received_date` | `AWSDateTime` | The date funds were received, if available. |
| `payment_method_id` | `ID!` | The payment method used for the transfer. |
| `parent_id` | `ID` | The parent transfer identifier, if applicable. |
| `settlement_batch` | `Int!` | The settlement batch associated with the transfer. |
| `reserve_account_type` | `ReserveAccountType` | The reserve account type, if applicable. See type definition: ReserveAccountType. |
| `ach_return` | `AWSJSON` | ACH return data related to the transfer, if any. |
| `reserve_reason_object` | `AWSJSON` | Reserve-related data for the transfer, if applicable. |
| `created_at` | `AWSDateTime!` | The created date/time in ISO 8601 format. |
| `updated_at` | `AWSDateTime!` | The last updated date/time in ISO 8601 format. |

### FundingTransferEndpoint

Possible values for funding transfer endpoint.

| FundingTransferEndpoint Value | Description |
| --- | --- |
| `MERCHANT` | Funds move to or from the merchant. |
| `PLATFORM` | Funds move to or from the platform. |
| `SETTLEMENT_BATCH` | Funds move as part of a settlement batch. |
| `RESERVE` | Funds move to or from reserve. |

### TransferStatus

Possible values for transfer status.

| TransferStatus Value | Description |
| --- | --- |
| `RETURNED` | The transfer was returned. |
| `SUCCEEDED` | The transfer completed successfully. |

### FundingTransferReason

Possible values for funding transfer reason.

| FundingTransferReason Value | Description |
| --- | --- |
| `FEES` | Transfer for fees. |
| `EXCEPTION` | Transfer for exceptions or adjustments. |
| `GROSS` | Transfer based on gross settlement amounts. |
| `NET` | Transfer based on net settlement amounts. |
| `RESERVE` | Transfer related to reserve balances. |

### ReserveAccountType

Possible values for reserve account type.

| ReserveAccountType Value | Description |
| --- | --- |
| `ACH` | Reserve balance for ACH. |
| `CARD` | Reserve balance for card. |
| `COMBINED` | Combined reserve balance. |