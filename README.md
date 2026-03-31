# React Fashion Store

A full-stack fashion store project with a public React storefront and an admin-only backend for product management.

## Project Overview

This repository contains two main parts:

- `FashionApp2/` — the customer-facing frontend built with React and Vite
- `server/` — the Express + MongoDB backend used for admin authentication and product management

The app currently supports:

- public storefront pages
- product browsing from backend data
- category-based filtering
- shopping bag state with Redux Toolkit
- bag persistence with `localStorage`
- admin login with JWT
- admin product creation with image upload
- admin product deletion

## Repository Structure

```bash
React_Fashion_store/
│
├── FashionApp2/          # Frontend application
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   └── data/
│   ├── package.json
│   └── README.md
│
├── server/               # Backend application
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
└── README.md
