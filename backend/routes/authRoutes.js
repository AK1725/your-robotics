
import express from 'express';
import { register, login, registerAdmin } from '../controllers/authController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/register-admin', registerAdmin);
router.get('/admin-check', protect, isAdmin, (req, res) => {
  res.json({ message: 'User is admin', user: req.user });
});

export default router;
