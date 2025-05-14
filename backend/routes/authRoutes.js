
import express from 'express';
import { register, login } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/admin-check', protect, (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Not authorized as admin' });
  }
  res.json({ message: 'User is admin', user: req.user });
});

export default router;
