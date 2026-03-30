# React Fashion Store (FashionApp2)

This folder contains the React storefront built with Vite, React Router, Redux Toolkit, and CSS Modules.

It now works with the backend in `../server` for:

- public product fetching
- admin login
- admin product creation with image upload
- admin product deletion

## Run The App

From the repository root:

```bash
cd server
npm install
npm run seed:admin
npm run dev

cd ../FashionApp2
npm install
npm run dev
```

Open the Vite frontend URL in your browser.

Admin access is not linked in the navbar. Visit `/admin` manually in the browser address bar.

## Build

```bash
cd FashionApp2
npm run build
```

## What Is Included

- Multi-page storefront: Home, Shop, About Us, Customer Care
- Admin-only route at `/admin`
- Admin login form with JWT-based session handling
- Admin dashboard for creating, listing, and deleting products
- Public shop products loaded from backend API
- Shopping bag flow with Redux Toolkit
- Cart persistence with localStorage
- Reusable components with CSS Modules

## Tech Stack

- React 18
- Vite
- React Router DOM
- Redux Toolkit + React Redux
- react-multi-carousel

## Backend Integration

The storefront expects the backend API to run from the `server/` folder.

Default local endpoints:

- Frontend: Vite dev server (`http://localhost:5173` or next free port)
- Backend API: `http://localhost:5000/api`

The frontend uses `fetch` and reads the API base URL from `VITE_API_BASE_URL` when provided.

## Admin Login

For the current local development setup, the seeded admin credentials are:

- Username: `admin`
- Password: `admin`

These are temporary development credentials only.