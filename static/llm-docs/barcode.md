# Barcode

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### barcode

This can be used to call back a single barcode.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `ID!` | Yes | The Pay Theory unique identifier assigned to the merchant. |
| `barcode_id` | `String!` | Yes | The unique barcode identifier. |

**Returns:** `Barcode`

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
| `payor` | `Payor` | The payor object associated with the barcode. |
| `payor_id` | `String` | Pay Theory unique identifier for the payor. |
| `reference` | `String` | Custom defined value passed in as the reference for the barcode. |
| `sale_id` | `String` | The Pay Theory unique identifier assigned to the sale that the authorization belongs to. Sales can be used to tie together multiple transactions. |


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

**Example: Example barcode**

This can be used to call back a single barcode.

```graphql
query Barcode($merchant_uid: ID!, $barcode_id: String!) {
  barcode(merchant_uid: $merchant_uid, barcode_id: $barcode_id) {
  barcode_id
  expiration_date
  account_code
  amount
  barcode_url
  }
}
```

```json
{
  "data": {
    "barcode": {
      "barcode_id": "example",
      "expiration_date": "2025-01-01",
      "account_code": "example",
      "amount": 123,
      "barcode_url": "example"
    }
  }
}
```


## Mutations

### createBarcode

This mutation will create a barcode for a payor to use to make a cash payment.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `BarcodeInput!` | Yes | This object contains all the information needed to create a barcode. |

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
| `payor` | `Payor` | The payor object associated with the barcode. |
| `payor_id` | `String` | Pay Theory unique identifier for the payor. |
| `reference` | `String` | Custom defined value passed in as the reference for the barcode. |
| `sale_id` | `String` | The Pay Theory unique identifier assigned to the sale that the authorization belongs to. Sales can be used to tie together multiple transactions. |


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

**Example: Example createBarcode**

This mutation will create a barcode for a payor to use to make a cash payment.

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


### createBarcodePaymentSandbox

Sandbox Only This mutation will only work in sandbox environments. It is used to simulate barcode payments for testing purposes.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `barcode_id` | `String!` | Yes | The unique identifier of the barcode to process payment for. |
| `amount_to_pay` | `Int!` | Yes | The amount to process for the payment in cents. |

**Returns:** `BarcodePaymentResponse!`

| Field | Type | Description |
| --- | --- | --- |
| `confirmation_code` | `String!` | The confirmation code for the payment. |
| `status` | `BarcodePaymentStatus!` | The status of the payment. |
| `status_message` | `String!` | The status message for the payment. |


**BarcodePaymentStatus values:**

| BarcodePaymentStatus Value | Description |
| --- | --- |
| `PAYMENT_ACCEPTED` | The payment was successfully processed |
| `PAYMENT_DECLINED` | The payment was declined |
| `SYSTEM_ERROR` | An error occurred while processing the payment |

**Example: Example createBarcodePaymentSandbox**

Sandbox Only This mutation will only work in sandbox environments. It is used to simulate barcode payments for testing purposes.

```graphql
mutation CreateBarcodePaymentSandbox($barcode_id: String!, $amount_to_pay: Int!) {
  createBarcodePaymentSandbox(barcode_id: $barcode_id, amount_to_pay: $amount_to_pay) {
  confirmation_code
  status
  status_message
  }
}
```

```json
{
  "data": {
    "createBarcodePaymentSandbox": {
      "confirmation_code": "example",
      "status": "example",
      "status_message": "example"
    }
  }
}
```



## Types Reference

### Barcode

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
| `payor` | `Payor` | The payor object associated with the barcode. |
| `payor_id` | `String` | Pay Theory unique identifier for the payor. |
| `reference` | `String` | Custom defined value passed in as the reference for the barcode. |
| `sale_id` | `String` | The Pay Theory unique identifier assigned to the sale that the authorization belongs to. Sales can be used to tie together multiple transactions. |

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
