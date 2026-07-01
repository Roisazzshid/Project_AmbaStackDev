import React, { useState, useEffect } from "react";
import Hero from "../components/Hero/Hero.jsx";
import Product from "../components/Product/Product.jsx";
import { getProducts } from "../utils/productApi";
import http, { BASE_IMAGE_URL } from "../utils/http"; // <-- IMPORT BASE_IMAGE_URL DI SINI
import { useOutletContext, Link } from "react-router-dom";

function Home() {
  const { handleAddToCart } = useOutletContext() || {};
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState("ALL"); 

  const brandColor = '#03AC0E';

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Tarik data Kategori DULU dari Backend
        const resCat = await http.get('/categories');
        setCategories(resCat.data.data);

        // Tarik data Produk
        const response = await getProducts();
        const dataApi = response.data;
        const arrayProduk = dataApi.data || dataApi.products || dataApi;
        setProducts(arrayProduk);
      } catch (err) {
        setError(err.message || "Gagal menarik data dari server.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter Logika (Pencarian & Kategori)
  const filteredProducts = products.filter(p => {
    const matchCategory = activeCategoryId === 'ALL' || Number(p.category_id) === Number(activeCategoryId);
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // ==========================================
  // FIXED: LOGIKA GAMBAR ANTI RUSAK (BUNGLON)
  // ==========================================
  const formatImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300?text=AmbaCart';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.includes('/products/')) return imagePath.substring(imagePath.indexOf('/products/')); 
    
    // MENGGUNAKAN BASE_IMAGE_URL DARI HTTP.JS (Mendeteksi otomatis URL Railway)
    if (imagePath.startsWith('/uploads/')) return `${BASE_IMAGE_URL}${imagePath}`;
    return `${BASE_IMAGE_URL}/uploads/${imagePath}`;
  };

  return (
    <div className="container-fluid p-0 pb-5 mb-5 pb-md-0 mb-md-0"> 
      <Hero />
      
      {/* HERO BANNER SECTION PENCARIAN */}
      <div className="container pt-3 pt-md-4 mb-4 mb-md-5">
        <div className="rounded-4 shadow-sm overflow-hidden position-relative" style={{ background: 'linear-gradient(135deg, #0ce61f 0%, #03AC0E 100%)', minHeight: '280px' }}>
          <div className="row h-100 align-items-center position-relative z-2 p-4 p-md-5">
            <div className="col-12 col-md-7 text-white text-center text-md-start">
              <span className="badge bg-white text-success fw-bold rounded-pill px-3 py-2 mb-3 shadow-sm">🚀 Diskon Spesial Hari Ini!</span>
              <h1 className="fw-black display-5 mb-3 text-shadow" style={{ letterSpacing: '-1px' }}>Belanja Puas,<br/>Harga Pas di AmbaCart!</h1>
              <p className="fw-medium opacity-75 mb-4 d-none d-md-block fs-5">Temukan ribuan produk original dengan gratis ongkir ke seluruh Indonesia.</p>
              
              <div className="position-relative w-100 shadow-sm rounded-pill overflow-hidden" style={{ maxWidth: '500px', margin: '0 auto', marginLeft: 'md-0' }}>
                <input 
                  type="text" 
                  className="form-control border-0 py-3 ps-4 pe-5 fw-bold text-dark" 
                  placeholder="Cari barang impianmu di sini..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="position-absolute top-50 translate-middle-y" style={{ right: '15px', color: brandColor }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                </div>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="350" height="350" fill="white" className="position-absolute opacity-10 d-none d-md-block" style={{ right: '-5%', bottom: '-20%' }} viewBox="0 0 16 16"><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/></svg>
        </div>
      </div>

      <div className="container px-3 px-md-4 mt-4">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h3 className="fw-black text-dark mb-1">Rekomendasi Spesial</h3>
            <p className="text-secondary mb-0 fw-medium small d-none d-md-block">
              Pilihan barang terbaik khusus untuk Anda hari ini.
            </p>
          </div>
          <a href="#" className="text-brand fw-bold text-decoration-none small" style={{ color: brandColor }}>Lihat Semua</a>
        </div>

        {/* SCROLLABLE KATEGORI FILTER */}
        <div className="d-flex overflow-auto pb-2 mb-4 hide-scrollbar gap-2">
          <button
            onClick={() => setActiveCategoryId("ALL")}
            className={`btn rounded-pill px-4 py-2 fw-semibold border shadow-sm flex-shrink-0 ${
              activeCategoryId === "ALL" ? "btn-success text-white" : "btn-light text-secondary bg-white hover-scale"
            }`}
            style={activeCategoryId === "ALL" ? { backgroundColor: brandColor, borderColor: brandColor } : {}}
          >
            Semua Kategori
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`btn rounded-pill px-4 py-2 fw-semibold border shadow-sm flex-shrink-0 ${
                activeCategoryId === cat.id ? "btn-success text-white" : "btn-light text-secondary bg-white hover-scale"
              }`}
              style={activeCategoryId === cat.id ? { backgroundColor: brandColor, borderColor: brandColor } : {}}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center my-5 py-5">
            <div className="spinner-border" style={{ color: brandColor, width: '3rem', height: '3rem' }} role="status"></div>
            <p className="mt-3 text-secondary fw-bold">Memuat katalog...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center p-4 mx-auto fw-bold shadow-sm" style={{ maxWidth: "600px" }}>
            {error}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center my-5 py-5 mx-auto bg-white rounded-4 border shadow-sm" style={{ maxWidth: "600px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#cbd5e1" className="mb-3" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
            </svg>
            <h5 className="fw-black text-dark mb-2">Oops, barang tidak ditemukan!</h5>
            <p className="text-secondary small">Coba cari dengan kata kunci atau kategori lain.</p>
            <button onClick={() => {setSearchQuery(''); setActiveCategoryId('ALL');}} className="btn btn-outline-success fw-bold rounded-pill px-4 mt-2 hover-scale">Reset Pencarian</button>
          </div>
        ) : (
          <div className="row g-2 g-md-4 mb-5">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.stock <= 0;
              return (
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2" key={product.id}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 hover-scale overflow-hidden text-decoration-none">
                    
                    {/* GAMBAR PRODUK */}
                    <Link to={`/product/${product.id}`} className="text-decoration-none position-relative bg-white d-flex align-items-center justify-content-center p-3" style={{ aspectRatio: '1/1' }}>
                      {isOutOfStock && (
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center z-2">
                          <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill shadow">HABIS</span>
                        </div>
                      )}
                      <img src={formatImageUrl(product.image_url || product.image)} alt={product.name} className="img-fluid" style={{ maxHeight: '100%', objectFit: 'contain' }} />
                    </Link>

                    {/* DETAIL PRODUK */}
                    <div className="card-body p-3 d-flex flex-column bg-white border-top">
                      <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                        <h6 className="fw-bold mb-1 text-truncate" style={{ fontSize: '0.95rem' }} title={product.name}>{product.name}</h6>
                        <h5 className="fw-black mb-2" style={{ color: brandColor }}>Rp {Number(product.price).toLocaleString('id-ID')}</h5>
                        
                        <div className="d-flex align-items-center mb-3 small text-secondary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="me-1 text-danger" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
                          <span className="text-truncate" style={{ maxWidth: '65%' }}>{product.location || 'Pusat'}</span>
                          <span className="mx-1">•</span>
                          <span>Terjual {product.sold || 0}</span>
                        </div>
                      </Link>

                      {/* TOMBOL KERANJANG */}
                      <div className="mt-auto">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            if(handleAddToCart && !isOutOfStock) handleAddToCart(product);
                          }} 
                          disabled={isOutOfStock}
                          className={`btn w-100 fw-bold rounded-pill py-2 shadow-sm d-flex align-items-center justify-content-center transition-all ${isOutOfStock ? 'btn-light text-secondary border' : 'text-white'}`}
                          style={{ backgroundColor: isOutOfStock ? '' : brandColor }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16"><path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
                          + Keranjang
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;