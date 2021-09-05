<h1 style="text-align: center">Nest Query Parser APIs</h1>
<p style="text-align: center">APIs used to test the functioning of the nest-query-parser library.</p>

## Description

Here are the APIs developed with [NestJS](https://nestjs.com/) and that use
the [Nest Query Parser](https://www.npmjs.com/package/nest-query-parser) library for query string management. This
project contains the following applications:

- `api-with-mongodb`: API integrated with [MongoDB](https://www.mongodb.com/) which uses `@MongoQuery` to transform the
  request query into a query recognized by MongoDB
- `scripts`: Set of scripts used to populate the database, based on the database used in the developed APIs.

## Before All

### Configure the applications

Each application in the project has a `README.md` file containing step-by-step instructions on how to use the
application.

### Populating the database.

Before running the application and testing the queries, it is useful to have data in the database.
For `api-with-mongodb`, run the `mongo.populate.js` script from the `scripts` folder to do this.

## Usage

After entering data into the database for the tested application, you can test the effectiveness of the query strings.

### api-with-mongodb 

After start the `api-with-mongodb` application, open the browser or use the [Postman]()


#### - Pagination 

#### - Ordination 

#### - Select

#### - Filters

