import React from 'react';
import ambassadorImg from '../assets/ambassador2.png'; 

function Hero() {
  return (
    <div 
      className="glass-panel mb-5 mt-4 position-relative shadow" 
      style={{ 
        borderRadius: '24px',
        overflow: 'visible', // Kunci agar gambar bisa menembus batas atap baik mobile maupun desktop
        background: 'rgba(3, 172, 14, 1.0)' // Warna Hijau Solid AmbaCart
      }}
    >
      <div className="container px-4 px-md-5">
        {/* ROW: Hapus align-items-center di mobile agar content stacked rapi */}
        <div className="row d-flex align-items-md-center justify-content-md-between" style={{ minHeight: '380px' }}>
          
          {/* --- AMBASSADOR COLUMN (Sekarang Pertama di JSX untuk Mobile Stacking) --- */}
          {/* order-1 untuk mobile (paling atas), moved to order-md-2 (paling kanan) di desktop */}
          <div className="col-12 col-md-5 text-center position-relative z-1 order-md-2 mb-3 mb-md-0">
            <img 
              src={ambassadorImg} 
              alt="Brand Ambassador AmbaCart Marketplace" 
              className="img-fluid ambassador-popout" 
            />
          </div>

          {/* --- CONTENT COLUMN (Sekarang Kedua di JSX untuk Mobile Stacking) --- */}
          {/* order-2 untuk mobile (di bawah gambar), moved to order-md-1 (paling kiri) di desktop */}
          {/* pt-0 pt-md-3 memberikan padding top ekstra di desktop agar teks sejajar tengah */}
          <div className="col-12 col-md-7 pt-0 pt-md-3 pb-5 text-white text-center text-md-start z-2 order-md-1">
            
            {/* BADGE */}
            <span className="badge bg-white text-brand mb-3 px-3 py-2 rounded-pill fw-bold shadow-sm">
              ⚡ PASAR DIGITAL TERLENGKAP
            </span>
            
            {/* JUDUL */}
            <h1 className="fw-bolder display-5 mb-3 text-white" style={{ letterSpacing: '-0.5px', lineHeight: '1.2' }}>
              Solusi Belanja Kebutuhan Harian & Lifestyle Anda!
            </h1>
            
            {/* DESKRIPSI */}
            <p className="lead mb-4 opacity-90 fs-6 fw-medium text-white">
              Temukan penawaran terbaik untuk berbagai macam kategori mulai dari gadget mutakhir, pakaian trendi, hingga perlengkapan rumah tangga original. Nikmati jaminan garansi resmi dan bebas ongkir ke seluruh wilayah Indonesia!
            </p>
            
            {/* TOMBOL */}
            <button className="btn bg-white text-brand fw-bold px-4 py-2.5 shadow-sm" style={{ border: 'none', borderRadius: '8px' }}>
              Jelajahi Produk ➔
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;