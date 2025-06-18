import { Request, Response } from 'express';
import { pool } from '../db.js';
import { Order, OrderInput } from '../types.js';

export const getAllOrders = async (
  req: Request<{}, {}, {}, {}>,
  res: Response<Order[] | { message: string }>
) => {
  try {
    const result = await pool.query<Order>(
      'SELECT * FROM orders ORDER BY id ASC'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('[GET /orders] DB error:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export const createOrder = async (
  req: Request<{}, {}, OrderInput>,
  res: Response<Order | { message: string }>
) => {
  try {
    const { title, date, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    const result = await pool.query<Order>(
      `INSERT INTO orders (title, date, description)
       VALUES ($1, $2, $3) RETURNING *`,
      [title, date, description ?? null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('[POST /orders] DB error:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

export const updateOrder = async (
  req: Request<{ id: string }, {}, OrderInput>,
  res: Response<Order | { message: string }>
) => {
  try {
    const { id } = req.params;
    const { title, date, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    const result = await pool.query<Order>(
      `UPDATE orders
       SET title = $1, date = $2, description = $3
       WHERE id = $4
       RETURNING *`,
      [title, date, description ?? null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('[PUT /orders/:id] DB error:', error);
    res.status(500).json({ message: 'Failed to update order' });
  }
};

export const deleteOrder = async (
  req: Request<{ id: string }>,
  res: Response<{ message: string }>
) => {
  try {
    const { id } = req.params;

    const result = await pool.query<Order>(
      'DELETE FROM orders WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    console.error('[DELETE /orders/:id] DB error:', error);
    res.status(500).json({ message: 'Failed to delete order' });
  }
};
