# poop

> **Group:** Webhooks
> **Operation Type:** QUERY

Returns webhooks.

## GraphQL Signature

```graphql
query poop($endpoint: String) {
  poop(endpoint: $endpoint) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `endpoint` | `String` | No | The URL the event will be sent to. If not passed in all webhooks will be returned |

## Return Type

**Returns:** `[Webhook]!`

| Field | Type | Description |
| --- | --- | --- |
| `endpoint` | `String!` | The URL of the webhook you want to delete. |
| `is_active` | `Boolean!` | Whether the webhook is active and receiving notifications. |
| `name` | `String!` | A user-friendly name for the webhook. |

## Type Definitions

### Webhook

To delete a webhook, you can use the following mutation:

| Field | Type | Description |
| --- | --- | --- |
| `endpoint` | `String!` | The URL of the webhook you want to delete. |
| `is_active` | `Boolean!` | Whether the webhook is active and receiving notifications. |
| `name` | `String!` | A user-friendly name for the webhook. |