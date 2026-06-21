import React, { useState, useEffect } from 'react';
import http from '../../utils/http';

const STATUS_OPTIONS = ['PENDING', 'PROCESSED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState({});
  const [message, setMessage] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await http.get('/orders/admin/all');
      setOrders(res.data.data);
      const initialDrafts = {};
      res.data.data.forEach(order => {
        initialDrafts[order.id] = {
          status: order.status,
          tracking_number: order.tracking_number || ''
        };
      });
      setDrafts(initialDrafts);
    } catch (error) {
      setMessage('Gagal memuat data pesanan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (orderId, field, value) => {
    setDrafts(prev => ({ ...prev, [orderId]: { ...prev[orderId], [field]: value } }));
  };

  const handleUpdate = async (orderId) => {
    try {
      await http.put(`/orders/admin/${orderId}/status`, drafts[orderId]);
      setMessage(`Pesanan #${orderId} berhasil diupdate.`);
      fetchOrders();
    } catch (error) {
      setMessage('Gagal update pesanan.');
    }
  };

  if (loading) return <div className="container mt-4">Memuat data pesanan...</div>;

  return (
    <div className="container mt-4 mb-5">
      <h2 className="fw-bold mb-4">Dashboard Pesanan (Admin)</h2>
      {message && <div className="alert alert-info">{message}</div>}
      {orders.length === 0 ? (
        <p>Belum ada pesanan masuk.</p>
      ) : (
        <table className="table table-bordered bg-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Total</th>
              <th>Alamat</th>
              <th>Status</th>
              <th>Resi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_id}</td>
                <td>Rp {Number(order.total_price).toLocaleString('id-ID')}</td>
                <td>{order.shipping_address}</td>
                <td>
                  <select
                    className="form-select"
                    value={drafts[order.id]?.status || order.status}
                    onChange={(e) => handleChange(order.id, 'status', e.target.value)}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={drafts[order.id]?.tracking_number || ''}
                    onChange={(e) => handleChange(order.id, 'tracking_number', e.target.value)}
                  />
                </td>
                <td>
                  <button className="btn btn-success btn-sm" onClick={() => handleUpdate(order.id)}>
                    Simpan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;