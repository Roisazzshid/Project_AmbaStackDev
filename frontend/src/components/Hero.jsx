import React from 'react';
import ambassadorImg from '../assets/ambassador2.png';

function Hero() {
  return (
    <div className="glass-panel overflow-hidden mb-5 mt-4 position-relative">
      <div className="container px-4 px-md-5">
        <div className="row align-items-center">
          
          {/* CONTENT COLUMN */}
          <div className="col-12 col-md-7 py-5 text-dark text-center text-md-start z-1">
            <span className="badge bg-brand text-white mb-3 px-3 py-2 rounded-1 fw-bold">
              ⚡ PASAR DIGITAL TERLENGKAP
            </span>
            <h1 className="fw-bolder display-5 mb-3" style={{ letterSpacing: '-0.5px', lineHeight: '1.2' }}>
              Solusi Belanja Kebutuhan Harian & Lifestyle Anda!
            </h1>
            <p className="lead mb-4 opacity-75 fs-6 text-secondary fw-medium">
              Temukan penawaran terbaik untuk berbagai macam kategori mulai dari gadget mutakhir, pakaian trendi, hingga perlengkapan rumah tangga original. Nikmati jaminan garansi resmi dan bebas ongkir ke seluruh wilayah Indonesia!
            </p>
            <button className="btn flat-btn-brand px-4 py-2.5">
              Jelajahi Produk ➔
            </button>
          </div>

          {/* AMBASSADOR COLUMN */}
          <div className="col-12 col-md-5 text-center d-flex justify-content-center align-items-end mt-3 mt-md-0 position-relative z-0">
            <img 
              src={ambassadorImg} 
              alt="Brand Ambassador Marketplace" 
              className="img-fluid" 
              style={{ maxHeight: '350px', objectFit: 'contain', marginBottom: '-5px' }} 
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;