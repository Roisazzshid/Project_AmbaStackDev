import React from 'react';
import './Product.css'; 

function Product({ name, price, image, location, sold, onAddToCart }) {
  return (
    <div className="glass-card h-100 d-flex flex-column p-2 p-sm-3 product-card-hover bg-white bg-opacity-75">
      {/* Gambar Etalase Produk */}
      <div className="rounded-3 overflow-hidden mb-2 mb-md-3 bg-white d-flex align-items-center justify-content-center product-img-box">
        <img src={image} className="img-fluid w-100 h-100 product-card-img" alt={name} />
      </div>
      
      {/* Informasi Detil Produk */}
      <div className="card-body p-1 p-sm-0 d-flex flex-column text-start">
        <h6 className="fw-semibold text-dark mb-1 lh-sm product-title-text" title={name}>
          {name}
        </h6>
        
        <h5 className="fw-bold text-brand mb-2 mt-1 product-price-text">
          Rp {Number(price).toLocaleString('id-ID')}
        </h5>
        
        <div className="d-flex align-items-center mb-2">
          <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-0.5 fw-bold label-ongkir">
            Bebas Ongkir
          </span>
        </div>
        
        {/* Ikon Vektor Solid Penunjuk Lokasi Toko */}
        <p className="mb-2 text-secondary fw-medium d-flex align-items-center gap-1 location-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-geo-alt-fill text-danger flex-shrink-0" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
          </svg>
          <span className="text-truncate">{location}</span>
        </p>
      </div>

      {/* Akses Tombol Transaksi Langsung */}
      <div className="mt-auto pt-1 pt-sm-2">
        <button 
          onClick={onAddToCart} 
          className="btn flat-btn-brand w-100 py-1.5 py-sm-2 fw-semibold rounded-3 text-truncate btn-add-cart-text"
        >
          + Keranjang
        </button>
      </div>
    </div>
  );
}

export default Product;