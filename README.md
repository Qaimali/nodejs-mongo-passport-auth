# nodejs-mongo-passport-auth

Boilerplate for authentication using node.js , mongo & passport course.

## Setup

Install mongodb
Run `mongod`
Run `npm install`
Run `node app.js`

## Available routes and how it works

`/auth/signup` - it accepts email and password. Once it's been verified that there's no user with the given email in the database, the email and hashed password is save in the database and

`/auth/login` - it accepts email and password. It checks if the email and password are ok and a JWT token is sent back to the user

`/user/profile` - in order to access the route you have to include the JWT token in the `authorization` header in the request.
# highOnTour-backend
