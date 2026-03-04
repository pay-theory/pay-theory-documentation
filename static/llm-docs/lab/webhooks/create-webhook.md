# createWebhook

> **Group:** Webhooks
> **Operation Type:** MUTATION

To create a webhook, you need to provide the endpoint and a name for the webhook using the following mutation:

## GraphQL Signature

```graphql
mutation createWebhook($endpoint: String!, $name: String!) {
  createWebhook(endpoint: $endpoint, name: $name)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `endpoint` | `String!` | Yes | The URL the event will be sent to. |
| `name` | `String!` | Yes | The name you want to give the webhook for reference. |

## Return Type

**Returns:** `Boolean!`

## Examples

### Example createWebhook

To create a webhook, you need to provide the endpoint and a name for the webhook using the following mutation:

**Query:**

```graphql
mutation CreateWebhook($endpoint: String!, $name: String!) {
  createWebhook(endpoint: $endpoint, name: $name)
}
```

**Variables:**

```json
{
  "endpoint": "example",
  "name": "example"
}
```

**Response:**

```json
{
  "data": {
    "createWebhook": true
  }
}
```