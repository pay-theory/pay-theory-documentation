# authorizations

> **Group:** Authorization
> **Operation Type:** QUERY

This query will return a list of authorizations for a merchant.

## GraphQL Signature

```graphql
query authorizations($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  authorizations(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `SqlQuery` | No | The query to filter the authorizations with based on Pay Theory defined data. Detailed information about the query object can be found here. |
| `limit` | `Int` | No | The number of authorizations to return. |
| `offset` | `String` | No | The value of the offset item for which the list is being sorted. If the direction is FORWARD, the offset item is the last item in the previous list. If the direction is BACKWARD, the offset is the first item in the previous list. |
| `direction` | `MoveDirection` | No | The direction of the pagination. Makes sure the results are returned in the correct order. |
| `offset_id` | `String` | No | The authorization_id of the offset item. If the direction is FORWARD, the offset item is the last item in the list. If the direction is BACKWARD, the offset is the first item in the list. |

## Return Type

**Returns:** `Authorizations`

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[Authorization]` | List of Authorizations. See type definition: Authorization. |
| `total_row_count` | `Int` | Total number of rows matching the query. |

## Examples

### Example authorizations

This query will return a list of authorizations for a merchant.

**Query:**

```graphql
query Authorizations($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  authorizations(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
  items {
    authorization_id
    authorization_date
    account_code
    amount
    avs_status
  }
  total_row_count
  }
}
```

**Variables:**

```json
{
  "query": {
    "query_list": [
      {
        "conjunctive_operator": "AND_NEXT"
      }
    ],
    "sort_list": [
      {
        "direction": "ASC"
      }
    ]
  },
  "limit": 123,
  "offset": "example",
  "direction": "BACKWARD",
  "offset_id": "example"
}
```

**Response:**

```json
{
  "data": {
    "authorizations": {
      "items": [
        {
          "authorization_id": "example",
          "authorization_date": "2025-01-01T00:00:00Z",
          "account_code": "example",
          "amount": 123,
          "avs_status": "example"
        }
      ],
      "total_row_count": 123
    }
  }
}
```


## Type Definitions

### SqlQuery

Here we will detail how you can build your own queries to pass into the Pay Theory API.

| Field | Type | Description |
| --- | --- | --- |
| `query_list` | `[QueryPair]` | A list of query pairs used to build out a query. See type definition: QueryPair. |
| `sort_list` | `[SortPair]` | A list of sort pairs to define how the data should be sorted. See type definition: SortPair. |

### QueryPair

A query pair is the object to build out a query. There are some required fields and some optional fields.

| Field | Type | Description |
| --- | --- | --- |
| `conjunctive_operator` | `ConjunctiveOperator` | The conjunctive operator to use to connect the query pair with the next query pair. More detail below. See type definition: ConjunctiveOperator. |
| `in_values` | `[String]` | A list of values to compare the data to. This should be used instead of value if using the operators IN or NOT_IN. |
| `key` | `String` | The key to the value you want to query against. |
| `operator` | `Operator` | The operator to use to compare the value to the data you are calling. More detail below. See type definition: Operator. |
| `query_group` | `[QueryPair]` | A list of query pairs to use to build out a nested query. A more detailed example is below under the examples section. See type definition: QueryPair. |
| `value` | `String` | The value to compare the data to. If using the LIKE or NOT_LIKE operator, this value can contain wildcard characters. |

### ConjunctiveOperator

These operators are case-sensitive. Conjunctive operators in the same array must match for a query to work. To mix operators use nested queries with query pairs containing a query_list. The following are the available conjunctive operators:

| ConjunctiveOperator Value | Description |
| --- | --- |
| `AND_NEXT` | The results of the query have to meet all the conditions in the query pair list. |
| `NONE_NEXT` | The final query pair in the list should use this operator since it has nothing to connect to. |
| `OR_NEXT` | The results of the query have to meet one of the conditions in the query pair list. |

### Operator

These operators are case-sensitive. The following are the available operators:

