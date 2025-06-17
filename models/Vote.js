import mongoose from 'mongoose';

const voteSchema = mongoose.Schema(
  {
    election: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Election',
    },
    voter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    candidate: {
      type: String,
      required: true,
    },
    votedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one vote per voter per election
voteSchema.index({ election: 1, voter: 1 }, { unique: true });

const Vote = mongoose.model('Vote', voteSchema);

export default Vote;

