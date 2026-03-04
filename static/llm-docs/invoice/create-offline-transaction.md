# createOfflineTransaction

> **Group:** Invoice
> **Operation Type:** MUTATION

This call is used to create an offline transaction for an invoice. Offline transactions are used to track payments that are made outside Pay Theory toward an Invoice.

## GraphQL Signature

```graphql
mutation createOfflineTransaction($input: OfflineTransactionInput!) {
  createOfflineTransaction(input: $input) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `OfflineTransactionInput!` | Yes | The input object that contains all of the information needed to create an offline transaction. |

## Return Type

**Returns:** `OfflineTransaction`

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Int` | The amount of the offline transaction. |
| `instance_id` | `String` | The Pay Theory unique identifier for the offline transaction. |
| `invoice_id` | `String` | The Pay Theory unique identifier for the invoice that the offline transaction is being applied to. |
| `note` | `String` | A note that can be added to the offline transaction. This is a custom value that can be used to store information about the offline transaction. |
| `transaction_date` | `AWSDate` | The date that the offline transaction was made. |
| `type` | `OfflineTransactionType` | The type of offline transaction. It can be one of the following: ACH, CARD, CASH, OTHER. See type definition: OfflineTransactionType. |

## Examples

### Example createOfflineTransaction

This call is used to create an offline transaction for an invoice. Offline transactions are used to track payments that are made outside Pay Theory toward an Invoice.

**Query:**

```graphql
mutation CreateOfflineTransaction($input: OfflineTransactionInput!) {
  createOfflineTransaction(input: $input) {
  instance_id
  transaction_date
  amount
  invoice_id
  note
  }
}
```

**Variables:**

```json
{
  "input": {
    "amount": 123,
    "invoice_id": "example",
    "note": "example",
    "transaction_date": "2025-01-01",
    "type": "ACH"
  }
}
```

**Response:**

```json
{
  "data": {
    "createOfflineTransaction": {
      "instance_id": "example",
      "transaction_date": "2025-01-01",
      "amount": 123,
      "invoice_id": "example",
      "note": "example"
    }
  }
}
```


## Type Definitions

### OfflineTransactionInput

Input for creating an offline transaction.

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Int!` | The amount of the offline transaction. |
| `invoice_id` | `String!` | The Pay Theory unique identifier for the invoice that the offline transaction is being applied to. |
| `note` | `String` | A note that can be added to the offline transaction. This is a custom value that can be used to store information about the offline transaction. |
| `transaction_date` | `AWSDate!` | The date that the offline transaction was made. |
| `type` | `OfflineTransactionType!` | The type of offline transaction. It can be one of the following: ACH, CARD, CASH, OTHER. See type definition: OfflineTransactionType. |

### OfflineTransactionType

Possible values for offline transaction type.

| OfflineTransactionType Value | Description |
| --- | --- |
| `ACH` | Represents ACH. |
| `CARD` | Represents card. |
| `CASH` | Represents cash. |
| `OTHER` | Represents other. |

### OfflineTransaction

Offline transaction object.

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Int` | The amount of the offline transaction. |
| `instance_id` | `String` | The Pay Theory unique identifier for the offline transaction. |
| `invoice_id` | `String` | The Pay Theory unique identifier for the invoice that the offline transaction is being applied to. |
| `note` | `String` | A note that can be added to the offline transaction. This is a custom value that can be used to store information about the offline transaction. |
| `transaction_date` | `AWSDate` | The date that the offline transaction was made. |
| `type` | `OfflineTransactionType` | The type of offline transaction. It can be one of the following: ACH, CARD, CASH, OTHER. See type definition: OfflineTransactionType. |