
# E-Commerce APIs - hybrid Assignment

REST API for an e-commerce marketplace




## Tech Stack

**Server:** Node, Express

**Database:** mySQL

**Language:** Javascript



## Run Locally

Clone the project and run on localhost:4000

```bash
  git clone https://github.com/fazenecture/hybrid-e-commerce-apis
```

Go to the project directory

```bash
  cd hybrid-e-commerce-apis
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_HOST`

`DB_USER`

`DB_PASSWORD`

`DB_NAME`

`DB_PORT`

`PORT`

`TOKEN_KEY`



## API Reference

#### Register User

```
  POST /api/auth/register
```
##### Sample Payload:
```
{
    "emailId": "random@gmail.com",
    "fullName": "Test Seller",
    "password": "RandomPassword",
    "type": "seller"
}
```
### 

#### Login User

```
  POST /api/auth/login
```
| Parameter        | Type     | Description                |
| :--------------  | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your API key |

##### Sample Payload:
```
{
    "emailId": "random@gmail.com",
    "password": "RandomPassword"
}
```

### 

#### Create Catalog

```
  POST /api/seller/create-catalog
```
| Parameter        | Type     | Description                |
| :--------------  | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your API key |

##### Sample Payload:
```
{
    "catalogName": "New Catalog",
    "sellerId": "vivekkkumar1657878499279",
    "catalog": [
        {
            "productName": "randoams Larges Product",
            "productPrice": "54532"
        },
        {
            "productName": "lOrem Product",
            "productPrice": "232545"
        }
    ]
}
```
### 

#### Add Product

```
  POST /api/seller/add-product
```
| Parameter        | Type     | Description                |
| :--------------  | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your API key |

##### Sample Payload:
```
{
    "productName": "Lorem Larges Product",
    "productPrice": "432",
    "catalogId": "10"
}
```

### 

#### Add To Cart

```
  POST /api/buyer/add-to-cart
```
| Parameter        | Type     | Description                |
| :--------------  | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your API key |

##### Sample Payload:
```
{
    "productId": "5",
    "buyerId": "newuser1657875690833",
    "sellerId": "vivekkkr1657878516423"
}
```
### 

#### Create Order

```
  POST /api/buyer/create-order/:sellerId
```
| Parameter        | Type     | Description                |
| :--------------  | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your API key |
| `sellerId` | `string` | **Required**. Seller Id |

##### Sample Payload:
```
{
    "buyerId": "newuser1657875690833"
}
```

### 

#### Get Sellers List

```
  GET /api/buyer/list-of-sellers
```
| Parameter        | Type     | Description                |
| :--------------  | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your API key |


### 
#### Get Orders

```
  GET /api/seller/orders?sellerId=sellerId
```
| Parameter        | Type     | Description                |
| :--------------  | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your API key |

| Query        | Type     | Description                |
| :--------------  | :------- | :------------------------- |
| `sellerId` | `string`  | **Required**. Seller Id |


### 

#### Get Seller Catalog

```
  GET /api/buyer/seller-catalog/:sellerId
```
| Parameter        | Type     | Description                |
| :--------------  | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your API key |
| `sellerId` | `string` | **Required**. Seller Id |



