import React from 'react';
import ambassadorImg from '../assets/ambassador2.png'; 

function Hero() {
  return (
    <div 
      className="glass-panel mb-5 mt-4 position-relative shadow" 
      style={{ 
        borderRadius: '24px',
        overflow: 'visible', // Kunci agar gambar bisa menembus batas atap
        background: 'rgba(3, 172, 14, 1.0)' // Warna Hijau Solid AmbaCart
      }}
    >
      <div className="container px-4 px-md-5">
        <div className="row" style={{ minHeight: '380px' }}>
          
          {/* CONTENT COLUMN - Ubah text-dark menjadi text-white */}
          <div className="col-12 col-md-7 align-self-center pt-5 pt-md-3 pb-5 text-white text-center text-md-start z-2">
            
            {/* BADGE: Diubah menjadi background putih & teks hijau (text-brand) agar kontras */}
            <span className="badge bg-white text-brand mb-3 px-3 py-2 rounded-pill fw-bold shadow-sm">
              E-COMMERCE TERLENGKAP
            </span>
            
            <h1 className="fw-bolder display-5 mb-3" style={{ letterSpacing: '-0.5px', lineHeight: '1.2' }}>
              Solusi Belanja Kebutuhan Harian & Lifestyle Anda!
            </h1>
            
            {/* PARAGRAF: Hapus text-secondary, gunakan opacity-90 agar terlihat empuk tapi jelas */}
            <p className="lead mb-4 opacity-90 fs-6 fw-medium">
              Temukan penawaran terbaik untuk berbagai macam kategori mulai dari gadget mutakhir, pakaian trendi, hingga perlengkapan rumah tangga original. Nikmati jaminan garansi resmi dan bebas ongkir ke seluruh wilayah Indonesia!
            </p>
            
            {/* TOMBOL: Diubah menjadi putih pekat dengan teks hijau agar menonjol di background hijau */}
            <button className="btn bg-white text-brand fw-bold px-4 py-2.5 shadow-sm" style={{ border: 'none', borderRadius: '8px' }}>
              Jelajahi Produk ➔
            </button>
          </div>

          {/* AMBASSADOR COLUMN */}
          <div className="col-12 col-md-5 align-self-end text-center position-relative z-1">
            <img 
              src={ambassadorImg} 
              alt="Brand Ambassador Pop Out" 
              className="img-fluid ambassador-popout" 
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;