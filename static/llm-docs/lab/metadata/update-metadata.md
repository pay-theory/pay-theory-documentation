# updateMetadata

> **Group:** Metadata
> **Operation Type:** MUTATION

Updates metadata for an item.

## GraphQL Signature

```graphql
mutation updateMetadata($id: String!, $metadata_associate: MetadataAssociate!, $merchant_uid: String!, $metadata: AWSJSON!) {
  updateMetadata(id: $id, metadata_associate: $metadata_associate, merchant_uid: $merchant_uid, metadata: $metadata)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String!` | Yes | The id of the item you want to update metadata for. |
| `metadata_associate` | `MetadataAssociate!` | Yes | The type of item you want to update metadata for. Options are: AUTHORIZATION, INVOICE, PAYMENT_METHOD_TOKEN, PAYMENT_SESSION, PAYOR, RECURRING, TRANSACTION, SALE |
| `merchant_uid` | `String!` | Yes | The Pay Theory merchant_uid of the item you want to update metadata for. |
| `metadata` | `AWSJSON!` | Yes | The metadata you want to update the item with. Any keys passed in will overwrite the existing metadata. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example updateMetadata

Updates metadata for an item.

**Query:**

```graphql
mutation UpdateMetadata($id: String!, $metadata_associate: MetadataAssociate!, $merchant_uid: String!, $metadata: AWSJSON!) {
  updateMetadata(id: $id, metadata_associate: $metadata_associate, merchant_uid: $merchant_uid, metadata: $metadata)
}
```

**Variables:**

```json
{
  "id": "example",
  "metadata_associate": "AUTHORIZATION",
  "merchant_uid": "example",
  "metadata": {
    "key": "value"
  }
}
```

**Response:**

```json
{
  "data": {
    "updateMetadata": true
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