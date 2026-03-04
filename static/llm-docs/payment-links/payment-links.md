# paymentLinks

> **Group:** Payment Links
> **Operation Type:** QUERY

Returns payment links.

## GraphQL Signature

```graphql
query paymentLinks($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  paymentLinks(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `SqlQuery` | No | The query to filter the payment links with based on Pay Theory defined data. Detailed information about the query object can be found here |
| `limit` | `Int` | No | The number of payment links to return. |
| `offset` | `String` | No | The value of the offset item for which the list is being sorted. |
| `direction` | `MoveDirection` | No | The direction of the pagination. Makes sure the results are returned in the correct order. |
| `offset_id` | `String` | No | The link_id of the offset item. |

## Return Type

**Returns:** `PaymentLinks`

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[PaymentLink]` | List of Payment Links. See type definition: PaymentLink. |
| `total_row_count` | `Int` | Total number of rows matching the query. |

## Examples

### Example paymentLinks

Returns payment links.

**Query:**

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

**Variables:**

```json
{
  "query": {
    "query_list": [
      {
        "conjunctive_operator": "AND_NEXT"
      }
    ],
    "sort_list": [
      {
        "direction": "ASC"
      }
    ]
  },
  "limit": 123,
  "offset": "example",
  "direction": "BACKWARD",
  "offset_id": "example"
}
```

**Response:**

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


## Type Definitions

### SqlQuery

Here we will detail how you can build your own queries to pass into the Pay Theory API.

| Field | Type | Description |
| --- | --- | --- |
| `query_list` | `[QueryPair]` | A list of query pairs used to build out a query. See type definition: QueryPair. |
| `sort_list` | `[SortPair]` | A list of sort pairs to define how the data should be sorted. See type definition: SortPair. |

### QueryPair

A query pair is the object to build out a query. There are some required fields and some optional fields.

| Field | Type | Description |
| --- | --- | --- |
| `conjunctive_operator` | `ConjunctiveOperator` | The conjunctive operator to use to connect the query pair with the next query pair. More detail below. See type definition: ConjunctiveOperator. |
| `in_values` | `[String]` | A list of values to compare the data to. This should be used instead of value if using the operators IN or NOT_IN. |
| `key` | `String` | The key to the value you want to query against. |
| `operator` | `Operator` | The operator to use to compare the value to the data you are calling. More detail below. See type definition: Operator. |
| `query_group` | `[QueryPair]` | A list of query pairs to use to build out a nested query. A more detailed example is below under the examples section. See type definition: QueryPair. |
| `value` | `String` | The value to compare the data to. If using the LIKE or NOT_LIKE operator, this value can contain wildcard characters. |

### ConjunctiveOperator

These operators are case-sensitive. Conjunctive operators in the same array must match for a query to work. To mix operators use nested queries with query pairs containing a query_list. The following are the available conjunctive operators:

| ConjunctiveOperator Value | Description |
| --- | --- |
| `AND_NEXT` | The results of the query have to meet all the conditions in the query pair list. |
| `NONE_NEXT` | The final query pair in the list should use this operator since it has nothing to connect to. |
| `OR_NEXT` | The results of the query have to meet one of the conditions in the query pair list. |

### Operator

These operators are case-sensitive. The following are the available operators:

| Operator Value | Description |
| --- | --- |
| `EQUAL` | The data is equal to the value. |
| `EQUAL_FALSE` | The data is false. |
| `EQUAL_TRUE` | The data is true. |
| `GREATER_EQUAL` | The data is greater than or equal to the value. |
| `GREATER_THAN` | The data is greater than the value. |
| `IN_LIST` | The data is in the list of values. |
| `IS_NOT_NULL` | The data is not null. |
| `IS_NULL` | The data is null. |
| `LESS_EQUAL` | The data is less than or equal to the value. |
| `LESS_THAN` | The data is less than the value. |
| `LIKE` | The data is like the value. The value can contain wildcard characters. |
| `NOT_EQUAL` | The data is not equal to the value. |
| `NOT_IN_LIST` | The data is not in the list of values. |
| `NOT_LIKE` | The data is not like the value. The value can contain wildcard characters. |

### SortPair

A sort pair is the object used to tell a query how the data should be sorted.

| Field | Type | Description |
| --- | --- | --- |
| `direction` | `SortDirection` | The direction to sort the data. These are case-sensitive. See type definition: SortDirection. |
| `key` | `String` | The key to sort the data by. |

### SortDirection

The direction to sort the data. These are case-sensitive.

| SortDirection Value | Description |
| --- | --- |
| `ASC` | Begins with the least or smallest and ends with the greatest or largest |
| `DESC` | Begins with the greatest or largest and ends with the least or smallest |

### MoveDirection

The direction of the pagination.

| MoveDirection Value | Description |
| --- | --- |
| `BACKWARD` | Request is for the previous set of data. |
| `FORWARD` | Request is for the next set of data. |

### PaymentLinks

Paginated list of payment link.

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[PaymentLink]` | List of Payment Links. See type definition: PaymentLink. |
| `total_row_count` | `Int` | Total number of rows matching the query. |

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