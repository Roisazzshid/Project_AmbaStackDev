require('dotenv').config();
const express = require('express');
const path = require('path'); 
const db = require('./config/db'); // Memanggil koneksi DB
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Buka akses publik ke folder uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
  res.json({ message: 'API AmbaCart Berjalan!' });
});

// Endpoint Uji Coba Database
app.get('/test-db', (req, res) => {
  db.query('SHOW TABLES', (err, results) => {
    if (err) return res.status(500).json({ error: 'Gagal melakukan query' });
    res.json({ message: 'Koneksi Sukses!', tables: results });
  });
});

app.use('/api/products', productRoutes); 
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});