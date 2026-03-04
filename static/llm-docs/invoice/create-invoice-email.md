# createInvoiceEmail

> **Group:** Invoice
> **Operation Type:** MUTATION

This call is used to resend Invoice emails for a specific invoice.

## GraphQL Signature

```graphql
mutation createInvoiceEmail($invoice_id: String!) {
  createInvoiceEmail(invoice_id: $invoice_id)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `invoice_id` | `String!` | Yes | The Pay Theory unique identifier for the invoice to send an email for. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example createInvoiceEmail

This call is used to resend Invoice emails for a specific invoice.

**Query:**

```graphql
mutation CreateInvoiceEmail($invoice_id: String!) {
  createInvoiceEmail(invoice_id: $invoice_id)
}
```

**Variables:**

```json
{
  "invoice_id": "example"
}
```

**Response:**

```json
{
  "data": {
    "createInvoiceEmail": true
  }
}
```