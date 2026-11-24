import express from 'express';
const app = express();

import bookRoutes from './routes/books.js';

const PORT = process.env.PORT || 5000;
import dotenv from 'dotenv';
dotenv.config();


app.use(express.json());

import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

app.use('/books', bookRoutes);




app.use(cors({ origin: '*' }));
app.use(morgan('dev'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected locally'))
  .catch(err => console.error('❌ Connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});