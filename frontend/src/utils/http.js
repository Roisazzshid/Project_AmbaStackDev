import axios from 'axios';

// Ini URL API untuk mengambil data
const apiURL = 'https://projectambastackdev-production.up.railway.app/api';

// INI YANG BARU: URL Khusus untuk memanggil gambar (Tanpa akhiran /api)
export const BASE_IMAGE_URL = 'https://projectambastackdev-production.up.railway.app';

const http = axios.create({
  baseURL: apiURL, 
});

// INTERCEPTOR: Menyisipkan token ke setiap request
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    
    // FIXED: Cegah pengiriman token fiktif (null/undefined/kosong)
    if (token && token !== 'null' && token !== 'undefined' && token.trim() !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;