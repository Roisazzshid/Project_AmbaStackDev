import React, { useState, useEffect } from "react";
import Hero from "../components/Hero/Hero.jsx";
import Product from "../components/Product/Product.jsx";
import { getProducts } from "../utils/productApi";
import { useOutletContext } from "react-router-dom";

function Home() {
  // 1. Ambil fungsi penjumlah keranjang langsung dari App.jsx (via MainLayout)
  const { handleAddToCart } = useOutletContext();

  // STATE MANAGEMENT (Hanya untuk mengurus produk, tidak ada lagi state keranjang di sini)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    "Semua Kategori",
    "Elektronik",
    "Fashion & Aksesoris",
    "Peralatan Rumah",
    "Olahraga & Hobi",
  ];

  // PEMANGGILAN API ASINKRON
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const response = await getProducts();

        console.log("🔍 CEK DATA DARI BACKEND:", response.data);

        const dataApi = response.data;
        const arrayProduk = dataApi.data || dataApi.products || dataApi;
        setProducts(arrayProduk);
      } catch (err) {
        setError(err.message || "Gagal menarik data dari server");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <Hero />

      {/* SECTION KATEGORI HORIZONTAL SLIDER */}
      <div className="mb-4 d-flex flex-column align-items-start mt-2">
        <span className="fw-bold mb-2 text-dark fs-5">Kategori Pilihan:</span>
        <div
          className="d-flex flex-nowrap gap-2 align-items-center w-100 pb-2"
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            ::-webkit-scrollbar { display: none; }
            .flat-category-scroll-item {
              flex: 0 0 auto;
              background: #fff;
              border: 1px solid rgba(0,0,0,0.06);
              padding: 8px 18px;
              border-radius: 10px;
              font-size: 0.85rem;
              font-weight: 600;
              color: #4A5568;
              cursor: pointer;
              transition: all 0.2s ease;
            }
            .flat-category-scroll-item:hover {
              border-color: #03AC0E;
              color: #03AC0E;
            }
          `}</style>
          {categories.map((cat, index) => (
            <div key={index} className="flat-category-scroll-item">
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
        <h4
          className="fw-bolder text-dark mb-0"
          style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", letterSpacing: "-0.5px" }}
        >
          Katalog Produk Pilihan
        </h4>
      </div>

      {loading ? (
        <div className="text-center my-5 py-5 mx-auto" style={{ maxWidth: "600px" }}>
          <div className="spinner-border text-brand mb-3"></div>
          <p className="fw-bold text-dark">Sinkronisasi etalase AmbaCart...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center p-4 mx-auto" style={{ maxWidth: "600px" }}>
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center my-5 py-5 mx-auto" style={{ maxWidth: "600px" }}>
          <h4 className="fw-bold text-dark">Oops, etalase sedang kosong!</h4>
        </div>
      ) : (
        <div className="row g-2 g-md-4 mb-5">
          {products.map((product) => (
            <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2" key={product.id}>
              <Product
                name={product.name}
                price={product.price}
                location={product.location || "Gudang Pusat"}
                sold={product.sold || 0}
                image={
                  product.image_url
                    ? product.image_url.startsWith("http")
                      ? product.image_url
                      : product.image_url.includes("/products/")
                      ? product.image_url.split("/uploads/").pop()
                      : `http://localhost:8000${product.image_url}`
                    : `https://picsum.photos/300/300?random=${product.id}`
                }
                // Jika ditekan, panggil fungsi penjumlah yang dikirim dari App.jsx
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;