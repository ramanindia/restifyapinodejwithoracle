# Simple Restify API with Node.js and Oracle Database

A simple Node.js REST API using the Restify module configured with an Oracle database involves setting up a Restify server, connecting to the Oracle database with proper credentials, and defining endpoints for API operations. The database config file should export the connection details like username, password, connection string (IP address or host), and JWT token secret, for example:

## Setup

#ENV file setup 
PORT = 3000
environment =production
HOST_NAME= http://127.0.0.1:3000
NUMROWS = 10 hhow many rows display on page

1. Install dependencies:
  npm i
2. Configure your database connection in `config/database.js`:

module.exports = {
username: 'your_username',
dbpassword: 'your_password',
connectionString: 'your_oracle_db_ip_or_host',
jwtScret: 'your_jwt_secret'
};

4. Run your server:
node server.js
5. you can access your application by this url 
http://127.0.0.1:3000
