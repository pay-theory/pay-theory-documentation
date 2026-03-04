# createBarcode

> **Group:** Barcode
> **Operation Type:** MUTATION

This mutation will create a barcode for a payor to use to make a cash payment.

## GraphQL Signature

```graphql
mutation createBarcode($input: BarcodeInput!) {
  createBarcode(input: $input) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `BarcodeInput!` | Yes | This object contains all the information needed to create a barcode. |

## Return Type

**Returns:** `Barcode!`

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Custom defined value passed in as the account code for the barcode. |
| `amount` | `Int!` | The amount of the payment. |
| `barcode_id` | `String!` | The unique barcode identifier. |
| `barcode_url` | `String` | The URL to the barcode image. |
| `email_or_phone` | `String!` | The email or phone number of the payor. |
| `expiration_date` | `AWSDate` | The date the barcode expires. |
| `fees` | `Int` | The fees associated with the payment. |
| `full_name` | `String!` | The full name tied to the barcode. |
| `invoice_id` | `String` | The invoice id associated with the payment. |
| `merchant_uid` | `String!` | The Pay Theory unique identifier assigned to the merchant. |
| `metadata` | `AWSJSON` | The metadata to attach to the barcode. This is a JSON object that can contain any data that you want to attach to the barcode. |
| `payor` | `Payor` | The payor object associated with the barcode. See type definition: Payor. |
| `payor_id` | `String` | Pay Theory unique identifier for the payor. |
| `reference` | `String` | Custom defined value passed in as the reference for the barcode. |
| `sale_id` | `String` | The Pay Theory unique identifier assigned to the sale that the authorization belongs to. Sales can be used to tie together multiple transactions. |

## Examples

### Example createBarcode

This mutation will create a barcode for a payor to use to make a cash payment.

**Query:**

```graphql
mutation CreateBarcode($input: BarcodeInput!) {
  createBarcode(input: $input) {
  barcode_id
  expiration_date
  account_code
  amount
  barcode_url
  }
}
```

**Variables:**

```json
{
  "input": {
    "account_code": "example",
    "amount": 123,
    "days_until_expiration": 123,
    "email_or_phone": "example",
    "expiration_date": "2025-01-01",
    "full_name": "example",
    "invoice_id": "example",
    "merchant_uid": "example",
    "metadata": {
      "key": "value"
    },
    "payor": {
      "address_line1": "example"
    },
    "payor_id": "example",
    "reference": "example",
    "sale_id": "example"
  }
}
```

**Response:**

```json
{
  "data": {
    "createBarcode": {
      "barcode_id": "example",
      "expiration_date": "2025-01-01",
      "account_code": "example",
      "amount": 123,
      "barcode_url": "example"
    }
  }
}
```


## Type Definitions

### BarcodeInput

This input object is used to create a barcode.

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Custom defined value passed in as the account code for the barcode. |
| `amount` | `Int!` | The amount of the payment. |
| `days_until_expiration` | `Int` | The number of days until the barcode expires. |
| `email_or_phone` | `String!` | The email or phone number of the payor. |
| `expiration_date` | `AWSDate` | The date the barcode expires. |
| `full_name` | `String!` | The full name tied to the barcode. |
| `invoice_id` | `String` | The invoice id associated with the payment. |
| `merchant_uid` | `String!` | The Pay Theory unique identifier assigned to the merchant that the barcode is being created for. |
| `metadata` | `AWSJSON` | The metadata to attach to the barcode. This is a JSON object that can contain any data that you want to attach to the barcode. |
| `payor` | `PayorInput` | The payor object associated with the barcode. See type definition: PayorInput. |
| `payor_id` | `String` | The Pay Theory unique identifier assigned to the payor that the barcode is being created for. |
| `reference` | `String` | Custom defined value passed in as the reference for the barcode. |
| `sale_id` | `String` | A PayTheory created sale identifier that helps tie together multiple transactions. |

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

### Barcode

This can be used to call back a single barcode.

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Custom defined value passed in as the account code for the barcode. |
| `amount` | `Int!` | The amount of the payment. |
| `barcode_id` | `String!` | The unique barcode identifier. |
| `barcode_url` | `String` | The URL to the barcode image. |
| `email_or_phone` | `String!` | The email or phone number of the payor. |
| `expiration_date` | `AWSDate` | The date the barcode expires. |
| `fees` | `Int` | The fees associated with the payment. |
| `full_name` | `String!` | The full name tied to the barcode. |
| `invoice_id` | `String` | The invoice id associated with the payment. |
| `merchant_uid` | `String!` | The Pay Theory unique identifier assigned to the merchant. |
| `metadata` | `AWSJSON` | The metadata to attach to the barcode. This is a JSON object that can contain any data that you want to attach to the barcode. |
| `payor` | `Payor` | The payor object associated with the barcode. See type definition: Payor. |
| `payor_id` | `String` | Pay Theory unique identifier for the payor. |
| `reference` | `String` | Custom defined value passed in as the reference for the barcode. |
| `sale_id` | `String` | The Pay Theory unique identifier assigned to the sale that the authorization belongs to. Sales can be used to tie together multiple transactions. |

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