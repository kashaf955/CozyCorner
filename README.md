# CozyCorner

E-commerce backend API built with Node.js, Express, and MongoDB.

Progress so far covers the first part of the course (~4 of 16 hours): authentication, product CRUD, admin user management, and a clean MVC structure.

## Features

- JWT authentication (register, login, logout) with HTTP-only cookies
- Password reset via email (Nodemailer + Gmail App Password)
- Update password and profile
- Auth middleware protecting private routes
- Role-based access control (`user` / `admin`)
- Product CRUD with search/filter support and reviews
- Admin user management (list, get, update role, delete)
- Centralized error handling
- Secrets stored in environment variables

## Tech Stack

- Node.js / Express
- MongoDB / Mongoose
- JWT / bcryptjs
- Nodemailer
- dotenv / cookie-parser

## Project Structure

```
backend/
├── config/          # Database connection & env config
├── controllers/     # Route handlers (users, products)
├── middleware/      # Auth, roles, async errors, error handler
├── models/          # Mongoose schemas
├── routes/          # API routes
├── utils/           # JWT, email, API features, ErrorHandler
├── app.js           # Express app setup
└── server.js        # Server entry point
```

## Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create `backend/config/config.env` (you can copy from `config.env.example`):

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=5d
COOKIE_EXPIRE=5

SMTP_SERVICE=gmail
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM_EMAIL=your_gmail@gmail.com
```

> For Gmail, use an [App Password](https://myaccount.google.com/apppasswords), not your normal account password. Quote values that contain `#` or special characters.

3. Run the server:

```bash
# development (nodemon)
npm run dev

# production
npm start
```

Server runs on `http://localhost:3000` by default.

## API Endpoints

Base URL: `/api/v1`

### Auth & User

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Register user |
| POST | `/login` | Public | Login |
| GET | `/logout` | Public | Logout |
| POST | `/password/forgot` | Public | Send reset email |
| PUT | `/password/reset/:token` | Public | Reset password |
| GET | `/me` | Private | Get logged-in user |
| PUT | `/password/update` | Private | Update password |
| PUT | `/me/update` | Private | Update profile |
| GET | `/admin/users` | Admin | Get all users |
| GET | `/admin/user/:id` | Admin | Get single user |
| PUT | `/admin/user/:id` | Admin | Update user role |
| DELETE | `/admin/user/:id` | Admin | Delete user |

### Products

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/products` | Public | Get all products |
| GET | `/product/:id` | Public | Get product details |
| POST | `/product/new` | Admin | Create product |
| PUT | `/product/:id` | Admin | Update product |
| DELETE | `/product/:id` | Admin | Delete product |
| PUT | `/review` | Private | Create/update review |

## Progress Notes

Completed so far:

- Auth middleware protecting private routes
- Product CRUD implemented
- Clean MVC folder structure
- Environment variables used for secrets

Coming next:

- Order CRUD and checkout flow
- Remaining course modules

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon |
| `npm start` | Start with Node |
