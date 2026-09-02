# CozyCorner

Full-stack e-commerce app for home decor products. React frontend with a Node.js/Express/MongoDB backend.

## Features

### Backend

- JWT authentication (register, login, logout) with HTTP-only cookies
- Password reset via email (Nodemailer + Gmail App Password)
- Update password and profile
- Auth middleware protecting private routes
- Role-based access control (`user` / `admin`)
- Product CRUD with search, filter, and reviews
- Order management (create order, my orders, admin order management)
- Admin user management (list, get, update role, delete)
- Centralized error handling
- Secrets stored in environment variables

### Frontend

- Home page with hero section and featured products carousel
- Products listing page (`/products`)
- Product detail page with MUI image carousel (`/product/:id`)
- Login and registration pages
- Redux state management for products
- Custom toast alerts via `AlertContext` (React 19–compatible replacement for `react-alert`)
- Responsive layout with Tailwind CSS
- Loading states with `react-loader-spinner`

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 19, Vite, Tailwind CSS v4, Redux, React Router, MUI, Axios |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Auth | JWT, bcryptjs, HTTP-only cookies |
| Email | Nodemailer |

## Project Structure

```
CozyCorner/
├── backend/
│   ├── config/          # Database connection & env config
│   ├── controllers/     # Route handlers (users, products, orders)
│   ├── middleware/      # Auth, roles, async errors, error handler
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # JWT, email, API features, ErrorHandler
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── frontend/
│   ├── src/
│   │   ├── actions/     # Redux async actions
│   │   ├── components/  # Reusable UI components
│   │   ├── constants/   # Redux action types
│   │   ├── context/     # AlertContext (toast notifications)
│   │   ├── reducers/    # Redux reducers
│   │   ├── views/       # Page components
│   │   ├── api.js       # Axios instance (backend base URL)
│   │   ├── App.jsx      # Routes
│   │   ├── main.jsx     # App entry + providers
│   │   └── store.js     # Redux store
│   └── vite.config.js
└── package.json         # Backend scripts & dependencies
```

## Setup

### 1. Clone and install backend dependencies

From the project root:

```bash
npm install
```

### 2. Configure environment variables

Create `backend/config/config.env` (copy from `backend/config/config.env.example`):

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

### 3. Install and run the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

### 4. Run the backend

In a separate terminal, from the project root:

```bash
npm run dev
```

Backend runs on `http://localhost:3000`.

> Both servers must be running for the app to work. The frontend talks to the backend through `frontend/src/api.js` (`http://localhost:3000/api/v1`).

## Frontend Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero + featured products |
| `/products` | Products | All products |
| `/product/:id` | Product Detail | Single product with image carousel |
| `/login` | Login | User login |
| `/register` | Sign Up | User registration |

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

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

### Orders

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/order/new` | Private | Create new order |
| GET | `/order/me` | Private | Get logged-in user's orders |
| GET | `/order/:id` | Private | Get single order |
| GET | `/admin/orders` | Admin | Get all orders |
| PUT | `/admin/order/:id` | Admin | Update order |
| DELETE | `/admin/order/:id` | Admin | Delete order |

## Scripts

### Root (backend)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend with nodemon |
| `npm start` | Start backend with Node |

### Frontend (`frontend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## React 19 Notes

This project uses React 19. Some packages from typical MERN tutorials are **not compatible** and have replacements:

| Course package | Use instead |
|----------------|-------------|
| `react-alert` | `AlertContext` (`frontend/src/context/AlertContext.jsx`) |
| `react-rating-stars-component` | `react-icons` star components |
| `redux-devtools-extension` | `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__` |

