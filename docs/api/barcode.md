# Barcode

Barcodes are used to define and capture cash payments in the Pay Theory system.

***

## The Barcode Object

```graphql
{
  account_code: String
  amount: Int!
  barcode_id: String!
  barcode_url: String
  email_or_phone: String!
  expiration_date: AWSDate
  fees: Int
  full_name: String!
  invoice_id: String
  merchant_uid: String!
  metadata: AWSJSON
  payor: Payor
  reference: String
  sale_id: String
}
```

| Key             | type    | description                                                                                                                                       |
|-----------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| account_code    | String  | Custom defined value passed in as the account code for the barcode.                                                                               |
| amount          | Int     | The amount of the payment.                                                                                                                        |
| barcode_id      | String  | The unique barcode identifier.                                                                                                                    |
| barcode_url     | String  | The URL to the barcode image.                                                                                                                     |
| email_or_phone  | String  | The email or phone number of the payor.                                                                                                           |
| expiration_date | String  | The date the barcode expires.                                                                                                                     |
| fees            | Int     | The fees associated with the payment.                                                                                                             |
| full_name       | String  | The full name tied to the barcode.                                                                                                                |
| invoice_id      | String  | The invoice id associated with the payment.                                                                                                       |
| merchant_uid    | String  | The Pay Theory unique identifier assigned to the merchant.                                                                                        |
| metadata        | AWSJSON | The metadata to attach to the barcode. This is a JSON object that can contain any data that you want to attach to the barcode.                    |
| payor           | Payor   | The payor object associated with the barcode.                                                                                                     |
| reference       | String  | Custom defined value passed in as the reference for the barcode.                                                                                  |
| sale_id         | String  | The Pay Theory unique identifier assigned to the sale that the authorization belongs to. Sales can be used to tie together multiple transactions. |

***

## Query Barcode

This can be used to call back a single barcode.

```graphql
{
  barcode(barcode_id: String!, merchant_uid: String!) {
    account_code
    amount
    barcode_id
    barcode_url
    email_or_phone
    expiration_date
    fees
    full_name
    invoice_id
    merchant_uid
    metadata
    payor {
      address_line1
      address_line2
      city
      country
      email
      full_name
      merchant_uid
      metadata
      payor_id
      phone
      postal_code
      region
    }
    payor_id
    reference
    sale_id
  }
}

```

**Parameters**

| Key         | type   | description                                                                                   |
|-------------|--------|-----------------------------------------------------------------------------------------------|
| barcode_id  | String | The unique barcode identifier.                                                               |
| merchant_uid| String | The Pay Theory unique identifier assigned to the merchant.                                    |

**Returns**

Returns the barcode object that was queried.

***

## Create Barcode

```graphql
mutation MyMutation {
  createBarcode(input: { account_code: String,
                         amount: Int!,
                         days_until_expiration: Int,
                         email_or_phone: String!,
                         expiration_date: AWSDate,
                         full_name: String!,
                         invoice_id: String,
                         merchant_uid: String!,
                         metadata: AWSJSON,
                         payor: PayorInput,
                         payor_id: String,
                         reference: String,
                         sale_id: String
                    }) {
    account_code
    amount
    barcode_id
    barcode_url
    email_or_phone
    expiration_date
    fees
    full_name
    invoice_id
    merchant_uid
    metadata
    payor_id
    reference
    sale_id
    payor {
      address_line1
      address_line2
      city
      country
      email
      full_name
      merchant_uid
      metadata
      payor_id
      phone
      postal_code
      region
    }
  }
}
```

**Parameters**

| Key                 | type       | description |
|---------------------|------------|-------------|
| input               | BarcodeInput | This object contains all the information needed to create a barcode. |

**BarcodeInput**

| Key                 | type       | description                                                                         |
|---------------------|------------|-------------------------------------------------------------------------------------|
| account_code        | String     | Custom defined value passed in as the account code for the barcode.                 |
| amount              | Int        | The amount of the payment.                                                          |
| days_until_expiration| Int       | The number of days until the barcode expires. **Cannot use with `expiration_date`** |
| email_or_phone      | String     | The email or phone number of the payor.                                             |
| expiration_date     | AWSDate    | The date the barcode expires. **Cannot use with `days_until_expiration`**           |
| full_name           | String     | The full name tied to the barcode.                                                  |
| invoice_id          | String     | The invoice id associated with the payment.                                         |
| merchant_uid        | String     | The Pay Theory unique identifier assigned to the merchant.                          |
| metadata            | AWSJSON    | The metadata to attach to the barcode.                                              |
| payor               | PayorInput | The payor object associated with the barcode.                                       |
| payor_id            | String     | The Pay Theory unique identifier assigned to the payor.                             |
| reference           | String     | Custom defined value passed in as the reference for the barcode.                    |
| sale_id             | String     | The Pay Theory unique identifier assigned to the sale that the authorization belongs to. Sales can be used to tie together multiple transactions. |

**Returns**

Returns the barcode object that was created.
