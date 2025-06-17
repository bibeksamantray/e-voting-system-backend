import asyncHandler from 'express-async-handler';
import Election from '../models/Election.js';
import Vote from '../models/Vote.js';

const createElection = asyncHandler(async (req, res) => {
  const { title, description, startDate, endDate, candidates } = req.body;

  const election = new Election({
    title,
    description,
    startDate,
    endDate,
    candidates,
    createdBy: req.user._id,
    isActive: false, // Default to false when created
  });

  const createdElection = await election.save();
  res.status(201).json(createdElection);
});

const getElections = asyncHandler(async (req, res) => {
  const elections = await Election.find().sort({ createdAt: -1 });
  res.json(elections);
});

const getElectionById = asyncHandler(async (req, res) => {
  const election = await Election.findById(req.params.id);
  if (election) {
    res.json(election);
  } else {
    res.status(404);
    throw new Error('Election not found');
  }
});

const updateElectionStatus = asyncHandler(async (req, res) => {
  const election = await Election.findById(req.params.id);
  if (!election) {
    res.status(404);
    throw new Error('Election not found');
  }

  // Update isActive based on the request body
  election.isActive = req.body.isActive; // Change this line to use isActive
  await election.save();
  res.json({ message: 'Election status updated', isActive: election.isActive });
});

export {
  createElection,
  getElections,
  getElectionById,
  updateElectionStatus,
};
