import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../utils/http';
import AuthAlertModal from '../components/Modal/AuthAlertModal';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertModal, setAlertModal] = useState({ show: false, type: 'success', title: '', message: '', onConfirm: null });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('amba_cart')) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemove = (id) => {
    const newCart = cartItems.filter(item => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem('amba_cart', JSON.stringify(newCart));
  };

  const calculateTotal = () => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      // Validasi alamat pengiriman dari profil
      const profileRes = await http.get('/users/profile');
      const address = profileRes.data.data.address;
      
      if (!address) throw new Error("Alamat pengiriman belum diisi di Profil!");

      await http.post('/orders/checkout', {
        items: cartItems,
        total_price: calculateTotal(),
        shipping_address: address
      });

      localStorage.removeItem('amba_cart');
      setCartItems([]);
      setAlertModal({
        show: true, type: 'success', title: 'Checkout Sukses!', 
        message: 'Pesananmu sudah diteruskan ke penjual.',
        onConfirm: () => navigate('/order-history') 
      });

    } catch (error) {
      setAlertModal({
        show: true, type: 'error', title: 'Gagal Checkout', 
        message: error.message || error.response?.data?.message || "Terjadi kesalahan.",
        onConfirm: () => { setAlertModal(prev => ({ ...prev, show: false })); if(error.message.includes('Alamat')) navigate('/profile'); }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="fw-black mb-4 text-dark">Keranjang Belanjaku</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-5"><p className="text-secondary fw-bold">Keranjangmu masih kosong nih.</p></div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div className="card shadow-sm mb-3 p-3 d-flex flex-row align-items-center border-0 rounded-4" key={item.id}>
                <div className="flex-grow-1">
                  <h6 className="fw-bold mb-1">{item.name}</h6>
                  <p className="text-secondary mb-0 small">{item.quantity} x Rp {Number(item.price).toLocaleString('id-ID')}</p>
                </div>
                <h6 className="fw-bold text-success me-4 mb-0">Rp {(item.quantity * item.price).toLocaleString('id-ID')}</h6>
                <button onClick={() => handleRemove(item.id)} className="btn btn-sm btn-outline-danger rounded-3 fw-bold">Hapus</button>
              </div>
            ))}
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm p-4 border-0 rounded-4 bg-light">
              <h5 className="fw-bold border-bottom pb-3 mb-3">Ringkasan Belanja</h5>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-secondary fw-medium">Total Harga</span>
                <span className="fw-black fs-5" style={{color: '#03AC0E'}}>Rp {calculateTotal().toLocaleString('id-ID')}</span>
              </div>
              <button onClick={handleCheckout} disabled={loading} className="btn w-100 text-white fw-bold py-3 rounded-pill shadow-sm" style={{backgroundColor: '#03AC0E'}}>
                {loading ? 'Memproses...' : 'Buat Pesanan Sekarang'}
              </button>
            </div>
          </div>
        </div>
      )}
      <AuthAlertModal show={alertModal.show} type={alertModal.type} title={alertModal.title} message={alertModal.message} onClose={alertModal.onConfirm} />
    </div>
  );
}

export default Cart;