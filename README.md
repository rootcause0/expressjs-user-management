![npm](https://img.shields.io/badge/npm-8.1.2-green)
# expressjs-user-session

A demonstration that shows Express.js Session Management.
It creates a user record in DB using Bcrypt hashing for the user password to store it in DB.
Afterwards,you can login to your created User Account and create a fresh session.Then it is possible to logout for the purpose of destroying the session.


## Installation

Clone the repository as you would do it usually

Install all the npm packages

```npm
npm i
```
Now,configure your environment.
```npm
cp env.example .env
```
For the Bcrypt Salt you may run
```npm
npm run generate-salt --silent
```
That's it! You should good to go
## Usage
Only resource available for API is users and the routes for this resource stored in /routes/users.js 
```php
/routes/users.js

POST /users/register --> create new user (userName,password)

POST /users/login --> login to your created account and thus create a session (userName,password)

POST /users/logout --> destroy the current session if it exists

```

## License
[MIT](https://choosealicense.com/licenses/mit/)
