# deleteMetadata

> **Group:** Metadata
> **Operation Type:** MUTATION

Deletes metadata for an item.

## GraphQL Signature

```graphql
mutation deleteMetadata($id: String!, $metadata_associate: MetadataAssociate!, $merchant_uid: String!, $metadata_keys: [String]!) {
  deleteMetadata(id: $id, metadata_associate: $metadata_associate, merchant_uid: $merchant_uid, metadata_keys: $metadata_keys)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String!` | Yes | The id of the item you want to delete metadata for. |
| `metadata_associate` | `MetadataAssociate!` | Yes | The type of item you want to delete metadata for. Options are: AUTHORIZATION, INVOICE, PAYMENT_METHOD_TOKEN, PAYMENT_SESSION, PAYOR, RECURRING, TRANSACTION, SALE |
| `merchant_uid` | `String!` | Yes | The Pay Theory merchant_uid of the item you want to delete metadata for. |
| `metadata_keys` | `[String]!` | Yes | The keys of the metadata you want to delete. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example deleteMetadata

Deletes metadata for an item.

**Query:**

```graphql
mutation DeleteMetadata($id: String!, $metadata_associate: MetadataAssociate!, $merchant_uid: String!, $metadata_keys: [String]!) {
  deleteMetadata(id: $id, metadata_associate: $metadata_associate, merchant_uid: $merchant_uid, metadata_keys: $metadata_keys)
}
```

**Variables:**

```json
{
  "id": "example",
  "metadata_associate": "AUTHORIZATION",
  "merchant_uid": "example",
  "metadata_keys": [
    "example"
  ]
}
```

**Response:**

```json
{
  "data": {
    "deleteMetadata": true
  }
}
```


## Type Definitions

### MetadataAssociate

These are the types of items you can associate metadata with.

| MetadataAssociate Value | Description |
| --- | --- |
| `AUTHORIZATION` | Metadata associated with an authorization. |
| `INVOICE` | Metadata associated with an invoice. |
| `MERCHANT` | Metadata associated with a merchant. |
| `PAYMENT_INTENT` | Metadata associated with a payment intent. |
| `PAYMENT_METHOD_TOKEN` | Metadata associated with a payment method token. |
| `PAYMENT_SESSION` | Metadata associated with a payment session. |
| `PAYOR` | Metadata associated with a payor. |
| `RECURRING` | Metadata associated with a recurring. |
| `TRANSACTION` | Metadata associated with a transaction. |
| `SALE` | Metadata associated with a sale. |
| `SPLIT` | Metadata associated with a split. |