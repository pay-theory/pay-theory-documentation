# updateWebhook

> **Group:** Webhooks
> **Operation Type:** MUTATION

To update a webhook, you can use a mutation like the following:

## GraphQL Signature

```graphql
mutation updateWebhook($endpoint: String!, $name: String, $is_active: Boolean) {
  updateWebhook(endpoint: $endpoint, name: $name, is_active: $is_active)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `endpoint` | `String!` | Yes | The URL of the webhook you want to update. This cannot be changed |
| `name` | `String` | No | The new name you want to give the webhook |
| `is_active` | `Boolean` | No | Whether the webhook should be active or not |

## Return Type

**Returns:** `Boolean!`

## Examples

### Example updateWebhook

To update a webhook, you can use a mutation like the following:

**Query:**

```graphql
mutation UpdateWebhook($endpoint: String!, $name: String, $is_active: Boolean) {
  updateWebhook(endpoint: $endpoint, name: $name, is_active: $is_active)
}
```

**Variables:**

```json
{
  "endpoint": "example",
  "name": "example",
  "is_active": true
}
```

**Response:**

```json
{
  "data": {
    "updateWebhook": true
  }
}
```