import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

function AuthLayout() {
  return (
    <div 
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center" 
      style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #e0eafc 100%)' }}
    >
      <div className="mb-4 text-center">
        <Link to="/" className="text-decoration-none d-flex flex-column align-items-center">
          <img src={logoImg} alt="AmbaCart Logo" height="60" className="mb-2" />
          <h3 className="fw-bolder text-brand mb-0">AmbaCart</h3>
        </Link>
      </div>
      
      {/* Form Login/Register akan merender dirinya di sini */}
      <Outlet />
    </div>
  );
}

export default AuthLayout;