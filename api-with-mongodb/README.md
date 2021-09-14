<h1 style="text-align: center">API With MongoDB </h1>
<p style="text-align: center">
    API developed with <a href="https://github.com/nestjs/nest">Nest</a> framework integrated with 
    <a href="https://mongodb.com">MongoDB</a> and used to test the   
    <a href="https://npmjs.com/package/nest-query-parser>nest-query-parser">nest-query-parser</a> library.
</p>

## Installation

```bash
$ npm install
```

## Configuration

Create a copy from file `.env.example` named `.env` in project root and fill the environment variables with your own
configurations.

Example of `.env` configuration:

```
# DATABASE_URL
# description: full url from database
# example: mongodb://<user>:<pwd>@<host>:<port>/database
DATABASE_URL=mongodb://<user>:<pwd>@<host>:<port>/<database>

# ENV
# description: application environment 
# example: dev, test, prod 
ENV=dev
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Stay in touch

- Author - [Lucas Rocha](https://www.linkedin.com/in/lucasrochacc/)

## License

Application is [MIT licensed](LICENSE).
