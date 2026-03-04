# createWalletAuthorization

> **Group:** Authorization
> **Operation Type:** MUTATION

This call is used to create an authorization for a wallet payment via Apple Pay or Google Pay. It works in conjunction with our SDKs to allow you to create an authorization via our API.

## GraphQL Signature

```graphql
mutation createWalletAuthorization($app_id: String, $merchant_uid: String!, $sale_id: String, $wallet_type: WalletType, $digital_wallet_payload: String!, $amount: Int, $fee: Int, $billing_address: BillingAddressInput, $payor_id: String, $payor: PayorInput, $invoice_id: String, $account_code: String, $reference: String, $metadata: AWSJSON, $health_expense_type: HealthExpenseType, $additional_purchase_data: AdditionalPurchaseDataInput) {
  createWalletAuthorization(app_id: $app_id, merchant_uid: $merchant_uid, sale_id: $sale_id, wallet_type: $wallet_type, digital_wallet_payload: $digital_wallet_payload, amount: $amount, fee: $fee, billing_address: $billing_address, payor_id: $payor_id, payor: $payor, invoice_id: $invoice_id, account_code: $account_code, reference: $reference, metadata: $metadata, health_expense_type: $health_expense_type, additional_purchase_data: $additional_purchase_data) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `app_id` | `String` | No | The Pay Theory unique identifier for the application. |
| `merchant_uid` | `String!` | Yes | The Pay Theory unique identifier assigned to the merchant that the authorization belongs to. |
| `sale_id` | `String` | No | The Pay Theory unique identifier assigned to the sale that the authorization belongs to. Sales can be used to tie together multiple auths and captures. |
| `wallet_type` | `WalletType` | No | The type of digital wallet being used. Can be one of: APPLE_PAY, GOOGLE_PAY, CLICK_TO_PAY, SAMSUNG_PAY, VISA_STAGED |
| `digital_wallet_payload` | `String!` | Yes | The encrypted payload from the PayTheory SDK containing payment information. |
| `amount` | `Int` | No | The amount of the authorization in cents. |
| `fee` | `Int` | No | The amount of the service fee in cents. Required if fee_mode is SERVICE_FEE. |
| `billing_address` | `BillingAddressInput` | No | The billing address information for the authorization. |
| `payor_id` | `String` | No | The Pay Theory unique identifier for the payor making the payment. |
| `payor` | `PayorInput` | No | The payor information if a new payor needs to be created. |
| `invoice_id` | `String` | No | The Pay Theory unique identifier assigned to the invoice that the authorization belongs to. |
| `account_code` | `String` | No | Custom defined value passed in as the account code for the authorization. |
| `reference` | `String` | No | Custom defined value passed in as the reference for the authorization. |
| `metadata` | `AWSJSON` | No | Any additional data that should be stored with the authorization. |
| `health_expense_type` | `HealthExpenseType` | No | The health expense type for the authorization. Can be one of: CLINICAL, COPAY, DENTAL, HEALTHCARE, RX, TRANSIT, VISION |
| `additional_purchase_data` | `AdditionalPurchaseDataInput` | No | Additional purchase data for Level 3 processing requirements. |

## Return Type

**Returns:** `Authorization!`

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

## Examples

### Example createWalletAuthorization

This call is used to create an authorization for a wallet payment via Apple Pay or Google Pay. It works in conjunction with our SDKs to allow you to create an authorization via our API.

**Query:**

```graphql
mutation CreateWalletAuthorization($app_id: String, $merchant_uid: String!, $sale_id: String, $wallet_type: WalletType, $digital_wallet_payload: String!, $amount: Int, $fee: Int, $billing_address: BillingAddressInput, $payor_id: String, $payor: PayorInput, $invoice_id: String, $account_code: String, $reference: String, $metadata: AWSJSON, $health_expense_type: HealthExpenseType, $additional_purchase_data: AdditionalPurchaseDataInput) {
  createWalletAuthorization(app_id: $app_id, merchant_uid: $merchant_uid, sale_id: $sale_id, wallet_type: $wallet_type, digital_wallet_payload: $digital_wallet_payload, amount: $amount, fee: $fee, billing_address: $billing_address, payor_id: $payor_id, payor: $payor, invoice_id: $invoice_id, account_code: $account_code, reference: $reference, metadata: $metadata, health_expense_type: $health_expense_type, additional_purchase_data: $additional_purchase_data) {
  authorization_id
  authorization_date
  account_code
  amount
  avs_status
  }
}
```

**Variables:**

```json
{
  "app_id": "example",
  "merchant_uid": "example",
  "sale_id": "example",
  "wallet_type": "APPLE_PAY",
  "digital_wallet_payload": "example",
  "amount": 123,
  "fee": 123,
  "billing_address": {
    "address_line1": "example",
    "address_line2": "example",
    "city": "example",
    "country": "example",
    "full_name": "example",
    "postal_code": "example",
    "region": "example"
  },
  "payor_id": "example",
  "payor": {
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
  },
  "invoice_id": "example",
  "account_code": "example",
  "reference": "example",
  "metadata": {
    "key": "value"
  },
  "health_expense_type": "CLINICAL",
  "additional_purchase_data": {
    "level3_data_line_item": [
      {
        "item_code": "example"
      }
    ],
    "level3_data_summary": {
      "dest_postal_code": "example"
    }
  }
}
```

**Response:**

```json
{
  "data": {
    "createWalletAuthorization": {
      "authorization_id": "example",
      "authorization_date": "2025-01-01T00:00:00Z",
      "account_code": "example",
      "amount": 123,
      "avs_status": "example"
    }
  }
}
```


## Type Definitions

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

### BillingAddressInput

The billing address input object used for wallet authorizations.

| Field | Type | Description |
| --- | --- | --- |
| `address_line1` | `String` | The first line of the billing address |
| `address_line2` | `String` | The second line of the billing address (optional) |
| `city` | `String` | The city of the billing address |
| `country` | `String` | The country code of the billing address (e.g., "US") |
| `full_name` | `String` | The full name associated with the billing address |
| `postal_code` | `String` | The postal or zip code of the billing address |
| `region` | `String` | The state, province, or region of the billing address |

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

### HealthExpenseType

The type of health expense.

| HealthExpenseType Value | Description |
| --- | --- |
| `CLINICAL` | Clinical expense. |
| `COPAY` | Copay expense. |
| `DENTAL` | Dental expense. |
| `HEALTHCARE` | Healthcare expense. |
| `RX` | RX expense. |
| `TRANSIT` | Transit expense. |
| `VISION` | Vision expense. |

### AdditionalPurchaseDataInput

The additional purchase data input object is used to provide Level 3 processing data for transactions. This data is typically required for commercial card transactions to qualify for lower interchange rates.

| Field | Type | Description |
| --- | --- | --- |
| `level3_data_line_item` | `[Level3DataLineItemInput]` | Array of line item details for the transaction See type definition: Level3DataLineItemInput. |
| `level3_data_summary` | `Level3DataSummaryInput` | Summary data for the entire transaction See type definition: Level3DataSummaryInput. |

### Level3DataLineItemInput

The Level 3 line item data provides detailed information about individual items in a transaction.

| Field | Type | Description |
| --- | --- | --- |
| `item_code` | `String` | The merchant's unique identifier for the item |
| `item_description` | `String` | A description of the item |
| `item_qty_exp` | `Int` | The exponent for the item quantity (e.g., 2 for hundredths) |
| `prod_code` | `String` | The product code for the item |
| `qty` | `Int` | The quantity of the item purchased |
| `tax_amount` | `Int` | The tax amount for this line item in cents |
| `tax_ind` | `TaxIndicatorType` | Indicates how tax is applied to this item See type definition: TaxIndicatorType. |
| `tax_rate` | `Int` | The tax rate applied to this item |
| `tax_rt_exp` | `Int` | The exponent for the tax rate (e.g., 4 for ten-thousandths) |
| `tax_type_id` | `TaxType` | The type of tax applied See type definition: TaxType. |
| `unit_cost` | `Int` | The unit cost of the item in cents |
| `unit_of_msure` | `String` | The unit of measure for the item (e.g., "EA" for each, "LB" for pounds) |

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

### Level3DataSummaryInput

The Level 3 summary data provides high-level information about the entire transaction.

| Field | Type | Description |
| --- | --- | --- |
| `dest_postal_code` | `String` | The postal code of the destination for shipped goods |
| `discnt_amt` | `Int` | The total discount amount in cents |
| `duty_amt` | `Int` | The total duty amount in cents |
| `frght_amt` | `Int` | The total freight/shipping amount in cents |
| `order_num` | `String` | The merchant's order number |
| `prod_desc` | `[String]` | Array of product descriptions included in the transaction |
| `purch_idfr` | `String` | The purchase identifier |
| `tax_amt` | `Int` | The total tax amount for the transaction in cents |
| `tax_ind` | `TaxIndicatorType` | Indicates how tax is applied to the transaction See type definition: TaxIndicatorType. |

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

### AuthorizationStatus

The status of the authorization.

| AuthorizationStatus Value | Description |
| --- | --- |
| `CANCELED` | The authorization was canceled by the merchant. |
| `FAILED` | The authorization failed at the processor level. |
| `SUCCEEDED` | The authorization was successful at the processor level. |