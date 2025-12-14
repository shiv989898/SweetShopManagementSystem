import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from '../backend/src/config/database';
import authRoutes from '../backend/src/routes/authRoutes';
import sweetRoutes from '../backend/src/routes/sweetRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Connect to database before handling any request
app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sweet Shop API is running' });
});

export default app;
