require('dotenv').config();
const mongoose = require('mongoose');
const Creature = require('./src/models/Creature');
const Testimony = require('./src/models/Testimony');

async function cleanupDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Creature.deleteMany({});
    console.log('✅ All creatures deleted');

    await Testimony.deleteMany({});
    console.log('✅ All testimonies deleted');

    console.log('✅ Database cleaned successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

cleanupDatabase();
