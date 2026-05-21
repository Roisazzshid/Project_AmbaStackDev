import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Product from './components/Product';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const [products, setProducts] = useState([
    { id: 1, name: "Smart TV 4K Ultra HD 43 Inch Premium", price: 3499000, location: "Jakarta Barat", sold: 80, image: "/products/tv.jpg" },
    { id: 2, name: "Ergonomic Office Chair / Kursi Kerja Hidrolik", price: 850000, location: "Tangerang", sold: 150, image: "/products/kursi.webp" },
    { id: 3, name: "Mechanical Keyboard RGB Wireless Hotswap", price: 620000, location: "Jakarta Pusat", sold: 340, image: "/products/keyboard.webp" },
    { id: 4, name: "Running Shoes Light Weight Breatheable", price: 450000, location: "Bandung", sold: 95, image: "/products/sepatu.webp" },
    { id: 5, name: "Tas Ransel Laptop Anti Air dengan USB Port", price: 210000, location: "Depok", sold: 520, image: "/products/tas.png" },
    { id: 6, name: "Air Fryer Low Watt 2.5L Penggoreng Tanpa Minyak", price: 540000, location: "Surabaya", sold: 60, image: "/products/airfry.jpg" }
  ]);

  const categories = ["Semua Kategori", "Elektronik", "Fashion & Aksesoris", "Peralatan Rumah", "Olahraga & Hobi"];

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleAddProduct = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const newProduct = {
      id: Date.now(),
      name: "Smart Gadget Premium Special Edition v." + randomId,
      price: 1250000,
      location: "Gudang Utama",
      sold: 0,
      image: `https://picsum.photos/300/300?random=${randomId}`
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cartCount={cartCount} />
      
      <main className="container-fluid flex-grow-1 px-3 px-md-5 mt-2">
        <Hero />

        {/* SECTION KATEGORI */}
        <div className="mb-5 d-flex flex-wrap gap-2 align-items-center">
          <span className="fw-bold me-2 text-dark fs-5">Kategori:</span>
          {categories.map((cat, index) => (
            <div key={index} className="flat-category-item">
              {cat}
            </div>
          ))}
        </div>

        {/* KATALOG HEADER & TOMBOL TEST */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bolder text-dark fs-3 mb-0" style={{ letterSpacing: '-0.5px' }}>
            Katalog Produk Pilihan
          </h4>
          <button onClick={handleAddProduct} className="btn flat-btn-brand px-4 py-2 shadow-sm d-flex align-items-center gap-2">
            <span className="fs-5 fw-bold">+</span> Tambah Dummy
          </button>
        </div>
        
        {/* GRID RESPONSIF */}
        <div className="row g-4 mb-5">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" key={product.id}>
              <Product 
                name={product.name} 
                price={product.price} 
                location={product.location}
                sold={product.sold}
                image={product.image}
                onAddToCart={handleAddToCart} 
              />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;