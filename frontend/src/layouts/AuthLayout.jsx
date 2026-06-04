import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div 
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center" 
      style={{ 
        background: 'linear-gradient(135deg, #d1fae5 0%, #e0eafc 100%)', 
        padding: '20px',
        paddingTop: '40px', // Ditambah menjadi 160px agar maskot besar bebas bernapas
        boxSizing: 'border-box'
      }}
    >
      {/* Konten Halaman Login / Register */}
      <Outlet />
    </div>
  );
}

export default AuthLayout;