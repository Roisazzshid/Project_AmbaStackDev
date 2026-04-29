const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); 

router.get('/', ProductController.index);

router.post('/', verifyToken, isAdmin, upload.single('image'), ProductController.store);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), ProductController.update);

module.exports = router;