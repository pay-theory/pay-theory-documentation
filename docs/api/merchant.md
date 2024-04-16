---
sidebar_position: 10
sidebar_label: 'Merchant'
title: "Merchant"
---

# Merchant

Merchants are the entities that are using Pay Theory to accept payments.

***
## The Merchant Object
```js
{
    ach_active: Boolean
    api_key: String
    card_active: Boolean
    cash_active: Boolean
    fee_matrix: FeeMatrix
    is_system: Boolean
    merchant_name: String
    merchant_uid: String
    parent_merchant_uid: String
    settings: MerchantSettings
    submitted_onboarding: Boolean
}
```

| Key                  | type             | description                                                                                                          |
|----------------------|------------------|----------------------------------------------------------------------------------------------------------------------|
| ach_active           | Boolean          | If the merchant has successfully completed onboarding and has an ACH processor active.                               |
| api_key              | String           | The API key of the merchant. This is used to authenticate use of the PayTheory Web and Native SDKs.                  |
| card_active          | Boolean          | If the merchant has successfully completed onboarding and has a card processor active.                               |
| cash_active          | Boolean          | If the merchant has successfully completed onboarding and has a cash processor active.                               |
| fee_matrix           | FeeMatrix        | The fee matrix that the merchant is using.  This is used to calculate the fees that are charged to the payor.        |
| is_system            | Boolean          | If the merchant is a system merchant.  System merchants are merchants that also have sub merchants.                  |
| merchant_name        | String           | The name of the merchant.                                                                                            |
| merchant_uid         | String           | The Pay Theory unique identifier assigned to the merchant.                                                           |
| parent_merchant_uid  | String           | The `merchant_uid` of the parent merchant.  This is only set if the merchant is a sub merchant of a system merchant. |
| settings             | MerchantSettings | The settings that the merchant has set.                                                                              |
| submitted_onboarding | Boolean          | Whether the merchant has submitted their onboarding information.                                                     |

### The Fee Matrix Object

This object is used to calculate the fees that are charged to the payor. `card`, `ach`, and `cash` are the main fee objects that are used to calculate the fees for each transaction type.  

The other objects are used to calculate fees for specific card brands or card types and are optional. If they are not set, the fees will be calculated using the `card` object.

Card brands can only be used to charge different fees when using the `MERCHANT_FEE` fee mode.

```js
{
    ach: AchFee!
    ach_return_fee: Int!
    ach_return_disputed_fee: Int!
    business_credit: CardFee
    business_debit: CardFee
    amex: CardBrandFee
    card: CardFee!
    card_account_updater: Int!
    cash: Int!
    chargeback_fee: Int!
    credit_card: CardFee
    debit_card: CardFee
    discover: CardBrandFee
    interchange_plus: Boolean!
    international_card_basis: Int!
    mastercard: CardBrandFee
    merchant_uid: String!
    prepaid_card: CardFee
    service_fee_enabled: Boolean!
    visa: CardBrandFee
}
``` 

|Key                |type         | description                                                                                                                           |
|-------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------|
|ach                |AchFee       | The model that will be used to calculate all ACH transaction fees for the merchant.                                                   |
|ach_return_fee     |Int          | The fee that will be charged to the merchant for an ACH return.                                                                       |
|ach_return_disputed_fee|Int      | The fee that will be charged to the merchant for an ACH return that falls into one of the following return codes.                     |
|business_credit     |CardFee     | The model that will be used to calculate all business credit card transaction fees for the merchant.                                  |
|business_debit      |CardFee     | The model that will be used to calculate all business debit card transaction fees for the merchant.                                   |
|amex               |CardBrandFee| The model that will be used to calculate all American Express card transaction fees for the merchant.                                 |
|card               |CardFee     | The model that will be used to calculate all card transaction fees for the merchant.                                                  |
|card_account_updater|Int         | The fee that will be charged to the merchant for each card updated through card account updater                                       |
|cash               |Int          | The fee that will be charged to the merchant for each cash transaction.                                                               |
|chargeback_fee     |Int          | The fee that will be charged to the merchant for each chargeback.                                                                     |
|credit_card        |CardFee     | The model that will be used to calculate all credit card transaction fees for the merchant.                                           |
|debit_card         |CardFee     | The model that will be used to calculate all debit card transaction fees for the merchant.                                            |
|discover           |CardBrandFee| The model that will be used to calculate all Discover card transaction fees for the merchant.                                         |
|interchange_plus   |Boolean      | If the merchant is using interchange plus pricing.                                                                                    |
|international_card_basis|Int      | The basis points that will be charged to the merchant for each international card transaction.                                        |
|mastercard         |CardBrandFee| The model that will be used to calculate all Mastercard card transaction fees for the merchant when using the `MERCHANT_FEE` fee mode |
|merchant_uid       |String       | The `merchant_uid` of the merchant that the fee matrix is associated with.                                                            |
|prepaid_card       |CardFee     | The model that will be used to calculate all prepaid card transaction fees for the merchant.                                          |
|service_fee_enabled|Boolean      | If the merchant is using service fee pricing.                                                                                         |
|visa               |CardBrandFee| The model that will be used to calculate all Visa card transaction fees for the merchant.                                             |

