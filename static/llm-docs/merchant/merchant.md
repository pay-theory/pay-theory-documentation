# merchant

> **Group:** Merchant
> **Operation Type:** QUERY

Returns merchant.

## GraphQL Signature

```graphql
query merchant($merchant_uid: String, $merchant_name: String) {
  merchant(merchant_uid: $merchant_uid, merchant_name: $merchant_name) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_uid` | `String` | No | The merchant_uid of the merchant to query. |
| `merchant_name` | `String` | No | The name of the merchant to query. |

## Return Type

**Returns:** `Merchant`

| Field | Type | Description |
| --- | --- | --- |
| `ach_active` | `Boolean` | If the merchant has successfully completed onboarding and has an ACH processor active. |
| `api_key` | `String` | The API key of the merchant. This is used to authenticate use of the PayTheory Web and Native SDKs. |
| `card_active` | `Boolean` | If the merchant has successfully completed onboarding and has a card processor active. |
| `cash_active` | `Boolean` | If the merchant has successfully completed onboarding and has a cash processor active. |
| `country_code` | `String` | The country code of the country the merchant operates from. |
| `fee_matrix` | `FeeMatrix` | The fee matrix that the merchant is using. This is used to calculate the fees that are charged to the payor. See type definition: FeeMatrix. |
| `fee_model` | `FeeModel` | No description available. See type definition: FeeModel. |
| `is_system` | `Boolean` | If the merchant is a system merchant. System merchants are merchants that also have sub merchants. |
| `merchant_name` | `String` | The name of the merchant. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant. |
| `metadata` | `AWSJSON` | The metadata that has been set on the Merchant. |
| `parent_merchant_uid` | `String` | The merchant_uid of the parent merchant. This is only set if the merchant is a sub merchant of a system merchant. |
| `settings` | `MerchantSettings` | The settings that the merchant has set. See type definition: MerchantSettings. |
| `submitted_onboarding` | `Boolean` | Whether the merchant has submitted their onboarding information. |

## Examples

### Example merchant

Returns merchant.

**Query:**

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

**Variables:**

```json
{
  "merchant_uid": "example",
  "merchant_name": "example"
}
```

**Response:**

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


## Type Definitions

### Merchant

Merchants are the entities that are using Pay Theory to accept payments.

| Field | Type | Description |
| --- | --- | --- |
| `ach_active` | `Boolean` | If the merchant has successfully completed onboarding and has an ACH processor active. |
| `api_key` | `String` | The API key of the merchant. This is used to authenticate use of the PayTheory Web and Native SDKs. |
| `card_active` | `Boolean` | If the merchant has successfully completed onboarding and has a card processor active. |
| `cash_active` | `Boolean` | If the merchant has successfully completed onboarding and has a cash processor active. |
| `country_code` | `String` | The country code of the country the merchant operates from. |
| `fee_matrix` | `FeeMatrix` | The fee matrix that the merchant is using. This is used to calculate the fees that are charged to the payor. See type definition: FeeMatrix. |
| `fee_model` | `FeeModel` | No description available. See type definition: FeeModel. |
| `is_system` | `Boolean` | If the merchant is a system merchant. System merchants are merchants that also have sub merchants. |
| `merchant_name` | `String` | The name of the merchant. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant. |
| `metadata` | `AWSJSON` | The metadata that has been set on the Merchant. |
| `parent_merchant_uid` | `String` | The merchant_uid of the parent merchant. This is only set if the merchant is a sub merchant of a system merchant. |
| `settings` | `MerchantSettings` | The settings that the merchant has set. See type definition: MerchantSettings. |
| `submitted_onboarding` | `Boolean` | Whether the merchant has submitted their onboarding information. |

### FeeMatrix

This object is used to calculate the fees that are charged to the payor. card, ach, and cash are the main fee objects that are used to calculate the fees for each transaction type.

