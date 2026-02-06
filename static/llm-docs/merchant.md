# Merchant

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### merchant

Returns merchant.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `String` | No | The merchant_uid of the merchant to query. |
| `merchant_name` | `String` | No | The name of the merchant to query. |

**Returns:** `Merchant`

| Field | Type | Description |
| --- | --- | --- |
| `ach_active` | `Boolean` | If the merchant has successfully completed onboarding and has an ACH processor active. |
| `api_key` | `String` | The API key of the merchant. This is used to authenticate use of the PayTheory Web and Native SDKs. |
| `card_active` | `Boolean` | If the merchant has successfully completed onboarding and has a card processor active. |
| `cash_active` | `Boolean` | If the merchant has successfully completed onboarding and has a cash processor active. |
| `country_code` | `String` | The country code of the country the merchant operates from. |
| `fee_matrix` | `FeeMatrix` | The fee matrix that the merchant is using. This is used to calculate the fees that are charged to the payor. |
| `fee_model` | `FeeModel` | — (deprecated: Use fee_matrix instead.) |
| `is_system` | `Boolean` | If the merchant is a system merchant. System merchants are merchants that also have sub merchants. |
| `merchant_name` | `String` | The name of the merchant. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant. |
| `metadata` | `AWSJSON` | The metadata that has been set on the Merchant. |
| `parent_merchant_uid` | `String` | The merchant_uid of the parent merchant. This is only set if the merchant is a sub merchant of a system merchant. |
| `settings` | `MerchantSettings` | The settings that the merchant has set. |
| `submitted_onboarding` | `Boolean` | Whether the merchant has submitted their onboarding information. |


**FeeMatrix fields:**

| Field | Type | Description |
| --- | --- | --- |
| `ach` | `AchFee!` | The model that will be used to calculate all ACH transaction fees for the merchant. |
| `ach_return_fee` | `Int!` | The fee that will be charged to the merchant for an ACH return. |
| `ach_return_disputed_fee` | `Int!` | The fee that will be charged to the merchant for an ACH return that falls into one of the following return codes. |
| `business_credit` | `CardFee` | The model that will be used to calculate all business credit card transaction fees for the merchant. |
| `business_debit` | `CardFee` | The model that will be used to calculate all business debit card transaction fees for the merchant. |
| `amex` | `CardBrandFee` | The model that will be used to calculate all American Express card transaction fees for the merchant. |
| `card` | `CardFee!` | The model that will be used to calculate all card transaction fees for the merchant. |
| `card_account_updater` | `Int!` | The fee that will be charged to the merchant for each card updated through card account updater |
| `cash` | `Int!` | The fee that will be charged to the merchant for each cash transaction. |
| `chargeback_fee` | `Int!` | The fee that will be charged to the merchant for each chargeback. |
| `credit_card` | `CardFee` | The model that will be used to calculate all credit card transaction fees for the merchant. |
| `debit_card` | `CardFee` | The model that will be used to calculate all debit card transaction fees for the merchant. |
| `discover` | `CardBrandFee` | The model that will be used to calculate all Discover card transaction fees for the merchant. |
| `interchange_plus` | `Boolean!` | If the merchant is using interchange plus pricing. |
| `international_card_basis` | `Int!` | The basis points that will be charged to the merchant for each international card transaction. |
| `mastercard` | `CardBrandFee` | The model that will be used to calculate all Mastercard card transaction fees for the merchant when using the MERCHANT_FEE fee mode |
| `merchant_uid` | `String!` | The merchant_uid of the merchant that the fee matrix is associated with. |
| `prepaid_card` | `CardFee` | The model that will be used to calculate all prepaid card transaction fees for the merchant. |
| `service_fee_enabled` | `Boolean!` | If the merchant is using service fee pricing. |
| `visa` | `CardBrandFee` | The model that will be used to calculate all Visa card transaction fees for the merchant. |


**AchFee fields:**

| Field | Type | Description |
| --- | --- | --- |
| `merchant_fee` | `AchMerchantFee` *(max depth reached)* | The merchant fee. |
| `service_fee` | `AchServiceFee` *(max depth reached)* | The service fee. |

**CardFee fields:**

| Field | Type | Description |
| --- | --- | --- |
| `merchant_fee` | `CardMerchantFee` *(max depth reached)* | The merchant fee. |
| `service_fee` | `CardServiceFee` *(max depth reached)* | The service fee. |

**CardBrandFee fields:**

| Field | Type | Description |
| --- | --- | --- |
| `merchant_fee` | `CardMerchantFee` *(max depth reached)* | The merchant fee. |

**FeeModel fields:**

| Field | Type | Description |
| --- | --- | --- |
| `interchange_plus` | `Boolean` | The interchange plus. |
| `merchant_fee` | `FeeModelDetail` | The merchant fee. |
| `service_fee` | `FeeModelDetail` | The service fee. |
| `service_fee_min` | `FeeModelDetail` | The service fee min. |