### Fee Type Objects
```graphql
type AchFee {
    merchant_fee: AchMerchantFee
    service_fee: AchServiceFee
}

type AchMerchantFee {
    basis_points: Int!
    fixed: Int!
    max_fee: Int
}

type AchServiceFee {
    basis_points: Int
    fixed: Int
    max_fee: Int
    min_fee: Int
}

type CardFee {
    merchant_fee: CardMerchantFee
    service_fee: CardServiceFee
}

type CardBrandFee {
    merchant_fee: CardMerchantFee
}

type CardMerchantFee {
    basis_points: Int
    fixed: Int
}

type CardServiceFee {
    basis_points: Int
    fixed: Int
    min_fee: Int
}
```

|Key                |type         | description                                                                                      |
|-------------------|-------------|--------------------------------------------------------------------------------------------------|
|basis_points       |Int          | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
|fixed              |Int          | The fixed fee that will be charged to the merchant for each transaction.                         |
|max_fee            |Int          | The maximum fee that will be charged to the merchant for each transaction.                       |
|min_fee            |Int          | The minimum fee that will be charged to the merchant for each transaction.                       |

***
## Query Merchant
```js
{
    merchant(merchant_name: String, merchant_uid: String) {
        ach_active
        api_key
        ...
    }
}

```

**Parameters**
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|merchant_name      |String       |The name of the merchant to query.|
|merchant_uid       |String       |The `merchant_uid` of the merchant to query.|

**Returns**

```js
{
    "data": {
        "merchant": {
            "merchant_uid": String,
        ...
        }
    }
}
```

