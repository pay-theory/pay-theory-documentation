---
sidebar_position: 50
sidebar_label: 'Payment Method'
title: "Payment Method"
---

# Payment Method Token

Payment Method Tokens are meant to store info that represents a tokenized Bank Account, Credit Card, or Debit Card.

***
## The Payment Method Token Object
```graphql
{
  address_line1: String
  address_line2: String
  bank_account_type: AchAccountType
  bank_code: String
  barcode_id: String
  card_brand: String
  card_type: CardType
  city: String
  country: String
  exp_date: String
  full_name: String
  is_active: Boolean
  last_four: String
  merchant_uid: String
  metadata: AWSJSON
  payment_method_id: String
  payment_type: PaymentType
  payor: Payor
  postal_code: String
  region: String
  wallet_type: WalletType
}
```
| Key               | type           | description                                                                                                        |
|-------------------|----------------|--------------------------------------------------------------------------------------------------------------------|
| address_line1     | String         | The first line of the billing address.                                                                             |
| address_line2     | String         | The second line of the billing address.                                                                            |
| bank_account_type | AchAccountType | The type of bank account.                                                                                          |
| bank_code         | String         | The bank code of the bank account if `payment_type` is `ACH`.                                                      |
| barcode_id        | String         | The barcode id of the payment method token if `payment_type` is `CASH`.                                            |
| card_brand        | String         | The brand of the card if `payment_type` is `CARD`.                                                                 |
| card_type         | CardType       | The type of card if `payment_type` is `CARD`.                                                                      |
| city              | String         | The city of the billing address.                                                                                   |
| country           | String         | The country of the billing address.                                                                                |
| exp_date          | String         | The expiration date of the card if `payment_type` is `CARD`. Format: `MMYY`                                        |
| full_name         | String         | The name on card or bank account.                                                                                  |
| is_active         | Boolean        | Indicator for if payment method is active. If false the payment method cannot be used to process new transactions. |
| last_four         | String         | The last four digits of the card or bank account number.                                                           |
| merchant_uid      | String         | The Pay Theory unique identifier assigned to the merchant that the payment_method_token belongs to.                |
| metadata          | AWSJSON        | Any additional data that was stored with the payment method token.                                                 |
| payment_method_id | String         | The unique payment method id.                                                                                      |
| payment_type      | PaymentType    | The type of payment method. It can be one of the following: `CARD`, `ACH`                                          |
| payor             | Payor          | The payor object. Refer to the [Payor](payor#the-payor-object) docs for more info.                                 |
| postal_code       | String         | The postal code of the billing address.                                                                            |
| region            | String         | The region of the billing address.                                                                                 |
| wallet_type       | WalletType     | The type of wallet that the payment method token is stored in.                                                     |


### Ach Account Type
The type of bank account. It can be one of the following:
- `BUSINESS_CHECKING`
- `BUSINESS_SAVINGS`
- `PERSONAL_CHECKING`
- `PERSONAL_SAVINGS`

### Card Type

The type of card. It can be one of the following:
- `BUSINESS_CREDIT`
- `BUSINESS_DEBIT`
- `CREDIT_CARD`
- `DEBIT_CARD`
- `PREPAID_CARD`

### Payment Type

The type of payment method. It can be one of the following:
- `ACH`
- `CARD`
- `CASH`

### Wallet Type
The type of wallet that the payment method token is stored in. It can be one of the following:
- `APPLE_PAY`
- `CLICK_TO_PAY`
- `GOOGLE_PAY`
- `SAMSUNG_PAY`
- `VISA_STAGED`

***
## Query Payment Method Tokens
```graphql
{
    paymentMethodTokens(direction: FORWARD, limit: 10, offset: "", offset_id: "", query: QueryObject) {
        items {
          address_line1
          address_line2
          card_brand
          city
          country
          exp_date
          full_name
          is_active
          last_four
          merchant_uid
          metadata(query_list: [QueryPair])
          payment_method_id
          payment_type
          payor(query_list: [QueryPair]) {
            ...
          }
          postal_code
          region
          wallet_type
        }
        total_row_count
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|
|direction          |MoveDirection|The direction of the pagination. Makes sure the results are returned in the correct order.|
|limit              |Int          |The number of payment_method_tokens to return.|
|offset             |String       |The value of the offset item for which the list is being sorted.|
|offset_id          |String       |The `payment_method_id` of the offset item.|
|query              |QueryObject  |The query to filter the payment_method_tokens with based on Pay Theory defined data. Detailed information about the query object can be found [here](query).|

**Nested Queries**
Payment Method Tokens can also be filtered by passing a query_list to the metadata or payor.

This will only return Payment Method Tokens that have Metadata or Payors that match these queries.  Detailed information about the query list can be found [here](query).

**Returns**

```js
{
    "data": {
        "paymentMethodTokens": {
            "items": [
                {
                    "payment_method_id": "pt_pmt_XXXXX",
                },
                {
                    "payment_method_id": "pt_pmt_XXXXX",
                },
                ...
            ],
                "total_row_count": 256
        }
    }
}
```
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|
|items              |[PaymentMethodToken]|The list of payment_method_tokens that are returned from the query.|
|total_row_count    |Int          |The total number of payment_method_tokens that match the query. Used to help with pagination.|

***
## Create Payment Method
This mutation will create a payment method token for a payor. The payment method token can be used to create a payment method for a merchant.
*You must be PCI L1 compliant to use this mutation.*

```graphql
mutation {
    createPaymentMethod(payment_method: PaymentMethodInput!, merchant_uid: String!) {
        payment_method_id
        ...
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|
|payment_method     |PaymentMethodInput|The payment method input object. Refer to the [PaymentMethodInput](#payment-method-input-object) docs for more info.|
|merchant_uid       |String       |The Pay Theory unique identifier assigned to the merchant that the payment_method_token belongs to.|

**Returns**
The payment method token object. Refer to the [Payment Method Token](#the-payment-method-token-object) for more info.

***
### Payment Method Input Object
This is the input object used when passing in payment method into any mutation that requires it.
*You must be PCI L1 compliant to use this. For more details contact support@paytheory.com*

```graphql
{
    ach: AchInput
    card: CardInput
    metadata: AWSJSON
    payor: PayorInput
    payor_id: String
}
```

| Key      | type                            | description                                                                                                                                      |
|----------|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| ach      | [AchInput](#ach-input-object)   | The ach input object.                                                                                                                            |
| card     | [CardInput](#card-input-object) | The card input object.                                                                                                                           |
| metadata | AWSJSON                         | Any additional data that you want to store with the payment method token. This data will be returned with the payment method token when queried. |
| payor    | PayorInput                      | The payor input object. Refer to the [PayorInput](payor#the-payor-input-object) docs for more info.                                              |
| payor_id | String                          | The unique payor id for the payor this payment method token belongs to.                                                                          |

***
### ACH Input Object
The ach input object. It contains the following fields:

```graphql
{
    address_line1: String
    address_line2: String
    account_number: String!
    account_type: AchAccountType!
    city: String
    country: String
    name_on_account: String!
    postal_code: String
    region: String
    routing_number: String!
}
```

| Key             | type           | description                             |
|-----------------|----------------|-----------------------------------------|
| address_line1   | String         | The first line of the billing address.  |
| address_line2   | String         | The second line of the billing address. |
| account_number  | String!        | The account number of the bank account. |
| account_type    | AchAccountType | The type of bank account.               |
| city            | String         | The city of the billing address.        |
| country         | String         | The country of the billing address.     |
| name_on_account | String!        | The name on the bank account.           |
| postal_code     | String         | The postal code of the billing address. |
| region          | String         | The region of the billing address.      |
| routing_number  | String!        | The routing number of the bank account. |


***
### Card Input Object

The card input object. It contains the following fields:



```graphql
{
    address_line1: String
    address_line2: String
    card_number: String!
    city: String
    country: String
    exp_date: CardExpirationInput!
    full_name: String
    postal_code: String!
    region: String
    security_code: String!
}
```
| Key           | type                 | description                                                                                                      |
|---------------|----------------------|------------------------------------------------------------------------------------------------------------------|
| address_line1 | String               | The first line of the billing address.                                                                           |
| address_line2 | String               | The second line of the billing address.                                                                          |
| card_number   | String!              | The card number.                                                                                                 |
| city          | String               | The city of the billing address.                                                                                 |
| country       | String               | The country of the billing address.                                                                              |
| exp_date      | CardExpirationInput! | The card expiration input object. Refer to the [CardExpirationInput](#card-expiration-input) docs for more info. |
| full_name     | String               | The name on the card.                                                                                            |
| postal_code   | String!              | The postal code of the billing address.                                                                          |
| region        | String               | The region of the billing address.                                                                               |
| security_code | String!              | The security code of the card.                                                                                   |

***
### Card Expiration Input
The card expiration input object. It contains the following fields:

```graphql
{
    month: String!
    year: String!
}
```
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|
|month              |String!      |The month of the expiration date. Format: `MM`|
|year               |String!      |The year of the expiration date. Format: `YY`|

***
## Update Payment Method To Disabled

This mutation can be used to disable a payment method token. This will prevent the payment method token from being used to create a payment. Once a payment method token is disabled, it cannot be re-enabled.

```graphql
mutation MyMutation {
  updatePaymentMethodToDisabled(merchant_uid: String!, payment_method_id: String!)
}
```

**Parameters**

| Key               | type   | description                                                                                         |
|-------------------|--------|-----------------------------------------------------------------------------------------------------|
| merchant_uid      | String | The Pay Theory unique identifier assigned to the merchant that the payment_method_token belongs to. |
| payment_method_id | String | The unique payment method id.                                                                       |

**Returns**

```js
{
  "data": {
    "updatePaymentMethodToDisabled": true
  }
}
```
