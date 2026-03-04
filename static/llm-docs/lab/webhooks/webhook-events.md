# webhookEvents

> **Group:** Webhooks
> **Operation Type:** QUERY

Returns webhook events.

## GraphQL Signature

```graphql
query webhookEvents($id: ID, $endpoint: String, $result: WebhookNotificationResult, $last_evaluated_key: String, $limit: Int) {
  webhookEvents(id: $id, endpoint: $endpoint, result: $result, last_evaluated_key: $last_evaluated_key, limit: $limit) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `ID` | No | Unique identifier. |
| `endpoint` | `String` | No | — |
| `result` | `WebhookNotificationResult` | No | — |
| `last_evaluated_key` | `String` | No | The last evaluated key. |
| `limit` | `Int` | No | Maximum number of items to return. |

## Return Type

**Returns:** `WebhookEvents!`

| Field | Type | Description |
| --- | --- | --- |
| `events` | `[WebhookEvent]!` | List of Webhook Events. See type definition: WebhookEvent. |
| `last_evaluated_key` | `String` | The last evaluated key. |

## Examples

### Example webhookEvents

Returns webhook events.

**Query:**

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

**Variables:**

```json
{
  "id": "id_123",
  "endpoint": "example",
  "result": "FAILURE",
  "last_evaluated_key": "example",
  "limit": 123
}
```

**Response:**

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


## Type Definitions

### WebhookNotificationResult

Can be one of the following:

| WebhookNotificationResult Value | Description |
| --- | --- |
| `FAILURE` | The notification was not successfully received (4xx or 5xx response, or no response at all) by your endpoint. |
| `IGNORED` | The notification was not sent because the webhook was not active. |
| `SUCCESS` | The notification was successfully received (2xx response) by your endpoint. |

### WebhookEvents

Webhook events object.

| Field | Type | Description |
| --- | --- | --- |
| `events` | `[WebhookEvent]!` | List of Webhook Events. See type definition: WebhookEvent. |
| `last_evaluated_key` | `String` | The last evaluated key. |

### WebhookEvent

A webhook event object represents a webhook trigger, meaning it may have sent a notification to your endpoint if it was active at the time.

| Field | Type | Description |
| --- | --- | --- |
| `endpoint` | `String!` | The endpoint of the webhook associated with the event. |
| `error` | `String` | An error message present only if the event failed. |
| `event` | `String!` | The type of event that was sent. |
| `finished_at` | `String!` | The time the response was received or the last attempt to contact the endpoint was made. |
| `id` | `ID!` | A unique ID for the event. |
| `request` | `AWSJSON!` | A JSON string of the request that was sent to the endpoint. |
| `response` | `AWSJSON` | A JSON string of the response received from the endpoint. Not present if no response was received. |
| `result` | `WebhookNotificationResult!` | The final outcome of the event. See type definition: WebhookNotificationResult. |
| `started_at` | `String!` | The time the first request was made. |
| `status_code` | `Int` | The HTTP status code of the last response. Not present if no response was received. |