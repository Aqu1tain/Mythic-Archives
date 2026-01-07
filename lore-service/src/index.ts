import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import creatureRoutes from './routes/creatureRoutes.js';
import testimonyRoutes from './routes/testimonyRoutes.js';

const app = express();

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lore-service');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'lore-service' });
});

app.use('/', creatureRoutes);
app.use('/', testimonyRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Lore Service running on port ${PORT}`);
});
