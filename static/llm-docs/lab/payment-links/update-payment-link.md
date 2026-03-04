# updatePaymentLink

> **Group:** Payment Links
> **Operation Type:** MUTATION

Updates payment link.

## GraphQL Signature

```graphql
mutation updatePaymentLink($input: UpdatePaymentLinkInput!) {
  updatePaymentLink(input: $input) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | `UpdatePaymentLinkInput!` | Yes | This object contains all the details needed to update a payment link. |

## Return Type

**Returns:** `PaymentLink`

| Field | Type | Description |
| --- | --- | --- |
| `accepted_payment_methods` | `AcceptedPaymentMethodsEnum` | The payment methods that will be available to a payor when making a payment. See type definition: AcceptedPaymentMethodsEnum. |
| `account_code` | `String` | Account Code that will be passed in to every transaction made with this payment link. |
| `amount` | `Int` | The amount of the payment that the payor will be asked to pay or if amount_is_variable is set to the amount that will be the default amount. |
| `amount_is_variable` | `Boolean` | If set to true the payor will be able to enter the amount they want to pay. |
| `call_to_action` | `CallToActionType` | The call to action that will be displayed on the button at the time of checkout. See type definition: CallToActionType. |
| `created_date` | `AWSDateTime` | The date and time the payment link was created. |
| `currency` | `String` | The type of currency for the payment. |
| `custom_success_message` | `String` | The message that will be displayed to the payor after a successful payment. |
| `fee_mode` | `FeeMode` | The fee mode of the payments that will be made with the payment link. See type definition: FeeMode. |
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

## Examples

### Example updatePaymentLink

Updates payment link.

**Query:**

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

**Variables:**

```json
{
  "input": {
    "accepted_payment_methods": "ALL",
    "account_code": "example",
    "amount": 123,
    "amount_is_variable": true,
    "call_to_action": "BOOK",
    "currency": "example",
    "custom_success_message": "example",
    "fee_mode": "CUSTOM_FEE",
    "is_active": true,
    "link_id": "example",
    "link_name": "example",
    "max_amount": 123,
    "merchant_uid": "example",
    "min_amount": 123,
    "payment_description": "example",
    "payment_name": "example",
    "redirect_url": "example",
    "require_phone": true
  }
}
```

**Response:**

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


## Type Definitions

### UpdatePaymentLinkInput

Input for update payment link.

| Field | Type | Description |
| --- | --- | --- |
| `accepted_payment_methods` | `AcceptedPaymentMethodsEnum` | The payment methods that will be available to a payor when making a payment. See type definition: AcceptedPaymentMethodsEnum. |
| `account_code` | `String` | Account Code that will be passed in to every transaction made with this payment link. |
| `amount` | `Int` | The amount of the payment that the payor will be asked to pay or if amount_is_variable is set to the amount that will be the default amount. |
| `amount_is_variable` | `Boolean` | If set to true the payor will be able to enter the amount they want to pay. |
| `call_to_action` | `CallToActionType` | The call to action that will be displayed on the button at the time of checkout. See type definition: CallToActionType. |
| `currency` | `String` | The type of currency for the payment. |
| `custom_success_message` | `String` | The message that will be displayed to the payor after a successful payment. |
| `fee_mode` | `FeeMode` | The fee mode of the payments that will be made with the payment link. See type definition: FeeMode. |
| `is_active` | `Boolean` | Whether this is active. |
| `link_id` | `String!` | The unique identifier for the payment link. |
| `link_name` | `String` | The name you give to the payment link for internal tracking purposes. |
| `max_amount` | `Int` | The maximum amount the payor can pay if amount_is_variable is set to true. |
| `merchant_uid` | `String!` | The Pay Theory unique identifier assigned to the merchant that the transaction belongs to. |
| `min_amount` | `Int` | The minimum amount the payor can pay if amount_is_variable is set to true. |
| `payment_description` | `String` | The description of the payment that will be displayed to the customer. |
| `payment_name` | `String` | The name of the payment that will be displayed to the customer. This will be passed in as the reference at the time of the transaction. |
| `redirect_url` | `String` | The url that the payor will be redirected to after a successful payment. |
| `require_phone` | `Boolean` | If set to true the payor will be required to enter their phone number before making the payment. |

### AcceptedPaymentMethodsEnum

The payment methods that are accepted for the checkout.

| AcceptedPaymentMethodsEnum Value | Description |
| --- | --- |
| `ALL` | All payment methods are accepted. |
| `NOT_ACH` | ACH is not accepted. |
| `NOT_CARD` | Card is not accepted. |
| `NOT_CASH` | Cash is not accepted. |
| `ONLY_ACH` | Only ACH is accepted. |
| `ONLY_CARD` | Only Card is accepted. |
| `ONLY_CASH` | Only Cash is accepted. |

### CallToActionType

The type of call to action for the checkout.

| CallToActionType Value | Description |
| --- | --- |
| `BOOK` | Button will say Book. |
| `DONATE` | Button will say Donate. |
| `PAY` | Button will say Pay. |

### FeeMode

Possible values for fee mode.

| FeeMode Value | Description |
| --- | --- |
| `CUSTOM_FEE` | Custom fee that was set by the partner. |
| `INTERCHANGE` | No description available. (deprecated: Use SERVICE_FEE instead.) |
| `MERCHANT_FEE` | Fee was charged to the merchant and taken from the gross amount of the transaction. |
| `SERVICE_FEE` | Fee was charged to the payor and added to the gross amount of the transaction. |

### PaymentLink

Payment link object.

| Field | Type | Description |
| --- | --- | --- |
| `accepted_payment_methods` | `AcceptedPaymentMethodsEnum` | The payment methods that will be available to a payor when making a payment. See type definition: AcceptedPaymentMethodsEnum. |
| `account_code` | `String` | Account Code that will be passed in to every transaction made with this payment link. |
| `amount` | `Int` | The amount of the payment that the payor will be asked to pay or if amount_is_variable is set to the amount that will be the default amount. |
| `amount_is_variable` | `Boolean` | If set to true the payor will be able to enter the amount they want to pay. |
| `call_to_action` | `CallToActionType` | The call to action that will be displayed on the button at the time of checkout. See type definition: CallToActionType. |
| `created_date` | `AWSDateTime` | The date and time the payment link was created. |
| `currency` | `String` | The type of currency for the payment. |
| `custom_success_message` | `String` | The message that will be displayed to the payor after a successful payment. |
| `fee_mode` | `FeeMode` | The fee mode of the payments that will be made with the payment link. See type definition: FeeMode. |
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