# GlobInv | Product Management System
GlobInv is a product management system which manages different categories of products along with stock-tracking, filtering and billings. A REST API driven system built on `node js` with `OpenAPI swagger` [documentation](#quick-start).
## Overview 

- [Solution Framing](#solution-framing)
- [System Features](#system-features)
- [Quick Start(OpenAPI Specs)](#quick-start)
- [Resources](#resources)
- [Client SDK](#client-sdk)

## Solution Framing
### The Problems a must read:
  1. `Problem 1`: **How can we manage different categories of product?**<br/>
    `Scenario`: Suppose we have two categories as ``Men's Shirts `` and ``Men's Shoes``, any product under these categories will have some properties say ``material``, ``size``, ``type``, ``color``, etc. Moreover, these properties will vary with category say for example in Men's Shirts category will have material like Cotton, Denim, Silk, etc. whereas in the case of Men's Shoes will have material as Canvas, Leather, Rubber, etc. Similarly, other properties will vary with the category.
  2. `Problem 2` : **Managing consistency among the products**<br/>
    `Scenario`: Suppose we have two products under Men's shirts of different brands. The size of these products labeled as "2XL" and "XXL".  As we can see the significance is the same, but the problem is consistency.
  3. `Problem 3` : Grouping Categories
### Solution for the above problems: Step-By-Step
  1. `Solution Iteration-1`: According to `Problem-1` it can inferred that different category will have different properites. Let's call these properties as `Category-specfic` properites. To incorporate these properties we introduce `productProps` under category schema.  Thus schema of category will look like:
  ```javascript
category = {
  ...otherProps
   productProps: [...listOfProperties ]
}
```
 2. `Solution Iteration-2`: From `Problem-2 Consistency Problem`. The solution will be to pre-define some set of values for each property and `enforce` the products of this category to have these as attributes as property and the value of the attribute will be from the set of pre-defined values(thus acting as options to choose). Incorporating  this in the category schema: 
 ```javascript
category = {
  ...otherProps
   productProps: [ { 
                    key: prop1 , //Example: material
                    values: [...listOfPreDefinedValues] // ["Cotton","Denim","Silk"] 
                   },{ 
                    key: prop2 ,  //Example: standardSize
                    values: [...listOfPreDefinedValues] // ["2XL", "XL", "L", "M","S"]
                   },{
                    key: prop3  
                    values: null //Allowing Custom value
                   }
                 ]
    }
```
 3. `Solution Iteration-3`: Using `Hierarchical approach` allowing a category to have multiple child categories. Incorporating this in the category schema as ``parentCategory``. For parent category ``parentCategory`` is ``null``.
 
  ```javascript
category = {
  ...otherProps
   parentCategory: categoryId // null in case of parent category
   productProps: [ { 
                    key: prop1, 
                    values: [...listOfPreDefinedValues] 
                   },{ 
                    key: prop2, 
                    values: [...listOfPreDefinedValues] 
                   },{
                    key: prop3
                    values: null //Allowing Custom value
                   }]
    }
```
## System Features

**Note** : Here managing means ``CRUD`` operations, filtering via ``Query paramaeters`` in context to Rest API documentation.

+  A system that can manage ``Different`` types of products. 
+ ``Hierarchical`` based categorical grouping.
+ ``Category-filter`` to ease the search of products.
+  Managing different ``Brands``.
+  Managing different ``Suppliers``.
+  Tracking Products through ``Reorder Points `` and generating pre-order notification for out-of-stocks products.
+  Complete ``Billing`` facility, Invoice generation with detailed ``Price Break Down`` [Discounts, tax(GST)].
+  Managing ``Offers`` of different products.
+  Managing different Tax slabs as per ``GST taxation`` of  ``India``.

## Quick Start
### OpenAPI Swagger Specification: [click here](https://app.swaggerhub.com/apis-docs/S3649/Product-Management-System/1.0.0)

## Resources
The resources for the system are: 
  - [Categories](#categories)
  - [Products](#products)
  - [Brands](#brands)
  - [Suppliers](#suppliers)
  - [ReorderPoints](#reorderpoints)
  - [Invoices](#invoices)
  - [Offers](#offers)
  - [GSTSlabs](#gstslabs)
  - [Users](#users)
  - [Images](#images)

### Descriptions
### Categories
  **Description**: A way of grouping similar products. <br/>
  **Schema**:         `*`: required
   |Attribute| type | Description |
   |---------|------| ----------- |
   | categoryId* | ``string``<br/> ``pattern``: *'^[A-Z]{3}[1-9][0-9]{3}$*'| Unique Identifier |
   | name* | ``string``| Name of the category |
   | gstSlabId* | ``string``<br/> ``pattern``: *'^GST[0-9]{2}$*'| tax category Id defined in GSTSlabs|
   | parentCategory* | ``string``<br/> ``pattern``: *'^[A-Z]{3}[1-9][0-9]{3}$*'<br/> `nullable`: ``true`` | #id of parent category (Hierarchical grouping). Refer [Solution Framing](#solution-framing)|
   | productProps | ``array`` <br/> items: type: ``object `` <br/> ``{ key: 'prop1', values: [...listOfPreDefinedValues ] }`` |  It represent ``category-specific`` property which helps in managing different type of products. Refer [Solution Framing](#solution-framing) |
   
**Note**: Check [Examples]() for example schemas. 
   
 ### Products
  **Description**: items in the system. <br/>
  **Schema**:   `*`:required
   |Attribute| type | Description |
   |---------|------| ----------- |
   |productSKU* | `string` | ``SKU``: stock keeping unit as unique identifer|
   | name* | `string` | name of the product |
   | categoryId* | ``string``<br/> ``pattern``: *'^[A-Z]{3}[1-9][0-9]{3}$*' | Category the product belonging to |
   | keywords |``array`` <br/> items: ``string`` | Keywords related to product, facilitate search by keywords|
   | brandId* | ``string``<br/> ``pattern``: *'^[A-Z]{2}[0-9]{3}$*'| Brand of product |
   | price* | ``number`` <br/> minimum: 0 | Baseprice of product |
   | imageURIs | ``array`` <br/> items: ``string($uri)`` | Images as URIs of product |
   | stock* | ``integer32`` <br/> minimum: 0 | Total quantity of product in the inventory | 
   | availability* | type: string <br/> ``enum``: ``[online, offline, both]`` | Availability for the sale |
   | ratings* | ``number`` <br/> minimum: 0 | Cumulative rating of product |
   | prop1* | ``string`` | ``category-specific`` property declared in Category defination as ``key`` in ``productProps``. Its value will, be from the pre-defined ``values`` in ``productProps``. ``Example: material: "Denim" ``. Refer [Solution Framing](#solution-framing) for Logic description of using this.|
   | prop2* | ``string`` | ``category-specific`` property declared in Category defination as ``key`` in ``productProps``. Its value will, be from the pre-defined ``values`` in ``productProps``. ``Example: standardSize: "XL" ``. Refer [Solution Framing](#solution-framing) for Logic description of using this.|
   |lastUpdated* | `date-time`| Date-time when the stock was last updated. |
   | additionalProp1 | `string` | A ``product-specific`` property.|
   | additionalProp2 | `string` | A ``product-specific`` property.|
  
  **Note**: Check [Examples]() for example schemas. 
    
  ### Brands
  **Description**: Companies manufacturing products. <br/>
  **Schema**:   `*`:required
 |Attribute| type | Description |
 |---------|------| ----------- |
 | brandId* | ``string``<br/> ``pattern``: *'^[A-Z]{2}[0-9]{3}$*' | Unique Identifier |
 | name* | ``string``| Company name |
 | website | ``string($uri)`` | Website of company. | 
 | email* | ``string($email)`` | Support email from the company. |

 ### Suppliers
  **Description**: Vendors supplying the products. <br/>
  **Schema**:   `*`:required
 |Attribute| type | Description |
 |---------|------| ----------- |
 | supplierId* | ``string``<br/> ``pattern``: *'^[A-Z]{2}[0-9]{3}$*' | Unique Identifier |
 | name* | ``string``| Supplier name |
 | address | ``string($uri)`` | address of supplier. | 
 | email* | ``string($email)`` | Support email from the supplier. |
 
### ReorderPoints
  **Description**: It is a minimum quantity of an item which a firm holds in stock. Used for pre-notifications to replenish the stocks <br/>
  **Schema**:   `*`:required
  |Attribute| type | Description |
  |---------|------| ----------- |
  |productSKU |`string`| Product SKU |
  |minStockQty| `integer32` <br/> minimum: 5| Minimum quantity of an item.|

### PriceBreakDown
  **Description**: Deriving selling price from base price. <br/>
  **Schema**: ``*``:required
  |Attribute| type | Description |
  |---------|------| ----------- |
  |productSKU| ``string``| Product SKU |
  | quantity | `integer` <br/> minimum: 1 | Quantity of product | 
  | basePrice | `number` <br/> minimum: 0 | Baseprice of product |
  | dicount | `number` <br/> minimum: 0 | Discount amount after applying offer present for the product |
  | sellingPrice | `number` <br/> minimum 0 | Selling Price of product [tax free] |
  | taxrate | `number` <br/> minimum 0 | Tax Rate as per the GST slab of product category|
  | price | `number` <br/> minimum 0 | Final price of the product |
  
### Invoices
  **Description**: A bill statement describing price break down of each product. <br/>
  **Schema**: ``*``:required
  |Attribute| type | Description |
  |---------|------| ----------- |
  | id*  | `string`  <br/> `pattern`: '^\d{4}-\d{4}-\d{4}$' | Unique Identifier | 
  | date* | `string($date)` | Date of Invoicing | 
  | buyerName* | `string` | Name of buyer |
  | items* | `array` <br/> items: `PriceBreakDown` | Price break down of each product |
  | total* | `number` <br/> minimum: 0 |  Total amout payable |
  
### Offers
  **Description**: An offer for a product <br/>
  **Schema**: ``*``: required
  |Attribute| type | Description |
  |---------|------| ----------- |
  | productSKU* | `string` | Product SKU |
  | discountRate* | `number` <br/> minimum: 0 <br/> maximum: 100 | Rate of discount | 
  | name* | `string` | Name of offer Example: "Winter Sale" |
  | expiry* | `string($date)` | Expiry date of offer |
### GSTSlabs:
  **Description**: Different Tax Slabs as per `GST India`<br/>
  **Schema**: ``*``: required
  |Attribute| type | Description |
  |---------|------| ----------- |
  | gstSlabId* | `string` <br/> `pattern`: '^GST[0-9]{2}$'  | Unique Identifier |
  | name* | `string` | Name of tax slab Example: "Clothing" |
  | rate* | `number` <br/> minimum: 0 <br/> maximum: 50 | Rate of discount |
  
 ### Users
  **Description**: Users using the system. <br/>
  **Schema**: ``*``: required
  |Attribute| type | Description |
  |---------|------| ----------- |
  | id | `string($uuid)`  | Unique Identifier generated by the system|
  | name* | `string` | Name of the user |
  | username* | `string($email)` | Username of the user |
  | password* | `string` | Password encrypted format |
  | userType* | `string` <br/> `enum : ['admin','manager'] `| UserType of the user
  
 ### Images
  **Description**: Schema used for uploading multiple images and getting URIs. <br/>
  **Schema**: ``*``: required
  |Attribute| type | Description |
  |---------|------| ----------- |
  | images  | ``array`` <br/> Items: `BLOB($jpeg,$png) ` | Array of images|
 
 ----
## Client SDK 
  For detailed description of ``endpoints `` refer Open-API swagger [documentation](https://app.swaggerhub.com/apis-docs/S3649/Product-Management-System/1.0.0)

### Content in context to GlobInv
- [Authentication](#authentication)
- [HTTP verbs](#http-verbs)
- [Permissions](#permissions)
- [Generic Success Response](#generic-success-response) 
- [Generic Error Response](#generic-error-response)
- [Query Parameters](#parameters)
  + [Filters](#filters) 
  + [Pagination](#pagination)
  + [Action](#action)
- [Caching](#caching)
- [Cross origin resource sharing](#cross-origin-resource-sharing)

### Authentication
In ``GlobInv`` the authetication scheme used is ``Bearer authentication`` also called as **token authentication**. It involves security tokens called bearer tokens. The name **Bearer authentication** can be understood as *give access to the bearer of this token.* The bearer token is a cryptic string, usually ``JWT``(JSON web tokens) . The client must send this token in the Authorization header when making requests to protected resources.

```Bash
    Authorization: Bearer <token>
```
Sending token in ``header``:

```bash
  curl -H "Authorization: Bearer <token> "  BASE_URL
```
In `GlobInv` there are two types of user as ``manager`` and ``admin``.  The admin can `create` users as `manager`. In order to get `Auth token` one need to make `POST` request on `/auth` endpoint with username and password as credential.

**Token Request**
```bash
  curl -d '{"username":"USERNAME", "password":"PASSWORD"}' -H "Content-Type: application/json" -X POST BASE_URL/auth
```
**Responses**: 
1. Success `Status Code`: **200**, `Content` : **application/json**
```javascript
  {
"token":"eyJhbGciOiJIUzI1NiIsInR5CI6IkpXVeyJ1c2VybmFtZSI6InJvb3QxMDExMTIiLCJuYW1lIjoic2hhc2h3YXQxIiwidXNlclR5cGUiOiJTdHVkZW50IiwiX2lkIjoiNWU1Nzg1YTk3YzU0N2QzODE4ODRlNmJiIiwiaWF0IjoxNTgyNzk4MDQyLCJleHAiOjE1ODI4MDUyNDJ9._NUZC5K4tqzgmCiVcEcR0xeKDzX8mEKOwPq-7KBsZvM"
  }
```
2. Authentication Faliure  `Status Code`: **401**,  `Content` : **application/json**
```javascript
{
  "status": {
    "errorType": "Invalid Credentials",
    "errors": [
      "username or password invalid"
    ]
  }
```

### HTTP Verbs
Where possible, ``GlobInv`` API  strives to use appropriate HTTP verbs for each action.

| Verb | Description |
|-------|------------|
| `GET` | Used for retrieving resources. |
| `POST` | Used for creating resources. |
| `PATCH` | Used for updating resources with partial JSON data. For instance, a product resource has name, price to update. A PATCH request may accept one or more of the attributes to update the resource. |
| `PUT` | Used for replacing resources or collections.|
| `DELETE`| Used for deleting resources.|

#### HTTP Status Codes
Status codes in responses from GlobInv API

| Status Code | Description | 
|------------| ------------|
|`200`| Successful operation | 
|`201`| Successful resource creation | 
|`204`| Successful operation, No Content |
|`400`| Validation Error | 
|`401`| Unauthorized Error|
|`404`| Not Found | 
|`500`| Internal Server Errorr |

### Permissions
In GlobInv, The requests which changes or update the state of resource like ``POST``,``PUT``,``PATCH``,``DELETE`` will **seek authorization**.
Except for the ``User`` resource, The access is only to ``admin``. 

### Generic Success Response
The success response of the APIs with status code ``200``, ``201`` have common ``generic`` schema.
`` SuccessResponse``
```javascript
{
status: string
message: string
}
```
#### Extending Generic Response: `` GenericResponseWithLinks ``
The success response for the `POST` and `PUT` requests. Providing links will help in easy identification of relation between the resources. ``HATEOAS``.

```javascript
{
status: string
message: string
href: string($uri)
}
```

### Generic Error Response
The error response with ``400``, ``401`` and ``404`` status codes  have common ``generic`` schema.

```javascript
{
errorType: string //Example: "Validation Error" "Invalid Credentials" etc.
errors: [ "error message 1", "error message 2" ]
}
```
### Parameters
  
#### Filters
 The resources in GlobInv supports filtering via **query parameters**.

##### Product Filters 
 `Usecase`: There can be many filtering parameters for `product` resource like **keyword**, **price range**, **availability**, **time of arrival** ,**category-specific** or **product-specific** properties as material, type, size, color etc. 
 
 Applying Different filters
  
 | Filter Description | Query Type | Endpoint | Usecase |
 | --------------------------------------|-------|-------|-------|
 | keywords|  `array` |``/products?keywords=keyword1,keyword2``| ``/products?keywords=modern%20wears,smart%20casual%20wear``| 
 |category-specific property| `array` |``/product?prop1=value1,value2``|``/products?material=Cotton,Silk``|
 |product-specific property | `string`|``/product?prop1=value1`` | - |
   
 Filtering Products by multiple parameters **[Complex Object serialization]** 
  
  `parameter`: *Query*
  
  `type`: `object` [parameter object serialization]
  
  `endpoint`: ``/products?filter=SERIALIZED_OBJECT``
  
  `usecase`:
   
 ```javascript
    filter =   {
      "keywords": [
        "modern wears",
        "smart casual wear"
    ],
      "priceRange": { 
        "low": 300,
        "high": 600
    },
      "availability": "online",
      "prop1": [ //Category-Specific filter 
        "Cotton",
        "Denim"
    ],
      "arrival": { // Example: New Arrival Products
        "priorDate": "2019-03-12T09:12:28Z", 
        "laterDate": "2019-03-14T09:12:28Z"
    }
  }
```
  #### Invoice Filtering [Date and Relative Date filtering]
 | Filter Description | Query Type | Endpoint | Usecase |
 | --------------------------------------|-------|-------|-------|
 | Relative Date  |  `string` |``/invoices?rdate=today``| ``/invoices?rdate=today``| 
 |start_date and end_date | `string` |``/invoices?start_date=d1&end_date=d2``|``/invoices?start_date=2020-03-12&end_date=2020-03-15``| 
  
 #### Pagination
 Sometimes, there'll be a lot of results to return via an API . For that reason, we paginate the results to make sure responses are easier to handle. Pagination is done using the query parameter.
 
 **Pagination Parameters**
 
 `page`: Page number to fetch. type: `integer32`. minimum: 1
 
 `limit`: Number of documents per page. type: `integer32`, minimum: 1, default: 20

 #### Action 
  Here,  **Query parameters** can also be used as action triggerer. In ``GlobInv`` `Categories` and `ReorderPoints` use these action triggerer.
  
  1. **Categories**
  
  **Action**: To fetch all the `sub-categories` of a category.
 
  `Endpoint`: **`GET`** /categories/{categoryId}
  
  `parameter`:  subCategories , `type`: boolean
  
  **Response subCategories=true**
  ```javascript
  {
  "id": "INV1200",
  "name": "Men's Fashion",
  "gstSlabId": "GST01",
  "parentCategory": null,
  "productProps": [],
  "subCategories": [
    {
      "id": "INV1201",
      "name": "Men's Shirts"
    },
    {
      "id": "INV1202",
      "name": "Men's Shoes"
    },
    {
      "id": "INV1203",
      "name": "Men's Pants"
    }
  ]
}
  ```
  
  2. **ReorderPoints**
  
  **Action**: To fetch all the product which need stock replenishment, i.e. their stock number is less than threshold.
 
  `Endpoint`: **`GET`** /reorderPoints
  
  `parameter`:  replenish , `type`: boolean
  
    
 ### Caching 
 
 Caching is a commonly used technique to improve the performance of any application. Specifically using server side caching technique which is responding to the same content for the same request independently of the client’s request. 
 
 ### Cross origin resource sharing
 
The API supports Cross Origin Resource Sharing (CORS) for AJAX requests from any origin.

```bash
curl -i BASE_URL -H "Origin: http://anysite.com/api" -X OPTIONS
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-GitHub-OTP, X-Requested-With
Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE
Access-Control-Max-Age: 86400
```
------

  
 
  
   
  

 
 
 
   
   
    
   
  



 
