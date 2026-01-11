const mongoose = require('mongoose');

const moderationHistorySchema = new mongoose.Schema({
  testimonyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Testimony',
    required: [true, 'Testimony ID is required']
  },
  action: {
    type: String,
    enum: {
      values: ['VALIDATE', 'REJECT', 'DELETE', 'RESTORE'],
      message: 'Action must be VALIDATE, REJECT, DELETE, or RESTORE'
    },
    required: [true, 'Action is required']
  },
  moderatorId: {
    type: String,
    required: [true, 'Moderator ID is required']
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

moderationHistorySchema.index({ testimonyId: 1, createdAt: -1 });
moderationHistorySchema.index({ moderatorId: 1, createdAt: -1 });

const ModerationHistory = mongoose.model('ModerationHistory', moderationHistorySchema);

module.exports = ModerationHistory;
