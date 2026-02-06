# Payor

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### payors

Returns payors.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `SqlQuery` | No | The query to filter the payors with based on Pay Theory defined data. Detailed information about the query object can be found here. |
| `limit` | `Int` | No | The number of payors to return. |
| `offset` | `String` | No | The value of the offset item for which the list is being sorted. |
| `direction` | `MoveDirection` | No | The direction of the pagination. Makes sure the results are returned in the correct order. |
| `offset_id` | `String` | No | The payor_id of the offset item. |

**Returns:** `Payors`

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[Payor]` | List of Payors. |
| `total_row_count` | `Int` | Total number of rows matching the query. |


**Payor fields:**

| Field | Type | Description |
| --- | --- | --- |
| `address_line1` | `String` | The first line of the address of the payor. |
| `address_line2` | `String` | The second line of the address of the payor. |
| `city` | `String` | The city of the payor. |
| `country` | `String` | The country of the payor. |
| `email` | `String` | The email address of the payor. |
| `full_name` | `String` | The full name of the payor. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the payor belongs to. |
| `metadata` | `AWSJSON` | The metadata to attach to the payor. This is a JSON object that can contain any data that you want to attach to the payor. |
| `payor_id` | `String` | The unique payor id. |
| `phone` | `String` | The phone number of the payor. |
| `postal_code` | `String` | The postal code of the payor. |
| `region` | `String` | The region of the payor. |

**Example: Example payors**

Returns payors.

```graphql
query Payors($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  payors(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
  items {
    payor_id
    address_line1
    address_line2
    city
    country
  }
  total_row_count
  }
}
```

```json
{
  "data": {
    "payors": {
      "items": [
        {
          "payor_id": "example",
          "address_line1": "example",
          "address_line2": "example",
          "city": "example",
          "country": "example"
        }
      ],
      "total_row_count": 123
    }
  }
}
```


## Mutations

### createPayor

Creates payor.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `PayorInput!` | Yes | The input object that contains the payor information to create a new payor. Detailed information about the input object can be found here. |

**Returns:** `Payor`

| Field | Type | Description |
| --- | --- | --- |
| `address_line1` | `String` | The first line of the address of the payor. |
| `address_line2` | `String` | The second line of the address of the payor. |
| `city` | `String` | The city of the payor. |
| `country` | `String` | The country of the payor. |
| `email` | `String` | The email address of the payor. |
| `full_name` | `String` | The full name of the payor. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the payor belongs to. |
| `metadata` | `AWSJSON` | The metadata to attach to the payor. This is a JSON object that can contain any data that you want to attach to the payor. |
| `payor_id` | `String` | The unique payor id. |
| `phone` | `String` | The phone number of the payor. |
| `postal_code` | `String` | The postal code of the payor. |
| `region` | `String` | The region of the payor. |

**Example: Example createPayor**

Creates payor.

```graphql
mutation CreatePayor($input: PayorInput!) {
  createPayor(input: $input) {
  payor_id
  address_line1
  address_line2
  city
  country
  }
}
```

```json
{
  "data": {
    "createPayor": {
      "payor_id": "example",
      "address_line1": "example",
      "address_line2": "example",
      "city": "example",
      "country": "example"
    }
  }
}
```


### updatePayor

Updates payor.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `payor_id` | `String!` | Yes | Pay Theory unique identifier for the payor. |
| `payor_data` | `PayorData!` | Yes | The payor data. |

**Returns:** `Boolean`


**Example: Example updatePayor**

Updates payor.

```graphql
mutation UpdatePayor($payor_id: String!, $payor_data: PayorData!) {
  updatePayor(payor_id: $payor_id, payor_data: $payor_data)
}
```

```json
{
  "data": {
    "updatePayor": true
  }
}
```

