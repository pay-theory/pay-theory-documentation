# Webhooks

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### webhooks

Returns webhooks.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `endpoint` | `String` | No | The URL the event will be sent to. If not passed in all webhooks will be returned |

**Returns:** `[Webhook]!`

| Field | Type | Description |
| --- | --- | --- |
| `endpoint` | `String!` | The URL of the webhook you want to delete. |
| `is_active` | `Boolean!` | Whether the webhook is active and receiving notifications. |
| `name` | `String!` | A user-friendly name for the webhook. |

**Example: Example webhooks**

Returns webhooks.

```graphql
query Webhooks($endpoint: String) {
  webhooks(endpoint: $endpoint) {
  endpoint
  is_active
  name
  }
}
```

```json
{
  "data": {
    "webhooks": {
      "endpoint": "example",
      "is_active": true,
      "name": "example"
    }
  }
}
```


### webhookEvents

Returns webhook events.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `ID` | No | Unique identifier. |
| `endpoint` | `String` | No | — |
| `result` | `WebhookNotificationResult` | No | — |
| `last_evaluated_key` | `String` | No | The last evaluated key. |
| `limit` | `Int` | No | Maximum number of items to return. |

**Returns:** `WebhookEvents!`

| Field | Type | Description |
| --- | --- | --- |
| `events` | `[WebhookEvent]!` | List of Webhook Events. |
| `last_evaluated_key` | `String` | The last evaluated key. |


**WebhookEvent fields:**

| Field | Type | Description |
| --- | --- | --- |
| `endpoint` | `String!` | The endpoint of the webhook associated with the event. |
| `error` | `String` | An error message present only if the event failed. |
| `event` | `String!` | The type of event that was sent. |
| `finished_at` | `String!` | The time the response was received or the last attempt to contact the endpoint was made. |
| `id` | `ID!` | A unique ID for the event. |
| `request` | `AWSJSON!` | A JSON string of the request that was sent to the endpoint. |
| `response` | `AWSJSON` | A JSON string of the response received from the endpoint. Not present if no response was received. |
| `result` | `WebhookNotificationResult!` | The final outcome of the event. |
| `started_at` | `String!` | The time the first request was made. |
| `status_code` | `Int` | The HTTP status code of the last response. Not present if no response was received. |


**WebhookNotificationResult values:**

| WebhookNotificationResult Value | Description |
| --- | --- |
| `FAILURE` | The notification was not successfully received (4xx or 5xx response, or no response at all) by your endpoint. |
| `IGNORED` | The notification was not sent because the webhook was not active. |
| `SUCCESS` | The notification was successfully received (2xx response) by your endpoint. |

**Example: Example webhookEvents**

Returns webhook events.

```graphql
query WebhookEvents($id: ID, $endpoint: String, $result: WebhookNotificationResult, $last_evaluated_key: String, $limit: Int) {
  webhookEvents(id: $id, endpoint: $endpoint, result: $result, last_evaluated_key: $last_evaluated_key, limit: $limit) {
  last_evaluated_key
  events {
    id
    endpoint
    error
    event
    finished_at
  }
  }
}
```

```json
{
  "data": {
    "webhookEvents": {
      "last_evaluated_key": "example",
      "events": [
        {
          "id": "id_123",
          "endpoint": "example",
          "error": "example",
          "event": "example",
          "finished_at": "example"
        }
      ]
    }
  }
}
```


## Mutations

### createWebhook

To create a webhook, you need to provide the endpoint and a name for the webhook using the following mutation:

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `endpoint` | `String!` | Yes | The URL the event will be sent to. |
| `name` | `String!` | Yes | The name you want to give the webhook for reference. |

**Returns:** `Boolean!`


**Example: Example createWebhook**

To create a webhook, you need to provide the endpoint and a name for the webhook using the following mutation:

```graphql
mutation CreateWebhook($endpoint: String!, $name: String!) {
  createWebhook(endpoint: $endpoint, name: $name)
}
```

```json
{
  "data": {
    "createWebhook": true
  }
}
```


### updateWebhook

To update a webhook, you can use a mutation like the following:

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `endpoint` | `String!` | Yes | The URL of the webhook you want to update. This cannot be changed |
| `name` | `String` | No | The new name you want to give the webhook |
| `is_active` | `Boolean` | No | Whether the webhook should be active or not |

**Returns:** `Boolean!`


**Example: Example updateWebhook**

To update a webhook, you can use a mutation like the following:

```graphql
mutation UpdateWebhook($endpoint: String!, $name: String, $is_active: Boolean) {
  updateWebhook(endpoint: $endpoint, name: $name, is_active: $is_active)
}
```

```json
{
  "data": {
    "updateWebhook": true
  }
}
```


### deleteWebhook

To delete a webhook, you can use the following mutation:

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `endpoint` | `String!` | Yes | The URL of the webhook you want to delete. |

**Returns:** `Boolean!`


**Example: Example deleteWebhook**

To delete a webhook, you can use the following mutation:

```graphql
mutation DeleteWebhook($endpoint: String!) {
  deleteWebhook(endpoint: $endpoint)
}
```

```json
{
  "data": {
    "deleteWebhook": true
  }
}
```

