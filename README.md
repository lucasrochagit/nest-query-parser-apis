<h1 style="text-align: center">Nest Query Parser APIs</h1>
<p style="text-align: center">APIs used to test the functioning of the nest-query-parser library.</p>

## Description

Here are the APIs developed with [NestJS](https://nestjs.com/) and that use
the [Nest Query Parser](https://www.npmjs.com/package/nest-query-parser) library for query string management. This
project contains the following applications:

- `api-with-mongodb`: API integrated with [MongoDB](https://www.mongodb.com/) which uses `@MongoQuery` to transform the
  request query into a query recognized by MongoDB
- `scripts`: Set of scripts used to populate the database, based on the database used in the developed APIs.

## 0. Before All

### 0.1 Configure the applications

Each application in the project has a `README.md` file containing step-by-step instructions on how to use the
application.

### 0.2 Populating the database.

Before running the application and testing the queries, it is useful to have data in the database.
For `api-with-mongodb`, run the `mongo.populate.js` script from the `scripts` folder to do this.

## 1. Usage

After entering data into the database for the tested application, you can test the effectiveness of the query strings.

### 1.1 api-with-mongodb

After start the `api-with-mongodb` application, open the browser or use the [Postman](https://www.postman.com/). Make
the follow request: `GET http://localhost:3000/users`. It should return a list with the first 100 users.

#### 1.1.1 Pagination

- `GET http://localhost:3000/users?limit=10` - Returns a list with the first 10 users.
- `GET http://localhost:3000/users?limit=10&skip=5` - Returns a list of 10 users, counting from the 5th user.
- `GET http://localhost:3000/users?limit=10&page=3` - Returns a list of 10 users, counting from the 20th user.

#### 1.1.2 Ordination

- `GET http://localhost:3000/users?sort=name` - Returns a list of 100 users, sorted by name in ascending order.
- `GET http://localhost:3000/users?sort=-age` - Returns a list of 100 users, sorted by age in descending order.
- `GET http://localhost:3000/users?sort=address.street` - Returns a list of 100 users, sorted by address street in
  ascending order.
- `GET http://localhost:3000/users?sort=-address.city` - Returns a list of 100 users, sorted by address city in
  descending order.

#### 1.1.3 Select

- `GET http://localhost:3000/users?select=name,age,gender` - Returns a list of 100 users, only with params: _
  id, name, age and gender.
- `GET http://localhost:3000/users?select=-_id,name,age,gender` - Returns a list of 100 users, only with params: name,
  age and gender.
- `GET http://localhost:3000/users?select=-_id,-created_at,-updated_at,-jobs,-current_job` - Returns a list of 100
  users, without params: id, created_at, updated_at, jobs and current_job.

#### 1.1.4 Filters

- `GET http://localhost:3000/users?age=28` - Returns a list of 100 users or fewer, where field `age` is equals to `28`.
- `http://localhost:3000/users?age=ne:28` - Returns a list of 100 users or fewer, where field `age` is not equals
  to `28`.
- `GET http://localhost:3000/users?address.city=Charleston` - Returns a list of 100 users or fewer, where field `city`
  from `address` field is equals to `Charleston`.
- `GET http://localhost:3000/users?name=*A` - Returns a list of 100 users or fewer, where field `name` starts with `A`.
- `GET http://localhost:3000/users?email=google.com*` - Returns a list of 100 users or fewer, where field `email` ends
  with `google.com`.
- `GET http://localhost:3000/users?address.street=*park*` - Returns a list of 100 users or fewer, where field `street`
  from `address` field contains `park`.
- `GET http://localhost:3000/users?gender=eq:Gender%20Fluid` - Returns a list of 100 users or fewer, where
  field `gender ` is `equal` to `Gender Fluid` (equivalent to query `?gender=eq:Gender%20Fluid`)
- `GET http://localhost:3000/users?age=gt:30` - Returns a list of 100 users or fewer, where field `age`
  is `greather than 30`.
- `GET http://localhost:3000/users?age=gte:30` - Returns a list of 100 users or fewer, where field `age`
  is `greather than or equal to 30`.
- `GET http://localhost:3000/users?age=lt:30` - Returns a list of 100 users or fewer, where field `age`
  is `less than 30`.
- `GET http://localhost:3000/users?age=lte:30` - Returns a list of 100 users or fewer, where field `age`
  is `less than or equal to 30`.
- `GET http://localhost:3000/users?skills=in:Architecture` - Returns a list of 100 users or fewer, where field `skills`
  contains `Architecture`.
- `GET http://localhost:3000/users?skills=nin:Architecture` - Returns a list of 100 users or fewer, where field `skills`
  not contains `Architecture`.
- `GET http://localhost:3000/users?current_job=exists:true` - Returns a list of 100 users or fewer that contains the
  field `current_job`.
- `GET http://localhost:3000/users?hobbies=exists:false` - Returns a list of 100 users or fewer that not contains the
  field `hobbies`.
- `GET http://localhost:3000/users?skills=type:array` - Returns a list of 100 users or fewer that field `skills` is an
  `Array`.
- `GET http://localhost:3000/users?age=gt:30&age=lt:50` - Returns a list of 100 user or fewer, where field `age`
  is `greather than 30` and is `less than 50`.
- `GE Thttp://localhost:3000/users?age=30,50` - Returns a list of 100 user or fewer, where field `age`
  is `equals to 30` or is `equals to 50`.
-

#### 1.1.5 Populate

- `GET http://localhost:3000/users?populate=current_job` - Returns a list of 100 users, with param `current_job`
  populated.
- `GET http://localhost:3000/users?populate=current_job;-_id,title,salary` - Returns a list of 100 users, with
  param `current_job` populated, only the `title` and `salary` fields.
- `GET http://localhost:3000/users?populate=current_job&populate=jobs` - Returns a list of 100 users, with
  param `current_job` and `jobs` both populated.
- `GET http://localhost:3000/users?populate=jobs;-_id,title,salary;salary=lte:4000` - Returns a list of 100 users with
  the `jobs` parameter populated, only the `title` and `salary` fields, and only `jobs` whose `salary`
  is `less than or equal to 4000`. 






