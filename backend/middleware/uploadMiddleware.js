const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cek apakah folder 'uploads' ada, jika tidak, buat foldernya
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 1. Konfigurasi Storage & Rename File Otomatis
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // File akan disimpan di folder backend/uploads/
    },
    filename: function (req, file, cb) {
        // Format: timestamp-randomangka.ekstensi (contoh: 1690123-456.jpg)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});

//2. Validasi Tipe File (Hanya menerima gambar)
const fileFilter = (req, file, cb) => {
    const allowedExts = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    // Kita buat logikanya sangat longgar dulu untuk testing
    if (allowedExts.includes(ext) || file.mimetype.startsWith('image/')) {
        console.log("Status: DITERIMA");
        cb(null, true);
    } else {
        console.log("Status: DITOLAK");
        cb(new Error('Validasi Error: Hanya file gambar (JPG, JPEG, PNG, WEBP) yang diperbolehkan!'), false);
    }
};

// 3. Inisialisasi Multer dengan batasan ukuran 2MB
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Maksimal 2 MB
    fileFilter: fileFilter
});

module.exports = upload;
