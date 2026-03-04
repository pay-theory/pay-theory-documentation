# createOneTimePayment

> **Group:** Deprecated
> **Operation Type:** MUTATION

> Deprecated: Use createTransaction instead.

This call was deprecated in favor of the createTransaction mutation. The createTransaction mutation returns a more detailed response than this call.

## GraphQL Signature

```graphql
mutation createOneTimePayment($merchant_uid: String!, $amount: Int!, $payment_method_id: String, $payment_method: PaymentMethodInput, $recurring_id: String, $invoice_id: String, $fee: Int, $fee_mode: FeeMode, $payment_parameters_name: String, $account_code: String, $reference: String, $send_receipt: Boolean, $receipt_description: String, $metadata: AWSJSON, $health_expense_type: HealthExpenseType, $additional_purchase_data: AdditionalPurchaseDataInput) {
  createOneTimePayment(merchant_uid: $merchant_uid, amount: $amount, payment_method_id: $payment_method_id, payment_method: $payment_method, recurring_id: $recurring_id, invoice_id: $invoice_id, fee: $fee, fee_mode: $fee_mode, payment_parameters_name: $payment_parameters_name, account_code: $account_code, reference: $reference, send_receipt: $send_receipt, receipt_description: $receipt_description, metadata: $metadata, health_expense_type: $health_expense_type, additional_purchase_data: $additional_purchase_data) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `String!` | Yes | The Pay Theory unique identifier for the merchant the transaction is for. |
| `amount` | `Int!` | Yes | The amount of the transaction. If the FeeMode is SERVICE_FEE, this is the amount of the transaction before fees. |
| `payment_method_id` | `String` | No | The Pay Theory unique identifier for the payment method the transaction will be charged to. |
| `payment_method` | `PaymentMethodInput` | No | The payment method to be used for the transaction. This is required if you are not passing in a payment_method_id. |
| `recurring_id` | `String` | No | The Pay Theory unique identifier for the recurring payment the transaction is for. |
| `invoice_id` | `String` | No | The Pay Theory unique identifier for the invoice the transaction is for. |
| `fee` | `Int` | No | The amount of the fee that will be charged to the payor for the transaction if the FeeMode is SERVICE_FEE. |
| `fee_mode` | `FeeMode` | No | The fee mode on the transaction. SERVICE_FEE charges the fees to the payor. MERCHANT_FEE charges the fees to the merchant. Options are: |
| `payment_parameters_name` | `String` | No | — |
| `account_code` | `String` | No | Customer defined account code for the transaction. |
| `reference` | `String` | No | Customer defined reference for the transaction. |
| `send_receipt` | `Boolean` | No | If the receipt should be sent to the payor. Defaults to false. It is sent to the email address on file with the payment method. |
| `receipt_description` | `String` | No | The description of the transaction that will be displayed on the receipt. |
| `metadata` | `AWSJSON` | No | Custom defined JSON object to be stored with the transaction. |
| `health_expense_type` | `HealthExpenseType` | No | The health expense type. |
| `additional_purchase_data` | `AdditionalPurchaseDataInput` | No | The additional purchase data. |

## Return Type

**Returns:** `OneTimePayment`

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Int` | Amount in minor units (for example cents). |
| `card_brand` | `String` | The card brand. |
| `created_at` | `AWSDateTime` | The date and time this was created. |
| `currency` | `String` | Currency code. |
| `failure_reason` | `String` | The failure reason. |
| `last_four` | `String` | The last four. |
| `service_fee` | `Int` | The service fee. |
| `status` | `TransactionStatus` | Status value. See type definition: TransactionStatus. |
| `transaction_id` | `String` | Pay Theory unique identifier for the transaction. |

## Examples

### Example createOneTimePayment

This call was deprecated in favor of the createTransaction mutation. The createTransaction mutation returns a more detailed response than this call.

**Query:**

```graphql
mutation CreateOneTimePayment($merchant_uid: String!, $amount: Int!, $payment_method_id: String, $payment_method: PaymentMethodInput, $recurring_id: String, $invoice_id: String, $fee: Int, $fee_mode: FeeMode, $payment_parameters_name: String, $account_code: String, $reference: String, $send_receipt: Boolean, $receipt_description: String, $metadata: AWSJSON, $health_expense_type: HealthExpenseType, $additional_purchase_data: AdditionalPurchaseDataInput) {
  createOneTimePayment(merchant_uid: $merchant_uid, amount: $amount, payment_method_id: $payment_method_id, payment_method: $payment_method, recurring_id: $recurring_id, invoice_id: $invoice_id, fee: $fee, fee_mode: $fee_mode, payment_parameters_name: $payment_parameters_name, account_code: $account_code, reference: $reference, send_receipt: $send_receipt, receipt_description: $receipt_description, metadata: $metadata, health_expense_type: $health_expense_type, additional_purchase_data: $additional_purchase_data) {
  transaction_id
  created_at
  amount
  card_brand
  currency
  }
}
```

**Variables:**