**FeeModelDetail fields:**

| Field | Type | Description |
| --- | --- | --- |
| `ach_basis` | `Int` | The ACH basis. |
| `ach_fixed` | `Int` | The ACH fixed. |
| `card_basis` | `Int` | The card basis. |
| `card_fixed` | `Int` | The card fixed. |

**MerchantSettings fields:**

| Field | Type | Description |
| --- | --- | --- |
| `contact_email` | `AWSEmail` | The contact email for the merchant. |
| `contact_phone` | `AWSPhone` | The contact phone number for the merchant. |
| `facebook` | `AWSURL` | The Facebook URL for the merchant. |
| `instagram` | `AWSURL` | The Instagram URL for the merchant. |
| `linkedin` | `AWSURL` | The LinkedIn URL for the merchant. |
| `tiktok` | `AWSURL` | The TikTok URL for the merchant. |
| `twitter` | `AWSURL` | The Twitter URL for the merchant. |
| `website` | `AWSURL` | The website URL for the merchant. |

**Example: Example merchant**

Returns merchant.

```graphql
query Merchant($merchant_uid: String, $merchant_name: String) {
  merchant(merchant_uid: $merchant_uid, merchant_name: $merchant_name) {
  merchant_uid
  ach_active
  api_key
  card_active
  cash_active
  }
}
```

```json
{
  "data": {
    "merchant": {
      "merchant_uid": "example",
      "ach_active": true,
      "api_key": "example",
      "card_active": true,
      "cash_active": true
    }
  }
}
```


### merchants

Returns merchants.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `SqlQuery` | No | The query to filter the merchants with based on Pay Theory defined data. |
| `limit` | `Int` | No | The number of merchants to return. |
| `offset` | `String` | No | The value of the offset item for which the list is being sorted. |
| `direction` | `MoveDirection` | No | The direction of the pagination. Makes sure the results are returned in the correct order. |
| `offset_id` | `String` | No | The merchant_uid of the offset item. |

**Returns:** `Merchants`

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[ListMerchant]` | List of Merchants. |
| `total_row_count` | `Int` | Total number of rows matching the query. |


**ListMerchant fields:**

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

**Example: Example merchants**

Returns merchants.

```graphql
query Merchants($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  merchants(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
  items {
    merchant_uid
    updated_row_at
    ach_active
    card_active
    cash_active
  }
  total_row_count
  }
}
```

```json
{
  "data": {
    "merchants": {
      "items": [
        {
          "merchant_uid": "example",
          "updated_row_at": "2025-01-01T00:00:00Z",
          "ach_active": true,
          "card_active": true,
          "cash_active": true
        }
      ],
      "total_row_count": 123
    }
  }
}
```


## Mutations

### createMerchant

Creates merchant.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_name` | `String!` | Yes | The name of the merchant to create. |
| `parent_merchant_uid` | `String` | No | The merchant_uid of the parent merchant. This is only set if the merchant belongs to another merchant account. |
| `user` | `MerchantUserInput` | No | The user that will be created for the merchant. This user will be given access to the onboarding form on Merchant creation. |
| `metadata` | `AWSJSON` | No | The metadata that will be set on the Merchant. |

**Returns:** `ListMerchant`

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

**Example: Example createMerchant**

Creates merchant.

```graphql
mutation CreateMerchant($merchant_name: String!, $parent_merchant_uid: String, $user: MerchantUserInput, $metadata: AWSJSON) {
  createMerchant(merchant_name: $merchant_name, parent_merchant_uid: $parent_merchant_uid, user: $user, metadata: $metadata) {
  merchant_uid
  updated_row_at
  ach_active
  card_active
  cash_active
  }
}
```

```json
{
  "data": {
    "createMerchant": {
      "merchant_uid": "example",
      "updated_row_at": "2025-01-01T00:00:00Z",
      "ach_active": true,
      "card_active": true,
      "cash_active": true
    }
  }
}
```


### updateFeeMatrix

:::note Limited Access This mutation is only available to users with Partner level access. Please contact Pay Theory support if you need to update a merchant's fee matrix and do not have Partner level access. :::

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `fee_matrix` | `FeeMatrixInput!` | Yes | The new fee matrix that will be used to calculate the fees for the merchant. |

**Returns:** `FeeMatrix`

