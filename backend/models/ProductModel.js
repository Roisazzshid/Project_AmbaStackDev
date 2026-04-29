const db = require('../config/db');

class ProductModel {

    // GET semua produk
    static getAllProducts(callback) {
        db.query('SELECT * FROM products', (err, results) => {
            callback(err, results);
        });
    }

    // GET produk by ID (untuk keperluan update - ambil image lama)
    static getProductById(id, callback) {
        db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
            callback(err, results[0]);
        });
    }

    // CREATE - tambahkan kolom image
    static create(data, callback) {
        const query = `
            INSERT INTO products (name, description, price, stock, image, category_id) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(
            query,
            [data.name, data.description, data.price, data.stock, data.image, data.category_id],
            (err, results) => {
                callback(err, results);
            }
        );
    }

    // UPDATE - tambahkan kolom image
    static update(id, data, callback) {
        const query = `
            UPDATE products 
            SET name=?, description=?, price=?, stock=?, image=?, category_id=? 
            WHERE id=?
        `;
        db.query(
            query,
            [data.name, data.description, data.price, data.stock, data.image, data.category_id, id],
            (err, results) => {
                callback(err, results);
            }
        );
    }

    // DELETE produk by ID
    static delete(id, callback) {
        db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
            callback(err, results);
        });
    }
}

module.exports = ProductModel;