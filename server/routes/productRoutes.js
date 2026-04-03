import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', protectAdmin, upload.single('image'), createProduct);
router.put('/:id', protectAdmin, upload.single('image'), updateProduct);
router.delete('/:id', protectAdmin, deleteProduct);

export default router;
