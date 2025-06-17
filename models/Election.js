import mongoose from 'mongoose';

const candidateSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    party: { type: String },
    manifesto: { type: String },
  },
  { _id: false }
);

const electionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add an election title'],
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: [true, 'Please add a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please add an end date'],
    },
    candidates: [candidateSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Election = mongoose.model('Election', electionSchema);

export default Election;

