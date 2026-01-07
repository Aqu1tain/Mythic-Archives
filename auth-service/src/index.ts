import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'auth-service' });
});

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
