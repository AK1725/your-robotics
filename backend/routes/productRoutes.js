import express from 'express';
import { listProducts, getProduct, createProduct } from '../controllers/productController.js';
const router = express.Router();
router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
export default router;
