import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

import Home from './Pages/Home';
import Shop from './Pages/Shop';
import CustomerCare from './Pages/Customer_Care';
import AboutUs from './Pages/AboutUs';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/customer-care" element={<CustomerCare />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

