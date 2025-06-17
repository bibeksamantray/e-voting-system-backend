import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import electionRoutes from './routes/electionRoutes.js';
import voteRoutes from './routes/voteRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // your frontend origin
    credentials: true, // allow cookies and headers
  })
);


// Routes
app.use('/api/votes', voteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/elections', electionRoutes);


// Health check route
app.get('/', (req, res) => {
  res.send('E-Voting System API is running');
});

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
