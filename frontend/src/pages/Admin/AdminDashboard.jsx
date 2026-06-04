JavaScript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../utils/productApi';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.data); // Sesuaikan dengan struktur JSON Backendmu
    } catch (error) {
      console.error("Gagal memuat data produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5 min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Dasbor Admin AmbaCart</h2>
        <Link to="/admin/add" className="btn btn-success">+ Tambah Produk</Link>
      </div>

      {loading ? (
        <p>Memuat data produk...</p>
      ) : (
        <div className="table-responsive bg-white rounded-3 shadow-sm p-3">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Lokasi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>Rp {Number(product.price).toLocaleString('id-ID')}</td>
                  <td>{product.location}</td>
                  <td>
                    <Link to={`/admin/edit/${product.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                    {/* Tombol Hapus akan diselesaikan oleh Raka */}
                    <button className="btn btn-sm btn-danger">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
