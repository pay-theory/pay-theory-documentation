# Recurring Payment

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### recurringPayments

Returns recurring payments.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `SqlQuery` | No | The query to filter the recurring payments with based on Pay Theory defined data. Detailed information about the query object can be found here. |
| `limit` | `Int` | No | The number of recurring payments to return. |
| `offset` | `String` | No | The value of the offset item for which the list is being sorted. |
| `direction` | `MoveDirection` | No | The direction of the pagination. Makes sure the results are returned in the correct order. |
| `offset_id` | `String` | No | The recurring_id of the offset item. |

**Returns:** `RecurringPayments`

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[RecurringPayment]` | List of Recurring Payments. |
| `total_row_count` | `Int` | Total number of rows matching the query. |


**RecurringPayment fields:**

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Custom account code for the recurring payment that will be tied to each payment. |
| `amount_per_payment` | `Int` | The amount of the recurring payment. |
| `created_date` | `AWSDateTime` | The date the recurring payment was created. |
| `currency` | `String` | The type of currency for the recurring payment. |
| `fee_mode` | `FeeMode` | The fee mode for the recurring payment. |
| `fee_per_payment` | `Int` | The fee for the recurring payment. |
| `is_active` | `Boolean` | Whether the recurring payment is active or been disabled. |
| `is_processing` | `Boolean` | Whether the recurring payment is currently processing. |
| `recurring_id` | `String` | The Pay Theory unique identifier assigned to the recurring payment. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the recurring payment belongs to. |
| `metadata` | `AWSJSON` | Custom metadata for the recurring payment that will be tied to each payment. |
| `mute_all_emails` | `Boolean` | Manage whether the payor will receive emails for the recurring payment from Pay Theory. |
| `next_payment_date` | `AWSDate` | The date of the next payment to be made for the recurring payment. |
| `payment_interval` | `RecurringInterval` | The interval of the recurring payment. |
| `payment_method` | `PaymentMethodToken` | The payment method used to make the recurring payment. |
| `payor` | `Payor` | The payor that the recurring payment belongs to. |
| `prev_payment_date` | `AWSDate` | The date of the last payment made for the recurring payment. |
| `recurring_description` | `String` | Custom description for the recurring payment. |
| `recurring_name` | `String` | Custom name for the recurring payment. |
| `reference` | `String` | Custom reference for the recurring payment that will be tied to each payment. |
| `remaining_payments` | `Int` | The number of payments remaining for the recurring payment. |
| `status` | `RecurringStatus` | The status of the recurring payment. |
| `total_amount_per_payment` | `Int` | The amount the payor will be charged for the recurring payment. |


**FeeMode values:**

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | — (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

**RecurringInterval values:**

| RecurringInterval Value | Description |
| --- | --- |
| `ANNUAL` | Recurring payment made annually. |
| `BI_ANNUAL` | Recurring payment made bi-annually. |
| `BI_WEEKLY` | Recurring payment made bi-weekly. |
| `MONTHLY` | Recurring payment made monthly. |
| `QUARTERLY` | Recurring payment made quarterly. |
| `WEEKLY` | Recurring payment made weekly. |

**PaymentMethodToken fields:**

| Field | Type | Description |
| --- | --- | --- |
| `address_line1` | `String` | The first line of the billing address. |
| `address_line2` | `String` | The second line of the billing address. |
| `bank_account_type` | `BankAccountType` *(max depth reached)* | The type of bank account. |
| `bank_code` | `String` | The bank code of the bank account if payment_type is ACH. |
| `barcode_id` | `String` | The barcode id of the payment method token if payment_type is CASH. |
| `card_brand` | `String` | The brand of the card if payment_type is CARD. |
| `card_type` | `CardType` *(max depth reached)* | The type of card if payment_type is CARD. |
| `city` | `String` | The city of the billing address. |
| `country` | `String` | The country of the billing address. |
| `cvv_status` | `CvvStatus` *(max depth reached)* | The CVV status. |
| `exp_date` | `String` | The expiration date of the card if payment_type is CARD. Format: MMYY |
| `full_name` | `String` | The name on card or bank account. |
| `is_active` | `Boolean` | Indicator for if payment method is active. If false the payment method cannot be used to process new transactions. |
| `issuing_country_code` | `String` | The issuing country code of the country that issued the card or that the bank account was opened in. |
| `last_four` | `String` | The last four digits of the card or bank account number. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the payment_method_token belongs to. |
| `metadata` | `AWSJSON` | Any additional data that was stored with the payment method token. |
| `payment_method_id` | `String` | The unique payment method id. |
| `payment_type` | `PaymentType` *(max depth reached)* | The type of payment method. It can be one of the following: CARD, ACH |
| `payor` | `Payor` *(max depth reached)* | The payor object. Refer to the Payor docs for more info. |
| `postal_code` | `String` | The postal code of the billing address. |
| `region` | `String` | The region of the billing address. |
| `wallet_type` | `WalletType` *(max depth reached)* | The type of wallet that the payment method token is stored in. |

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

**RecurringStatus values:**

| RecurringStatus Value | Description |
| --- | --- |
| `INSTRUMENT_FAILURE` | Recurring payment failed due to instrument failure. |
| `SUCCESS` | Recurring payment successful. |
| `SYSTEM_FAILURE` | Recurring payment failed due to system failure. |

**Example: Example recurringPayments**

Returns recurring payments.

```graphql
query RecurringPayments($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  recurringPayments(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
  items {
    recurring_id
    created_date
    account_code
    amount_per_payment
    currency
  }
  total_row_count
  }
}
```

```json
{
  "data": {
    "recurringPayments": {
      "items": [
        {
          "recurring_id": "example",
          "created_date": "2025-01-01T00:00:00Z",
          "account_code": "example",
          "amount_per_payment": 123,
          "currency": "example"
        }
      ],
      "total_row_count": 123
    }
  }
}
```


### missedRecurringPaymentData

This call will return details you need to display the proper amount to the customer to catch up on missed payments for a recurring payment.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `recurring_id` | `String!` | Yes | The recurring_id of the recurring payment to get missed payment data for. |

**Returns:** `MissedRecurringPaymentData`

| Field | Type | Description |
| --- | --- | --- |
| `fee` | `Int` | Fee amount in minor units (for example cents). |
| `number_of_payments_missed` | `Int` | The number of payments missed. |
| `total_amount_owed` | `Int` | The total amount owed. |

**Example: Example missedRecurringPaymentData**

This call will return details you need to display the proper amount to the customer to catch up on missed payments for a recurring payment.

```graphql
query MissedRecurringPaymentData($recurring_id: String!) {
  missedRecurringPaymentData(recurring_id: $recurring_id) {
  fee
  number_of_payments_missed
  total_amount_owed
  }
}
```

```json
{
  "data": {
    "missedRecurringPaymentData": {
      "fee": 123,
      "number_of_payments_missed": 123,
      "total_amount_owed": 123
    }
  }
}
```


## Mutations

### createRecurringPayment

Creates recurring payment.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `RecurringPaymentInput!` | Yes | The input object that contains the details to create a new recurring payment. |

**Returns:** `RecurringPayment`

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Custom account code for the recurring payment that will be tied to each payment. |
| `amount_per_payment` | `Int` | The amount of the recurring payment. |
| `created_date` | `AWSDateTime` | The date the recurring payment was created. |
| `currency` | `String` | The type of currency for the recurring payment. |
| `fee_mode` | `FeeMode` | The fee mode for the recurring payment. |
| `fee_per_payment` | `Int` | The fee for the recurring payment. |
| `is_active` | `Boolean` | Whether the recurring payment is active or been disabled. |
| `is_processing` | `Boolean` | Whether the recurring payment is currently processing. |
| `recurring_id` | `String` | The Pay Theory unique identifier assigned to the recurring payment. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the recurring payment belongs to. |
| `metadata` | `AWSJSON` | Custom metadata for the recurring payment that will be tied to each payment. |
| `mute_all_emails` | `Boolean` | Manage whether the payor will receive emails for the recurring payment from Pay Theory. |
| `next_payment_date` | `AWSDate` | The date of the next payment to be made for the recurring payment. |
| `payment_interval` | `RecurringInterval` | The interval of the recurring payment. |
| `payment_method` | `PaymentMethodToken` | The payment method used to make the recurring payment. |
| `payor` | `Payor` | The payor that the recurring payment belongs to. |
| `prev_payment_date` | `AWSDate` | The date of the last payment made for the recurring payment. |
| `recurring_description` | `String` | Custom description for the recurring payment. |
| `recurring_name` | `String` | Custom name for the recurring payment. |
| `reference` | `String` | Custom reference for the recurring payment that will be tied to each payment. |
| `remaining_payments` | `Int` | The number of payments remaining for the recurring payment. |
| `status` | `RecurringStatus` | The status of the recurring payment. |
| `total_amount_per_payment` | `Int` | The amount the payor will be charged for the recurring payment. |


**FeeMode values:**

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | — (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

**RecurringInterval values:**

| RecurringInterval Value | Description |
| --- | --- |
| `ANNUAL` | Recurring payment made annually. |
| `BI_ANNUAL` | Recurring payment made bi-annually. |
| `BI_WEEKLY` | Recurring payment made bi-weekly. |
| `MONTHLY` | Recurring payment made monthly. |
| `QUARTERLY` | Recurring payment made quarterly. |
| `WEEKLY` | Recurring payment made weekly. |

**PaymentMethodToken fields:**

| Field | Type | Description |
| --- | --- | --- |
| `address_line1` | `String` | The first line of the billing address. |
| `address_line2` | `String` | The second line of the billing address. |
| `bank_account_type` | `BankAccountType` | The type of bank account. |
| `bank_code` | `String` | The bank code of the bank account if payment_type is ACH. |
| `barcode_id` | `String` | The barcode id of the payment method token if payment_type is CASH. |
| `card_brand` | `String` | The brand of the card if payment_type is CARD. |
| `card_type` | `CardType` | The type of card if payment_type is CARD. |
| `city` | `String` | The city of the billing address. |
| `country` | `String` | The country of the billing address. |
| `cvv_status` | `CvvStatus` | The CVV status. |
| `exp_date` | `String` | The expiration date of the card if payment_type is CARD. Format: MMYY |
| `full_name` | `String` | The name on card or bank account. |
| `is_active` | `Boolean` | Indicator for if payment method is active. If false the payment method cannot be used to process new transactions. |
| `issuing_country_code` | `String` | The issuing country code of the country that issued the card or that the bank account was opened in. |
| `last_four` | `String` | The last four digits of the card or bank account number. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the payment_method_token belongs to. |
| `metadata` | `AWSJSON` | Any additional data that was stored with the payment method token. |
| `payment_method_id` | `String` | The unique payment method id. |
| `payment_type` | `PaymentType` | The type of payment method. It can be one of the following: CARD, ACH |
| `payor` | `Payor` | The payor object. Refer to the Payor docs for more info. |
| `postal_code` | `String` | The postal code of the billing address. |
| `region` | `String` | The region of the billing address. |
| `wallet_type` | `WalletType` | The type of wallet that the payment method token is stored in. |


**BankAccountType values:**

| BankAccountType Value | Description |
| --- | --- |
| `BUSINESS_CHECKING` | Represents business checking. |
| `BUSINESS_SAVINGS` | Represents business savings. |
| `PERSONAL_CHECKING` | Represents personal checking. |
| `PERSONAL_SAVINGS` | Represents personal savings. |

**CardType values:**

| CardType Value | Description |
| --- | --- |
| `BUSINESS_CREDIT` | Represents business credit. |
| `BUSINESS_DEBIT` | Represents business debit. |
| `CREDIT_CARD` | Represents credit card. |
| `DEBIT_CARD` | Represents debit card. |
| `PREPAID_CARD` | Represents prepaid card. |

**CvvStatus values:**

| CvvStatus Value | Description |
| --- | --- |
| `MATCH` | Represents match. |
| `NO_MATCH` | Represents no match. |
| `UNKNOWN` | Represents unknown. |

**PaymentType values:**

| PaymentType Value | Description |
| --- | --- |
| `ACH` | Represents ACH. |
| `CARD` | Represents card. |
| `CASH` | Represents cash. |

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

**WalletType values:**

| WalletType Value | Description |
| --- | --- |
| `APPLE_PAY` | Represents apple pay. |
| `CLICK_TO_PAY` | Represents click to pay. |
| `GOOGLE_PAY` | Represents google pay. |
| `PAZE` | Represents Paze. |
| `SAMSUNG_PAY` | Represents samsung pay. |
| `VISA_STAGED` | Represents visa staged. |

**RecurringStatus values:**

| RecurringStatus Value | Description |
| --- | --- |
| `INSTRUMENT_FAILURE` | Recurring payment failed due to instrument failure. |
| `SUCCESS` | Recurring payment successful. |
| `SYSTEM_FAILURE` | Recurring payment failed due to system failure. |

**Example: Example createRecurringPayment**

Creates recurring payment.

```graphql
mutation CreateRecurringPayment($input: RecurringPaymentInput!) {
  createRecurringPayment(input: $input) {
  recurring_id
  created_date
  account_code
  amount_per_payment
  currency
  }
}
```

```json
{
  "data": {
    "createRecurringPayment": {
      "recurring_id": "example",
      "created_date": "2025-01-01T00:00:00Z",
      "account_code": "example",
      "amount_per_payment": 123,
      "currency": "example"
    }
  }
}
```


### updateRecurringPayment

Updates recurring payment.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `UpdateRecurringPaymentInput!` | Yes | The input object that contains the details to update the recurring payment. |

**Returns:** `RecurringPayment`

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Custom account code for the recurring payment that will be tied to each payment. |
| `amount_per_payment` | `Int` | The amount of the recurring payment. |
| `created_date` | `AWSDateTime` | The date the recurring payment was created. |
| `currency` | `String` | The type of currency for the recurring payment. |
| `fee_mode` | `FeeMode` | The fee mode for the recurring payment. |
| `fee_per_payment` | `Int` | The fee for the recurring payment. |
| `is_active` | `Boolean` | Whether the recurring payment is active or been disabled. |
| `is_processing` | `Boolean` | Whether the recurring payment is currently processing. |
| `recurring_id` | `String` | The Pay Theory unique identifier assigned to the recurring payment. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the recurring payment belongs to. |
| `metadata` | `AWSJSON` | Custom metadata for the recurring payment that will be tied to each payment. |
| `mute_all_emails` | `Boolean` | Manage whether the payor will receive emails for the recurring payment from Pay Theory. |
| `next_payment_date` | `AWSDate` | The date of the next payment to be made for the recurring payment. |
| `payment_interval` | `RecurringInterval` | The interval of the recurring payment. |
| `payment_method` | `PaymentMethodToken` | The payment method used to make the recurring payment. |
| `payor` | `Payor` | The payor that the recurring payment belongs to. |
| `prev_payment_date` | `AWSDate` | The date of the last payment made for the recurring payment. |
| `recurring_description` | `String` | Custom description for the recurring payment. |
| `recurring_name` | `String` | Custom name for the recurring payment. |
| `reference` | `String` | Custom reference for the recurring payment that will be tied to each payment. |
| `remaining_payments` | `Int` | The number of payments remaining for the recurring payment. |
| `status` | `RecurringStatus` | The status of the recurring payment. |
| `total_amount_per_payment` | `Int` | The amount the payor will be charged for the recurring payment. |


**FeeMode values:**

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | — (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

**RecurringInterval values:**

| RecurringInterval Value | Description |
| --- | --- |
| `ANNUAL` | Recurring payment made annually. |
| `BI_ANNUAL` | Recurring payment made bi-annually. |
| `BI_WEEKLY` | Recurring payment made bi-weekly. |
| `MONTHLY` | Recurring payment made monthly. |
| `QUARTERLY` | Recurring payment made quarterly. |
| `WEEKLY` | Recurring payment made weekly. |

**PaymentMethodToken fields:**

| Field | Type | Description |
| --- | --- | --- |
| `address_line1` | `String` | The first line of the billing address. |
| `address_line2` | `String` | The second line of the billing address. |
| `bank_account_type` | `BankAccountType` | The type of bank account. |
| `bank_code` | `String` | The bank code of the bank account if payment_type is ACH. |
| `barcode_id` | `String` | The barcode id of the payment method token if payment_type is CASH. |
| `card_brand` | `String` | The brand of the card if payment_type is CARD. |
| `card_type` | `CardType` | The type of card if payment_type is CARD. |
| `city` | `String` | The city of the billing address. |
| `country` | `String` | The country of the billing address. |
| `cvv_status` | `CvvStatus` | The CVV status. |
| `exp_date` | `String` | The expiration date of the card if payment_type is CARD. Format: MMYY |
| `full_name` | `String` | The name on card or bank account. |
| `is_active` | `Boolean` | Indicator for if payment method is active. If false the payment method cannot be used to process new transactions. |
| `issuing_country_code` | `String` | The issuing country code of the country that issued the card or that the bank account was opened in. |
| `last_four` | `String` | The last four digits of the card or bank account number. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the payment_method_token belongs to. |
| `metadata` | `AWSJSON` | Any additional data that was stored with the payment method token. |
| `payment_method_id` | `String` | The unique payment method id. |
| `payment_type` | `PaymentType` | The type of payment method. It can be one of the following: CARD, ACH |
| `payor` | `Payor` | The payor object. Refer to the Payor docs for more info. |
| `postal_code` | `String` | The postal code of the billing address. |
| `region` | `String` | The region of the billing address. |
| `wallet_type` | `WalletType` | The type of wallet that the payment method token is stored in. |


**BankAccountType values:**

| BankAccountType Value | Description |
| --- | --- |
| `BUSINESS_CHECKING` | Represents business checking. |
| `BUSINESS_SAVINGS` | Represents business savings. |
| `PERSONAL_CHECKING` | Represents personal checking. |
| `PERSONAL_SAVINGS` | Represents personal savings. |

**CardType values:**

| CardType Value | Description |
| --- | --- |
| `BUSINESS_CREDIT` | Represents business credit. |
| `BUSINESS_DEBIT` | Represents business debit. |
| `CREDIT_CARD` | Represents credit card. |
| `DEBIT_CARD` | Represents debit card. |
| `PREPAID_CARD` | Represents prepaid card. |

**CvvStatus values:**

| CvvStatus Value | Description |
| --- | --- |
| `MATCH` | Represents match. |
| `NO_MATCH` | Represents no match. |
| `UNKNOWN` | Represents unknown. |

**PaymentType values:**

| PaymentType Value | Description |
| --- | --- |
| `ACH` | Represents ACH. |
| `CARD` | Represents card. |
| `CASH` | Represents cash. |

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

**WalletType values:**

| WalletType Value | Description |
| --- | --- |
| `APPLE_PAY` | Represents apple pay. |
| `CLICK_TO_PAY` | Represents click to pay. |
| `GOOGLE_PAY` | Represents google pay. |
| `PAZE` | Represents Paze. |
| `SAMSUNG_PAY` | Represents samsung pay. |
| `VISA_STAGED` | Represents visa staged. |

**RecurringStatus values:**

| RecurringStatus Value | Description |
| --- | --- |
| `INSTRUMENT_FAILURE` | Recurring payment failed due to instrument failure. |
| `SUCCESS` | Recurring payment successful. |
| `SYSTEM_FAILURE` | Recurring payment failed due to system failure. |

**Example: Example updateRecurringPayment**

Updates recurring payment.

```graphql
mutation UpdateRecurringPayment($input: UpdateRecurringPaymentInput!) {
  updateRecurringPayment(input: $input) {
  recurring_id
  created_date
  account_code
  amount_per_payment
  currency
  }
}
```

```json
{
  "data": {
    "updateRecurringPayment": {
      "recurring_id": "example",
      "created_date": "2025-01-01T00:00:00Z",
      "account_code": "example",
      "amount_per_payment": 123,
      "currency": "example"
    }
  }
}
```


### cancelRecurringPayment

Once a recurring payment is cancelled, it cannot be reactivated.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `recurring_id` | `String!` | Yes | The recurring_id of the recurring payment to be cancelled. |

**Returns:** `Boolean`


**Example: Example cancelRecurringPayment**

Once a recurring payment is cancelled, it cannot be reactivated.

```graphql
mutation CancelRecurringPayment($recurring_id: String!) {
  cancelRecurringPayment(recurring_id: $recurring_id)
}
```

```json
{
  "data": {
    "cancelRecurringPayment": true
  }
}
```


### createRetryForFailedRecurringPayment

This call will allow you to retry a payment for a recurring payment that is in a Failed state. This should be used when the state is INSTRUMENT_FAILURE and the issue with the payment method has been addressed. EX: Payment failed for insufficient funds on the card, but the customer has since made a payment on the balance to resolve the issue.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `recurring_id` | `String!` | Yes | The recurring_id of the recurring payment to be retried. |

**Returns:** `Boolean`


**Example: Example createRetryForFailedRecurringPayment**

This call will allow you to retry a payment for a recurring payment that is in a Failed state. This should be used when the state is INSTRUMENT_FAILURE and the issue with the payment method has been addressed. EX: Payment failed for insufficient funds on the card, but the customer has since made a payment on the balance to resolve the issue.

```graphql
mutation CreateRetryForFailedRecurringPayment($recurring_id: String!) {
  createRetryForFailedRecurringPayment(recurring_id: $recurring_id)
}
```

```json
{
  "data": {
    "createRetryForFailedRecurringPayment": true
  }
}
```



## Types Reference

### RecurringPayment

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Custom account code for the recurring payment that will be tied to each payment. |
| `amount_per_payment` | `Int` | The amount of the recurring payment. |
| `created_date` | `AWSDateTime` | The date the recurring payment was created. |
| `currency` | `String` | The type of currency for the recurring payment. |
| `fee_mode` | `FeeMode` | The fee mode for the recurring payment. |
| `fee_per_payment` | `Int` | The fee for the recurring payment. |
| `is_active` | `Boolean` | Whether the recurring payment is active or been disabled. |
| `is_processing` | `Boolean` | Whether the recurring payment is currently processing. |
| `recurring_id` | `String` | The Pay Theory unique identifier assigned to the recurring payment. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the recurring payment belongs to. |
| `metadata` | `AWSJSON` | Custom metadata for the recurring payment that will be tied to each payment. |
| `mute_all_emails` | `Boolean` | Manage whether the payor will receive emails for the recurring payment from Pay Theory. |
| `next_payment_date` | `AWSDate` | The date of the next payment to be made for the recurring payment. |
| `payment_interval` | `RecurringInterval` | The interval of the recurring payment. |
| `payment_method` | `PaymentMethodToken` | The payment method used to make the recurring payment. |
| `payor` | `Payor` | The payor that the recurring payment belongs to. |
| `prev_payment_date` | `AWSDate` | The date of the last payment made for the recurring payment. |
| `recurring_description` | `String` | Custom description for the recurring payment. |
| `recurring_name` | `String` | Custom name for the recurring payment. |
| `reference` | `String` | Custom reference for the recurring payment that will be tied to each payment. |
| `remaining_payments` | `Int` | The number of payments remaining for the recurring payment. |
| `status` | `RecurringStatus` | The status of the recurring payment. |
| `total_amount_per_payment` | `Int` | The amount the payor will be charged for the recurring payment. |

**FeeMode values:**

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | — (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

**RecurringInterval values:**

| RecurringInterval Value | Description |
| --- | --- |
| `ANNUAL` | Recurring payment made annually. |
| `BI_ANNUAL` | Recurring payment made bi-annually. |
| `BI_WEEKLY` | Recurring payment made bi-weekly. |
| `MONTHLY` | Recurring payment made monthly. |
| `QUARTERLY` | Recurring payment made quarterly. |
| `WEEKLY` | Recurring payment made weekly. |

**PaymentMethodToken fields:**

| Field | Type | Description |
| --- | --- | --- |
| `address_line1` | `String` | The first line of the billing address. |
| `address_line2` | `String` | The second line of the billing address. |
| `bank_account_type` | `BankAccountType` | The type of bank account. |
| `bank_code` | `String` | The bank code of the bank account if payment_type is ACH. |
| `barcode_id` | `String` | The barcode id of the payment method token if payment_type is CASH. |
| `card_brand` | `String` | The brand of the card if payment_type is CARD. |
| `card_type` | `CardType` | The type of card if payment_type is CARD. |
| `city` | `String` | The city of the billing address. |
| `country` | `String` | The country of the billing address. |
| `cvv_status` | `CvvStatus` | The CVV status. |
| `exp_date` | `String` | The expiration date of the card if payment_type is CARD. Format: MMYY |
| `full_name` | `String` | The name on card or bank account. |
| `is_active` | `Boolean` | Indicator for if payment method is active. If false the payment method cannot be used to process new transactions. |
| `issuing_country_code` | `String` | The issuing country code of the country that issued the card or that the bank account was opened in. |
| `last_four` | `String` | The last four digits of the card or bank account number. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the payment_method_token belongs to. |
| `metadata` | `AWSJSON` | Any additional data that was stored with the payment method token. |
| `payment_method_id` | `String` | The unique payment method id. |
| `payment_type` | `PaymentType` | The type of payment method. It can be one of the following: CARD, ACH |
| `payor` | `Payor` | The payor object. Refer to the Payor docs for more info. |
| `postal_code` | `String` | The postal code of the billing address. |
| `region` | `String` | The region of the billing address. |
| `wallet_type` | `WalletType` | The type of wallet that the payment method token is stored in. |

**BankAccountType values:**

| BankAccountType Value | Description |
| --- | --- |
| `BUSINESS_CHECKING` | Represents business checking. |
| `BUSINESS_SAVINGS` | Represents business savings. |
| `PERSONAL_CHECKING` | Represents personal checking. |
| `PERSONAL_SAVINGS` | Represents personal savings. |

**CardType values:**

| CardType Value | Description |
| --- | --- |
| `BUSINESS_CREDIT` | Represents business credit. |
| `BUSINESS_DEBIT` | Represents business debit. |
| `CREDIT_CARD` | Represents credit card. |
| `DEBIT_CARD` | Represents debit card. |
| `PREPAID_CARD` | Represents prepaid card. |

**CvvStatus values:**

| CvvStatus Value | Description |
| --- | --- |
| `MATCH` | Represents match. |
| `NO_MATCH` | Represents no match. |
| `UNKNOWN` | Represents unknown. |

**PaymentType values:**

| PaymentType Value | Description |
| --- | --- |
| `ACH` | Represents ACH. |
| `CARD` | Represents card. |
| `CASH` | Represents cash. |

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

**WalletType values:**

| WalletType Value | Description |
| --- | --- |
| `APPLE_PAY` | Represents apple pay. |
| `CLICK_TO_PAY` | Represents click to pay. |
| `GOOGLE_PAY` | Represents google pay. |
| `PAZE` | Represents Paze. |
| `SAMSUNG_PAY` | Represents samsung pay. |
| `VISA_STAGED` | Represents visa staged. |

**RecurringStatus values:**

| RecurringStatus Value | Description |
| --- | --- |
| `INSTRUMENT_FAILURE` | Recurring payment failed due to instrument failure. |
| `SUCCESS` | Recurring payment successful. |
| `SYSTEM_FAILURE` | Recurring payment failed due to system failure. |
