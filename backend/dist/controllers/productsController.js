import { pool } from '../db.js';
export const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query(`
SELECT p.*, o.title AS arrival_name
FROM products p
JOIN orders o ON p.order_id = o.id;
    `);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('[GET /products] DB error:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};
export const createProduct = async (req, res) => {
    try {
        const { serial_number, is_new, photo, title, type, specification, guarantee_start, guarantee_end, price_usd, price_uah, is_default_currency, order_id, date, status, condition, username, arrival_name, group_name, } = req.body;
        const result = await pool.query(`INSERT INTO products (
        serial_number, is_new, photo, title, type, specification,
        guarantee_start, guarantee_end, price_usd, price_uah,
        is_default_currency, order_id, date,
        status, condition, username, arrival_name, group_name
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10,
        $11, $12, $13,
        $14, $15, $16, $17, $18
      ) RETURNING *`, [
            serial_number,
            is_new,
            photo,
            title,
            type,
            specification,
            guarantee_start,
            guarantee_end,
            price_usd,
            price_uah,
            is_default_currency,
            order_id,
            date,
            status,
            condition,
            username,
            arrival_name,
            group_name,
        ]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('[POST /products] DB error:', error);
        res.status(500).json({ message: 'Failed to create product' });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { serial_number, is_new, photo, title, type, specification, guarantee_start, guarantee_end, price_usd, price_uah, is_default_currency, order_id, date, status, condition, username, arrival_name, group_name, } = req.body;
        const result = await pool.query(`UPDATE products SET
        serial_number = $1,
        is_new = $2,
        photo = $3,
        title = $4,
        type = $5,
        specification = $6,
        guarantee_start = $7,
        guarantee_end = $8,
        price_usd = $9,
        price_uah = $10,
        is_default_currency = $11,
        order_id = $12,
        date = $13,
        status = $14,
        condition = $15,
        username = $16,
        arrival_name = $17,
        group_name = $18
      WHERE id = $19
      RETURNING *`, [
            serial_number,
            is_new,
            photo,
            title,
            type,
            specification,
            guarantee_start,
            guarantee_end,
            price_usd,
            price_uah,
            is_default_currency,
            order_id,
            date,
            status,
            condition,
            username,
            arrival_name,
            group_name,
            id,
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('[PUT /products/:id] DB error:', error);
        res.status(500).json({ message: 'Failed to update product' });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    }
    catch (error) {
        console.error('[DELETE /products/:id] DB error:', error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};
