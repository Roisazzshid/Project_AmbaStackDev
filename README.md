# 🛒 AmbaCart - Mini E-Commerce Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

**AmbaCart** adalah platform mini e-commerce single vendor berbasis web yang dirancang untuk memfasilitasi transaksi jual-beli dengan antarmuka (UI/UX) yang interaktif, cepat, dan responsif. Proyek ini dikembangkan sebagai bentuk implementasi arsitektur **Fullstack** (React.js & Express.js) dengan penerapan keamanan sistem yang ketat melalui *Role-Based Access Control* (RBAC) dan JWT Authentication.

Aplikasi ini dibangun untuk memenuhi tugas akhir mata kuliah **Pemrograman Fullstack** di STT Terpadu Nurul Fikri.

---

## 🚀 Fitur Utama

Sistem AmbaCart memisahkan hak akses secara tegas antara **Pembeli (Customer)** dan **Pengelola Toko (Admin)**.

### 🛍️ Sisi Pembeli (Customer)
- **Autentikasi & Profil:** Pendaftaran dan login akun yang aman (dilindungi JWT), serta manajemen alamat pengiriman.
- **Eksplorasi Katalog:** Pencarian produk real-time dan penyaringan (filter) berdasarkan kategori.
- **Manajemen Keranjang (Cart):** Validasi stok otomatis saat menambah atau mengurangi barang.
- **Checkout & Simulasi Pembayaran:** Proses pesanan dengan kalkulasi ongkos kirim dan berbagai pilihan metode pembayaran (GoPay, DANA, SeaBank, QRIS).
- **Order History & Review:** Pelacakan status pengiriman, pengajuan *refund* dengan bukti foto, dan pemberian rating/ulasan.
- **Live Chat & Notifikasi:** Komunikasi langsung dengan penjual dan notifikasi pembaruan status pesanan.

### 🛡️ Sisi Penjual (Admin / Seller Centre)
- **Dashboard Analitik:** Ringkasan pendapatan (7 Hari, 30 Hari, 1 Tahun) dan grafik penjualan interaktif.
- **CRUD Inventaris:** Manajemen penuh untuk menambah, mengedit, dan menghapus Kategori serta Produk.
- **Manajemen Pesanan:** Memproses pesanan masuk, mencetak label pengiriman/resi otomatis, dan menangani pengajuan *refund*.
- **Manajemen Keuangan:** Fitur penarikan saldo (Withdraw) ke rekening bank dari total pendapatan bersih.

---

## 🛠️ Tech Stack

**Frontend:**
- [React.js](https://reactjs.org/) (Vite)
- React Router Dom (Routing)
- Context API (State Management)
- Bootstrap 5 & Custom CSS (Styling UI)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- MySQL2 (Database Driver)
- JSON Web Token / JWT (Authentication & Authorization)
- Multer (File & Image Upload Handling)
- Bcrypt (Password Hashing)

---

## 🗄️ Desain Database (ERD)

Database `ambacart_db` terdiri dari beberapa tabel utama yang saling berelasi:
1. `users` - Menyimpan kredensial, role, dan profil.
2. `products` & `categories` - Menyimpan katalog barang.
3. `orders` & `order_items` - Mencatat riwayat transaksi.
4. `ratings`, `chats`, `notifications` - Menyimpan data interaksi pengguna.

---

## ⚙️ Cara Instalasi & Menjalankan Proyek Secara Lokal

Pastikan Anda sudah menginstal **Node.js** dan **MySQL** di komputer Anda.

### 1. Clone Repository

```bash
git clone https://github.com/username-kamu/AmbaCart.git
cd AmbaCart
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat database baru di MySQL dengan nama `ambacart_db`.

Import file `ambacart_db.sql` (berada di folder `backend/database/`) ke dalam database tersebut.

Buat file `.env` di dalam folder `backend` dan sesuaikan konfigurasi database Anda:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ambacart_db
JWT_SECRET=rahasia_ambacart_super_aman
PORT=8000
```

Jalankan server backend:

```bash
npm run dev
```

### 3. Setup Frontend

Buka terminal baru, lalu masuk ke folder frontend.

```bash
cd frontend
npm install
```

Sesuaikan `BASE_IMAGE_URL` di file `frontend/src/utils/http.js` (jika diperlukan).

Jalankan server frontend:

```bash
npm run dev
```

Aplikasi sekarang dapat diakses melalui [http://localhost:5173](http://localhost:5173).

---

## 👨‍💻 Tim Pengembang

Proyek ini dikembangkan oleh Kelompok AmbaStackDev Mata Kuliah Pemrograman Fullstack:

- **Raka Dwi Randika** 
- **Rois Azzam Shiddiq** 
- **Noval Putra Siregar**
- **Haikal Pilar Yudhistira** 
- **Sayed Muhammad Qadri** 

**Dosen Pengampu:** Akhmad Arip, S.Kom.

---

*"Belanja Puas, Harga Pas di AmbaCart!"* 🚀
