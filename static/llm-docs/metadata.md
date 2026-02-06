# Metadata

> Part of [GraphQL API](./index.md) GraphQL API

---

## Mutations

### updateMetadata

Updates metadata for an item.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String!` | Yes | The id of the item you want to update metadata for. |
| `metadata_associate` | `MetadataAssociate!` | Yes | The type of item you want to update metadata for. Options are: AUTHORIZATION, INVOICE, PAYMENT_METHOD_TOKEN, PAYMENT_SESSION, PAYOR, RECURRING, TRANSACTION, SALE |
| `merchant_uid` | `String!` | Yes | The Pay Theory merchant_uid of the item you want to update metadata for. |
| `metadata` | `AWSJSON!` | Yes | The metadata you want to update the item with. Any keys passed in will overwrite the existing metadata. |

**Returns:** `Boolean`


**Example: Example updateMetadata**

Updates metadata for an item.

```graphql
mutation UpdateMetadata($id: String!, $metadata_associate: MetadataAssociate!, $merchant_uid: String!, $metadata: AWSJSON!) {
  updateMetadata(id: $id, metadata_associate: $metadata_associate, merchant_uid: $merchant_uid, metadata: $metadata)
}
```

```json
{
  "data": {
    "updateMetadata": true
  }
}
```


### deleteMetadata

Deletes metadata for an item.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String!` | Yes | The id of the item you want to delete metadata for. |
| `metadata_associate` | `MetadataAssociate!` | Yes | The type of item you want to delete metadata for. Options are: AUTHORIZATION, INVOICE, PAYMENT_METHOD_TOKEN, PAYMENT_SESSION, PAYOR, RECURRING, TRANSACTION, SALE |
| `merchant_uid` | `String!` | Yes | The Pay Theory merchant_uid of the item you want to delete metadata for. |
| `metadata_keys` | `[String]!` | Yes | The keys of the metadata you want to delete. |

**Returns:** `Boolean`


**Example: Example deleteMetadata**

Deletes metadata for an item.

```graphql
mutation DeleteMetadata($id: String!, $metadata_associate: MetadataAssociate!, $merchant_uid: String!, $metadata_keys: [String]!) {
  deleteMetadata(id: $id, metadata_associate: $metadata_associate, merchant_uid: $merchant_uid, metadata_keys: $metadata_keys)
}
```

```json
{
  "data": {
    "deleteMetadata": true
  }
}
```



## Types Reference

### MetadataAssociate

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
