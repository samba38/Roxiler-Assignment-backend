This is the backend service for the **Store Ratings Web Application**, built as part of the **Roxiler FullStack Intern Coding Challenge**.

---

## Tech Stack

- Node.js
- Express.js
- SQLite
- JWT Authentication
- bcryptjs

---

## Features

- User authentication (JWT-based)
- Role-based access (Admin, User, Store Owner)
- Store management
- Ratings management
- Secure password hashing

---

## Database

- SQLite database
- Tables:
  - Users
  - Stores
  - Ratings

---

## API Base URL
### Local
http://localhost:5000/api


### Deployed (Render)
https://roxiler-assignment-backend-47dg.onrender.com/api


---

## Running Backend Locally

```bash
npm install
npm start
Server will run on:

http://localhost:5000
Authentication
JWT tokens are issued on login

Token must be sent in Authorization header as:

Authorization: Bearer <token>

Environment Variables
Create a .env file:
PORT=5000
JWT_SECRET=your_secret_key

Notes
Average ratings are calculated dynamically

Empty values are expected until stores and ratings are added

Backend does not store UI-related logic