| Operator Value | Description |
| --- | --- |
| `EQUAL` | The data is equal to the value. |
| `EQUAL_FALSE` | The data is false. |
| `EQUAL_TRUE` | The data is true. |
| `GREATER_EQUAL` | The data is greater than or equal to the value. |
| `GREATER_THAN` | The data is greater than the value. |
| `IN_LIST` | The data is in the list of values. |
| `IS_NOT_NULL` | The data is not null. |
| `IS_NULL` | The data is null. |
| `LESS_EQUAL` | The data is less than or equal to the value. |
| `LESS_THAN` | The data is less than the value. |
| `LIKE` | The data is like the value. The value can contain wildcard characters. |
| `NOT_EQUAL` | The data is not equal to the value. |
| `NOT_IN_LIST` | The data is not in the list of values. |
| `NOT_LIKE` | The data is not like the value. The value can contain wildcard characters. |

### SortPair

A sort pair is the object used to tell a query how the data should be sorted.

| Field | Type | Description |
| --- | --- | --- |
| `direction` | `SortDirection` | The direction to sort the data. These are case-sensitive. See type definition: SortDirection. |
| `key` | `String` | The key to sort the data by. |

### SortDirection

The direction to sort the data. These are case-sensitive.

| SortDirection Value | Description |
| --- | --- |
| `ASC` | Begins with the least or smallest and ends with the greatest or largest |
| `DESC` | Begins with the greatest or largest and ends with the least or smallest |

### MoveDirection

The direction of the pagination.

| MoveDirection Value | Description |
| --- | --- |
| `BACKWARD` | Request is for the previous set of data. |
| `FORWARD` | Request is for the next set of data. |

### Authorizations

