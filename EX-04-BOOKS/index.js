import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/users.js';
import { logger } from './middlewares/logger.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Global middlewares
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:5173']
}));
app.use(morgan('dev'));
app.use(logger);

// 2. Routes
app.use('/users', userRoutes);

// 3. 404 & Error handlers (ugu dambeyn)
app.use(notFound);
app.use(errorHandler);

// 4. DB & Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected locally'))
  .catch(err => console.error('❌ Connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});