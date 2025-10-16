# Simple Restify API with Node.js and Oracle Database

This project demonstrates how to build a simple REST API using **Restify** with an **Oracle Database** backend.  
It includes environment configuration, database connection setup, and API server creation.

---

## Features

- Lightweight REST server built using Restify.
- Oracle Database connection with `oracledb` module.
- Environment-based configuration.
- JWT authentication-ready structure.
- Modular and extendable codebase.

---

## Environment Setup

Before running the application, create an `.env` file in your project root directory with the following configuration:

```
PORT=3000
ENVIRONMENT=production
HOST_NAME=http://127.0.0.1:3000
NUMROWS=10   # Number of rows to display per page
```

---

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ramanindia/restifyapinodejwithoracle.git
   cd restifyapinodejwithoracle
   ```

2. Install required dependencies:
   ```
   npm i
   ```

3. Create and configure your Oracle database connection in `config/database.js`:
   ```
   module.exports = {
     username: 'your_username',
     dbpassword: 'your_password',
     connectionString: 'your_oracle_db_ip_or_host',
     jwtScret: 'your_jwt_secret'
   };
   ```

---

## Running the Server

Start the API server using Node.js:

```
node server.js
```

Once started, you can access the application at:

http://127.0.0.1:3000
