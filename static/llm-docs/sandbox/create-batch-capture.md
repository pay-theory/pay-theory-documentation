# createBatchCapture

> **Group:** Sandbox
> **Operation Type:** MUTATION

This mutation will capture all PENDING transactions for a merchant in a batch and shortly after create a settlement for the merchant.

## GraphQL Signature

```graphql
mutation createBatchCapture($merchant_uid: String!) {
  createBatchCapture(merchant_uid: $merchant_uid)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `String!` | Yes | The Pay Theory unique identifier assigned to the merchant to batch for. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example createBatchCapture

This mutation will capture all PENDING transactions for a merchant in a batch and shortly after create a settlement for the merchant.

**Query:**

```graphql
mutation CreateBatchCapture($merchant_uid: String!) {
  createBatchCapture(merchant_uid: $merchant_uid)
}
```

**Variables:**

```json
{
  "merchant_uid": "example"
}
```

**Response:**

```json
{
  "data": {
    "createBatchCapture": true
  }
}
```