Paginated list of authorization.

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[Authorization]` | List of Authorizations. See type definition: Authorization. |
| `total_row_count` | `Int` | Total number of rows matching the query. |

### Authorization

This mutation will capture all PENDING transactions for a merchant in a batch and shortly after create a settlement for the merchant.

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Custom defined value passed in as the account code for the authorization. |
| `additional_purchase_data` | `AdditionalPurchaseData` | Additional purchase data for Level 3 processing requirements. See type definition: AdditionalPurchaseData. |
| `amount` | `Int!` | The amount of the authorization in cents. |
| `authorization_date` | `AWSDateTime!` | The date and time the authorization was created. |
| `authorization_id` | `String!` | The Pay Theory unique identifier assigned to the authorization. |
| `avs_status` | `AvsStatus` | The AVS status of the authorization. See type definition: AvsStatus. |
| `captured_amount` | `Int` | The amount of the authorization that has been captured in cents. |
| `currency` | `String!` | The currency of the authorization. Currently only USD is supported. |
| `device_id` | `String` | No description available. |
| `expiration_date` | `AWSDateTime` | The date and time the authorization will expire. |
| `failure_reasons` | `[String]` | Array of failure reasons for the authorization. If the authorization is successful, this will be null. |
| `fee_mode` | `FeeMode!` | The fee mode for the authorization. It can be one of the following: SERVICE_FEE, MERCHANT_FEE See type definition: FeeMode. |
| `fees` | `Int!` | The amount of fees for the authorization in cents. |
| `invoice` | `Invoice` | The invoice object for the invoice that the authorization belongs to. More information on the invoice object can be found here. See type definition: Invoice. |
| `merchant_uid` | `String!` | The Pay Theory unique identifier assigned to the merchant to batch for. |
| `metadata` | `AWSJSON` | Any additional data that was stored with the authorization. |
| `payment_method` | `PaymentMethodToken!` | The payment method token object for the payment method that the authorization belongs to. More information on the payment method token object can be found here. See type definition: PaymentMethodToken. |
| `processor` | `String` | No description available. |
| `reference` | `String` | Custom defined value passed in as the reference for the authorization. |
| `sale_id` | `String` | The Pay Theory unique identifier assigned to the sale that the authorization belongs to. Sales can be used to tie together multiple auths and captures. |
| `status` | `AuthorizationStatus!` | The status of the authorization. It can be one of the following: CANCELLED, FAILED, SUCCEEDED See type definition: AuthorizationStatus. |
| `timezone` | `String` | The timezone of the authorization. |
| `transaction_id` | `String` | The Pay Theory unique identifier assigned to the transaction that the authorization belongs to. |
| `updated_row_at` | `AWSDateTime` | The date and time the authorization was last updated. |

### AdditionalPurchaseData

Additional purchase data object.

| Field | Type | Description |
| --- | --- | --- |
| `level3_data_line_item` | `[Level3DataLineItem]` | The level3 data line item. See type definition: Level3DataLineItem. |
| `level3_data_summary` | `Level3DataSummary` | The level3 data summary. See type definition: Level3DataSummary. |

### Level3DataLineItem

Level3 data line item object.

| Field | Type | Description |
| --- | --- | --- |
| `item_code` | `String` | The item code. |
| `item_description` | `String` | The item description. |
| `item_qty_exp` | `Int` | The item qty exp. |
| `prod_code` | `String` | The prod code. |
| `qty` | `Int` | No description available. |
| `tax_amount` | `Int` | The tax amount. |
| `tax_ind` | `TaxIndicatorType` | The tax ind. See type definition: TaxIndicatorType. |
| `tax_rate` | `Int` | The tax rate. |
| `tax_rt_exp` | `Int` | The tax rt exp. |
| `tax_type_id` | `TaxType` | Unique identifier for the tax type. See type definition: TaxType. |
| `unit_cost` | `Int` | The unit cost. |
| `unit_of_msure` | `String` | The unit of msure. |

### TaxIndicatorType

Possible values for tax indicator type.

| TaxIndicatorType Value | Description |
| --- | --- |
| `NO_TAX_INFO_PROVIDED` | Represents no tax info provided. |
| `NOT_TAXABLE` | Represents not taxable. |
| `TAX_AMOUNT_PROVIDED` | Represents tax amount provided. |

### TaxType

Possible values for tax type.

| TaxType Value | Description |
| --- | --- |
| `CITY_SALES` | Represents city sales. |
| `ENERGY` | Represents energy. |
| `GST` | Represents gst. |
| `LOCAL_SALES` | Represents local sales. |
| `MUNICIPAL_SALES` | Represents municipal sales. |
| `NATIONAL_SALES` | Represents national sales. |
| `NOT_SUPPORTED` | Represents not supported. |
| `OTHER` | Represents other. |
| `PST` | Represents pst. |
| `ROOM` | Represents room. |
| `OCCUPANCY` | Represents occupancy. |
| `STATE_SALES` | Represents state sales. |
| `UNKNOWN` | Represents unknown. |
| `VAT` | Represents vat. |

### Level3DataSummary

Level3 data summary object.

| Field | Type | Description |
| --- | --- | --- |
| `dest_postal_code` | `String` | The dest postal code. |
| `discnt_amt` | `Int` | The discnt amt. |
| `duty_amt` | `Int` | The duty amt. |
| `frght_amt` | `Int` | The frght amt. |
| `order_num` | `String` | The order num. |
| `prod_desc` | `[String]` | The prod desc. |
| `purch_idfr` | `String` | The purch idfr. |
| `tax_amt` | `Int` | The tax amt. |
| `tax_ind` | `TaxIndicatorType` | The tax ind. See type definition: TaxIndicatorType. |

### AvsStatus

Possible values for AVS status.

| AvsStatus Value | Description |
| --- | --- |
| `NO_MATCH` | Address and postal code do not match. |
| `POSTAL_CODE_AND_STREET_MATCH` | Both address and postal code match. |
| `POSTAL_CODE_MATCH` | Postal code matches, address does not. |
| `STREET_MATCH` | Address matches, postal code does not. |
| `UNKNOWN` | Status is unknown or unavailable. |

### FeeMode

Possible values for fee mode.

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | No description available. (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

### Invoice

Invoices are used to create a payment request that can be sent to a payor.

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout. |
| `created_date` | `AWSDateTime` | The date the invoice was created. |
| `currency` | `String` | The currency of the payment that will be used to pay the invoice. |
| `due_by` | `AWSDate` | The date that the payor is expected to pay the invoice by. |
| `fee_mode` | `FeeMode` | The fee mode that will be used on that transaction when a payment is made through Pay Theory's hosted checkout. It can be one of the following: MERCHANT_FEE, SERVICE_FEE. See type definition: FeeMode. |
| `invoice_amount` | `Int` | The total amount of the invoice. |
| `invoice_date` | `AWSDate` | The initial date for the Invoice. |
| `invoice_description` | `String` | A brief description of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice. |
| `invoice_id` | `String` | The Pay Theory unique identifier for the invoice. |
| `invoice_name` | `String` | The name of the invoice. This will show up on the hosted checkout page and any email communications about the Invoice. |
| `merchant_invoice_number` | `String` | A custom value that can be used to tie the Pay Theory Invoice to a merchant's internal invoice number. |
| `merchant_uid` | `String` | The Pay Theory unique identifier for the merchant that the invoice belongs to. |
| `metadata` | `AWSJSON` | A JSON object that can be used to store custom data about the invoice. |
| `offline_transactions` | `[OfflineTransaction]` | A list of offline transactions that have been applied to the invoice. This is used to track payments that are made outside Pay Theory toward an Invoice. See type definition: OfflineTransaction. |
| `payor` | `Payor` | The payor object for the payor that the invoice belongs to. More information on the payor object can be found here. See type definition: Payor. |
| `reference` | `String` | A custom value that will be passed on to the transaction when a payment is made through Pay Theory's hosted checkout. |
| `settings` | `InvoiceSettings` | The settings object to configure settings for the Pay Theory hosted checkout page. See type definition: InvoiceSettings. |
| `status` | `InvoiceStatus` | The status of the invoice. It can be one of the following: NOT_PAID, PAID, PARTIALLY_PAID For the time being this will not be used as we do not yet support partial payments for Invoices. See type definition: InvoiceStatus. |
| `total_paid_amount` | `Int` | The total amount that has been paid toward the invoice. |

### OfflineTransaction

Offline transaction object.

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Int` | The amount of the offline transaction. |
| `instance_id` | `String` | The Pay Theory unique identifier for the offline transaction. |
| `invoice_id` | `String` | The Pay Theory unique identifier for the invoice that the offline transaction is being applied to. |
| `note` | `String` | A note that can be added to the offline transaction. This is a custom value that can be used to store information about the offline transaction. |
| `transaction_date` | `AWSDate` | The date that the offline transaction was made. |
| `type` | `OfflineTransactionType` | The type of offline transaction. It can be one of the following: ACH, CARD, CASH, OTHER. See type definition: OfflineTransactionType. |

