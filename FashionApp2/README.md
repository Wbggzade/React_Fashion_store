# React Fashion Store

A modern **fashion storefront UI** built with **React and Vite**.  
This project demonstrates component-based architecture, reusable UI sections, global state management with **Redux Toolkit**, and a clean design system using **black, white, and yellow**.

The goal of this project is to practice building a **realistic multi-page e-commerce frontend interface** using React.

---





## Features

- Multi-page navigation using **React Router**
- Modular **component architecture**
- Responsive layout
- Product grid UI with add-to-cart support
- **Shopping cart** with add / remove item actions
- **Redux Toolkit** global state management
- Cart state persisted to **localStorage**
- Reusable components
- CSS Modules styling
- Clean design system

---

## Design System

The UI uses a minimal fashion color palette:

| Color | Purpose |
|------|--------|
| White | Background |
| Black | Content / items |
| Yellow | Buttons / accents |

This creates a **clean fashion-brand aesthetic** similar to modern clothing websites.

---

## Pages

### Home
Landing page with hero banner, featured items, and carousel sections.

### Shop
Displays products in a responsive grid layout.

### About Us
Brand story and design philosophy.

### Customer Care
Support information and FAQ sections.

---

## Tech Stack

- React 18
- Vite
- React Router DOM v6
- Redux Toolkit
- React Redux
- react-responsive-carousel
- react-multi-carousel
- JavaScript (ES6+)
- CSS Modules

---

## Project Structure

```
src
 ├ Components
 │   ├ Navbar
 │   ├ Footer
 │   ├ Banner
 │   ├ Carousel
 │   ├ Grid_Cards
 │
 ├ Pages
 │   ├ Home
 │   ├ Shop
 │   ├ AboutUs
 │   ├ CustomerCare
 │
 ├ store
 │   ├ store.js          # Redux store (with localStorage persistence)
 │   └ cartSlice.js      # Cart reducer — addToCart / removeFromCart
 │
 ├ App.jsx
 ├ main.jsx
 └ index.css
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Wbggzade/react-fashion-store.git
```

Navigate into the project:

```bash
cd react-fashion-store
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## Future Improvements

- Product filtering
- Product detail page
- Quantity controls inside cart
- Backend API integration
- Authentication system
- Deployment

---

## Author

**Gurban Gurbanzade**

Frontend Developer  
React • JavaScript • Web Development

GitHub:  
https://github.com/Wbggzade