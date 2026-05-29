import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Import Pages
import Home from './pages/Home'; 
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import './App.css';

function App() {
  // MANAJEMEN STATE KERANJANG GLOBAL SPRINT 11
  const [cartCount, setCartCount] = useState(0);
  const handleAddToCart = () => setCartCount((prev) => prev + 1);

  return (
    <Routes>
      {/* Alirkan data cartCount dan fungsi penambah ke Layout Utama */}
      <Route element={<MainLayout cartCount={cartCount} handleAddToCart={handleAddToCart} />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;