### OfflineTransactionType

Possible values for offline transaction type.

| OfflineTransactionType Value | Description |
| --- | --- |
| `ACH` | Represents ACH. |
| `CARD` | Represents card. |
| `CASH` | Represents cash. |
| `OTHER` | Represents other. |

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

### InvoiceSettings

Invoice settings settings.

| Field | Type | Description |
| --- | --- | --- |
| `accepted_payment_methods` | `AcceptedPaymentMethods` | The payment methods that will be accepted on the Pay Theory hosted checkout page. An object containing keys of ach, card, and cash with a boolean value indicating if they are accepted. See type definition: AcceptedPaymentMethods. |
| `is_secure` | `Boolean` | When set to true, the payor will be required to enter a security pin to pay the invoice. |
| `require_payor_address` | `Boolean` | When set to true, the payor will be required to enter their address to pay the invoice. |
| `security_pin` | `String` | The security pin that the payor will be required to enter to pay the invoice. This is only used if is_secure is set to true. |

### AcceptedPaymentMethods

The accepted payment methods object.

| Field | Type | Description |
| --- | --- | --- |
| `ach` | `Boolean` | Whether ACH is accepted. |
| `card` | `Boolean` | Whether card is accepted. |
| `cash` | `Boolean` | Whether cash is accepted. |

### InvoiceStatus

Possible values for invoice status.

| InvoiceStatus Value | Description |
| --- | --- |
| `NOT_PAID` | Represents not paid. |
| `PARTIALLY_PAID` | Represents partially paid. |
| `PAID` | Represents paid. |

