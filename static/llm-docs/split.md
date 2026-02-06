# Split

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### splits

Returns splits.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `SqlQuery` | No | The query to filter the splits with based on Pay Theory defined data. Detailed information about the query object can be found here. |
| `limit` | `Int` | No | The number of splits to return. |
| `offset` | `String` | No | The value of the offset item for which the list is being sorted. |
| `direction` | `MoveDirection` | No | The direction of the pagination. Makes sure the results are returned in the correct order. |
| `offset_id` | `String` | No | The id of the offset item. |

**Returns:** `Splits`

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[Split]` | List of Splits. |
| `total_row_count` | `Int` | Total number of rows matching the query. |


**Split fields:**

| Field | Type | Description |
| --- | --- | --- |
| `account_code` | `String` | Customer defined account code for the split. |
| `amount` | `Int!` | The amount of the split in cents. |
| `currency` | `String!` | The currency of the split. |
| `created_at` | `AWSDateTime!` | The date and time the split was created. |
| `id` | `String!` | The Pay Theory unique identifier for the split. |
| `merchant` | `ListMerchant!` | The merchant object containing information about the merchant. |
| `metadata` | `AWSJSON` | Custom defined JSON object to be stored with the split. |
| `payment_method` | `PaymentMethodToken!` | The payment method used for the transaction associated with this split. |
| `reference` | `String` | Customer defined reference for the split. |
| `settlement_batch` | `Int` | The unique settlement batch number the split belongs to if settled. |
| `transaction_id` | `String!` | The Pay Theory unique identifier for the transaction the split belongs to. |
| `updated_row_at` | `AWSDateTime!` | The date and time the split was last updated. |


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

**Example: Example splits**

Returns splits.

```graphql
query Splits($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  splits(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
  items {
    id
    created_at
    account_code
    amount
    currency
  }
  total_row_count
  }
}
```

```json
{
  "data": {
    "splits": {
      "items": [
        {
          "id": "example",
          "created_at": "2025-01-01T00:00:00Z",
          "account_code": "example",
          "amount": 123,
          "currency": "example"
        }
      ],
      "total_row_count": 123
    }
  }
}
```

