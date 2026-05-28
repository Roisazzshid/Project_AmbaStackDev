import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cartCount={0} />
      <main className="container-fluid flex-grow-1 px-3 px-md-5 mt-4">
        {/* Outlet adalah lubang tempat Home.jsx akan dimunculkan */}
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;