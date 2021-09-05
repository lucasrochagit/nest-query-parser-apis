<h1 style="text-align: center">Scripts</h1>
<p style="text-align: center">Scripts that can be useful when running the API and testing queries.</p>

## Installation

```bash
$ npm install
```

## Configuration

Create a copy from file `.env.example` named `.env` in project root and fill the environment variables with your own
configurations. Remember

Example of `.env` configuration:

```
# MONGODB_DATABASE_URL
# description: url from mongodb database server
# example: mongodb://<user>:<pwd>@<host>:<port> 
MONGODB_DATABASE_URL=mongodb://localhost:27017

# MONGODB_DATABASE_URL
# description: name of mongodb application database
# example: api-with-mongodb
MONGODB_DATABASE_URL=api-with-mongodb
```

## Running the scripts

### MongoDB - Populate Database

```bash
node mongo.populate.js
```

