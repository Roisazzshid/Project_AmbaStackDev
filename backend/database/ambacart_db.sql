-- ==========================================
-- FILE DATABASE AMBACART (UPDATE SPRINT 10)
-- ==========================================

-- 1. Membuat Database
CREATE DATABASE IF NOT EXISTS ambacart_db;
USE ambacart_db;

-- 2. Membuat Tabel users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Membuat Tabel categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- 4. Membuat Tabel products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image VARCHAR(255), -- UPDATE SPRINT 7: Diubah dari image_url menjadi image
    location VARCHAR(100) DEFAULT 'Gudang Pusat', -- UPDATE SPRINT 10: Penambahan lokasi produk
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 5. Membuat Tabel orders
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(10, 2) NOT NULL,
    shipping_address TEXT NOT NULL,
    status ENUM('pending', 'processing', 'shipped') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Membuat Tabel order_items (Pivot Table)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price_at_buy DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ==========================================
-- SEEDER: DATA DUMMY AWAL (KATEGORI & PRODUK)
-- ==========================================

-- Insert Data Kategori
INSERT INTO categories (id, name, description) VALUES 
(1, 'Elektronik', 'Kumpulan gadget dan barang elektronik mutakhir'),
(2, 'Fashion', 'Pakaian dan aksesoris trendi kekinian'),
(3, 'Peralatan', 'Perlengkapan kerja dan rumah tangga');

-- Insert Data Produk beserta lokasi
INSERT INTO products (category_id, name, description, price, stock, image, location) VALUES 
(1, 'Smart TV 4K Ultra HD 43 Inch Premium', 'TV Pintar resolusi 4K dengan bazel tipis', 3499000.00, 15, '/products/tv.jpg', 'Jakarta Selatan'),
(3, 'Ergonomic Office Chair Hidrolik', 'Kursi kerja nyaman anti sakit punggung', 850000.00, 24, '/products/kursi.webp', 'Tangerang'),
(1, 'Mechanical Keyboard RGB Wireless', 'Keyboard mekanik hotswap switch merah', 620000.00, 50, '/products/keyboard.webp', 'Bandung'),
(2, 'Running Shoes Light Weight', 'Sepatu lari ringan dan bernapas', 450000.00, 30, '/products/sepatu.webp', 'Yogyakarta'),
(2, 'Tas Ransel Laptop Anti Air', 'Tas punggung dengan slot USB charging', 210000.00, 100, '/products/tas.png', 'Semarang'),
(3, 'Airfryer Low Watt Digital 4L', 'Menggoreng sehat tanpa minyak dengan kapasitas besar', 550000.00, 20, '/products/airfry.jpg', 'Surabaya');