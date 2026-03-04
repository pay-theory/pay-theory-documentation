# updatePayor

> **Group:** Payor
> **Operation Type:** MUTATION

Updates payor.

## GraphQL Signature

```graphql
mutation updatePayor($payor_id: String!, $payor_data: PayorData!) {
  updatePayor(payor_id: $payor_id, payor_data: $payor_data)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `payor_id` | `String!` | Yes | Pay Theory unique identifier for the payor. |
| `payor_data` | `PayorData!` | Yes | The payor data. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example updatePayor

Updates payor.

**Query:**

```graphql
mutation UpdatePayor($payor_id: String!, $payor_data: PayorData!) {
  updatePayor(payor_id: $payor_id, payor_data: $payor_data)
}
```

**Variables:**

```json
{
  "payor_id": "example",
  "payor_data": {
    "address_line1": "example",
    "address_line2": "example",
    "city": "example",
    "country": "example",
    "email": "example",
    "full_name": "example",
    "phone": "example",
    "postal_code": "example",
    "region": "example"
  }
}
```

**Response:**

```json
{
  "data": {
    "updatePayor": true
  }
}
```


## Type Definitions

### PayorData

Payor data object.

| Field | Type | Description |
| --- | --- | --- |
| `address_line1` | `String` | Address line 1. |
| `address_line2` | `String` | Address line 2. |
| `city` | `String` | No description available. |
| `country` | `String` | No description available. |
| `email` | `String` | Email address. |
| `full_name` | `String` | Full name. |
| `phone` | `String` | Phone number. |
| `postal_code` | `String` | Postal code. |
| `region` | `String` | No description available. |