require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const healthRoutes = require('./src/routes/healthRoutes');
const mythologyRoutes = require('./src/routes/mythologyRoutes');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/health', healthRoutes);
app.use('/mythology', mythologyRoutes);

app.use((_req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  });
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

app.listen(PORT, () => {
  const env = process.env.NODE_ENV || 'development';
  console.log(`🚀 Mythology service running on port ${PORT}`);
  console.log(`📍 Environment: ${env}`);
});

module.exports = app;
