# createPayor

> **Group:** Payor
> **Operation Type:** MUTATION

Creates payor.

## GraphQL Signature

```graphql
mutation createPayor($input: PayorInput!) {
  createPayor(input: $input) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `PayorInput!` | Yes | The input object that contains the payor information to create a new payor. Detailed information about the input object can be found here. |

## Return Type

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

## Examples

### Example createPayor

Creates payor.

**Query:**

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

**Variables:**

```json
{
  "input": {
    "address_line1": "example",
    "address_line2": "example",
    "city": "example",
    "country": "example",
    "email": "example",
    "full_name": "example",
    "merchant_uid": "example",
    "metadata": {
      "key": "value"
    },
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


## Type Definitions

### PayorInput

Input for payor.

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
| `phone` | `String` | The phone number of the payor. |
| `postal_code` | `String` | The postal code of the payor. |
| `region` | `String` | The region of the payor. |

### Payor

Payors are used to track payor info that can be tied to other data objects in Pay Theory.

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