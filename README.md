# React Fashion Store

A full-stack fashion store project with a customer-facing React storefront and an admin-only product management panel.

## Overview

This repository is split into two main applications:

- `Frontend/` — the React + Vite frontend
- `server/` — the Express + MongoDB backend

The project combines a public fashion storefront with an authenticated admin dashboard used to manage catalog products.

## Current Features

### Storefront
- Home page with:
  - hero banner
  - featured collection cards
  - trending products carousel loaded from the backend
- Shop page with:
  - product list loaded from the backend
  - category-based filtering
  - product selection modal
  - add-to-bag flow with quantity selection
- Customer Care page
- About Us page
- Shopping bag panel in the navbar
- Bag quantity controls:
  - add
  - increment
  - decrement
  - remove
  - clear
- Bag persistence via `localStorage`

### Admin
- Admin login page
- Cookie-based authenticated admin session
- Session validation on page load
- Admin dashboard for:
  - creating products
  - editing existing products
  - deleting products
  - marking products as trending
  - uploading/replacing product images

### Backend
- MongoDB product storage
- MongoDB admin storage
- Protected admin-only product mutation routes
- Public product read routes
- Image upload handling with `multer`
- Product image hosting through `/uploads`
- Health check endpoint

## Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Redux Toolkit
- React Redux
- CSS Modules
- `fetch` API
- `react-multi-carousel`

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- `bcryptjs`
- `cookie-parser`
- `cors`
- `multer`
- `dotenv`

## Architecture

## Frontend Architecture

The frontend is organized by responsibility:

- `src/Pages/` — route-level pages
- `src/Components/` — reusable UI components
- `src/layouts/` — route layouts for public and admin sections
- `src/services/` — API and data-fetching logic
- `src/store/` — Redux Toolkit store and cart slice
- `src/data/` — local static content for featured collections
- `src/utils/` — utility helpers

### Frontend patterns used
- Route-based layout composition with `PublicLayout` and `AdminLayout`
- Redux Toolkit slice for bag/cart state
- `localStorage` hydration and persistence for bag items
- Service layer for auth and product API calls
- CSS Modules for component-scoped styling
- Environment-based API base URL via `VITE_API_BASE_URL`

## Backend Architecture

The backend follows a clean Express structure:

- `config/` — database connection
- `controllers/` — request handlers
- `middleware/` — auth and upload middleware
- `models/` — Mongoose schemas/models
- `routes/` — API route definitions
- `utils/` — token generation and admin seeding
- `uploads/` — uploaded product images
- `app.js` — Express app configuration
- `server.js` — startup/bootstrap entry point

### Backend patterns used
- Express app split from server bootstrap
- Route/controller/model separation
- JWT-based admin protection middleware
- Cookie-first auth strategy with optional bearer fallback
- Mongoose schema validation
- File upload middleware with image-only filtering
- Environment-driven configuration

## Project Structure

```bash
React_Fashion_store/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Admin/
│   │   │   ├── Banner/
│   │   │   ├── Carousel/
│   │   │   ├── Footer/
│   │   │   ├── Grid_Cards/
│   │   │   └── Navbar/
│   │   ├── Pages/
│   │   ├── data/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
