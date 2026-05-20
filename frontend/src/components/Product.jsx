import React from 'react';

function Product({ name, price, image, location, sold, onAddToCart }) {
  return (
    <div className="glass-card h-100 d-flex flex-column p-3">
      {/* Bingkai Foto */}
      <div className="rounded-2 overflow-hidden mb-3 bg-white d-flex align-items-center justify-content-center" style={{ height: '180px' }}>
        <img 
          src={image} 
          className="img-fluid w-100 h-100" 
          alt={name} 
          style={{ objectFit: 'cover' }} 
        />
      </div>
      
      {/* Konten Keterangan */}
      <div className="card-body p-0 d-flex flex-column text-start">
        <h6 className="fw-semibold text-dark mb-1 lh-base" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} title={name}>
          {name}
        </h6>
        <h5 className="fw-bold text-brand mb-3 mt-1">Rp {price.toLocaleString('id-ID')}</h5>
        
        <div className="d-flex align-items-center mb-2">
          <span className="badge bg-success bg-opacity-25 text-success rounded-1 px-2 py-1 small fw-bold">Bebas Ongkir</span>
        </div>
        
        <p className="small mb-3 text-secondary fw-medium">
          📍 {location} <br/> ⭐ 4.9 | Terjual {sold}+
        </p>
        
        {/* PERBAIKAN: Menggunakan flat-btn-brand untuk mengunci teks putih */}
        <button onClick={onAddToCart} className="btn flat-btn-brand w-100 py-2 mt-auto">
          + Keranjang
        </button>
      </div>
    </div>
  );
}

export default Product;