| Field | Type | Description |
| --- | --- | --- |
| `ach` | `AchFee!` | The model that will be used to calculate all ACH transaction fees for the merchant. See type definition: AchFee. |
| `ach_return_fee` | `Int!` | The fee that will be charged to the merchant for an ACH return. |
| `ach_return_disputed_fee` | `Int!` | The fee that will be charged to the merchant for an ACH return that falls into one of the following return codes. |
| `business_credit` | `CardFee` | The model that will be used to calculate all business credit card transaction fees for the merchant. See type definition: CardFee. |
| `business_debit` | `CardFee` | The model that will be used to calculate all business debit card transaction fees for the merchant. See type definition: CardFee. |
| `amex` | `CardBrandFee` | The model that will be used to calculate all American Express card transaction fees for the merchant. See type definition: CardBrandFee. |
| `card` | `CardFee!` | The model that will be used to calculate all card transaction fees for the merchant. See type definition: CardFee. |
| `card_account_updater` | `Int!` | The fee that will be charged to the merchant for each card updated through card account updater |
| `cash` | `Int!` | The fee that will be charged to the merchant for each cash transaction. |
| `chargeback_fee` | `Int!` | The fee that will be charged to the merchant for each chargeback. |
| `credit_card` | `CardFee` | The model that will be used to calculate all credit card transaction fees for the merchant. See type definition: CardFee. |
| `debit_card` | `CardFee` | The model that will be used to calculate all debit card transaction fees for the merchant. See type definition: CardFee. |
| `discover` | `CardBrandFee` | The model that will be used to calculate all Discover card transaction fees for the merchant. See type definition: CardBrandFee. |
| `interchange_plus` | `Boolean!` | If the merchant is using interchange plus pricing. |
| `international_card_basis` | `Int!` | The basis points that will be charged to the merchant for each international card transaction. |
| `mastercard` | `CardBrandFee` | The model that will be used to calculate all Mastercard card transaction fees for the merchant when using the MERCHANT_FEE fee mode See type definition: CardBrandFee. |
| `merchant_uid` | `String!` | The merchant_uid of the merchant that the fee matrix is associated with. |
| `prepaid_card` | `CardFee` | The model that will be used to calculate all prepaid card transaction fees for the merchant. See type definition: CardFee. |
| `service_fee_enabled` | `Boolean!` | If the merchant is using service fee pricing. |
| `visa` | `CardBrandFee` | The model that will be used to calculate all Visa card transaction fees for the merchant. See type definition: CardBrandFee. |

### AchFee

ACH fee object.

| Field | Type | Description |
| --- | --- | --- |
| `merchant_fee` | `AchMerchantFee` | The merchant fee. See type definition: AchMerchantFee. |
| `service_fee` | `AchServiceFee` | The service fee. See type definition: AchServiceFee. |

### AchMerchantFee

ACH merchant fee object.

| Field | Type | Description |
| --- | --- | --- |
| `basis_points` | `Int!` | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
| `fixed` | `Int!` | The fixed fee that will be charged to the merchant for each transaction. |
| `max_fee` | `Int` | The maximum fee that will be charged to the merchant for each transaction. |

### AchServiceFee

ACH service fee object.

| Field | Type | Description |
| --- | --- | --- |
| `basis_points` | `Int` | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
| `fixed` | `Int` | The fixed fee that will be charged to the merchant for each transaction. |
| `max_fee` | `Int` | The maximum fee that will be charged to the merchant for each transaction. |
| `min_fee` | `Int` | The minimum fee that will be charged to the merchant for each transaction. |

### CardFee

Card fee object.

| Field | Type | Description |
| --- | --- | --- |
| `merchant_fee` | `CardMerchantFee` | The merchant fee. See type definition: CardMerchantFee. |
| `service_fee` | `CardServiceFee` | The service fee. See type definition: CardServiceFee. |

### CardMerchantFee

Card merchant fee object.

| Field | Type | Description |
| --- | --- | --- |
| `basis_points` | `Int` | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
| `fixed` | `Int` | The fixed fee that will be charged to the merchant for each transaction. |

### CardServiceFee

Card service fee object.

| Field | Type | Description |
| --- | --- | --- |
| `basis_points` | `Int` | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
| `fixed` | `Int` | The fixed fee that will be charged to the merchant for each transaction. |
| `min_fee` | `Int` | The minimum fee that will be charged to the merchant for each transaction. |

### CardBrandFee

Card brand fee object.

| Field | Type | Description |
| --- | --- | --- |
| `merchant_fee` | `CardMerchantFee` | The merchant fee. See type definition: CardMerchantFee. |

### FeeModel

Fee model object.

| Field | Type | Description |
| --- | --- | --- |
| `interchange_plus` | `Boolean` | The interchange plus. |
| `merchant_fee` | `FeeModelDetail` | The merchant fee. See type definition: FeeModelDetail. |
| `service_fee` | `FeeModelDetail` | The service fee. See type definition: FeeModelDetail. |
| `service_fee_min` | `FeeModelDetail` | The service fee min. See type definition: FeeModelDetail. |

### FeeModelDetail

Fee model detail object.

| Field | Type | Description |
| --- | --- | --- |
| `ach_basis` | `Int` | The ACH basis. |
| `ach_fixed` | `Int` | The ACH fixed. |
| `card_basis` | `Int` | The card basis. |
| `card_fixed` | `Int` | The card fixed. |

### MerchantSettings

Merchant settings object.

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