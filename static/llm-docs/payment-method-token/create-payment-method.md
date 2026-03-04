# createPaymentMethod

> **Group:** Payment Method Token
> **Operation Type:** MUTATION

This mutation will create a payment method token for a payor. The payment method token can be used to create a payment method for a merchant.

## GraphQL Signature

```graphql
mutation createPaymentMethod($payment_method: PaymentMethodInput!, $merchant_uid: String!, $skip_validation: Boolean) {
  createPaymentMethod(payment_method: $payment_method, merchant_uid: $merchant_uid, skip_validation: $skip_validation) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `payment_method` | `PaymentMethodInput!` | Yes | The payment method input object. Refer to the PaymentMethodInput docs for more info. |
| `merchant_uid` | `String!` | Yes | The Pay Theory unique identifier assigned to the merchant that the payment_method_token belongs to. |
| `skip_validation` | `Boolean` | No | A boolean flag indicating whether to skip the validation of the payment method. Defaults to false if not passed in. |

## Return Type

**Returns:** `PaymentMethodToken`

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

## Examples

### Example createPaymentMethod

This mutation will create a payment method token for a payor. The payment method token can be used to create a payment method for a merchant.

**Query:**

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

**Variables:**

```json
{
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
  "merchant_uid": "example",
  "skip_validation": true
}
```

**Response:**

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