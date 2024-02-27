---
sidebar_position: 9
sidebar_label: 'Invoice'
title: ""
---

# Invoice

Invoices are used to create a payment request that can be sent to a payor. 

***
## The Invoice Object

```graphql
{
    account_code: String
    created_date: AWSDateTime
    currency: String
    due_by: AWSDate
    fee_mode: FeeMode
    invoice_amount: Int
    invoice_date: AWSDate
    invoice_description: String
    invoice_id: String
    invoice_name: String
    merchant_invoice_number: String
    merchant_uid: String
    metadata: AWSJSON
    offline_transactions: [OfflineTransaction]
    payor: Payor
    reference: String
    settings: InvoiceSettings
    status: InvoiceStatus
    total_paid_amount: Int
}
```

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|account_code       |String       |A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout.|
|created_date       |String       |The date the invoice was created.|
|currency           |String       |The currency of the payment that will be used to pay the invoice.|
|due_by             |String       |The date that the payor is expected to pay the invoice by.|
|fee_mode           |FeeMode      |The fee mode that will be used on that transaction when a payment is made through Pay Theory's hosted checkout. It can be one of the following: `MERCHANT_FEE`, `SERVICE_FEE`.|
|invoice_amount     |Int          |The total amount of the invoice.|
|invoice_date       |String       |The initial date for the Invoice.|
|invoice_description|String       |A brief description of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice.|
|invoice_id         |String       |The Pay Theory unique identifier for the invoice.|
|invoice_name       |String       |The name of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice.|
|merchant_invoice_number|String  |A custom value that can be used to tie the Pay Theory Invoice to a merchant's internal invoice number.|
|merchant_uid       |String       |The Pay Theory unique identifier for the merchant that the invoice belongs to.|
|metadata           |AWSJSON      |A JSON object that can be used to store custom data about the invoice.|
|offline_transactions|[[OfflineTransaction]](#the-offline-transaction-object)|A list of offline transactions that have been applied to the invoice. This is used to track payments that are made outside Pay Theory toward an Invoice.|
|payor              |[Payor](payor)|The payor object for the payor that the invoice belongs to. More information on the payor object can be found [here](payor).|
|reference          |String       |A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout.|
|settings           |[InvoiceSettings](#invoice-settings-object)|The settings object to configure settings for the Pay Theory hosted checkout page.|
|status             |InvoiceStatus|The status of the invoice. It can be one of the following: `NOT_PAID`, `PAID`, `PARTIALLY_PAID` *For the time being this will not be used as we do not yet support partial payments for Invoices.*|
|total_paid_amount  |Int          |The total amount that has been paid toward the invoice.|

***
## Invoice Settings Object

```graphql
{
    accepted_payment_methods: AcceptedPaymentMethods
    is_secure: Boolean
    require_payor_address: Boolean
    security_pin: String
}
```
|Key                |type         | description                                                                                                                                                                                                |
|-------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|     
|accepted_payment_methods|AcceptedPaymentMethods| The payment methods that will be accepted on the Pay Theory hosted checkout page.  <br/><br/> An object containing keys of `ach`, `card`, and `cash` with a boolean value indicating if they are accepted. |
|is_secure          |Boolean      | When set to true, the payor will be required to enter a security pin to pay the invoice.                                                                                                                   |
|require_payor_address|Boolean    | When set to true, the payor will be required to enter their address to pay the invoice.                                                                                                                    |
|security_pin       |String       | The security pin that the payor will be required to enter to pay the invoice. This is only used if `is_secure` is set to true.                                                                             |

***
## Query Invoices  

```graphql
{
    invoices(direction: FORWARD, limit: 10, offset: "", offset_id: "", query: QueryObject) {
        items {
            account_code
            created_date
            currency
            due_by
            fee_mode
            invoice_amount
            invoice_date
            invoice_description
            invoice_id
            invoice_name
            merchant_invoice_number
            merchant_uid
            metadata(query_list: [QueryPair])
            offline_transactions {
              amount
              instance_id
              invoice_id
              note
              transaction_date
              type
            }
            payor(query_list: [QueryPair]) {
                address_line1
                address_line2
                city
                country
                email
                full_name
                payor_id
                phone
                postal_code
                region
            }
            reference
            settings {
                accepted_payment_methods {
                    ach
                    card
                    cash
                }
                is_secure
                require_payor_address
                security_pin
            }
            status
            total_paid_amount
        }
        total_row_count
    }
}
```

**Parameters**
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|direction          |MoveDirection|The direction of the pagination. Makes sure the results are returned in the correct order.|
|limit              |Int          |The number of invoices to return.|
|offset             |String       |The value of the offset item for which the list is being sorted.|
|offset_id          |String       |The `invoice_id` of the offset item.|
|query              |QueryObject  |The query to filter the invoices with based on Pay Theory defined data.|


**Nested Queries**  
Invoices can also be filtered by passing a `query_list` to the metadata or payor.

This will only return Invoices that have Metadata or Payors that match these queries.  Detailed information about the query list can be found [here](query).


**Returns**
```json
{
    "data": {
        "invoices": {
            "items": [
                {
                    "invoice_id": "pt_inv_xxxx"
                },
                {
                    "invoice_id": "pt_inv_xxxx"
                }
            ],
            "total_row_count": 256
        }
    }
}
```

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|items              |[Invoice](#the-invoice-object)[]|A list of invoices that match the query.|
|total_row_count    |Int          |The total number of invoices that match the query.|

***
## Create an Invoice

```graphql
mutation {
    create_invoice(input: CreateInvoiceInput!) {
        account_code
        created_date
        currency
        due_by
        fee_mode
        ...
    }
}
```

**Parameters**
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|intput             |CreateInvoiceInput|The input object that contains all the information needed to create an invoice.|

**CreateInvoiceInput**

```graphql
{
  account_code: String
  currency: String!
  due_by: AWSDate
  fee_mode: FeeMode
  invoice_amount: Int!
  invoice_date: AWSDate
  invoice_description: String
  invoice_name: String
  merchant_uid: String!
  merchant_invoice_number: String
  metadata: AWSJSON
  payor_id: String
  payor: PayorInput
  reference: String
  send_email: Boolean
  settings: InvoiceSettingsInput
}
```

|Key                | type                                            |       description                     |
|-------------------|-------------------------------------------------|---------------------------------------|     
|account_code       | String                                          |A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout.|
|currency           | String                                          |The currency of the payment that will be used to pay the invoice.|
|due_by             | String                                          |The date that the payor is expected to pay the invoice by.|
|fee_mode           | FeeMode                                         |The fee mode that will be used on that transaction when a payment is made through Pay Theory's hosted checkout. It can be one of the following: `MERCHANT_FEE`, `SERVICE_FEE`.|
|invoice_amount     | Int                                             |The total amount of the invoice.|
|invoice_date       | String                                          |The initial date for the Invoice.|
|invoice_description| String                                          |A brief description of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice.|
|invoice_name       | String                                          |The name of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice.|
|merchant_invoice_number| String                                          |A custom value that can be used to tie the Pay Theory Invoice to a merchant's internal invoice number.|
|merchant_uid       | String                                          |The Pay Theory unique identifier for the merchant that the invoice belongs to.|
|metadata           | AWSJSON                                         |A JSON object that can be used to store custom data about the invoice.|
|payor_id           | String                                          |The Pay Theory unique identifier for the payor that the invoice belongs to.|
|payor              | [PayorInput](payor)                             |The payor input object for the payor that the invoice belongs to. More information on the payor input object can be found [here](payor).|
|reference          | String                                          |A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout.|
|send_email         | Boolean                                         |When set to true, an email will be sent to the payor with a link to the hosted checkout page.|
|settings           | [InvoiceSettingsInput](#invoice-settings-input) |The settings input object to configure settings for the Pay Theory hosted checkout page.|

**Return**  
The response will contain the invoice object that was created. More information on the [invoice object](#the-invoice-object).

***
## Invoice Settings Input
```graphql
{
    accepted_payment_methods: AcceptedPaymentMethodsInput
    is_secure: Boolean
    require_payor_address: Boolean
}
```
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|accepted_payment_methods|AcceptedPaymentMethodsInput|The payment methods that will be accepted on the Pay Theory hosted checkout page.  <br/><br/> An object containing keys of `ach`, `card`, and `cash` with a boolean value indicating if they are accepted. |
|is_secure          |Boolean      |When set to true, the payor will be required to enter a security pin to pay the invoice.|
|require_payor_address|Boolean    |When set to true, the payor will be required to enter their address to pay the invoice.|

***
## Update an Invoice

```graphql
mutation {
    updateInvoice(invoice_id: String!, invoice_update_input: UpdateInvoiceInput!) {
        account_code
        created_date
        currency
        due_by
        fee_mode
        ...
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|invoice_id         |String       |The Pay Theory unique identifier for the invoice to update.|
|invoice_update_input|UpdateInvoiceInput|The input object that contains all of the information needed to update an invoice.|

**UpdateInvoiceInput**
```graphql
{
  account_code: String
  currency: String
  due_by: AWSDate
  fee_mode: FeeMode
  invoice_amount: Int
  invoice_date: AWSDate
  invoice_description: String
  invoice_name: String
  merchant_invoice_number: String
  reference: String
  send_email: Boolean
  settings: InvoiceSettingsInput
}
```
|Key                | type                                            | description                                                                                                                                                                    |
|-------------------|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|     
|account_code       | String                                          | A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout.                                                          |
|currency           | String                                          | The currency of the payment that will be used to pay the invoice.                                                                                                              |
|due_by             | String                                          | The date that the payor is expected to pay the invoice by.                                                                                                                     |
|fee_mode           | FeeMode                                         | The fee mode that will be used on that transaction when a payment is made through Pay Theory's hosted checkout. It can be one of the following: `MERCHANT_FEE`, `SERVICE_FEE`. |
|invoice_amount     | Int                                             | The total amount of the invoice.                                                                                                                                               |
|invoice_date       | String                                          | The initial date for the invoice.                                                                                                                                              |
|invoice_description| String                                          | A brief description of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice.                                                |
|invoice_name       | String                                          | The name of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice.                                                         |
|merchant_invoice_number| String                                          | A custom value that can be used to tie the Pay Theory Invoice to a merchant's internal invoice number.                                                                          |
|reference          | String                                          | A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout.                                                          |
|send_email         | Boolean                                         | When set to true, an email will be sent to the payor with details about the updated invoice.                                                                                    |
|settings           | [InvoiceSettingsInput](#invoice-settings-input) | The settings input object to configure settings for the Pay Theory hosted checkout page.                                                                                       |

**Returns**  
The response will contain the invoice object that was updated. More information on the [invoice object](#the-invoice-object).

***
## Delete an Invoice

```graphql
mutation {
    deleteInvoice(invoice_id: String!) 
}
```

**Parameters**
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|invoice_id         |String       |The Pay Theory unique identifier for the invoice to delete.|

**Returns**  
The response will include a boolean value that will be true if the invoice was deleted successfully.

***
## Create an Invoice Email

This call is used to resend Invoice emails for a specific invoice.

```graphql
mutation {
    createInvoiceEmail(invoice_id: String!)
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|invoice_id         |String       |The Pay Theory unique identifier for the invoice to send an email for.|

**Returns**  
The response will include a boolean value that will be true if the email was sent successfully.

***
## The Offline Transaction Object

```graphql
{
    amount: Int
    instance_id: String
    invoice_id: String
    note: String
    transaction_date: AWSDate
    type: OfflineTransactionType
}
```
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|amount             |Int          |The amount of the offline transaction.|
|instance_id        |String       |The Pay Theory unique identifier for the offline transaction.|
|invoice_id         |String       |The Pay Theory unique identifier for the invoice that the offline transaction is being applied to.|
|note               |String       |A note that can be added to the offline transaction. This is a custom value that can be used to store information about the offline transaction.|
|transaction_date   |String       |The date that the offline transaction was made.|
|type               |OfflineTransactionType|The type of offline transaction. It can be one of the following: `ACH`, `CARD`, `CASH`, `OTHER`.|

***
## Create an Offline Transaction

This call is used to create an offline transaction for an invoice.  Offline transactions are used to track payments that are made outside Pay Theory toward an Invoice.

```graphql
mutation {
    createOfflineTransaction(input: CreateOfflineTransactionInput!) {
        amount
        instance_id
        invoice_id
        note
        transaction_date
        type
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|input              |CreateOfflineTransactionInput|The input object that contains all of the information needed to create an offline transaction.|

**CreateOfflineTransactionInput**
```graphql
{
    amount: Int!
    invoice_id: String!
    note: String
    transaction_date: AWSDate
    type: OfflineTransactionType!
}
```

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|amount             |Int          |The amount of the offline transaction.|
|invoice_id         |String       |The Pay Theory unique identifier for the invoice that the offline transaction is being applied to.|
|note               |String       |A note that can be added to the offline transaction. This is a custom value that can be used to store information about the offline transaction.|
|transaction_date   |String       |The date that the offline transaction was made.|
|type               |OfflineTransactionType|The type of offline transaction. It can be one of the following: `ACH`, `CARD`, `CASH`, `OTHER`.|


**Returns**  
The response will contain the offline transaction object that was created. More information on the [offline transaction object](#offline-transaction-object).
