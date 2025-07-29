# Node.js Authentication API

This project is a simple authentication system built with Node.js, Express, and MongoDB. It provides user registration and login functionality with session management using cookies.

## Features
- User Signup (Registration)
- User Login
- Session management with cookies
- MongoDB integration for user data
- Simple frontend for signup and login

## Project Structure
```
auth.js            # Authentication logic
authRouter.js      # Express router for auth endpoints
server.js          # Main server entry point
package.json       # Server dependencies
request.rest       # REST client requests for testing
config/
  mongo.js         # MongoDB connection setup
middleware/
  userauth.js      # Middleware for user authentication
model/
  usermodel.js     # Mongoose user schema/model
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- MongoDB (local or cloud instance)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/riyaziya34/auth-api-backend.git
   cd auth-api-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your MongoDB connection string in `config/mongo.js` (or use an environment variable if supported).
4. Start the server:
   ```sh
   node server.js
   ```
5. The frontend (login/signup pages) is not included in this repository. You can use API endpoints with your own frontend or API client (like Postman).

## API Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login with email and password


## License
This project is licensed under the MIT License.
