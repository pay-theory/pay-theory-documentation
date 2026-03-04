# deleteWebhook

> **Group:** Webhooks
> **Operation Type:** MUTATION

To delete a webhook, you can use the following mutation:

## GraphQL Signature

```graphql
mutation deleteWebhook($endpoint: String!) {
  deleteWebhook(endpoint: $endpoint)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `endpoint` | `String!` | Yes | The URL of the webhook you want to delete. |

## Return Type

**Returns:** `Boolean!`

## Examples

### Example deleteWebhook

To delete a webhook, you can use the following mutation:

**Query:**

```graphql
mutation DeleteWebhook($endpoint: String!) {
  deleteWebhook(endpoint: $endpoint)
}
```

**Variables:**

```json
{
  "endpoint": "example"
}
```

**Response:**

```json
{
  "data": {
    "deleteWebhook": true
  }
}
```