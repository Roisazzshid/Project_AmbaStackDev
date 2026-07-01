import React, { useState, useEffect } from 'react';
import './Hero.css'; 
import heroImg1 from '../../assets/ambassador.png'; 
import heroImg2 from '../../assets/ambassador2.png';
import heroImg3 from '../../assets/ambassador3.png';

function Hero({ searchQuery, setSearchQuery }) {
  const images = [heroImg1, heroImg2, heroImg3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const brandColor = '#03AC0E';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); 

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="glass-panel mb-4 mt-3 position-relative shadow-sm" style={{ borderRadius: '24px', overflow: 'hidden', background: 'linear-gradient(135deg, #0ce61f 0%, #03AC0E 100%)' }}>
      <div className="container px-4 px-md-5">
        <div className="row d-flex align-items-center justify-content-between" style={{ minHeight: '380px' }}>
          
          {/* TEKS & KOLOM PENCARIAN (Pengganti Tombol Lama) */}
          <div className="col-12 col-md-7 pt-4 pt-md-0 pb-4 pb-md-0 text-white text-center text-md-start z-2 order-2 order-md-1">
            <span className="badge mb-3 px-3 py-2 rounded-pill fw-bold shadow-sm" style={{ color: brandColor, backgroundColor: '#ffffff' }}>
              🚀 DISKON SPESIAL HARI INI
            </span>
            <h1 className="fw-black display-5 mb-3 text-white text-shadow" style={{ letterSpacing: '-0.5px', lineHeight: '1.2' }}>
              Belanja Puas,<br/>Harga Pas di AmbaCart!
            </h1>
            <p className="lead mb-4 opacity-90 fs-6 fw-medium text-white d-none d-md-block">
              Temukan penawaran terbaik untuk berbagai macam kategori mulai dari gadget mutakhir, pakaian trendi, hingga perlengkapan rumah. Gratis Ongkir se-Indonesia!
            </p>
            
            {/* SEARCH BAR (BUNGLON) */}
            <div className="position-relative w-100 shadow-sm rounded-pill overflow-hidden" style={{ maxWidth: '500px', margin: '0 auto', marginLeft: 'md-0' }}>
              <input 
                type="text" 
                className="form-control border-0 py-3 ps-4 pe-5 fw-bold text-dark" 
                placeholder="Cari barang impianmu di sini..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderRadius: '50px' }}
              />
              <div className="position-absolute top-50 translate-middle-y" style={{ right: '15px', color: brandColor }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
              </div>
            </div>
          </div>

          {/* SLIDER GAMBAR */}
          <div className="col-12 col-md-5 text-center position-relative z-1 order-1 order-md-2 mb-3 mb-md-0" style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {images.map((img, index) => (
              <div 
                key={index}
                className={`position-absolute top-50 start-50 translate-middle w-100 h-100 d-flex align-items-center justify-content-center ${index === currentIndex ? 'active' : ''}`}
                style={{
                  opacity: index === currentIndex ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                  zIndex: index === currentIndex ? 2 : 1
                }}
              >
                <img src={img} alt="Ambassador" className="img-fluid" style={{ maxHeight: '110%', filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.3))' }} />
              </div>
            ))}
          </div>

        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="350" height="350" fill="white" className="position-absolute opacity-10 d-none d-md-block" style={{ right: '-5%', bottom: '-20%' }} viewBox="0 0 16 16"><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/></svg>
    </div>
  );
}

export default Hero;