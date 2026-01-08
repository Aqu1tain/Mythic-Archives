const mongoose = require('mongoose');

const creatureSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: [true, 'Author ID is required'],
    index: true
  },
  name: {
    type: String,
    required: [true, 'Creature name is required'],
    unique: true,
    trim: true,
    minlength: [2, 'Creature name must be at least 2 characters'],
    maxlength: [100, 'Creature name cannot exceed 100 characters']
  },
  origin: {
    type: String,
    trim: true,
    maxlength: [200, 'Origin cannot exceed 200 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
}, {
  timestamps: false,
  versionKey: false
});

creatureSchema.index({ name: 1 });
creatureSchema.index({ authorId: 1 });

const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature;