| Field | Type | Description |
| --- | --- | --- |
| `ach` | `AchFee!` | The model that will be used to calculate all ACH transaction fees for the merchant. |
| `ach_return_fee` | `Int!` | The fee that will be charged to the merchant for an ACH return. |
| `ach_return_disputed_fee` | `Int!` | The fee that will be charged to the merchant for an ACH return that falls into one of the following return codes. |
| `business_credit` | `CardFee` | The model that will be used to calculate all business credit card transaction fees for the merchant. |
| `business_debit` | `CardFee` | The model that will be used to calculate all business debit card transaction fees for the merchant. |
| `amex` | `CardBrandFee` | The model that will be used to calculate all American Express card transaction fees for the merchant. |
| `card` | `CardFee!` | The model that will be used to calculate all card transaction fees for the merchant. |
| `card_account_updater` | `Int!` | The fee that will be charged to the merchant for each card updated through card account updater |
| `cash` | `Int!` | The fee that will be charged to the merchant for each cash transaction. |
| `chargeback_fee` | `Int!` | The fee that will be charged to the merchant for each chargeback. |
| `credit_card` | `CardFee` | The model that will be used to calculate all credit card transaction fees for the merchant. |
| `debit_card` | `CardFee` | The model that will be used to calculate all debit card transaction fees for the merchant. |
| `discover` | `CardBrandFee` | The model that will be used to calculate all Discover card transaction fees for the merchant. |
| `interchange_plus` | `Boolean!` | If the merchant is using interchange plus pricing. |
| `international_card_basis` | `Int!` | The basis points that will be charged to the merchant for each international card transaction. |
| `mastercard` | `CardBrandFee` | The model that will be used to calculate all Mastercard card transaction fees for the merchant when using the MERCHANT_FEE fee mode |
| `merchant_uid` | `String!` | The merchant_uid of the merchant that the fee matrix is associated with. |
| `prepaid_card` | `CardFee` | The model that will be used to calculate all prepaid card transaction fees for the merchant. |
| `service_fee_enabled` | `Boolean!` | If the merchant is using service fee pricing. |
| `visa` | `CardBrandFee` | The model that will be used to calculate all Visa card transaction fees for the merchant. |


**AchFee fields:**

| Field | Type | Description |
| --- | --- | --- |
| `merchant_fee` | `AchMerchantFee` | The merchant fee. |
| `service_fee` | `AchServiceFee` | The service fee. |


**AchMerchantFee fields:**

| Field | Type | Description |
| --- | --- | --- |
| `basis_points` | `Int!` | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
| `fixed` | `Int!` | The fixed fee that will be charged to the merchant for each transaction. |
| `max_fee` | `Int` | The maximum fee that will be charged to the merchant for each transaction. |

**AchServiceFee fields:**

| Field | Type | Description |
| --- | --- | --- |
| `basis_points` | `Int` | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
| `fixed` | `Int` | The fixed fee that will be charged to the merchant for each transaction. |
| `max_fee` | `Int` | The maximum fee that will be charged to the merchant for each transaction. |
| `min_fee` | `Int` | The minimum fee that will be charged to the merchant for each transaction. |

**CardFee fields:**

| Field | Type | Description |
| --- | --- | --- |
| `merchant_fee` | `CardMerchantFee` | The merchant fee. |
| `service_fee` | `CardServiceFee` | The service fee. |


**CardMerchantFee fields:**

| Field | Type | Description |
| --- | --- | --- |
| `basis_points` | `Int` | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
| `fixed` | `Int` | The fixed fee that will be charged to the merchant for each transaction. |

**CardServiceFee fields:**

| Field | Type | Description |
| --- | --- | --- |
| `basis_points` | `Int` | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
| `fixed` | `Int` | The fixed fee that will be charged to the merchant for each transaction. |
| `min_fee` | `Int` | The minimum fee that will be charged to the merchant for each transaction. |

**CardBrandFee fields:**

| Field | Type | Description |
| --- | --- | --- |
| `merchant_fee` | `CardMerchantFee` | The merchant fee. |

**Example: Example updateFeeMatrix**

:::note Limited Access This mutation is only available to users with Partner level access. Please contact Pay Theory support if you need to update a merchant's fee matrix and do not have Partner level access. :::

```graphql
mutation UpdateFeeMatrix($fee_matrix: FeeMatrixInput!) {
  updateFeeMatrix(fee_matrix: $fee_matrix) {
  merchant_uid
  card_account_updater
  ach_return_disputed_fee
  ach_return_fee
  cash
  }
}
```

```json
{
  "data": {
    "updateFeeMatrix": {
      "merchant_uid": "example",
      "card_account_updater": 123,
      "ach_return_disputed_fee": 123,
      "ach_return_fee": 123,
      "cash": 123
    }
  }
}
```


### updateMerchantSettings

Updates merchant settings.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `ID!` | Yes | The unique identifier of the merchant whose settings are being updated. |
| `settings` | `MerchantSettingsInput!` | Yes | The new settings for the merchant. |

**Returns:** `Boolean`


**Example: Example updateMerchantSettings**

Updates merchant settings.

```graphql
mutation UpdateMerchantSettings($merchant_uid: ID!, $settings: MerchantSettingsInput!) {
  updateMerchantSettings(merchant_uid: $merchant_uid, settings: $settings)
}
```

```json
{
  "data": {
    "updateMerchantSettings": true
  }
}
```

