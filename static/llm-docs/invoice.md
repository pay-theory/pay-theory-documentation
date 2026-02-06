# Invoice

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### invoices

Returns invoices.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `SqlQuery` | No | The query to filter the invoices with based on Pay Theory defined data. |
| `limit` | `Int` | No | The number of invoices to return. |
| `offset` | `String` | No | The value of the offset item for which the list is being sorted. |
| `direction` | `MoveDirection` | No | The direction of the pagination. Makes sure the results are returned in the correct order. |
| `offset_id` | `String` | No | The invoice_id of the offset item. |

**Returns:** `Invoices`

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[Invoice]` | List of Invoices. |
| `total_row_count` | `Int` | Total number of rows matching the query. |


**Invoice fields:**

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout. |
| `created_date` | `AWSDateTime` | The date the invoice was created. |
| `currency` | `String` | The currency of the payment that will be used to pay the invoice. |
| `due_by` | `AWSDate` | The date that the payor is expected to pay the invoice by. |
| `fee_mode` | `FeeMode` | The fee mode that will be used on that transaction when a payment is made through Pay Theory's hosted checkout. It can be one of the following: MERCHANT_FEE, SERVICE_FEE. |
| `invoice_amount` | `Int` | The total amount of the invoice. |
| `invoice_date` | `AWSDate` | The initial date for the Invoice. |
| `invoice_description` | `String` | A brief description of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice. |
| `invoice_id` | `String` | The Pay Theory unique identifier for the invoice. |
| `invoice_name` | `String` | The name of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice. |
| `merchant_invoice_number` | `String` | A custom value that can be used to tie the Pay Theory Invoice to a merchant's internal invoice number. |
| `merchant_uid` | `String` | The Pay Theory unique identifier for the merchant that the invoice belongs to. |
| `metadata` | `AWSJSON` | A JSON object that can be used to store custom data about the invoice. |
| `offline_transactions` | `[OfflineTransaction]` | A list of offline transactions that have been applied to the invoice. This is used to track payments that are made outside Pay Theory toward an Invoice. |
| `payor` | `Payor` | The payor object for the payor that the invoice belongs to. More information on the payor object can be found here. |
| `reference` | `String` | A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout. |
| `settings` | `InvoiceSettings` | The settings object to configure settings for the Pay Theory hosted checkout page. |
| `status` | `InvoiceStatus` | The status of the invoice. It can be one of the following: NOT_PAID, PAID, PARTIALLY_PAID For the time being this will not be used as we do not yet support partial payments for Invoices. |
| `total_paid_amount` | `Int` | The total amount that has been paid toward the invoice. |


**FeeMode values:**

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | — (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

**OfflineTransaction fields:**

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Int` | The amount of the offline transaction. |
| `instance_id` | `String` | The Pay Theory unique identifier for the offline transaction. |
| `invoice_id` | `String` | The Pay Theory unique identifier for the invoice that the offline transaction is being applied to. |
| `note` | `String` | A note that can be added to the offline transaction. This is a custom value that can be used to store information about the offline transaction. |
| `transaction_date` | `AWSDate` | The date that the offline transaction was made. |
| `type` | `OfflineTransactionType` *(max depth reached)* | The type of offline transaction. It can be one of the following: ACH, CARD, CASH, OTHER. |

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

**InvoiceSettings fields:**

| Field | Type | Description |
| --- | --- | --- |
| `accepted_payment_methods` | `AcceptedPaymentMethods` *(max depth reached)* | The payment methods that will be accepted on the Pay Theory hosted checkout page. An object containing keys of ach, card, and cash with a boolean value indicating if they are accepted. |
| `is_secure` | `Boolean` | When set to true, the payor will be required to enter a security pin to pay the invoice. |
| `require_payor_address` | `Boolean` | When set to true, the payor will be required to enter their address to pay the invoice. |
| `security_pin` | `String` | The security pin that the payor will be required to enter to pay the invoice. This is only used if is_secure is set to true. |

**InvoiceStatus values:**

| InvoiceStatus Value | Description |
| --- | --- |
| `NOT_PAID` | Represents not paid. |
| `PARTIALLY_PAID` | Represents partially paid. |
| `PAID` | Represents paid. |

**Example: Example invoices**

Returns invoices.

