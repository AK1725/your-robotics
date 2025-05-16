
import express from 'express';
import {
  getUserSettings,
  updateUserSettings,
  updateTheme
} from '../controllers/userSettingsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.get('/', protect, getUserSettings);
router.put('/', protect, updateUserSettings);
router.put('/theme', protect, updateTheme);

export default router;
