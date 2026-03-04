# updateFeeMatrix

> **Group:** Merchant
> **Operation Type:** MUTATION

:::note Limited Access This mutation is only available to users with Partner level access. Please contact Pay Theory support if you need to update a merchant's fee matrix and do not have Partner level access. :::

## GraphQL Signature

```graphql
mutation updateFeeMatrix($fee_matrix: FeeMatrixInput!) {
  updateFeeMatrix(fee_matrix: $fee_matrix) {
    __typename
  }
}
```

## Arguments

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `fee_matrix` | `FeeMatrixInput!` | Yes | The new fee matrix that will be used to calculate the fees for the merchant. |

## Return Type

**Returns:** `FeeMatrix`

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

## Examples

### Example updateFeeMatrix

:::note Limited Access This mutation is only available to users with Partner level access. Please contact Pay Theory support if you need to update a merchant's fee matrix and do not have Partner level access. :::

**Query:**

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

**Variables:**

```json
{
  "fee_matrix": {
    "ach": {
      "merchant_fee": {
        "basis_points": 123
      },
      "service_fee": {
        "basis_points": 123,
        "fixed": 123
      }
    },
    "ach_return_fee": 123,
    "ach_return_disputed_fee": 123,
    "business_credit": {
      "merchant_fee": {
        "basis_points": 123,
        "fixed": 123
      },
      "service_fee": {
        "basis_points": 123,
        "fixed": 123
      }
    },
    "business_debit": {
      "merchant_fee": {
        "basis_points": 123,
        "fixed": 123
      },
      "service_fee": {
        "basis_points": 123,
        "fixed": 123
      }
    },
    "amex": {
      "merchant_fee": {
        "basis_points": 123,
        "fixed": 123
      }
    },
    "card": {
      "merchant_fee": {
        "basis_points": 123,
        "fixed": 123
      },
      "service_fee": {
        "basis_points": 123,
        "fixed": 123
      }
    },
    "card_account_updater": 123,
    "cash": 123,
    "chargeback_fee": 123,
    "credit_card": {
      "merchant_fee": {
        "basis_points": 123,
        "fixed": 123
      },
      "service_fee": {
        "basis_points": 123,
        "fixed": 123
      }
    },
    "debit_card": {
      "merchant_fee": {
        "basis_points": 123,
        "fixed": 123
      },
      "service_fee": {
        "basis_points": 123,
        "fixed": 123
      }
    },
    "discover": {
      "merchant_fee": {
        "basis_points": 123,
        "fixed": 123
      }
    },
    "interchange_plus": true,
    "international_card_basis": 123,
    "mastercard": {
      "merchant_fee": {
        "basis_points": 123,
        "fixed": 123
      }
    },
    "merchant_uid": "example",
    "prepaid_card": {
      "merchant_fee": {
        "basis_points": 123,
        "fixed": 123
      },
      "service_fee": {
        "basis_points": 123,
        "fixed": 123
      }
    },
    "service_fee_enabled": true,
    "visa": {
      "merchant_fee": {
        "basis_points": 123,
        "fixed": 123
      }
    }
  }
}
```

**Response:**

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


## Type Definitions

### FeeMatrixInput

Input for fee matrix.

