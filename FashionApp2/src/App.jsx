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
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Customer_care" element={<CustomerCare />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;

