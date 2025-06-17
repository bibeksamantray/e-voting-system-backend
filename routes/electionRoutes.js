import express from 'express';
import {
  createElection,
  getElections,
  getElectionById,
  updateElectionStatus,
} from '../controllers/electionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getElections);
router.get('/:id', getElectionById);

// Protected routes (admin only)
router.post('/', protect, createElection);
router.put('/:id/status', protect, updateElectionStatus);

export default router;
