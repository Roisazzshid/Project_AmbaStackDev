import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts (Pastikan Rois sudah membuat file ini di folder src/layouts/)
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Import Pages
import Home from './pages/Home'; 
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import './App.css';

function App() {
  return (
    <Routes>
      {/* 1. Rute untuk halaman publik yang butuh Navbar & Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* 2. Rute untuk halaman Autentikasi (Polos) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;