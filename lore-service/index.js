require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const healthRoutes = require('./src/routes/healthRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/health', healthRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Lore service running on port ${PORT}`);
});

module.exports = app;
