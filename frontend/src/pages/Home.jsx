import React, { useState, useEffect, useContext } from "react";
import Hero from "../components/Hero/Hero.jsx";
import { getProducts } from "../utils/productApi";
import http, { BASE_IMAGE_URL } from "../utils/http"; 
import { useOutletContext, Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'; 

function Home() {
  const { handleAddToCart } = useOutletContext() || {};
  const { token } = useContext(AuthContext); 
  
  // FIXED: Posisi state diperbaiki agar tidak masuk ke dalam komentar
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState("ALL"); 

  const brandColor = '#03AC0E';

  // Cek apakah yang login adalah Admin
  let userRole = 'customer';
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userRole = payload.role || 'customer';
    } catch (e) {}
  }
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const resCat = await http.get('/categories');
        setCategories(resCat.data.data);

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

  const filteredProducts = products.filter(p => {
    const matchCategory = activeCategoryId === 'ALL' || Number(p.category_id) === Number(activeCategoryId);
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const formatImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300?text=AmbaCart';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.includes('/products/')) return imagePath.substring(imagePath.indexOf('/products/')); 
    if (imagePath.startsWith('/uploads/')) return `${BASE_IMAGE_URL}${imagePath}`;
    return `${BASE_IMAGE_URL}/uploads/${imagePath}`;
  };

  return (
    <div className="container-fluid p-0 pb-5 mb-5 pb-md-0 mb-md-0 bg-light min-vh-100"> 
      
      <div className="container px-3 px-md-4 pt-2">
        <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="container px-3 px-md-4 mt-4">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h3 className="fw-black text-dark mb-1">Rekomendasi Spesial</h3>
            <p className="text-secondary mb-0 fw-medium small d-none d-md-block">
              Pilihan barang terbaik khusus untuk Anda hari ini.
            </p>
          </div>
          <Link to="/" className="text-brand fw-bold text-decoration-none small" style={{ color: brandColor }}>Lihat Semua</Link>
        </div>

        <div className="d-flex overflow-auto pb-2 mb-4 hide-scrollbar gap-2">
          <button
            onClick={() => setActiveCategoryId("ALL")}
            className={`btn rounded-pill px-4 py-2 fw-semibold border shadow-sm flex-shrink-0 transition-all ${
              activeCategoryId === "ALL" ? "text-white" : "btn-light text-secondary bg-white hover-scale"
            }`}
            style={activeCategoryId === "ALL" ? { backgroundColor: brandColor, borderColor: brandColor } : {}}
          >
            Semua Kategori
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`btn rounded-pill px-4 py-2 fw-semibold border shadow-sm flex-shrink-0 transition-all ${
                activeCategoryId === cat.id ? "text-white" : "btn-light text-secondary bg-white hover-scale"
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
            <button onClick={() => {setSearchQuery(''); setActiveCategoryId('ALL');}} className="btn text-white fw-bold rounded-pill px-4 mt-2 hover-scale" style={{backgroundColor: brandColor}}>Reset Pencarian</button>
          </div>
        ) : (
          <div className="row g-2 g-md-4 mb-5">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.stock <= 0;
              return (
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex" key={product.id}>
                  
                  <div className="card w-100 border-0 shadow-sm rounded-4 overflow-hidden text-decoration-none product-card-hover" style={{ transition: 'all 0.3s ease' }}>
                    <style>{`
                      .product-card-hover:hover { transform: translateY(-5px); box-shadow: 0 12px 24px rgba(0,0,0,0.15) !important; }
                      .btn-add-cart { transition: all 0.2s ease; background-color: white; border: 1.5px solid ${brandColor}; color: ${brandColor}; }
                      .btn-add-cart:hover:not(:disabled) { background-color: ${brandColor}; color: white; transform: scale(1.02); }
                      .btn-admin-mode { background-color: #cbd5e1; color: white; border: none; cursor: not-allowed; }
                    `}</style>
                    
                    <Link to={`/product/${product.id}`} className="text-decoration-none position-relative bg-white d-flex align-items-center justify-content-center p-3 border-bottom" style={{ aspectRatio: '1/1' }}>
                      {isOutOfStock && (
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center z-2">
                          <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill shadow">HABIS</span>
                        </div>
                      )}
                      <img src={formatImageUrl(product.image_url || product.image)} alt={product.name} className="img-fluid product-img-hover" style={{ maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }} />
                    </Link>

                    <div className="card-body p-3 d-flex flex-column bg-white">
                      <Link to={`/product/${product.id}`} className="text-decoration-none text-dark flex-grow-1">
                        <h6 className="fw-bold mb-2" style={{ fontSize: '0.90rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }} title={product.name}>{product.name}</h6>
                        <h5 className="fw-black mb-2" style={{ color: brandColor, fontSize: '1.1rem' }}>Rp {Number(product.price).toLocaleString('id-ID')}</h5>
                        
                        <div className="d-flex align-items-center mb-3 small text-secondary" style={{fontSize: '0.75rem'}}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="me-1 text-danger flex-shrink-0" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
                          <span className="text-truncate d-inline-block" style={{ maxWidth: '50%' }}>{product.location || 'Pusat'}</span>
                          <span className="mx-1">•</span>
                          <span className="text-truncate">Terjual {product.sold || 0}</span>
                        </div>
                      </Link>

                      <div className="mt-auto pt-2">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            if(handleAddToCart && !isOutOfStock && !isAdmin) handleAddToCart(product);
                          }} 
                          disabled={isOutOfStock || isAdmin}
                          className={`btn w-100 fw-bold rounded-pill py-2 shadow-sm d-flex align-items-center justify-content-center transition-all ${isAdmin ? 'bg-secondary text-white border-0' : (isOutOfStock ? 'bg-light text-secondary border-secondary' : 'btn-add-cart')}`}
                          style={{ fontSize: '0.85rem', cursor: isAdmin ? 'not-allowed' : 'pointer' }}
                        >
                          {isAdmin ? '🛡️ Mode Admin' : (isOutOfStock ? 'Stok Kosong' : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16"><path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
                              + Keranjang
                            </>
                          ))}
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