```graphql
query Invoices($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  invoices(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
  items {
    invoice_id
    created_date
    account_code
    currency
    due_by
  }
  total_row_count
  }
}
```

```json
{
  "data": {
    "invoices": {
      "items": [
        {
          "invoice_id": "example",
          "created_date": "2025-01-01T00:00:00Z",
          "account_code": "example",
          "currency": "example",
          "due_by": "2025-01-01"
        }
      ],
      "total_row_count": 123
    }
  }
}
```


## Mutations

### createInvoice

Creates an invoice.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `InvoiceInput!` | Yes | The input object that contains all the information needed to create an invoice. |

**Returns:** `Invoice`

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout. |
| `created_date` | `AWSDateTime` | The date the invoice was created. |
| `currency` | `String` | The currency of the payment that will be used to pay the invoice. |
| `due_by` | `AWSDate` | The date that the payor is expected to pay the invoice by. |
| `fee_mode` | `FeeMode` | The fee mode that will be used on that transaction when a payment is made through Pay Theory's hosted checkout. It can be one of the following: MERCHANT_FEE, SERVICE_FEE. |
| `invoice_amount` | `Int` | The total amount of the invoice. |
| `invoice_date` | `AWSDate` | The initial date for the Invoice. |
| `invoice_description` | `String` | A brief description of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice. |
| `invoice_id` | `String` | The Pay Theory unique identifier for the invoice. |
| `invoice_name` | `String` | The name of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice. |
| `merchant_invoice_number` | `String` | A custom value that can be used to tie the Pay Theory Invoice to a merchant's internal invoice number. |
| `merchant_uid` | `String` | The Pay Theory unique identifier for the merchant that the invoice belongs to. |
| `metadata` | `AWSJSON` | A JSON object that can be used to store custom data about the invoice. |
| `offline_transactions` | `[OfflineTransaction]` | A list of offline transactions that have been applied to the invoice. This is used to track payments that are made outside Pay Theory toward an Invoice. |
| `payor` | `Payor` | The payor object for the payor that the invoice belongs to. More information on the payor object can be found here. |
| `reference` | `String` | A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout. |
| `settings` | `InvoiceSettings` | The settings object to configure settings for the Pay Theory hosted checkout page. |
| `status` | `InvoiceStatus` | The status of the invoice. It can be one of the following: NOT_PAID, PAID, PARTIALLY_PAID For the time being this will not be used as we do not yet support partial payments for Invoices. |
| `total_paid_amount` | `Int` | The total amount that has been paid toward the invoice. |


