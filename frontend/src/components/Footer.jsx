import React from 'react';
import logoImg from '../assets/logo.png';

function Footer() {
  return (
    <footer className="glass-panel mx-3 mb-3 mt-5 pt-5 pb-3 px-4">
      <div className="container-fluid">
        <div className="row text-start">
          <div className="col-md-5 mb-4">
            <div className="d-flex align-items-center mb-3">
              <img src={logoImg} alt="AmbaCart Logo" height="38" className="me-2" />
              <h4 className="fw-bold text-brand mb-0">AmbaCart</h4>
            </div>
            <p className="text-secondary small lh-lg fw-medium">
              AmbaCart adalah ekosistem smart marketplace yang dirancang untuk mendukung kelancaran transaksi retail produk orisinal multi-kategori secara aman, cepat, dan responsif.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold text-dark mb-3">Layanan Pengguna</h6>
            <ul className="list-unstyled text-secondary small lh-lg fw-medium">
              <li><a href="#" className="text-decoration-none text-secondary">Pusat Resolusi</a></li>
              <li><a href="#" className="text-decoration-none text-secondary">Panduan Pembayaran Aman</a></li>
              <li><a href="#" className="text-decoration-none text-secondary">Kebijakan Pengembalian Produk</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold text-dark mb-3">Sertifikasi Keamanan</h6>
            <div className="d-flex flex-column gap-2 align-items-start">
              <span className="badge bg-white text-dark border px-3 py-2 rounded-1 d-flex align-items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                </svg>
                Secure Checkout
              </span>
              <span className="badge bg-white text-dark border px-3 py-2 rounded-1 d-flex align-items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"/>
                </svg>
                Data Encrypted
              </span>
            </div>
          </div>
        </div>
        <hr className="opacity-25 border-dark my-4" />
        <div className="text-center text-dark small fw-bold">
          &copy; 2026 Tim AmbaStackDev - Pemrograman Fullstack STT-NF
        </div>
      </div>
    </footer>
  );
}

export default Footer;