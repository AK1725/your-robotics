import express from 'express';
import { createOrder, listOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.use(protect);
router.post('/', createOrder);
router.get('/', listOrders);
export default router;
