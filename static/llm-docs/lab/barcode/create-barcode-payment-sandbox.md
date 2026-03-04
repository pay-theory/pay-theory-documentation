# createBarcodePaymentSandbox

> **Group:** Barcode
> **Operation Type:** MUTATION

Sandbox Only This mutation will only work in sandbox environments. It is used to simulate barcode payments for testing purposes.

## GraphQL Signature

```graphql
mutation createBarcodePaymentSandbox($barcode_id: String!, $amount_to_pay: Int!) {
  createBarcodePaymentSandbox(barcode_id: $barcode_id, amount_to_pay: $amount_to_pay) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `barcode_id` | `String!` | Yes | The unique identifier of the barcode to process payment for. |
| `amount_to_pay` | `Int!` | Yes | The amount to process for the payment in cents. |

## Return Type

**Returns:** `BarcodePaymentResponse!`

| Field | Type | Description |
| --- | --- | --- |
| `confirmation_code` | `String!` | The confirmation code for the payment. |
| `status` | `BarcodePaymentStatus!` | The status of the payment. See type definition: BarcodePaymentStatus. |
| `status_message` | `String!` | The status message for the payment. |

## Examples

### Example createBarcodePaymentSandbox

Sandbox Only This mutation will only work in sandbox environments. It is used to simulate barcode payments for testing purposes.

**Query:**

```graphql
mutation CreateBarcodePaymentSandbox($barcode_id: String!, $amount_to_pay: Int!) {
  createBarcodePaymentSandbox(barcode_id: $barcode_id, amount_to_pay: $amount_to_pay) {
  confirmation_code
  status
  status_message
  }
}
```

**Variables:**

```json
{
  "barcode_id": "example",
  "amount_to_pay": 123
}
```

**Response:**

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


## Type Definitions

### BarcodePaymentResponse

 The response from the sandbox barcode payment simulation.

| Field | Type | Description |
| --- | --- | --- |
| `confirmation_code` | `String!` | The confirmation code for the payment. |
| `status` | `BarcodePaymentStatus!` | The status of the payment. See type definition: BarcodePaymentStatus. |
| `status_message` | `String!` | The status message for the payment. |

### BarcodePaymentStatus

The status of the barcode payment can be one of the following values:

| BarcodePaymentStatus Value | Description |
| --- | --- |
| `PAYMENT_ACCEPTED` | The payment was successfully processed |
| `PAYMENT_DECLINED` | The payment was declined |
| `SYSTEM_ERROR` | An error occurred while processing the payment |