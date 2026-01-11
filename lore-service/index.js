require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const healthRoutes = require('./src/routes/healthRoutes');
const creatureRoutes = require('./src/routes/creatureRoutes');
const testimonyRoutes = require('./src/routes/testimonyRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const expertRoutes = require('./src/routes/expertRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
const { helmetConfig, generalLimiter } = require('./src/middlewares/security');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(helmetConfig);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(generalLimiter);

app.use('/health', healthRoutes);
app.use('/creatures', creatureRoutes);
app.use('/testimonies', testimonyRoutes);
app.use('/admin', adminRoutes);
app.use('/expert', expertRoutes);

app.use((_req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  const env = process.env.NODE_ENV || 'development';
  console.log(`🚀 Lore service running on port ${PORT}`);
  console.log(`📍 Environment: ${env}`);
});

module.exports = app;
