import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; 
import AuthAlertModal from '../Modal/AuthAlertModal'; 
import http from '../../utils/http';
import './Navbar.css'; 
import logoImg from '../../assets/logo.png'; 

function Navbar({ cartCount }) {
  const { token } = useContext(AuthContext); 
  const navigate = useNavigate();
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(0);

  const [alertModal, setAlertModal] = useState({
    show: false, type: 'error', title: '', message: '', onConfirm: null
  });

  const brandColor = '#03AC0E';

  let userName = '';
  let userRole = '';
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userName = payload.name || payload.email.split('@')[0];
      userRole = payload.role; 
    } catch (e) {}
  }

  const syncNotifs = async () => {
    if (!token || userRole === 'admin') return;
    try {
      const res = await http.get('/notifications/unread');
      if(res.data.success) setUnreadNotifs(res.data.count);
    } catch (e) { }
  };

  useEffect(() => {
    syncNotifs();
    const interval = setInterval(syncNotifs, 3000); 
    window.addEventListener('notifUpdate', syncNotifs); 
    return () => { clearInterval(interval); window.removeEventListener('notifUpdate', syncNotifs); };
  }, [token, userRole]);

  useEffect(() => {
    if (cartCount > 0) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400); 
    }
  }, [cartCount]);

  const handleSellerClick = () => {
    if (!token) {
      setAlertModal({ show: true, type: 'error', title: 'Akses Dibatasi', message: 'Silakan Login terlebih dahulu.', onConfirm: () => { setAlertModal(prev => ({ ...prev, show: false })); navigate('/login'); }});
    } else if (userRole !== 'admin') {
      setAlertModal({ show: true, type: 'error', title: 'Akses Ditolak', message: 'Hanya Penjual/Admin yang dapat mengakses Dasbor ini.', onConfirm: () => setAlertModal(prev => ({ ...prev, show: false }))});
    } else { navigate('/admin'); }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* 1. TOP NAVBAR (Tampil elegan di Desktop & Mobile) */}
      <nav className="navbar navbar-expand-lg sticky-top py-2 py-lg-3 glass-navbar shadow-sm mx-2 mx-lg-4 mt-2 mt-lg-3 px-3 px-lg-4" style={{ top: '12px', zIndex: 1030, borderRadius: '16px' }}>
        <div className="container-fluid px-0 d-flex align-items-center justify-content-between flex-nowrap">
          
          {/* LOGO & SELLER CENTRE */}
          <div className="d-flex align-items-center gap-3">
            <Link className="navbar-brand fw-bolder fs-4 d-flex align-items-center m-0 hover-scale" to="/" style={{ color: brandColor, textDecoration: 'none', transition: 'all 0.2s' }}>
              <img src={logoImg} alt="AmbaCart Logo" height="34" className="me-2" />
              <span className="d-none d-sm-inline">AmbaCart</span>
            </Link>
            <div style={{ height: '24px', width: '2px', backgroundColor: '#e2e8f0' }}></div>
            <button onClick={handleSellerClick} className="btn btn-sm text-secondary fw-bold hover-text-brand" style={{ border: 'none', background: 'transparent' }}>
              <span className="d-none d-md-inline">Seller Centre</span>
              <span className="d-md-none">Admin</span>
            </button>
          </div>
          
          <div className="d-flex align-items-center gap-2 gap-md-3">
            {token ? (
              // MENU KANAN KHUSUS DESKTOP (Akan disembunyikan jika layar HP/kecil)
              <div className="d-none d-md-flex align-items-center gap-2">
                <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')} title="Profil Saya">
                  <span className="text-secondary fw-bold small text-truncate hover-text-brand" style={{ maxWidth: '120px' }}>Hi, {userName}!</span>
                  <div className="btn btn-light rounded-circle p-0 shadow-sm overflow-hidden d-flex hover-scale" style={{ width: '40px', height: '40px', border: `2px solid ${brandColor}` }}>
                    <img src={`https://ui-avatars.com/api/?name=${userName}&background=f0fdf4&color=03AC0E&bold=true`} alt="Profile" className="w-100 h-100" />
                  </div>
                </div>
                <div style={{ height: '24px', width: '2px', backgroundColor: '#e2e8f0' }} className="mx-1"></div>

                {userRole !== 'admin' && (
                  <>
                    <Link to="/chat-list" className="btn btn-light rounded-circle p-2 shadow-sm text-secondary hover-scale d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '1px solid #e2e8f0' }} title="Pesan Chat">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592"/></svg>
                    </Link>

                    <Link to="/notifications" className="btn btn-light position-relative p-2 rounded-circle hover-bg-brand border-0 hover-scale d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '1px solid #e2e8f0' }} title="Notifikasi">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                      </svg>
                      {unreadNotifs > 0 && <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" style={{ padding: '0.35rem' }}></span>}
                    </Link>
                  </>
                )}

                <Link to="/order-history" className="btn btn-light rounded-circle p-2 shadow-sm text-secondary hover-scale d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '1px solid #e2e8f0' }} title="Pesanan Saya">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/></svg>
                </Link>

                <Link to="/cart" className="btn rounded-circle p-2 shadow-sm position-relative text-white hover-scale d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: brandColor, border: 'none' }} title="Keranjang">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className={isAnimating ? 'pulse-animation' : ''} viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
                  {cartCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white" style={{ fontSize: '0.65rem' }}>{cartCount}</span>}
                </Link>
              </div>
            ) : (
              <Link className="btn fw-bold px-3 px-md-4 py-2 hover-scale d-none d-md-block" to="/login" style={{ borderColor: brandColor, color: brandColor, borderRadius: '10px', borderWidth: '1.5px' }}>Masuk / Daftar</Link>
            )}
          </div>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* 2. STICKY BOTTOM NAVIGATION (HANYA MUNCUL DI MOBILE/HP) */}
      {/* ========================================================= */}
      {token && (
        <div className="d-md-none fixed-bottom bg-white border-top shadow-lg d-flex justify-content-around align-items-center pb-2 pt-2 px-2" style={{ zIndex: 1040, borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
          
          <Link to="/" className={`d-flex flex-column align-items-center text-decoration-none ${isActive('/') ? 'text-success' : 'text-secondary'}`} style={{ width: '60px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="mb-1" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/><path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/></svg>
            <span style={{ fontSize: '0.65rem', fontWeight: isActive('/') ? 'bold' : '500' }}>Beranda</span>
          </Link>

          {token && (
            <Link to="/order-history" className={`d-flex flex-column align-items-center text-decoration-none ${isActive('/order-history') ? 'text-success' : 'text-secondary'}`} style={{ width: '60px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="mb-1" viewBox="0 0 16 16"><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/></svg>
              <span style={{ fontSize: '0.65rem', fontWeight: isActive('/order-history') ? 'bold' : '500' }}>Pesanan</span>
            </Link>
          )}

          {/* KERANJANG DI TENGAH BOTTOM BAR */}
          <Link to="/cart" className="d-flex flex-column align-items-center text-decoration-none position-relative" style={{ top: '-15px' }}>
            <div className="bg-success rounded-circle shadow-lg d-flex align-items-center justify-content-center text-white border border-4 border-white hover-scale" style={{ width: '55px', height: '55px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={isAnimating ? 'pulse-animation' : ''} viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
              {cartCount > 0 && <span className="position-absolute badge rounded-pill bg-danger border border-white" style={{ fontSize: '0.65rem', top: '0', right: '0' }}>{cartCount}</span>}
            </div>
          </Link>

          {token && userRole !== 'admin' && (
            <Link to="/notifications" className={`d-flex flex-column align-items-center text-decoration-none position-relative ${isActive('/notifications') ? 'text-success' : 'text-secondary'}`} style={{ width: '60px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="mb-1" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/></svg>
              {unreadNotifs > 0 && <span className="position-absolute bg-danger border border-white rounded-circle" style={{ width: '10px', height: '10px', top: '-2px', right: '15px' }}></span>}
              <span style={{ fontSize: '0.65rem', fontWeight: isActive('/notifications') ? 'bold' : '500' }}>Notif</span>
            </Link>
          )}

          {token ? (
            <Link to="/profile" className={`d-flex flex-column align-items-center text-decoration-none ${isActive('/profile') ? 'text-success' : 'text-secondary'}`} style={{ width: '60px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="mb-1" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/></svg>
              <span style={{ fontSize: '0.65rem', fontWeight: isActive('/profile') ? 'bold' : '500' }}>Profil</span>
            </Link>
          ) : (
            <Link to="/login" className="d-flex flex-column align-items-center text-decoration-none text-secondary" style={{ width: '60px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="mb-1" viewBox="0 0 16 16"><path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/><path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0-.708 0l3-3a.5.5 0 0 0-.708-.708L10.5 10.793V1.5a.5.5 0 0 0-1 0v9.293l-2.146-2.147a.5.5 0 0 0-.708 0z"/></svg>
              <span style={{ fontSize: '0.65rem', fontWeight: '500' }}>Masuk</span>
            </Link>
          )}

        </div>
      )}

      <AuthAlertModal show={alertModal.show} type={alertModal.type} title={alertModal.title} message={alertModal.message} onClose={alertModal.onConfirm} />
    </>
  );
}

export default Navbar;