# React Fashion Store

This repository now contains two parts:

- `FashionApp2/` - the public React storefront
- `server/` - the admin-only Express + MongoDB backend

## Quick Start

Install frontend dependencies:

```bash
cd FashionApp2
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

Seed the admin user:

```bash
npm run seed:admin
```

Run the backend:

```bash
npm run dev
```

Run the frontend in a second terminal:

```bash
cd ../FashionApp2
npm run dev
```

Open the storefront in your browser using the Vite URL shown in the terminal.

Admin access is available only by manually visiting `/admin` on the frontend URL.

For full app details, see `FashionApp2/README.md`.
