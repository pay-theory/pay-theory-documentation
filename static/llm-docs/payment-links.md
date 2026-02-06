# Payment Links

> Part of [GraphQL API](./index.md) GraphQL API

---

## Queries

### paymentLinks

Returns payment links.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `SqlQuery` | No | The query to filter the payment links with based on Pay Theory defined data. Detailed information about the query object can be found here |
| `limit` | `Int` | No | The number of payment links to return. |
| `offset` | `String` | No | The value of the offset item for which the list is being sorted. |
| `direction` | `MoveDirection` | No | The direction of the pagination. Makes sure the results are returned in the correct order. |
| `offset_id` | `String` | No | The link_id of the offset item. |

**Returns:** `PaymentLinks`

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[PaymentLink]` | List of Payment Links. |
| `total_row_count` | `Int` | Total number of rows matching the query. |


**PaymentLink fields:**

| Field | Type | Description |
| --- | --- | --- |
| `accepted_payment_methods` | `AcceptedPaymentMethodsEnum` | The payment methods that will be available to a payor when making a payment. |
| `account_code` | `String` | Account Code that will be passed in to every transaction made with this payment link. |
| `amount` | `Int` | The amount of the payment that the payor will be asked to pay or if amount_is_variable is set to the amount that will be the default amount. |
| `amount_is_variable` | `Boolean` | If set to true the payor will be able to enter the amount they want to pay. |
| `call_to_action` | `CallToActionType` | The call to action that will be displayed on the button at the time of checkout. |
| `created_date` | `AWSDateTime` | The date and time the payment link was created. |
| `currency` | `String` | The type of currency for the payment. |
| `custom_success_message` | `String` | The message that will be displayed to the payor after a successful payment. |
| `fee_mode` | `FeeMode` | The fee mode of the payments that will be made with the payment link. |
| `is_active` | `Boolean` | If set to true the payment link will be active and available to payors. If set to false the payment link will not be available to payors. |
| `link_id` | `String` | The unique id of the payment link. |
| `link_name` | `String` | The name you give to the payment link for internal tracking purposes. |
| `link_url` | `String` | The url of the payment link. |
| `max_amount` | `Int` | The maximum amount the payor can pay if amount_is_variable is set to true. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the transaction belongs to. |
| `min_amount` | `Int` | The minimum amount the payor can pay if amount_is_variable is set to true. |
| `payment_name` | `String` | The name of the payment that will be displayed to the customer. This will be passed in as the reference at the time of the transaction. |
| `payment_description` | `String` | The description of the payment that will be displayed to the customer. |
| `redirect_url` | `String` | The url that the payor will be redirected to after a successful payment. |
| `require_phone` | `Boolean` | If set to true the payor will be required to enter their phone number before making the payment. |


**AcceptedPaymentMethodsEnum values:**

| AcceptedPaymentMethodsEnum Value | Description |
| --- | --- |
| `ALL` | All payment methods are accepted. |
| `NOT_ACH` | ACH is not accepted. |
| `NOT_CARD` | Card is not accepted. |
| `NOT_CASH` | Cash is not accepted. |
| `ONLY_ACH` | Only ACH is accepted. |
| `ONLY_CARD` | Only Card is accepted. |
| `ONLY_CASH` | Only Cash is accepted. |

**CallToActionType values:**

| CallToActionType Value | Description |
| --- | --- |
| `BOOK` | Button will say Book. |
| `DONATE` | Button will say Donate. |
| `PAY` | Button will say Pay. |

**FeeMode values:**

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | — (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

**Example: Example paymentLinks**

Returns payment links.

```graphql
query PaymentLinks($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  paymentLinks(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
  items {
    link_id
    created_date
    accepted_payment_methods
    account_code
    amount
  }
  total_row_count
  }
}
```

```json
{
  "data": {
    "paymentLinks": {
      "items": [
        {
          "link_id": "example",
          "created_date": "2025-01-01T00:00:00Z",
          "accepted_payment_methods": "example",
          "account_code": "example",
          "amount": 123
        }
      ],
      "total_row_count": 123
    }
  }
}
```


## Mutations

### createPaymentLink

Creates payment link.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `PaymentLinkInput!` | Yes | This object contains all the details needed to create a payment link. |

**Returns:** `PaymentLink`

| Field | Type | Description |
| --- | --- | --- |
| `accepted_payment_methods` | `AcceptedPaymentMethodsEnum` | The payment methods that will be available to a payor when making a payment. |
| `account_code` | `String` | Account Code that will be passed in to every transaction made with this payment link. |
| `amount` | `Int` | The amount of the payment that the payor will be asked to pay or if amount_is_variable is set to the amount that will be the default amount. |
| `amount_is_variable` | `Boolean` | If set to true the payor will be able to enter the amount they want to pay. |
| `call_to_action` | `CallToActionType` | The call to action that will be displayed on the button at the time of checkout. |
| `created_date` | `AWSDateTime` | The date and time the payment link was created. |
| `currency` | `String` | The type of currency for the payment. |
| `custom_success_message` | `String` | The message that will be displayed to the payor after a successful payment. |
| `fee_mode` | `FeeMode` | The fee mode of the payments that will be made with the payment link. |
| `is_active` | `Boolean` | If set to true the payment link will be active and available to payors. If set to false the payment link will not be available to payors. |
| `link_id` | `String` | The unique id of the payment link. |
| `link_name` | `String` | The name you give to the payment link for internal tracking purposes. |
| `link_url` | `String` | The url of the payment link. |
| `max_amount` | `Int` | The maximum amount the payor can pay if amount_is_variable is set to true. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the transaction belongs to. |
| `min_amount` | `Int` | The minimum amount the payor can pay if amount_is_variable is set to true. |
| `payment_name` | `String` | The name of the payment that will be displayed to the customer. This will be passed in as the reference at the time of the transaction. |
| `payment_description` | `String` | The description of the payment that will be displayed to the customer. |
| `redirect_url` | `String` | The url that the payor will be redirected to after a successful payment. |
| `require_phone` | `Boolean` | If set to true the payor will be required to enter their phone number before making the payment. |


**AcceptedPaymentMethodsEnum values:**

| AcceptedPaymentMethodsEnum Value | Description |
| --- | --- |
| `ALL` | All payment methods are accepted. |
| `NOT_ACH` | ACH is not accepted. |
| `NOT_CARD` | Card is not accepted. |
| `NOT_CASH` | Cash is not accepted. |
| `ONLY_ACH` | Only ACH is accepted. |
| `ONLY_CARD` | Only Card is accepted. |
| `ONLY_CASH` | Only Cash is accepted. |

**CallToActionType values:**

| CallToActionType Value | Description |
| --- | --- |
| `BOOK` | Button will say Book. |
| `DONATE` | Button will say Donate. |
| `PAY` | Button will say Pay. |

**FeeMode values:**

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | — (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

**Example: Example createPaymentLink**

Creates payment link.

```graphql
mutation CreatePaymentLink($input: PaymentLinkInput!) {
  createPaymentLink(input: $input) {
  link_id
  created_date
  accepted_payment_methods
  account_code
  amount
  }
}
```

```json
{
  "data": {
    "createPaymentLink": {
      "link_id": "example",
      "created_date": "2025-01-01T00:00:00Z",
      "accepted_payment_methods": "example",
      "account_code": "example",
      "amount": 123
    }
  }
}
```


### updatePaymentLink

Updates payment link.

**Arguments:**

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `UpdatePaymentLinkInput!` | Yes | This object contains all the details needed to update a payment link. |

**Returns:** `PaymentLink`

| Field | Type | Description |
| --- | --- | --- |
| `accepted_payment_methods` | `AcceptedPaymentMethodsEnum` | The payment methods that will be available to a payor when making a payment. |
| `account_code` | `String` | Account Code that will be passed in to every transaction made with this payment link. |
| `amount` | `Int` | The amount of the payment that the payor will be asked to pay or if amount_is_variable is set to the amount that will be the default amount. |
| `amount_is_variable` | `Boolean` | If set to true the payor will be able to enter the amount they want to pay. |
| `call_to_action` | `CallToActionType` | The call to action that will be displayed on the button at the time of checkout. |
| `created_date` | `AWSDateTime` | The date and time the payment link was created. |
| `currency` | `String` | The type of currency for the payment. |
| `custom_success_message` | `String` | The message that will be displayed to the payor after a successful payment. |
| `fee_mode` | `FeeMode` | The fee mode of the payments that will be made with the payment link. |
| `is_active` | `Boolean` | If set to true the payment link will be active and available to payors. If set to false the payment link will not be available to payors. |
| `link_id` | `String` | The unique id of the payment link. |
| `link_name` | `String` | The name you give to the payment link for internal tracking purposes. |
| `link_url` | `String` | The url of the payment link. |
| `max_amount` | `Int` | The maximum amount the payor can pay if amount_is_variable is set to true. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the transaction belongs to. |
| `min_amount` | `Int` | The minimum amount the payor can pay if amount_is_variable is set to true. |
| `payment_name` | `String` | The name of the payment that will be displayed to the customer. This will be passed in as the reference at the time of the transaction. |
| `payment_description` | `String` | The description of the payment that will be displayed to the customer. |
| `redirect_url` | `String` | The url that the payor will be redirected to after a successful payment. |
| `require_phone` | `Boolean` | If set to true the payor will be required to enter their phone number before making the payment. |


**AcceptedPaymentMethodsEnum values:**

| AcceptedPaymentMethodsEnum Value | Description |
| --- | --- |
| `ALL` | All payment methods are accepted. |
| `NOT_ACH` | ACH is not accepted. |
| `NOT_CARD` | Card is not accepted. |
| `NOT_CASH` | Cash is not accepted. |
| `ONLY_ACH` | Only ACH is accepted. |
| `ONLY_CARD` | Only Card is accepted. |
| `ONLY_CASH` | Only Cash is accepted. |

**CallToActionType values:**

| CallToActionType Value | Description |
| --- | --- |
| `BOOK` | Button will say Book. |
| `DONATE` | Button will say Donate. |
| `PAY` | Button will say Pay. |

**FeeMode values:**

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | — (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

**Example: Example updatePaymentLink**

Updates payment link.

```graphql
mutation UpdatePaymentLink($input: UpdatePaymentLinkInput!) {
  updatePaymentLink(input: $input) {
  link_id
  created_date
  accepted_payment_methods
  account_code
  amount
  }
}
```

```json
{
  "data": {
    "updatePaymentLink": {
      "link_id": "example",
      "created_date": "2025-01-01T00:00:00Z",
      "accepted_payment_methods": "example",
      "account_code": "example",
      "amount": 123
    }
  }
}
```



## Types Reference

### PaymentLink

| Field | Type | Description |
| --- | --- | --- |
| `accepted_payment_methods` | `AcceptedPaymentMethodsEnum` | The payment methods that will be available to a payor when making a payment. |
| `account_code` | `String` | Account Code that will be passed in to every transaction made with this payment link. |
| `amount` | `Int` | The amount of the payment that the payor will be asked to pay or if amount_is_variable is set to the amount that will be the default amount. |
| `amount_is_variable` | `Boolean` | If set to true the payor will be able to enter the amount they want to pay. |
| `call_to_action` | `CallToActionType` | The call to action that will be displayed on the button at the time of checkout. |
| `created_date` | `AWSDateTime` | The date and time the payment link was created. |
| `currency` | `String` | The type of currency for the payment. |
| `custom_success_message` | `String` | The message that will be displayed to the payor after a successful payment. |
| `fee_mode` | `FeeMode` | The fee mode of the payments that will be made with the payment link. |
| `is_active` | `Boolean` | If set to true the payment link will be active and available to payors. If set to false the payment link will not be available to payors. |
| `link_id` | `String` | The unique id of the payment link. |
| `link_name` | `String` | The name you give to the payment link for internal tracking purposes. |
| `link_url` | `String` | The url of the payment link. |
| `max_amount` | `Int` | The maximum amount the payor can pay if amount_is_variable is set to true. |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the transaction belongs to. |
| `min_amount` | `Int` | The minimum amount the payor can pay if amount_is_variable is set to true. |
| `payment_name` | `String` | The name of the payment that will be displayed to the customer. This will be passed in as the reference at the time of the transaction. |
| `payment_description` | `String` | The description of the payment that will be displayed to the customer. |
| `redirect_url` | `String` | The url that the payor will be redirected to after a successful payment. |
| `require_phone` | `Boolean` | If set to true the payor will be required to enter their phone number before making the payment. |

**AcceptedPaymentMethodsEnum values:**

| AcceptedPaymentMethodsEnum Value | Description |
| --- | --- |
| `ALL` | All payment methods are accepted. |
| `NOT_ACH` | ACH is not accepted. |
| `NOT_CARD` | Card is not accepted. |
| `NOT_CASH` | Cash is not accepted. |
| `ONLY_ACH` | Only ACH is accepted. |
| `ONLY_CARD` | Only Card is accepted. |
| `ONLY_CASH` | Only Cash is accepted. |

**CallToActionType values:**

| CallToActionType Value | Description |
| --- | --- |
| `BOOK` | Button will say Book. |
| `DONATE` | Button will say Donate. |
| `PAY` | Button will say Pay. |

**FeeMode values:**

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | — (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |
