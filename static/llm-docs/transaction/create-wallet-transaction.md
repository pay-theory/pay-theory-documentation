# createWalletTransaction

> **Group:** Transaction
> **Operation Type:** MUTATION

This call is used to create a transaction for a wallet payment via Apple Pay or Google Pay. It works in conjunction with our SDKs to allow you to create a transaction via our API.

## GraphQL Signature

```graphql
mutation createWalletTransaction($app_id: String, $merchant_uid: String!, $wallet_type: WalletType, $digital_wallet_payload: String!, $amount: Int, $fee: Int, $billing_address: BillingAddressInput, $payor_id: String, $payor: PayorInput, $recurring_id: String, $invoice_id: String, $account_code: String, $reference: String, $send_receipt: Boolean, $receipt_description: String, $metadata: AWSJSON, $health_expense_type: HealthExpenseType, $additional_purchase_data: AdditionalPurchaseDataInput, $split: [SplitInput]) {
  createWalletTransaction(app_id: $app_id, merchant_uid: $merchant_uid, wallet_type: $wallet_type, digital_wallet_payload: $digital_wallet_payload, amount: $amount, fee: $fee, billing_address: $billing_address, payor_id: $payor_id, payor: $payor, recurring_id: $recurring_id, invoice_id: $invoice_id, account_code: $account_code, reference: $reference, send_receipt: $send_receipt, receipt_description: $receipt_description, metadata: $metadata, health_expense_type: $health_expense_type, additional_purchase_data: $additional_purchase_data, split: $split) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `app_id` | `String` | No | The Pay Theory unique identifier for the application. |
| `merchant_uid` | `String!` | Yes | The Pay Theory unique identifier for the merchant the transaction is for. |
| `wallet_type` | `WalletType` | No | The type of digital wallet being used. Can be one of: APPLE_PAY, GOOGLE_PAY, CLICK_TO_PAY, SAMSUNG_PAY, VISA_STAGED |
| `digital_wallet_payload` | `String!` | Yes | The encrypted payload from the PayTheory SDK containing payment information. |
| `amount` | `Int` | No | The amount of the transaction in cents. |
| `fee` | `Int` | No | The amount of the service fee in cents. Required if fee_mode is SERVICE_FEE. |
| `billing_address` | `BillingAddressInput` | No | The billing address information for the transaction. |
| `payor_id` | `String` | No | The Pay Theory unique identifier for the payor making the payment. |
| `payor` | `PayorInput` | No | The payor information if a new payor needs to be created. |
| `recurring_id` | `String` | No | The Pay Theory unique identifier for the recurring payment the transaction is for. |
| `invoice_id` | `String` | No | The Pay Theory unique identifier for the invoice the transaction is for. |
| `account_code` | `String` | No | Customer defined account code for the transaction. |
| `reference` | `String` | No | Customer defined reference for the transaction. |
| `send_receipt` | `Boolean` | No | If the receipt should be sent to the payor. Defaults to false. It is sent to the email address on file with the payment method. |
| `receipt_description` | `String` | No | The description of the transaction that will be displayed on the receipt. |
| `metadata` | `AWSJSON` | No | Custom defined JSON object to be stored with the transaction. |
| `health_expense_type` | `HealthExpenseType` | No | The type of health expense for the transaction. Can be one of: CLINICAL, COPAY, DENTAL, HEALTHCARE, RX, TRANSIT, VISION |
| `additional_purchase_data` | `AdditionalPurchaseDataInput` | No | Additional purchase data for Level 3 processing requirements. |
| `split` | `[SplitInput]` | No | An array of split objects to distribute the transaction amount to different accounts. The sum of all split amounts must equal the transaction amount. |

## Return Type

**Returns:** `Transaction!`

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Customer defined account code for the transaction. |
| `ach_return_details` | `AchReturnDetails` | The details of the ACH return if any. See type definition: AchReturnDetails. |
| `additional_purchase_data` | `AdditionalPurchaseData` | The additional purchase data. See type definition: AdditionalPurchaseData. |
| `authorization_id` | `String` | The authorization id for the transaction. |
| `avs_status` | `AvsStatus` | The AVS status for the transaction. See type definition: AvsStatus. |
| `currency` | `String` | The type of currency for the transaction. |
| `device_id` | `String` | No description available. |
| `dispute_status` | `DisputeStatus` | The status of the dispute if any. See type definition: DisputeStatus. |
| `failure_reasons` | `[String]` | List of strings, if any, detailing the reason a transaction failed. See Failure Codes for a complete list of failure codes and descriptions. |
| `fee_mode` | `FeeMode` | The fee mode on the transaction. See type definition: FeeMode. |
| `fees` | `Int` | The amount of the fees charged for the transaction. |
| `flag_for_review` | `TransactionReviewStatus` | A status indiciator for any transactions that are in review. When a transaction is in review the funds will not settle to the merchant until resolved. See type definition: TransactionReviewStatus. |
| `gross_amount` | `Int` | The total amount of the transaction. |
| `invoice` | `Invoice` | The invoice object for the transaction if any. See type definition: Invoice. |
| `is_settled` | `Boolean` | Whether the transaction has been settled. |
| `merchant` | `ListMerchant` | The merchant object of the merchant the transaction belongs to. See type definition: ListMerchant. |
| `merchant_uid` | `String` | The Pay Theory unique identifier for the merchant the transaction is for. |
| `metadata` | `AWSJSON` | Custom defined JSON object to be stored with the transaction. |
| `net_amount` | `Int` | The total amount of the transaction after fees. |
| `parent_id` | `String` | The Pay Theory unique identifier for the parent transaction if any. |
| `payment_method` | `PaymentMethodToken` | The payment method used to make the transaction. See type definition: PaymentMethodToken. |
| `processor` | `String` | No description available. |
| `recurring` | `RecurringPayment` | The recurring payment that the transaction belongs to if any. See type definition: RecurringPayment. |
| `reference` | `String` | Customer defined reference for the transaction. |
| `refund_reason` | `RefundReason` | The reason for the refund if any. See type definition: RefundReason. |
| `refund_voidable` | `Boolean` | Whether the refund can be voided. |
| `refunded_amount` | `Int` | The amount of the transaction that has been refunded if any. |
| `sale_id` | `String` | The sale id for the transaction if any. |
| `settlement_batch` | `Int` | The unique settlement batch number the transaction belongs to if settled. |
| `splits` | `[Split]` | An array of split objects associated with this transaction, if any. See type definition: Split. |
| `status` | `TransactionStatus` | The status of the transaction. See type definition: TransactionStatus. |
| `timezone` | `String` | The timezone the transaction was made in. |
| `transaction_date` | `AWSDateTime` | The date the transaction was made. |
| `transaction_id` | `String` | The Pay Theory unique identifier for the transaction. |
| `transaction_type` | `TransactionType` | The type of transfer that was made. See type definition: TransactionType. |
| `updated_row_at` | `AWSDateTime` | The date and time the transaction was last updated. |

## Examples

### Example createWalletTransaction

This call is used to create a transaction for a wallet payment via Apple Pay or Google Pay. It works in conjunction with our SDKs to allow you to create a transaction via our API.

**Query:**

```graphql
mutation CreateWalletTransaction($app_id: String, $merchant_uid: String!, $wallet_type: WalletType, $digital_wallet_payload: String!, $amount: Int, $fee: Int, $billing_address: BillingAddressInput, $payor_id: String, $payor: PayorInput, $recurring_id: String, $invoice_id: String, $account_code: String, $reference: String, $send_receipt: Boolean, $receipt_description: String, $metadata: AWSJSON, $health_expense_type: HealthExpenseType, $additional_purchase_data: AdditionalPurchaseDataInput, $split: [SplitInput]) {
  createWalletTransaction(app_id: $app_id, merchant_uid: $merchant_uid, wallet_type: $wallet_type, digital_wallet_payload: $digital_wallet_payload, amount: $amount, fee: $fee, billing_address: $billing_address, payor_id: $payor_id, payor: $payor, recurring_id: $recurring_id, invoice_id: $invoice_id, account_code: $account_code, reference: $reference, send_receipt: $send_receipt, receipt_description: $receipt_description, metadata: $metadata, health_expense_type: $health_expense_type, additional_purchase_data: $additional_purchase_data, split: $split) {
  transaction_id
  transaction_date
  account_code
  authorization_id
  avs_status
  }
}
```

**Variables:**

```json
{
  "app_id": "example",
  "merchant_uid": "example",
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
  "recurring_id": "example",
  "invoice_id": "example",
  "account_code": "example",
  "reference": "example",
  "send_receipt": true,
  "receipt_description": "example",
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
  },
  "split": [
    {
      "amount": 123,
      "merchant_uid": "id_123"
    }
  ]
}
```

**Response:**

```json
{
  "data": {
    "createWalletTransaction": {
      "transaction_id": "example",
      "transaction_date": "2025-01-01T00:00:00Z",
      "account_code": "example",
      "authorization_id": "example",
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

### SplitInput

When creating a transaction or capturing an authorization, you can include splits using the following input format:

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Customer defined account code for the split. |
| `amount` | `Int!` | The amount of the split in cents. Required. |
| `metadata` | `AWSJSON` | Custom defined JSON object to be stored with the split. |
| `merchant_uid` | `ID!` | The Pay Theory unique identifier for the merchant the split belongs to. Required. |
| `reference` | `String` | Customer defined reference for the split. |

### Transaction

Transactions are a data object that can represent a payment, failed or successful, or a refund.

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Customer defined account code for the transaction. |
| `ach_return_details` | `AchReturnDetails` | The details of the ACH return if any. See type definition: AchReturnDetails. |
| `additional_purchase_data` | `AdditionalPurchaseData` | The additional purchase data. See type definition: AdditionalPurchaseData. |
| `authorization_id` | `String` | The authorization id for the transaction. |
| `avs_status` | `AvsStatus` | The AVS status for the transaction. See type definition: AvsStatus. |
| `currency` | `String` | The type of currency for the transaction. |
| `device_id` | `String` | No description available. |
| `dispute_status` | `DisputeStatus` | The status of the dispute if any. See type definition: DisputeStatus. |
| `failure_reasons` | `[String]` | List of strings, if any, detailing the reason a transaction failed. See Failure Codes for a complete list of failure codes and descriptions. |
| `fee_mode` | `FeeMode` | The fee mode on the transaction. See type definition: FeeMode. |
| `fees` | `Int` | The amount of the fees charged for the transaction. |
| `flag_for_review` | `TransactionReviewStatus` | A status indiciator for any transactions that are in review. When a transaction is in review the funds will not settle to the merchant until resolved. See type definition: TransactionReviewStatus. |
| `gross_amount` | `Int` | The total amount of the transaction. |
| `invoice` | `Invoice` | The invoice object for the transaction if any. See type definition: Invoice. |
| `is_settled` | `Boolean` | Whether the transaction has been settled. |
| `merchant` | `ListMerchant` | The merchant object of the merchant the transaction belongs to. See type definition: ListMerchant. |
| `merchant_uid` | `String` | The Pay Theory unique identifier for the merchant the transaction is for. |
| `metadata` | `AWSJSON` | Custom defined JSON object to be stored with the transaction. |
| `net_amount` | `Int` | The total amount of the transaction after fees. |
| `parent_id` | `String` | The Pay Theory unique identifier for the parent transaction if any. |
| `payment_method` | `PaymentMethodToken` | The payment method used to make the transaction. See type definition: PaymentMethodToken. |
| `processor` | `String` | No description available. |
| `recurring` | `RecurringPayment` | The recurring payment that the transaction belongs to if any. See type definition: RecurringPayment. |
| `reference` | `String` | Customer defined reference for the transaction. |
| `refund_reason` | `RefundReason` | The reason for the refund if any. See type definition: RefundReason. |
| `refund_voidable` | `Boolean` | Whether the refund can be voided. |
| `refunded_amount` | `Int` | The amount of the transaction that has been refunded if any. |
| `sale_id` | `String` | The sale id for the transaction if any. |
| `settlement_batch` | `Int` | The unique settlement batch number the transaction belongs to if settled. |
| `splits` | `[Split]` | An array of split objects associated with this transaction, if any. See type definition: Split. |
| `status` | `TransactionStatus` | The status of the transaction. See type definition: TransactionStatus. |
| `timezone` | `String` | The timezone the transaction was made in. |
| `transaction_date` | `AWSDateTime` | The date the transaction was made. |
| `transaction_id` | `String` | The Pay Theory unique identifier for the transaction. |
| `transaction_type` | `TransactionType` | The type of transfer that was made. See type definition: TransactionType. |
| `updated_row_at` | `AWSDateTime` | The date and time the transaction was last updated. |

### AchReturnDetails

ACH return details details.

| Field | Type | Description |
| --- | --- | --- |
| `return_code` | `String` | The return code for the ACH return. |
| `return_details` | `String` | The details of the ACH return. |
| `transfer_type` | `AchReturnTransferType` | The type of transfer that the ACH return is for. See type definition: AchReturnTransferType. |

### AchReturnTransferType

Possible values for ACH return transfer type.

| AchReturnTransferType Value | Description |
| --- | --- |
| `CREDIT` | The ACH return is going to credit the merchant funds. |
| `DEBIT` | The ACH return is going to debit the merchant funds. |

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

### DisputeStatus

Possible values for dispute status.

| DisputeStatus Value | Description |
| --- | --- |
| `INQUIRY` | The dispute is in the inquiry stage. The cardholder has requested more information about the charge. |
| `LOST` | The dispute has been lost. The cardholder has won the dispute and the funds have been withdrawn from the merchants account. |
| `PENDING` | The dispute is in the pending stage. The cardholder has requested a chargeback. |
| `WON` | The dispute has been won. The merchant has won the dispute and the funds have been deposited into the merchants account. |

### FeeMode

Possible values for fee mode.

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | No description available. (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

### TransactionReviewStatus

Possible values for transaction review status.

| TransactionReviewStatus Value | Description |
| --- | --- |
| `EXCEEDS_AUTH` | Transaction was flagged for greatly exceeding the auth amount. |
| `EXCEEDS_FEE_LIMIT` | Represents exceeds fee limit. |
| `EXCEEDS_THRESHOLD` | Transaction was flagged for exceeding the threshold set on the merchant account by Pay Theory. |
| `POTENTIAL_DUPLICATE` | Transaction was flagged for being a potential duplicate based on settings configured in the partner environment. |

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

### ListMerchant

This is a limited merchant object that is returned when you want to query a list of merchants.

| Field | Type | Description |
| --- | --- | --- |
| `ach_active` | `Boolean` | If the merchant has successfully completed onboarding and has an ACH processor active. |
| `card_active` | `Boolean` | If the merchant has successfully completed onboarding and has a card processor active. |
| `cash_active` | `Boolean` | If the merchant has successfully completed onboarding and has a cash processor active. |
| `country_code` | `String` | The country code of the country the merchant operates from. |
| `is_system` | `Boolean` | If the merchant is a system merchant. System merchants are merchants that also have sub merchants. |
| `merchant_name` | `String` | The name of the merchant. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant. |
| `metadata` | `AWSJSON` | The metadata that has been set on the Merchant. |
| `parent_merchant_uid` | `String` | The merchant_uid of the parent merchant. This is only set if the merchant is a sub merchant of a system merchant. |
| `submitted_onboarding` | `Boolean` | Whether the merchant has submitted their onboarding information. |
| `updated_row_at` | `AWSDateTime` | The date the merchant was last updated. |

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

### RecurringPayment

A recurring payment represents a payment that will trigger on an interval.

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Custom account code for the recurring payment that will be tied to each payment. |
| `amount_per_payment` | `Int` | The amount of the recurring payment. |
| `created_date` | `AWSDateTime` | The date the recurring payment was created. |
| `currency` | `String` | The type of currency for the recurring payment. |
| `fee_mode` | `FeeMode` | The fee mode for the recurring payment. See type definition: FeeMode. |
| `fee_per_payment` | `Int` | The fee for the recurring payment. |
| `is_active` | `Boolean` | Whether the recurring payment is active or been disabled. |
| `is_processing` | `Boolean` | Whether the recurring payment is currently processing. |
| `recurring_id` | `String` | The Pay Theory unique identifier assigned to the recurring payment. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the recurring payment belongs to. |
| `metadata` | `AWSJSON` | Custom metadata for the recurring payment that will be tied to each payment. |
| `mute_all_emails` | `Boolean` | Manage whether the payor will receive emails for the recurring payment from Pay Theory. |
| `next_payment_date` | `AWSDate` | The date of the next payment to be made for the recurring payment. |
| `payment_interval` | `RecurringInterval` | The interval of the recurring payment. See type definition: RecurringInterval. |
| `payment_method` | `PaymentMethodToken` | The payment method used to make the recurring payment. See type definition: PaymentMethodToken. |
| `payor` | `Payor` | The payor that the recurring payment belongs to. See type definition: Payor. |
| `prev_payment_date` | `AWSDate` | The date of the last payment made for the recurring payment. |
| `recurring_description` | `String` | Custom description for the recurring payment. |
| `recurring_name` | `String` | Custom name for the recurring payment. |
| `reference` | `String` | Custom reference for the recurring payment that will be tied to each payment. |
| `remaining_payments` | `Int` | The number of payments remaining for the recurring payment. |
| `status` | `RecurringStatus` | The status of the recurring payment. See type definition: RecurringStatus. |
| `total_amount_per_payment` | `Int` | The amount the payor will be charged for the recurring payment. |

### RecurringInterval

The interval of the recurring payment. The following intervals are available:

| RecurringInterval Value | Description |
| --- | --- |
| `ANNUAL` | Recurring payment made annually. |
| `BI_ANNUAL` | Recurring payment made bi-annually. |
| `BI_WEEKLY` | Recurring payment made bi-weekly. |
| `MONTHLY` | Recurring payment made monthly. |
| `QUARTERLY` | Recurring payment made quarterly. |
| `WEEKLY` | Recurring payment made weekly. |

### RecurringStatus

The status of the recurring payment. The following statuses are available:

| RecurringStatus Value | Description |
| --- | --- |
| `INSTRUMENT_FAILURE` | Recurring payment failed due to instrument failure. |
| `SUCCESS` | Recurring payment successful. |
| `SYSTEM_FAILURE` | Recurring payment failed due to system failure. |

### RefundReason

Refund reason object.

| Field | Type | Description |
| --- | --- | --- |
| `reason_code` | `RefundReasonCode` | The reason code for the refund. See type definition: RefundReasonCode. |
| `reason_details` | `String` | The details of the refund reason. |

### RefundReasonCode

Possible values for refund reason code.

| RefundReasonCode Value | Description |
| --- | --- |
| `DUPLICATE` | Represents duplicate. |
| `FRAUDULENT` | Represents fraudulent. |
| `OTHER` | Represents other. |
| `REQUESTED_BY_CUSTOMER` | Represents requested by customer. |

### Split

Splits are a way to distribute funds from a transaction to different accounts. When a transaction is created or captured, you can specify splits to allocate portions of the transaction amount to different accounts.

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Customer defined account code for the split. |
| `amount` | `Int!` | The amount of the split in cents. |
| `currency` | `String!` | The currency of the split. |
| `created_at` | `AWSDateTime!` | The date and time the split was created. |
| `id` | `String!` | The Pay Theory unique identifier for the split. |
| `merchant` | `ListMerchant!` | The merchant object containing information about the merchant. See type definition: ListMerchant. |
| `metadata` | `AWSJSON` | Custom defined JSON object to be stored with the split. |
| `payment_method` | `PaymentMethodToken!` | The payment method used for the transaction associated with this split. See type definition: PaymentMethodToken. |
| `reference` | `String` | Customer defined reference for the split. |
| `settlement_batch` | `Int` | The unique settlement batch number the split belongs to if settled. |
| `transaction_id` | `String!` | The Pay Theory unique identifier for the transaction the split belongs to. |
| `updated_row_at` | `AWSDateTime!` | The date and time the split was last updated. |

### TransactionStatus

Possible values for transaction status.

| TransactionStatus Value | Description |
| --- | --- |
| `CANCELED` | The transaction was canceled. |
| `FAILED` | The transaction failed to pass initial checks and authorization was not successful. |
| `PARTIALLY_REFUNDED` | The transaction has been refunded for a portion of the amount. |
| `PENDING` | The transaction is succesfull pending capture. This is what will be returned for all transactions that did not fail. |
| `REFUNDED` | The transaction has been fully refunded. |
| `RETURNED` | The transaction is an ACH transaction that has had an ACH_RETURN created for it. |
| `SETTLED` | The transaction has been added to a settlement batch and will settle to the merchant. |
| `SUCCEEDED` | The transaction has been captured. |
| `VOIDED` | The transaction has been voided which means it was never captured and will not be settled. |

### TransactionType

Possible values for transaction type.

| TransactionType Value | Description |
| --- | --- |
| `ACH_RETURN` | The transaction is an ACH return for an ACH Debit or Reversal. Check parent_id to find origin. |
| `DEBIT` | The transaction is a debit to a payors payment method. |
| `FAILURE` | The transaction is a failed debit to a payors payment method. |
| `REVERSAL` | The transaction is a reversal on a debit to a payors payment method. Check parent_id to find origin. |