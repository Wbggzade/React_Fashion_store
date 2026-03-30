import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(protectAdmin);

router.route('/').get(getProducts).post(upload.single('image'), createProduct);
router
  .route('/:id')
  .get(getProductById)
  .put(upload.single('image'), updateProduct)
  .delete(deleteProduct);

export default router;