```json
{
  "merchant_uid": "example",
  "amount": 123,
  "payment_method_id": "example",
  "payment_method": {
    "ach": {
      "account_number": "example",
      "account_type": "BUSINESS_CHECKING",
      "name_on_account": "example",
      "routing_number": "example"
    },
    "canadian_eft": {
      "account_number": "example",
      "account_type": "BUSINESS_CHECKING",
      "institution_number": "example",
      "name_on_account": "example",
      "transit_number": "example"
    },
    "card": {
      "card_number": "example",
      "exp_date": {
        "month": "example",
        "year": "example"
      },
      "postal_code": "example",
      "security_code": "example"
    },
    "metadata": {
      "key": "value"
    },
    "payor": {
      "address_line1": "example"
    },
    "payor_id": "example"
  },
  "recurring_id": "example",
  "invoice_id": "example",
  "fee": 123,
  "fee_mode": "CUSTOM_FEE",
  "payment_parameters_name": "example",
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
  }
}
```

**Response:**

```json
{
  "data": {
    "createOneTimePayment": {
      "transaction_id": "example",
      "created_at": "2025-01-01T00:00:00Z",
      "amount": 123,
      "card_brand": "example",
      "currency": "example"
    }
  }
}
```


## Type Definitions

### PaymentMethodInput

This is the input object used when passing in payment method into any mutation that requires it.

| Field | Type | Description |
| --- | --- | --- |
| `ach` | `AchInput` | The ach input object used for creating Bank Accounts in the USA See type definition: AchInput. |
| `canadian_eft` | `CanadianEftInput` | The canadian eft input object used for creating Bank Accounts in Canada. See type definition: CanadianEftInput. |
| `card` | `CardInput` | The card input object. See type definition: CardInput. |
| `metadata` | `AWSJSON` | Any additional data that you want to store with the payment method token. This data will be returned with the payment method token when queried. |
| `payor` | `PayorInput` | The payor input object. Refer to the PayorInput docs for more info. See type definition: PayorInput. |
| `payor_id` | `String` | The unique payor id for the payor this payment method token belongs to. |

### AchInput

The ach input object. It contains the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `String!` | The account number of the bank account. |
| `account_type` | `BankAccountType!` | The type of bank account. See type definition: BankAccountType. |
| `address_line1` | `String` | The first line of the billing address. |
| `address_line2` | `String` | The second line of the billing address. |
| `city` | `String` | The city of the billing address. |
| `country` | `String` | The country of the billing address. |
| `name_on_account` | `String!` | The name on the bank account. |
| `postal_code` | `String` | The postal code of the billing address. |
| `region` | `String` | The region of the billing address. |
| `routing_number` | `String!` | The routing number of the bank account. |

### BankAccountType

Possible values for bank account type.

| BankAccountType Value | Description |
| --- | --- |
| `BUSINESS_CHECKING` | Represents business checking. |
| `BUSINESS_SAVINGS` | Represents business savings. |
| `PERSONAL_CHECKING` | Represents personal checking. |
| `PERSONAL_SAVINGS` | Represents personal savings. |

### CanadianEftInput

The Canadian EFT input object. It contains the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `String!` | The account number of the bank account. |
| `account_type` | `BankAccountType!` | The type of bank account. See type definition: BankAccountType. |
| `institution_number` | `String!` | The institution number of the bank account. Should be 3 digits. |
| `name_on_account` | `String!` | The name on the bank account. |
| `transit_number` | `String!` | The transit number of the bank account. Should be 5 digits. |

### CardInput

The card input object. It contains the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `address_line1` | `String` | The first line of the billing address. |
| `address_line2` | `String` | The second line of the billing address. |
| `card_number` | `String!` | The card number. |
| `city` | `String` | The city of the billing address. |
| `country` | `String` | The country of the billing address. |
| `exp_date` | `CardExpirationInput!` | The card expiration input object. Refer to the CardExpirationInput docs for more info. See type definition: CardExpirationInput. |
| `full_name` | `String` | The name on the card. |
| `postal_code` | `String!` | The postal code of the billing address. |
| `region` | `String` | The region of the billing address. |
| `security_code` | `String!` | The security code of the card. |

### CardExpirationInput

The card expiration input object. It contains the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `month` | `String!` | The month of the expiration date. Format: MM |
| `year` | `String!` | The year of the expiration date. Format: YY |

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

### FeeMode

Possible values for fee mode.

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | No description available. (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

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

### OneTimePayment

One time payment object.

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Int` | Amount in minor units (for example cents). |
| `card_brand` | `String` | The card brand. |
| `created_at` | `AWSDateTime` | The date and time this was created. |
| `currency` | `String` | Currency code. |
| `failure_reason` | `String` | The failure reason. |
| `last_four` | `String` | The last four. |
| `service_fee` | `Int` | The service fee. |
| `status` | `TransactionStatus` | Status value. See type definition: TransactionStatus. |
| `transaction_id` | `String` | Pay Theory unique identifier for the transaction. |

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