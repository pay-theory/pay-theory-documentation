# deleteInvoice

> **Group:** Invoice
> **Operation Type:** MUTATION

Deletes an invoice.

## GraphQL Signature

```graphql
mutation deleteInvoice($invoice_id: String!) {
  deleteInvoice(invoice_id: $invoice_id)
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `invoice_id` | `String!` | Yes | The Pay Theory unique identifier for the invoice to delete. |

## Return Type

**Returns:** `Boolean`

## Examples

### Example deleteInvoice

Deletes an invoice.

**Query:**

```graphql
mutation DeleteInvoice($invoice_id: String!) {
  deleteInvoice(invoice_id: $invoice_id)
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
    "deleteInvoice": true
  }
}
```