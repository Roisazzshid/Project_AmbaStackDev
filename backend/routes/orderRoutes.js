const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/checkout', verifyToken, OrderController.checkout);
router.get('/admin/all', verifyToken, isAdmin, OrderController.getAllAdminOrders);
router.put('/admin/:order_id/status', verifyToken, isAdmin, OrderController.updateOrderStatus);
router.get('/my-orders', verifyToken, OrderController.getUserOrders);

module.exports = router;