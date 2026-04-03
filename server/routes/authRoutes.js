import express from 'express';
import { loginAdmin, logoutAdmin, getAdminProfile } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/admin/login', loginAdmin);
router.post('/admin/logout', logoutAdmin);
router.get('/me', protectAdmin, getAdminProfile);

export default router;
