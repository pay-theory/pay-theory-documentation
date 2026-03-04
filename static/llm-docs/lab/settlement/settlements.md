# settlements

> **Group:** Settlement
> **Operation Type:** QUERY

Returns settlements.

## GraphQL Signature

```graphql
query settlements($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  settlements(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `SqlQuery` | No | The query to filter the settlements with based on Pay Theory defined data. |
| `limit` | `Int` | No | The number of settlements to return. |
| `offset` | `String` | No | The value of the offset item for which the list is being sorted. |
| `direction` | `MoveDirection` | No | The direction of the pagination. Makes sure the results are returned in the correct order. |
| `offset_id` | `String` | No | The settlement_batch of the offset item. |

## Return Type

**Returns:** `Settlements`

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[Settlement]` | List of items. See type definition: Settlement. |
| `total_row_count` | `Int` | Total number of rows matching the query. |

## Examples

### Example settlements

Returns settlements.

**Query:**

```graphql
query Settlements($query: SqlQuery, $limit: Int, $offset: String, $direction: MoveDirection, $offset_id: String) {
  settlements(query: $query, limit: $limit, offset: $offset, direction: $direction, offset_id: $offset_id) {
  items {
    merchant_uid
    settlement_date
    currency
    gross_amount
    gross_amount_64bit
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
    "settlements": {
      "items": [
        {
          "merchant_uid": "example",
          "settlement_date": "2025-01-01T00:00:00Z",
          "currency": "example",
          "gross_amount": 123,
          "gross_amount_64bit": "example"
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

### Settlements

Paginated list of settlement.

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[Settlement]` | List of items. See type definition: Settlement. |
| `total_row_count` | `Int` | Total number of rows matching the query. |

### Settlement

Settlement object.

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `String` | The currency of the settlement. |
| `gross_amount` | `Int` | The gross amount. |
| `gross_amount_64bit` | `String` | The total amount of the settlement before any fees in a string format to support 64-bit Int |
| `merchant_uid` | `String` | The Pay Theory unique identifier assigned to the merchant that the settlement belongs to. |
| `net_amount` | `Int` | The net amount. |
| `net_amount_64bit` | `String` | The total amount of the settlement after any fees in a string format to support 64-bit Int |
| `settlement_batch` | `Int` | The unique settlement batch number. |
| `settlement_date` | `AWSDateTime` | The date the settlement was created in an ISO 8601 String format. |
| `status` | `String` | The status of the settlement. Will be one of PENDING, SUCCEEDED, or HOLD. |
| `transaction_debit_count` | `Int` | The number of transactions of type DEBIT that were included in the settlement. |
| `transaction_dispute_count` | `Int` | The number of transactions of type DISPUTE that were included in the settlement. |
| `transaction_reversal_count` | `Int` | The number of transactions of type REVERSAL that were included in the settlement. |
| `transfer_date` | `AWSDateTime` | The date the settlement was transferred to the merchant in an ISO 8601 String format. |
| `total_adjustments` | `Int` | The total adjustments. |
| `total_adjustments_64bit` | `String` | The total amount of adjustments that were applied to the settlement in a string format to support 64-bit Int |
| `total_fees` | `Int` | The total fees. |
| `total_fees_64bit` | `String` | The total amount of fees that were applied to the settlement in a string format to support 64-bit Int |
| `updated_row_at` | `AWSDateTime` | The date the settlement was last updated in an ISO 8601 String format. |