|Key                | type                             |       description                     |
|-------------------|----------------------------------|---------------------------------------|     
|merchant          | [Merchant](#the-merchant-object) |The merchant object that is returned from the query.|

***
## The List Merchant Object
This is a limited merchant object that is returned when you want to query a list of merchants.

```js
{
    ach_active: Boolean
    card_active: Boolean
    cash_active: Boolean
    is_system: Boolean
    merchant_name: String
    merchant_uid: String
    parent_merchant_uid: String
    submitted_onboarding: Boolean
    updated_row_at: AWSDateTime
}
```
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|
|ach_active         |Boolean      |If the merchant has successfully completed onboarding and has an ACH processor active.|
|card_active        |Boolean      |If the merchant has successfully completed onboarding and has a card processor active.|
|cash_active        |Boolean      |If the merchant has successfully completed onboarding and has a cash processor active.|
|is_system          |Boolean      |If the merchant is a system merchant.  System merchants are merchants that also have sub merchants.|
|merchant_name      |String       |The name of the merchant.|
|merchant_uid       |String       |The Pay Theory unique identifier assigned to the merchant.|
|parent_merchant_uid|String       |The `merchant_uid` of the parent merchant.  This is only set if the merchant is a sub merchant of a system merchant.|
|submitted_onboarding|Boolean     |Whether the merchant has submitted their onboarding information.|
|updated_row_at     |AWSDateTime  |The date the merchant was last updated.|


***
## Query Merchants
```js
{
    merchants(direction: FORWARD, limit: 10, offset: "", offset_id: "", query: QueryObject) {
        items {
            ach_active
            card_active
            cash_active
            is_system
            merchant_name
            merchant_uid
            parent_merchant_uid
            submitted_onboarding
        }
        total_row_count
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|direction          |MoveDirection|The direction of the pagination. Makes sure the results are returned in the correct order.|
|limit              |Int          |The number of merchants to return.|
|offset             |String       |The value of the offset item for which the list is being sorted.|
|offset_id          |String       |The `merchant_uid` of the offset item.|
|query              |QueryObject  |The query to filter the merchants with based on Pay Theory defined data.|

**Returns**

```js
{
    "data": {
        "merchants": {
            "items": [
                {
                    "merchant_uid": "XXXXXX",
                },
                {
                    "merchant_uid": "XXXXXX",
                },
                ...
            ],
                "total_row_count": 24
        }
    }
}
```

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|items              |[ListMerchant]|The list of merchants that are returned from the query.|
|total_row_count    |Int          |The total number of merchants that match the query. Used to help with pagination.|

***
## Create Merchant
```js
mutation {
    createMerchant(merchant_name: String,
        parent_merchant_uid: String,
        user: {
        email: AWSEmail,
            first_name: String,
            last_name: String,
            phone: AWSPhone
    }) {
        ach_active
        card_active
        cash_active
        merchant_name
        merchant_uid
        parent_merchant_uid
        submitted_onboarding
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|merchant_name      |String       |The name of the merchant to create.|
|parent_merchant_uid|String       |The `merchant_uid` of the parent merchant.  This is only set if the merchant belongs to another merchant account.|
|user               |User         |The user that will be created for the merchant.  This user will be given access to the onboarding form on Merchant creation.|

**User Parameters**
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|email              |AWSEmail     |The email address of the user. Must be a valid email address or the mutation will fail.|
|first_name         |String       |The first name of the user.|
|last_name          |String       |The last name of the user.|
|phone              |AWSPhone     |The phone number of the user. Must be a valid phone number or null or the mutation will fail.|

**Returns**

```js
{
    "data": {
        "createMerchant": {
            "merchant_uid": "XXXXXX",
        ...
        }
    }
}
```
|Key                |type        |       description                     |
|-------------------|------------|---------------------------------------|     
|createMerchant     |ListMerchant|The newly created merchant object.|


## Update Fee Matrix

:::note Limited Access
This mutation is only available to users with Partner level access. Please contact Pay Theory support if you need to update a merchant's fee matrix and do not have Partner level access.
:::

```graphql
mutation {
    updateFeeMatrix(
        fee_matrix: FeeMatrixInput!
    ) {
        ach {
            merchant_fee {
                basis_points
                fixed
                max_fee
            }
            service_fee {
                basis_points
                fixed
                max_fee
                min_fee
            }
        }
        ...
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|
|fee_matrix         |FeeMatrixInput|The new fee matrix that will be used to calculate the fees for the merchant.|

**Fee Matrix Input Object**  

The only required key in the update is the `merchant_uid`.  All other keys are optional.  If they are not set, the current value will be kept.
If you want to update an optional field to be null, you can set the value to `null`.

```graphql
input FeeMatrixInput {
    ach: AchFeeInput
    ach_return_fee: Int
    ach_return_disputed_fee: Int
    business_credit: CardFeeInput
    business_debit: CardFeeInput
    amex: CardBrandFeeInput
    card: CardFeeInput
    card_account_updater: Int
    cash: Int
    chargeback_fee: Int
    credit_card: CardFeeInput
    debit_card: CardFeeInput
    discover: CardBrandFeeInput
    interchange_plus: Boolean
    international_card_basis: Int
    mastercard: CardBrandFeeInput
    merchant_uid: String!
    prepaid_card: CardFeeInput
    service_fee_enabled: Boolean
    visa: CardBrandFeeInput
}
```

**Fee Type Input Objects**
```graphql
input AchFeeInput {
    merchant_fee: AchMerchantFeeInput!
    service_fee: AchServiceFeeInput!
}

input AchMerchantFeeInput {
    basis_points: Int!
    fixed: Int!
    max_fee: Int
}

input AchServiceFeeInput {
    basis_points: Int!
    fixed: Int!
    max_fee: Int
    min_fee: Int
}

input CardFeeInput {
    merchant_fee: CardMerchantFeeInput!
    service_fee: CardServiceFeeInput!
}

input CardBrandFeeInput {
    merchant_fee: CardMerchantFeeInput!
}

input CardMerchantFeeInput {
    basis_points: Int!
    fixed: Int!
}

input CardServiceFeeInput {
    basis_points: Int!
    fixed: Int!
    min_fee: Int
}
```

**Returns**

```js
{
    "data": {
        "updateFeeMatrix": {
            "ach": {
                "merchant_fee": {
                    "basis_points": 0,
                    "fixed": 0,
                    "max_fee": 0
                },
                "service_fee": {
                    "basis_points": 0,
                    "fixed": 0,
                    "max_fee": 0,
                    "min_fee": 0
                }
            },
            ...
        }
    }
}
```