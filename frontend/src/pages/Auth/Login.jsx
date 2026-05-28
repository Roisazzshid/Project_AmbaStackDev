JavaScript
import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="glass-panel p-5 shadow-lg" style={{ width: '100%', maxWidth: '420px', borderRadius: '20px' }}>
      <h4 className="fw-bold text-center text-dark mb-1">Selamat Datang Kembali</h4>
      <p className="text-center text-secondary mb-4 small">Silakan masuk ke akun AmbaCart Anda</p>
      
      <form>
        <div className="mb-3">
          <label className="form-label fw-medium text-dark small">Email</label>
          <input type="email" className="form-control px-3 py-2 border-0 shadow-sm" placeholder="contoh@email.com" required />
        </div>
        <div className="mb-4">
          <label className="form-label fw-medium text-dark small">Password</label>
          <input type="password" className="form-control px-3 py-2 border-0 shadow-sm" placeholder="Masukkan password" required />
        </div>
        <button type="submit" className="btn flat-btn-brand w-100 py-2.5 fw-bold mb-3 rounded-3">
          Masuk Sekarang
        </button>
      </form>
      
      <div className="text-center mt-3">
        <p className="small text-secondary mb-0">
          Belum punya akun? <Link to="/register" className="fw-bold text-brand text-decoration-none">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
