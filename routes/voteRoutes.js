import express from 'express';
import { castVote, getResults } from '../controllers/voteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, castVote); // this is correct
router.get('/results/:electionId', getResults);

export default router;
