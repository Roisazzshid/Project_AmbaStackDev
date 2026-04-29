const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
// Panggil konfigurasi Multer
const upload = require('../middleware/uploadMiddleware'); 

router.get('/', ProductController.index);
// Sisipkan upload.single('image') sebelum ProductController
router.post('/', verifyToken, isAdmin, upload.single('image'), ProductController.store);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), ProductController.update);

module.exports = router;