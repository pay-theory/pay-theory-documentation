# Payment Method Token

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### paymentMethodTokens

Returns payment method tokens.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `SqlQuery` | No | The query to filter the payment_method_tokens with based on Pay Theory defined data. Detailed information about the query object can be found here. |
| `limit` | `Int` | No | The number of payment_method_tokens to return. |
| `offset` | `String` | No | The value of the offset item for which the list is being sorted. |
| `direction` | `MoveDirection` | No | The direction of the pagination. Makes sure the results are returned in the correct order. |
| `offset_id` | `String` | No | The payment_method_id of the offset item. |

**Returns:** `PaymentMethodTokens`

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[PaymentMethodToken]` | List of Payment Method Tokens. |
| `total_row_count` | `Int` | Total number of rows matching the query. |


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

**Example: Example paymentMethodTokens**

Returns payment method tokens.

```graphql
query PaymentMethodTokens($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  paymentMethodTokens(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
  items {
    barcode_id
    exp_date
    address_line1
    address_line2
    bank_account_type
  }
  total_row_count
  }
}
```

```json
{
  "data": {
    "paymentMethodTokens": {
      "items": [
        {
          "barcode_id": "example",
          "exp_date": "example",
          "address_line1": "example",
          "address_line2": "example",
          "bank_account_type": "example"
        }
      ],
      "total_row_count": 123
    }
  }
}
```


### validatePaymentMethodOwnership

This mutation validates whether a provided card or bank account number matches a specific payment method.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `payment_method_id` | `String!` | Yes | The unique payment method id that identifies the payment method to validate against. |
| `number` | `String!` | Yes | The card number or account number to validate. For card payment methods, this is the full card number. For ACH payment methods, this is the full account number. |

**Returns:** `Boolean!`


**Example: Example validatePaymentMethodOwnership**

This mutation validates whether a provided card or bank account number matches a specific payment method.

```graphql
query ValidatePaymentMethodOwnership($payment_method_id: String!, $number: String!) {
  validatePaymentMethodOwnership(payment_method_id: $payment_method_id, number: $number)
}
```

```json
{
  "data": {
    "validatePaymentMethodOwnership": true
  }
}
```


## Mutations

### createPaymentMethod

This mutation will create a payment method token for a payor. The payment method token can be used to create a payment method for a merchant.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `payment_method` | `PaymentMethodInput!` | Yes | The payment method input object. Refer to the PaymentMethodInput docs for more info. |
| `merchant_uid` | `String!` | Yes | The Pay Theory unique identifier assigned to the merchant that the payment_method_token belongs to. |
| `skip_validation` | `Boolean` | No | A boolean flag indicating whether to skip the validation of the payment method. Defaults to false if not passed in. |

**Returns:** `PaymentMethodToken`

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

**Example: Example createPaymentMethod**

This mutation will create a payment method token for a payor. The payment method token can be used to create a payment method for a merchant.

```graphql
mutation CreatePaymentMethod($payment_method: PaymentMethodInput!, $merchant_uid: String!, $skip_validation: Boolean) {
  createPaymentMethod(payment_method: $payment_method, merchant_uid: $merchant_uid, skip_validation: $skip_validation) {
  barcode_id
  exp_date
  address_line1
  address_line2
  bank_account_type
  }
}
```

```json
{
  "data": {
    "createPaymentMethod": {
      "barcode_id": "example",
      "exp_date": "example",
      "address_line1": "example",
      "address_line2": "example",
      "bank_account_type": "example"
    }
  }
}
```


### updatePaymentMethodToDisabled

This mutation can be used to disable a payment method token. This will prevent the payment method token from being used to create a payment. Once a payment method token is disabled, it cannot be re-enabled.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `ID!` | Yes | The Pay Theory unique identifier assigned to the merchant that the payment_method_token belongs to. |
| `payment_method_id` | `String!` | Yes | The unique payment method id. |

**Returns:** `Boolean!`


**Example: Example updatePaymentMethodToDisabled**

This mutation can be used to disable a payment method token. This will prevent the payment method token from being used to create a payment. Once a payment method token is disabled, it cannot be re-enabled.

```graphql
mutation UpdatePaymentMethodToDisabled($merchant_uid: ID!, $payment_method_id: String!) {
  updatePaymentMethodToDisabled(merchant_uid: $merchant_uid, payment_method_id: $payment_method_id)
}
```

```json
{
  "data": {
    "updatePaymentMethodToDisabled": true
  }
}
```