**FeeMode values:**

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | — (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

**OfflineTransaction fields:**

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Int` | The amount of the offline transaction. |
| `instance_id` | `String` | The Pay Theory unique identifier for the offline transaction. |
| `invoice_id` | `String` | The Pay Theory unique identifier for the invoice that the offline transaction is being applied to. |
| `note` | `String` | A note that can be added to the offline transaction. This is a custom value that can be used to store information about the offline transaction. |
| `transaction_date` | `AWSDate` | The date that the offline transaction was made. |
| `type` | `OfflineTransactionType` | The type of offline transaction. It can be one of the following: ACH, CARD, CASH, OTHER. |


**OfflineTransactionType values:**

| OfflineTransactionType Value | Description |
| --- | --- |
| `ACH` | Represents ACH. |
| `CARD` | Represents card. |
| `CASH` | Represents cash. |
| `OTHER` | Represents other. |

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

**InvoiceSettings fields:**

| Field | Type | Description |
| --- | --- | --- |
| `accepted_payment_methods` | `AcceptedPaymentMethods` | The payment methods that will be accepted on the Pay Theory hosted checkout page. An object containing keys of ach, card, and cash with a boolean value indicating if they are accepted. |
| `is_secure` | `Boolean` | When set to true, the payor will be required to enter a security pin to pay the invoice. |
| `require_payor_address` | `Boolean` | When set to true, the payor will be required to enter their address to pay the invoice. |
| `security_pin` | `String` | The security pin that the payor will be required to enter to pay the invoice. This is only used if is_secure is set to true. |


**AcceptedPaymentMethods fields:**

| Field | Type | Description |
| --- | --- | --- |
| `ach` | `Boolean` | Whether ACH is accepted. |
| `card` | `Boolean` | Whether card is accepted. |
| `cash` | `Boolean` | Whether cash is accepted. |

**InvoiceStatus values:**

| InvoiceStatus Value | Description |
| --- | --- |
| `NOT_PAID` | Represents not paid. |
| `PARTIALLY_PAID` | Represents partially paid. |
| `PAID` | Represents paid. |

**Example: Example createInvoice**

Creates an invoice.

```graphql
mutation CreateInvoice($input: InvoiceInput!) {
  createInvoice(input: $input) {
  invoice_id
  created_date
  account_code
  currency
  due_by
  }
}
```

```json
{
  "data": {
    "createInvoice": {
      "invoice_id": "example",
      "created_date": "2025-01-01T00:00:00Z",
      "account_code": "example",
      "currency": "example",
      "due_by": "2025-01-01"
    }
  }
}
```


### updateInvoice

Updates an invoice.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `invoice_id` | `String!` | Yes | The Pay Theory unique identifier for the invoice to update. |
| `invoice_update_input` | `InvoiceUpdateInput!` | Yes | The input object that contains all of the information needed to update an invoice. |

**Returns:** `Boolean`


**Example: Example updateInvoice**

Updates an invoice.

```graphql
mutation UpdateInvoice($invoice_id: String!, $invoice_update_input: InvoiceUpdateInput!) {
  updateInvoice(invoice_id: $invoice_id, invoice_update_input: $invoice_update_input)
}
```

```json
{
  "data": {
    "updateInvoice": true
  }
}
```


### deleteInvoice

Deletes an invoice.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `invoice_id` | `String!` | Yes | The Pay Theory unique identifier for the invoice to delete. |

**Returns:** `Boolean`


**Example: Example deleteInvoice**

Deletes an invoice.

```graphql
mutation DeleteInvoice($invoice_id: String!) {
  deleteInvoice(invoice_id: $invoice_id)
}
```

```json
{
  "data": {
    "deleteInvoice": true
  }
}
```


### createInvoiceEmail

This call is used to resend Invoice emails for a specific invoice.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `invoice_id` | `String!` | Yes | The Pay Theory unique identifier for the invoice to send an email for. |

**Returns:** `Boolean`


**Example: Example createInvoiceEmail**

This call is used to resend Invoice emails for a specific invoice.

```graphql
mutation CreateInvoiceEmail($invoice_id: String!) {
  createInvoiceEmail(invoice_id: $invoice_id)
}
```

```json
{
  "data": {
    "createInvoiceEmail": true
  }
}
```


### createOfflineTransaction

This call is used to create an offline transaction for an invoice. Offline transactions are used to track payments that are made outside Pay Theory toward an Invoice.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `OfflineTransactionInput!` | Yes | The input object that contains all of the information needed to create an offline transaction. |

**Returns:** `OfflineTransaction`

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Int` | The amount of the offline transaction. |
| `instance_id` | `String` | The Pay Theory unique identifier for the offline transaction. |
| `invoice_id` | `String` | The Pay Theory unique identifier for the invoice that the offline transaction is being applied to. |
| `note` | `String` | A note that can be added to the offline transaction. This is a custom value that can be used to store information about the offline transaction. |
| `transaction_date` | `AWSDate` | The date that the offline transaction was made. |
| `type` | `OfflineTransactionType` | The type of offline transaction. It can be one of the following: ACH, CARD, CASH, OTHER. |


**OfflineTransactionType values:**

| OfflineTransactionType Value | Description |
| --- | --- |
| `ACH` | Represents ACH. |
| `CARD` | Represents card. |
| `CASH` | Represents cash. |
| `OTHER` | Represents other. |

**Example: Example createOfflineTransaction**

This call is used to create an offline transaction for an invoice. Offline transactions are used to track payments that are made outside Pay Theory toward an Invoice.

```graphql
mutation CreateOfflineTransaction($input: OfflineTransactionInput!) {
  createOfflineTransaction(input: $input) {
  instance_id
  transaction_date
  amount
  invoice_id
  note
  }
}
```

```json
{
  "data": {
    "createOfflineTransaction": {
      "instance_id": "example",
      "transaction_date": "2025-01-01",
      "amount": 123,
      "invoice_id": "example",
      "note": "example"
    }
  }
}
```

