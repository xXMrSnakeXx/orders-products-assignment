import { pool } from '../db.js';
export const getAllOrdersWithProducts = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT
        o.id AS order_id,
        o.title,
        o.date AS order_date,
        o.description,
        p.id AS product_id,
        p.serial_number,
        p.is_new,
        p.photo,
        p.title AS product_title,
        p.type,
        p.specification,
        p.guarantee_start,
        p.guarantee_end,
        p.price_usd,
        p.price_uah,
        p.is_default_currency,
        p.date AS product_date,
        p.status,
        p.condition,
        p.username,
        p.group_name
      FROM orders o
      LEFT JOIN products p ON o.id = p.order_id
      ORDER BY o.id ASC, p.id ASC
    `);
        const raw = result.rows;
        const ordersMap = new Map();
        raw.forEach((row) => {
            if (!ordersMap.has(row.order_id)) {
                ordersMap.set(row.order_id, {
                    id: row.order_id,
                    title: row.title,
                    date: row.order_date,
                    description: row.description,
                    products: [],
                    totalUSD: 0,
                    totalUAH: 0,
                    productCount: 0,
                });
            }
            if (row.product_id) {
                const order = ordersMap.get(row.order_id);
                order.products.push({
                    id: row.product_id,
                    serial_number: row.serial_number,
                    is_new: row.is_new,
                    photo: row.photo,
                    title: row.product_title,
                    type: row.type,
                    specification: row.specification,
                    guarantee_start: row.guarantee_start,
                    guarantee_end: row.guarantee_end,
                    price_usd: row.price_usd,
                    price_uah: row.price_uah,
                    is_default_currency: row.is_default_currency,
                    date: row.product_date,
                    status: row.status,
                    condition: row.condition,
                    username: row.username,
                    arrival_name: row.arrival_name,
                    group_name: row.group_name,
                });
                order.productCount += 1;
                order.totalUSD += Number(row.price_usd) || 0;
                order.totalUAH += Number(row.price_uah) || 0;
            }
        });
        res.status(200).json(Array.from(ordersMap.values()));
    }
    catch (error) {
        console.error('[GET /orders-with-products] DB error:', error);
        res.status(500).json({ message: 'Failed to fetch orders with products' });
    }
};
export const createOrder = async (req, res) => {
    try {
        const { title, date, description } = req.body;
        if (!title || !date) {
            return res.status(400).json({ message: 'Title and date are required' });
        }
        const result = await pool.query(`INSERT INTO orders (title, date, description)
       VALUES ($1, $2, $3) RETURNING *`, [title, date, description ?? null]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('[POST /orders] DB error:', error);
        res.status(500).json({ message: 'Failed to create order' });
    }
};
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, description } = req.body;
        if (!title || !date) {
            return res.status(400).json({ message: 'Title and date are required' });
        }
        const result = await pool.query(`UPDATE orders
       SET title = $1, date = $2, description = $3
       WHERE id = $4
       RETURNING *`, [title, date, description ?? null, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('[PUT /orders/:id] DB error:', error);
        res.status(500).json({ message: 'Failed to update order' });
    }
};
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const deletedOrder = result.rows[0];
        res.status(200).json(deletedOrder);
    }
    catch (error) {
        console.error('[DELETE /orders/:id] DB error:', error);
        res.status(500).json({ message: 'Failed to delete order' });
    }
};
