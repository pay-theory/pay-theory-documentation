---
sidebar_position: 5
sidebar_label: 'Payor'
title: "Payor"
---

# Payor

Payors are used to track payor info that can be tied to other data objects in Pay Theory.

***
## The Payor Object
```graphql
{
    address_line1: String
    address_line2: String
    city: String
    country: String
    email: String
    full_name: String
    merchant_uid: String
    metadata: AWSJSON
    payor_id: String
    phone: String
    postal_code: String
    region: String
}
```
|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|address_line1      |String       |The first line of the address of the payor.|
|address_line2      |String       |The second line of the address of the payor.|
|city               |String       |The city of the payor.|
|country            |String       |The country of the payor.|
|email              |String       |The email address of the payor.|
|full_name          |String       |The full name of the payor.|
|merchant_uid       |String       |The Pay Theory unique identifier assigned to the merchant that the payor belongs to.|
|metadata           |AWSJSON      |The metadata to attach to the payor.  This is a JSON object that can contain any data that you want to attach to the payor.|
|payor_id           |String       |The unique payor id.|
|phone              |String       |The phone number of the payor.|
|postal_code        |String       |The postal code of the payor.|
|region             |String       |The region of the payor.|

***
## Query Payors
```graphql
{
    payors(direction: MoveDirection, limit: Int, offset: String, offset_id: String, query: QueryObject) {
        items {
            address_line1
            address_line2
            city
            country
            email
            full_name
            merchant_uid
            metadata(query_list: [QueryPair])
            payor_id
            phone
            postal_code
            region
        }
        total_row_count
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|direction          |MoveDirection|The direction of the pagination. Makes sure the results are returned in the correct order.|
|limit              |Int          |The number of payors to return.|
|offset             |String       |The value of the offset item for which the list is being sorted.|
|offset_id          |String       |The `payor_id` of the offset item.|
|query              |QueryObject  |The query to filter the payors with based on Pay Theory defined data. Detailed information about the query object can be found [here](query).|

**Nested Queries**  
Payors can also be filtered by passing a query_list to the metadata.

This will only return Payors that have Metadata that match these queries.  Detailed information about the query list can be found [here](query).


**Returns**

```js
{
    "data": {
        "payors": {
            "items": [
                {
                    "payor_id": "pt_pay_XXXXX",
                },
                {
                    "payor_id": "pt_pay_XXXXX",
                },
                ...
            ],
                "total_row_count": 256
        }
    }
}
```

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|items              |[Payor]      |The list of payors that are returned from the query.|
|total_row_count    |Int          |The total number of payors that match the query. Used to help with pagination.|

***
## Create Payor
```graphql
mutation {
    createPayor(input: PayorInput!) {
        payor_id
        merchant_uid
        full_name
        address_line1
        address_line2
        country
        region
        city
        postal_code
        email
        phone
    }
}
```

**Parameters**

|Key                |type         |       description                     |
|-------------------|-------------|---------------------------------------|     
|input              |PayorInput   |The input object that contains the payor information to create a new payor.  Detailed information about the input object can be found [here](#the-payor-input-object).|

**Returns**  
This mutation returns the payor object that was created.

***
## The Payor Input Object
```graphql
{
    address_line1: String
    address_line2: String
    city: String
    country: String
    email: String
    full_name: String
    merchant_uid: String
    metadata: AWSJSON
    phone: String
    postal_code: String
    region: String
}
```

| Key           | type    | description                                                                                                                 |
|---------------|---------|-----------------------------------------------------------------------------------------------------------------------------|     
| address_line1 | String  | The first line of the address of the payor.                                                                                 |
| address_line2 | String  | The second line of the address of the payor.                                                                                |
| city          | String  | The city of the payor.                                                                                                      |
| country       | String  | The country of the payor.                                                                                                   |
| email         | String  | The email address of the payor.                                                                                             |
| full_name     | String  | The full name of the payor.                                                                                                 |
|  merchant_uid | String  | The Pay Theory unique identifier assigned to the merchant that the payor belongs to.                                        |
|  metadata     | AWSJSON | The metadata to attach to the payor.  This is a JSON object that can contain any data that you want to attach to the payor. |
|  phone        | String  | The phone number of the payor.                                                                                              |
|  postal_code  | String  | The postal code of the payor.                                                                                               |
|  region       | String  | The region of the payor.                                                                                                    |