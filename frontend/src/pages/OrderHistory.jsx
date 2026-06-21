import React, { useState, useEffect } from 'react';
import http from '../utils/http';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await http.get('/orders/my-orders');
        setOrders(res.data.data);
      } catch (error) {
        setMessage('Gagal memuat riwayat pesanan.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="container mt-4">Memuat riwayat pesanan...</div>;

  return (
    <div className="container mt-4 mb-5">
      <h2 className="fw-bold mb-4">Riwayat Pesanan</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      {orders.length === 0 ? (
        <p>Kamu belum punya pesanan.</p>
      ) : (
        orders.map(order => (
          <div className="card mb-3 p-3" key={order.id}>
            <h6>Pesanan #{order.id}</h6>
            <p>Status: <strong>{order.status}</strong></p>
            <p>Alamat: {order.shipping_address}</p>
            <p>No. Resi: {order.tracking_number || 'Belum tersedia'}</p>
            <p>Total: Rp {Number(order.total_price).toLocaleString('id-ID')}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;