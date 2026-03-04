# updateInvoice

> **Group:** Invoice
> **Operation Type:** MUTATION

Updates an invoice.

## GraphQL Signature

```graphql
mutation updateInvoice($invoice_id: String!, $invoice_update_input: InvoiceUpdateInput!) {
  updateInvoice(invoice_id: $invoice_id, invoice_update_input: $invoice_update_input)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `invoice_id` | `String!` | Yes | The Pay Theory unique identifier for the invoice to update. |
| `invoice_update_input` | `InvoiceUpdateInput!` | Yes | The input object that contains all of the information needed to update an invoice. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example updateInvoice

Updates an invoice.

**Query:**

```graphql
mutation UpdateInvoice($invoice_id: String!, $invoice_update_input: InvoiceUpdateInput!) {
  updateInvoice(invoice_id: $invoice_id, invoice_update_input: $invoice_update_input)
}
```

**Variables:**

```json
{
  "invoice_id": "example",
  "invoice_update_input": {
    "account_code": "example",
    "currency": "example",
    "due_by": "2025-01-01",
    "fee_mode": "CUSTOM_FEE",
    "invoice_amount": 123,
    "invoice_date": "2025-01-01",
    "invoice_name": "example",
    "invoice_description": "example",
    "merchant_invoice_number": "example",
    "reference": "example",
    "send_email": true,
    "settings": {
      "accepted_payment_methods": {
        "ach": true
      }
    }
  }
}
```

**Response:**

```json
{
  "data": {
    "updateInvoice": true
  }
}
```


## Type Definitions

### InvoiceUpdateInput

Input for updating an invoice.

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout. |
| `currency` | `String` | The currency of the payment that will be used to pay the invoice. |
| `due_by` | `AWSDate` | The date that the payor is expected to pay the invoice by. |
| `fee_mode` | `FeeMode` | The fee mode that will be used on that transaction when a payment is made through Pay Theory's hosted checkout. It can be one of the following: MERCHANT_FEE, SERVICE_FEE. See type definition: FeeMode. |
| `invoice_amount` | `Int` | The total amount of the invoice. |
| `invoice_date` | `AWSDate` | The initial date for the invoice. |
| `invoice_name` | `String` | The name of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice. |
| `invoice_description` | `String` | A brief description of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice. |
| `merchant_invoice_number` | `String` | A custom value that can be used to tie the Pay Theory Invoice to a merchant's internal invoice number. |
| `reference` | `String` | A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout. |
| `send_email` | `Boolean` | When set to true, an email will be sent to the payor with details about the updated invoice. |
| `settings` | `InvoiceSettingsInput` | The settings input object to configure settings for the Pay Theory hosted checkout page. See type definition: InvoiceSettingsInput. |

### FeeMode

Possible values for fee mode.

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | No description available. (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

### InvoiceSettingsInput

Input for invoice settings.

| Field | Type | Description |
| --- | --- | --- |
| `accepted_payment_methods` | `AcceptedPaymentMethodsInput` | The payment methods that will be accepted on the Pay Theory hosted checkout page. An object containing keys of ach, card, and cash with a boolean value indicating if they are accepted. See type definition: AcceptedPaymentMethodsInput. |
| `is_secure` | `Boolean` | When set to true, the payor will be required to enter a security pin to pay the invoice. |
| `require_payor_address` | `Boolean` | When set to true, the payor will be required to enter their address to pay the invoice. |

### AcceptedPaymentMethodsInput

The accepted payment methods input object.

| Field | Type | Description |
| --- | --- | --- |
| `ach` | `Boolean` | Whether ACH is accepted. |
| `card` | `Boolean` | Whether card is accepted. |
| `cash` | `Boolean` | Whether cash is accepted. |