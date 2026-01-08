const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
  creatureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creature',
    required: [true, 'Creature ID is required'],
    index: true
  },
  authorId: {
    type: String,
    required: [true, 'Author ID is required'],
    index: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: {
      values: ['PENDING', 'VALIDATED', 'REJECTED'],
      message: 'Status must be PENDING, VALIDATED, or REJECTED'
    },
    default: 'PENDING',
    index: true
  },
  validatedBy: {
    type: String,
    default: null,
    index: true
  },
  validatedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
    index: true
  }
}, {
  timestamps: false,
  versionKey: false
});

testimonySchema.index({ creatureId: 1, authorId: 1, createdAt: -1 });
testimonySchema.index({ status: 1, createdAt: -1 });
testimonySchema.index({ authorId: 1, createdAt: -1 });

const Testimony = mongoose.model('Testimony', testimonySchema);

module.exports = Testimony;
