
import express from 'express';
import {
  getAllContent,
  getContentBySection,
  createContent,
  updateContent,
  deleteContent
} from '../controllers/websiteContentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes - for frontend display
router.get('/', getAllContent);
router.get('/:section', getContentBySection);

// Protected routes - for admin management
router.post('/', protect, createContent);
router.put('/:id', protect, updateContent);
router.delete('/:id', protect, deleteContent);

export default router;
