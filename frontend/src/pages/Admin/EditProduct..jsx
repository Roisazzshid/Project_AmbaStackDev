import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../utils/productApi';

function EditProduct() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", price: "", location: "", image: null
  });

  // Ambil data produk yang mau diedit saat komponen dimuat
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getProductById(id);
        const data = response.data.data;
        setFormData({
          name: data.name, price: data.price, location: data.location, image: null
        });
      } catch (error) {
        console.error("Gagal mengambil detail produk", error);
      }
    };
    fetchDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("price", formData.price);
      dataToSend.append("location", formData.location);
      if (formData.image) dataToSend.append("image", formData.image);

      await updateProduct(id, dataToSend);
      alert("Produk berhasil diperbarui!");
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui produk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="fw-bold mb-4">Edit Produk</h3>
      {/* ... (Struktur <form> sama persis seperti AddProduct.jsx) ... */}
      <form onSubmit={handleSubmit} className="glass-panel p-4 shadow-sm">
         <div className="mb-3">
          <label className="form-label">Nama Produk</label>
          <input type="text" name="name" value={formData.name} className="form-control" onChange={handleChange} required />
        </div>
        {/* Lanjutkan untuk input price, location, dan image (image jangan dikasih atribut value) */}
        <button type="submit" className="btn btn-warning w-100" disabled={loading}>
          {loading ? "Menyimpan Perubahan..." : "Update Produk"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;