import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrdersWithProducts,
  updateOrder,
} from '../controllers/ordersController.js';

const router = Router();

router.get('/', getAllOrdersWithProducts);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
