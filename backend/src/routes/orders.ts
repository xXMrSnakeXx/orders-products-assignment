import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
} from '../controllers/ordersController.js';

const router = Router();

router.get('/', getAllOrders);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
