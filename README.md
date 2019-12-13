# Nest.js Auth Sample

A starter library for authentication using email/password to sign in and JWT for API access. Based on the example from the [NestJS Authentication docs](https://docs.nestjs.com/techniques/authentication). [Repo](https://github.com/nestjs/nest/tree/master/sample/19-auth-jwt).

**Note that you should not use this in production as is**. At the very least you should:
 - switch to https
 - change the JWT signing algorithm to use certificates (RS256) 

## Quick Start

```bash
git clone git@github.com:nowzoo/nest-js-auth-starter.git
cd nest-js-auth-starter
npm i
```

### Set up the database

Take a look at the database setup in [src/database/database.providers.ts](https://github.com/nowzoo/nest-js-auth-starter/blob/master/src/database/database.providers.ts). The library is set up top use a MySQL/MariaDb database named `nest_auth_demo` with the root user and no password. At a minimum, you need to create the database:

```bash
mysql -uroot
CREATE DATABASE nest_auth_demo;
```

### Start the server

```bash
npm run start:dev
```


## Endpoints 

Note that out of the box the app runs on port `3001` (not `3000`).

### Sign Up

`POST /auth/sign-up`  

Sign up a new user. Provide `name`, `email` and `password` as JSON.

```bash
curl -X POST http://localhost:3001/auth/sign-up -d '{"name": "Foo Bar", "email": "foo@bar.com", "password": "changeme"}' -H "Content-Type: application/json" 
```
This returns the access token on success:
```json
{"access_token":"..."}
```

If the user already exists by email address you'll get an `auth/account-exists` error...

```json
{"statusCode":400,"error":"Bad Request","message":"auth/account-exists"}
```

### Sign In

`POST /auth/sign-in`  

Sign in with an existing user's email and password. Provide `email` and `password` as JSON.

```bash
curl -X POST http://localhost:3001/auth/sign-in -d '{"email": "foo@bar.com", "password": "changeme"}' -H "Content-Type: application/json" 
```

This returns the access token on success:

```json
{"access_token":"..."}
```



If the user does not exist by email you'll get an `auth/account-not-found` error.
```bash
curl -X POST http://localhost:3001/auth/sign-in -d '{"email": "notauser@bar.com", "password": "changeme"}' -H "Content-Type: application/json" 
```

```json
{"statusCode":400,"error":"Bad Request","message":"auth/account-not-found"}
```

If the wrong password is supplied you'll get an `auth/wrong-password` error.

```bash
curl -X POST http://localhost:3001/auth/sign-in -d '{"email": "foo@bar.com", "password": "wrong"}' -H "Content-Type: application/json" 
```
```json 
{"statusCode":400,"error":"Bad Request","message":"auth/wrong-password"}
```



### Profile 

`GET /profile` 

An api route protected by a JWT. Provide the token (fetched from one of the other two endpoints) in the request header.

```bash
# Note the token is truncated below.
curl http://localhost:3001/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI..."
```

Result:

```json
{"id":2,"email":"foo@bar.com","name":"Foo Bar"}
```

A bad or missing token will result in:

```json
{"statusCode":401,"error":"Unauthorized"}
```





