import asyncHandler from 'express-async-handler';
import Vote from '../models/Vote.js';
import Election from '../models/Election.js';

// @desc    Cast a vote
// @route   POST /api/votes
// @access  Private (voter)
const castVote = asyncHandler(async (req, res) => {

  const { electionId, candidate } = req.body;

  // Check if election exists and is active
  const election = await Election.findById(electionId);
  if (!election) {
    res.status(404);
    throw new Error('Election not found');
  }
  if (!election.isActive) {
    res.status(400);
    throw new Error('Election is not currently active');
  }

  // Check if user has already voted in this election
  const existingVote = await Vote.findOne({
    election: electionId,
    voter: req.user._id,
  });
  if (existingVote) {
    res.status(400);
    throw new Error('You have already voted in this election');
  }

  // Validate candidate is valid
  const validCandidate = election.candidates.find(
    (c) => c.name === candidate
  );
  if (!validCandidate) {
    res.status(400);
    throw new Error('Invalid candidate selected');
  }

  // Record vote
  const vote = new Vote({
    election: electionId,
    voter: req.user._id,
    candidate,
  });

  const savedVote = await vote.save();
  res.status(201).json(savedVote);
});

// @desc    Get vote counts for an election (results)
// @route   GET /api/votes/results/:electionId
// @access  Public
const getResults = asyncHandler(async (req, res) => {
  const electionId = req.params.electionId;

  const election = await Election.findById(electionId);
  if (!election) {
    res.status(404);
    throw new Error('Election not found');
  }

  // Aggregate votes by candidate
  const results = await Vote.aggregate([
    { $match: { election: election._id } },
    {
      $group: {
        _id: '$candidate',
        votes: { $sum: 1 },
      },
    },
    { $sort: { votes: -1 } },
  ]);

  res.json({
    election: election.title,
    results,
  });
});

export { castVote, getResults };

