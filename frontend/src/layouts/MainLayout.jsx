import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

function MainLayout({ cartCount, handleAddToCart }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar sekarang menerima data counter yang asli */}
      <Navbar cartCount={cartCount} />
      
      <main className="container-fluid flex-grow-1 px-2 px-md-5 mt-4">
        {/* Mengalirkan fungsi klik melalui context React Router */}
        <Outlet context={{ handleAddToCart }} /> 
      </main>
      
      <Footer />
    </div>
  );
}

export default MainLayout;