### PaymentMethodToken

This mutation can be used to disable a payment method token. This will prevent the payment method token from being used to create a payment. Once a payment method token is disabled, it cannot be re-enabled.

| Field | Type | Description |
| --- | --- | --- |
| `address_line1` | `String` | The first line of the billing address. |
| `address_line2` | `String` | The second line of the billing address. |
| `bank_account_type` | `BankAccountType` | The type of bank account. See type definition: BankAccountType. |
| `bank_code` | `String` | The bank code of the bank account if payment_type is ACH. |
| `barcode_id` | `String` | The barcode id of the payment method token if payment_type is CASH. |
| `card_brand` | `String` | The brand of the card if payment_type is CARD. |
| `card_type` | `CardType` | The type of card if payment_type is CARD. See type definition: CardType. |
| `city` | `String` | The city of the billing address. |
| `country` | `String` | The country of the billing address. |
| `cvv_status` | `CvvStatus` | The CVV status. See type definition: CvvStatus. |
| `exp_date` | `String` | The expiration date of the card if payment_type is CARD. Format: MMYY |
| `full_name` | `String` | The name on card or bank account. |
| `is_active` | `Boolean` | Indicator for if payment method is active. If false the payment method cannot be used to process new transactions. |
| `issuing_country_code` | `String` | The issuing country code of the country that issued the card or that the bank account was opened in. |
| `last_four` | `String` | The last four digits of the card or bank account number. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the payment_method_token belongs to. |
| `metadata` | `AWSJSON` | Any additional data that was stored with the payment method token. |
| `payment_method_id` | `String` | The unique payment method id. |
| `payment_type` | `PaymentType` | The type of payment method. It can be one of the following: CARD, ACH See type definition: PaymentType. |
| `payor` | `Payor` | The payor object. Refer to the Payor docs for more info. See type definition: Payor. |
| `postal_code` | `String` | The postal code of the billing address. |
| `region` | `String` | The region of the billing address. |
| `wallet_type` | `WalletType` | The type of wallet that the payment method token is stored in. See type definition: WalletType. |

### BankAccountType

Possible values for bank account type.

| BankAccountType Value | Description |
| --- | --- |
| `BUSINESS_CHECKING` | Represents business checking. |
| `BUSINESS_SAVINGS` | Represents business savings. |
| `PERSONAL_CHECKING` | Represents personal checking. |
| `PERSONAL_SAVINGS` | Represents personal savings. |

### CardType

The type of card. It can be one of the following:

| CardType Value | Description |
| --- | --- |
| `BUSINESS_CREDIT` | Represents business credit. |
| `BUSINESS_DEBIT` | Represents business debit. |
| `CREDIT_CARD` | Represents credit card. |
| `DEBIT_CARD` | Represents debit card. |
| `PREPAID_CARD` | Represents prepaid card. |

### CvvStatus

Possible values for CVV status.

| CvvStatus Value | Description |
| --- | --- |
| `MATCH` | Represents match. |
| `NO_MATCH` | Represents no match. |
| `UNKNOWN` | Represents unknown. |

### PaymentType

The type of payment method. It can be one of the following:

| PaymentType Value | Description |
| --- | --- |
| `ACH` | Represents ACH. |
| `CARD` | Represents card. |
| `CASH` | Represents cash. |

### WalletType

The type of wallet that the payment method token is stored in. It can be one of the following:

| WalletType Value | Description |
| --- | --- |
| `APPLE_PAY` | Represents apple pay. |
| `CLICK_TO_PAY` | Represents click to pay. |
| `GOOGLE_PAY` | Represents google pay. |
| `PAZE` | Represents Paze. |
| `SAMSUNG_PAY` | Represents samsung pay. |
| `VISA_STAGED` | Represents visa staged. |

### AuthorizationStatus

The status of the authorization.

| AuthorizationStatus Value | Description |
| --- | --- |
| `CANCELED` | The authorization was canceled by the merchant. |
| `FAILED` | The authorization failed at the processor level. |
| `SUCCEEDED` | The authorization was successful at the processor level. |