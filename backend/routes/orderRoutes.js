const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const verifyToken = require('../middleware/verifyToken'); // Sesuaikan path middleware JWT kamu

// Endpoint untuk checkout (Wajib Login)
router.post('/checkout', verifyToken, OrderController.checkout);

module.exports = router;