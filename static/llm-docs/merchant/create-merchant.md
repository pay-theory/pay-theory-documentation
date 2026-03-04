# createMerchant

> **Group:** Merchant
> **Operation Type:** MUTATION

Creates merchant.

## GraphQL Signature

```graphql
mutation createMerchant($merchant_name: String!, $parent_merchant_uid: String, $user: MerchantUserInput, $metadata: AWSJSON) {
  createMerchant(merchant_name: $merchant_name, parent_merchant_uid: $parent_merchant_uid, user: $user, metadata: $metadata) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `merchant_name` | `String!` | Yes | The name of the merchant to create. |
| `parent_merchant_uid` | `String` | No | The merchant_uid of the parent merchant. This is only set if the merchant belongs to another merchant account. |
| `user` | `MerchantUserInput` | No | The user that will be created for the merchant. This user will be given access to the onboarding form on Merchant creation. |
| `metadata` | `AWSJSON` | No | The metadata that will be set on the Merchant. |

## Return Type

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

## Examples

### Example createMerchant

Creates merchant.

**Query:**

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

**Variables:**

```json
{
  "merchant_name": "example",
  "parent_merchant_uid": "example",
  "user": {
    "email": "user@example.com",
    "first_name": "example",
    "last_name": "example",
    "phone": "+15555555555"
  },
  "metadata": {
    "key": "value"
  }
}
```

**Response:**

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


## Type Definitions

### MerchantUserInput

Input for merchant user.

| Field | Type | Description |
| --- | --- | --- |
| `email` | `AWSEmail!` | Email address. |
| `first_name` | `String!` | First name. |
| `last_name` | `String!` | Last name. |
| `phone` | `AWSPhone` | Phone number. |

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