| Field | Type | Description |
| --- | --- | --- |
| `ach` | `AchFeeInput` | The model that will be used to calculate all ACH transaction fees for the merchant. See type definition: AchFeeInput. |
| `ach_return_fee` | `Int` | The fee that will be charged to the merchant for an ACH return. |
| `ach_return_disputed_fee` | `Int` | The fee that will be charged to the merchant for an ACH return that falls into one of the following return codes. |
| `business_credit` | `CardFeeInput` | The model that will be used to calculate all business credit card transaction fees for the merchant. See type definition: CardFeeInput. |
| `business_debit` | `CardFeeInput` | The model that will be used to calculate all business debit card transaction fees for the merchant. See type definition: CardFeeInput. |
| `amex` | `CardBrandFeeInput` | The model that will be used to calculate all American Express card transaction fees for the merchant. See type definition: CardBrandFeeInput. |
| `card` | `CardFeeInput` | The model that will be used to calculate all card transaction fees for the merchant. See type definition: CardFeeInput. |
| `card_account_updater` | `Int` | The fee that will be charged to the merchant for each card updated through card account updater |
| `cash` | `Int` | The fee that will be charged to the merchant for each cash transaction. |
| `chargeback_fee` | `Int` | The fee that will be charged to the merchant for each chargeback. |
| `credit_card` | `CardFeeInput` | The model that will be used to calculate all credit card transaction fees for the merchant. See type definition: CardFeeInput. |
| `debit_card` | `CardFeeInput` | The model that will be used to calculate all debit card transaction fees for the merchant. See type definition: CardFeeInput. |
| `discover` | `CardBrandFeeInput` | The model that will be used to calculate all Discover card transaction fees for the merchant. See type definition: CardBrandFeeInput. |
| `interchange_plus` | `Boolean` | If the merchant is using interchange plus pricing. |
| `international_card_basis` | `Int` | The basis points that will be charged to the merchant for each international card transaction. |
| `mastercard` | `CardBrandFeeInput` | The model that will be used to calculate all Mastercard card transaction fees for the merchant when using the MERCHANT_FEE fee mode See type definition: CardBrandFeeInput. |
| `merchant_uid` | `String!` | The merchant_uid of the merchant that the fee matrix is associated with. |
| `prepaid_card` | `CardFeeInput` | The model that will be used to calculate all prepaid card transaction fees for the merchant. See type definition: CardFeeInput. |
| `service_fee_enabled` | `Boolean` | If the merchant is using service fee pricing. |
| `visa` | `CardBrandFeeInput` | The model that will be used to calculate all Visa card transaction fees for the merchant. See type definition: CardBrandFeeInput. |

### AchFeeInput

Input for ACH fee.

| Field | Type | Description |
| --- | --- | --- |
| `merchant_fee` | `AchMerchantFeeInput!` | The merchant fee. See type definition: AchMerchantFeeInput. |
| `service_fee` | `AchServiceFeeInput!` | The service fee. See type definition: AchServiceFeeInput. |

### AchMerchantFeeInput

Input for ACH merchant fee.

| Field | Type | Description |
| --- | --- | --- |
| `basis_points` | `Int` | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
| `fixed` | `Int` | The fixed amount applied to each fee. |
| `max_fee` | `Int` | The max fee. |

### AchServiceFeeInput

Input for ACH service fee.

| Field | Type | Description |
| --- | --- | --- |
| `basis_points` | `Int!` | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
| `fixed` | `Int!` | The fixed fee that will be charged to the merchant for each transaction. |
| `max_fee` | `Int` | The maximum fee that will be charged to the merchant for each transaction. |
| `min_fee` | `Int` | The minimum fee that will be charged to the merchant for each transaction. |

### CardFeeInput

Input for card fee.

| Field | Type | Description |
| --- | --- | --- |
| `merchant_fee` | `CardMerchantFeeInput!` | The merchant fee. See type definition: CardMerchantFeeInput. |
| `service_fee` | `CardServiceFeeInput!` | The service fee. See type definition: CardServiceFeeInput. |

### CardMerchantFeeInput

Input for card merchant fee.

| Field | Type | Description |
| --- | --- | --- |
| `basis_points` | `Int!` | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
| `fixed` | `Int!` | The fixed amount applied to each fee. |

### CardServiceFeeInput

Input for card service fee.

| Field | Type | Description |
| --- | --- | --- |
| `basis_points` | `Int!` | The basis points that will be used to calculate the fee off the total amount of the transaciton. |
| `fixed` | `Int!` | The fixed amount applied to each fee. |
| `min_fee` | `Int` | The min fee that will be charged as a service fee for each transaction. |

### CardBrandFeeInput

Input for card brand fee.

| Field | Type | Description |
| --- | --- | --- |
| `merchant_fee` | `CardMerchantFeeInput!` | The merchant fee. See type definition: CardMerchantFeeInput. |

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