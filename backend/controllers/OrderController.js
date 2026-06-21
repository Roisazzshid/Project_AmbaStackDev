const db = require('../config/db');

class OrderController {
    static checkout(req, res) {
        // req.user.id ini didapat dari middleware verifyToken yang mengekstrak JWT
        const userId = req.user.id; 
        const { items, total_price, shipping_address } = req.body;

        // Validasi jika keranjang kosong
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Keranjang kosong!' });
        }

        // 1. Insert ke tabel orders terlebih dahulu
        const queryOrder = 'INSERT INTO orders (user_id, total_price, status, shipping_address) VALUES (?, ?, ?, ?)';
        db.query(queryOrder, [userId, total_price, 'PENDING', shipping_address], (err, orderResult) => {
            if (err) return res.status(500).json({ error: err.message });
            
            // Ambil ID dari order yang baru saja dibuat
            const orderId = orderResult.insertId;
            
            // 2. Petakan items dari FE menjadi format array multi-dimensi [[order_id, product_id, quantity, price], ...]
            const orderItemsData = items.map(item => [orderId, item.id, item.quantity, item.price]);
            
            // 3. Bulk insert ke tabel order_items
            const queryItems = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
            
            db.query(queryItems, [orderItemsData], (err, itemResult) => {
                if (err) return res.status(500).json({ error: err.message });
                
                // Jika semua berhasil, return response sukses ke Frontend
                res.status(201).json({ 
                    success: true, 
                    message: 'Checkout Berhasil!', 
                    order_id: orderId 
                });
            });
        });
    }

    // [Untuk Admin] Tarik semua pesanan
    static getAllAdminOrders(req, res) {
        db.query('SELECT * FROM orders ORDER BY created_at DESC', (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, data: results });
        });
    }

    // [Untuk Admin] Update Resi & Status
    static updateOrderStatus(req, res) {
        const { order_id } = req.params;
        const { status, tracking_number } = req.body;
        db.query(
            'UPDATE orders SET status = ?, tracking_number = ? WHERE id = ?',
            [status, tracking_number, order_id],
            (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ success: true, message: 'Resi berhasil diupdate!' });
            }
        );
    }

    // [Untuk Pembeli] Lihat riwayat resi
    static getUserOrders(req, res) {
        const userId = req.user.id;
        db.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, data: results });
        });
    }
}

module.exports = OrderController;