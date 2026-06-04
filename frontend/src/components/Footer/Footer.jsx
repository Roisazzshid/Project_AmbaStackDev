import React from 'react';
import logoImg from '../../assets/logo.png'; 

function Footer() {
  return (
    // Margin x dihilangkan di layar super kecil, menggunakan mx-md-3 untuk tablet ke atas
    <footer className="glass-panel mx-1 mx-md-3 mb-2 mb-md-3 mt-5 pt-5 pb-4 px-3 px-md-5 text-center text-md-start" style={{ borderRadius: '24px' }}>
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-md-5 mb-4 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3">
              <img src={logoImg} alt="AmbaCart Logo" height="38" className="me-2 hover-scale" />
              <h4 className="fw-bold text-brand mb-0">AmbaCart</h4>
            </div>
            <p className="text-secondary small lh-lg fw-medium px-2 px-md-0">
              AmbaCart adalah ekosistem smart marketplace yang dirancang untuk mendukung kelancaran transaksi retail produk orisinal multi-kategori secara aman, cepat, dan responsif.
            </p>
          </div>
          
          <div className="col-md-3 mb-4 mb-md-0 mt-2 mt-md-0">
            <h6 className="fw-bold text-dark mb-3">Layanan Pengguna</h6>
            <ul className="list-unstyled text-secondary small lh-lg fw-medium">
              <li><a href="#" className="text-decoration-none text-secondary hover-scale d-inline-block">Pusat Resolusi</a></li>
              <li><a href="#" className="text-decoration-none text-secondary hover-scale d-inline-block">Panduan Pembayaran</a></li>
              <li><a href="#" className="text-decoration-none text-secondary hover-scale d-inline-block">Kebijakan Pengembalian</a></li>
            </ul>
          </div>
          
          <div className="col-md-4 mb-2 mt-2 mt-md-0">
            <h6 className="fw-bold text-dark mb-3">Keamanan & Layanan</h6>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2">
              <span className="badge bg-white text-dark border px-3 py-2 rounded-2 shadow-sm d-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                </svg>
                Transaksi Aman 100%
              </span>
              <span className="badge bg-white text-brand border border-success-subtle px-3 py-2 rounded-2 shadow-sm d-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                </svg>
                Garansi Retur 7 Hari
              </span>
            </div>
          </div>
        </div>
        
        <hr className="my-4 opacity-10" />
        <div className="text-center text-secondary small fw-medium pb-2">
          &copy; {new Date().getFullYear()} AmbaStackDev - Project Pemrograman Fullstack.
        </div>
      </div>
    </footer>
  );
}

export default Footer;