import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './Pages/Home';
import Shop from './Pages/Shop';
import CustomerCare from './Pages/Customer_Care';
import AboutUs from './Pages/AboutUs';
import AdminPage from './Pages/AdminPage';

import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/customer-care" element={<CustomerCare />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;

