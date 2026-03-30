import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

import Home from './Pages/Home';
import Shop from './Pages/Shop';
import CustomerCare from './Pages/Customer_Care';
import AboutUs from './Pages/AboutUs';
import AdminPage from './Pages/AdminPage';

import './App.css';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';

  return (
    <div className="App">
      {!isAdminRoute && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/customer-care" element={<CustomerCare />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;

