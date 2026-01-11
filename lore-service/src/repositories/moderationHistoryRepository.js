const BaseRepository = require('./baseRepository');
const ModerationHistory = require('../models/ModerationHistory');

class ModerationHistoryRepository extends BaseRepository {
  constructor() {
    super(ModerationHistory);
    this.populate = { path: 'testimonyId', select: 'description creatureId' };
  }

  async findByModeratorId(moderatorId, options = {}) {
    return await this.findAll(
      { moderatorId },
      { ...options, populate: this.populate }
    );
  }

  async findByTestimonyId(testimonyId, options = {}) {
    return await this.findAll(
      { testimonyId },
      { ...options, populate: this.populate }
    );
  }

  async findByCreatureId(creatureId, options = {}) {
    const histories = await ModerationHistory.aggregate([
      {
        $lookup: {
          from: 'testimonies',
          localField: 'testimonyId',
          foreignField: '_id',
          as: 'testimony'
        }
      },
      { $unwind: '$testimony' },
      { $match: { 'testimony.creatureId': creatureId } },
      { $sort: { createdAt: -1 } },
      { $skip: options.skip || 0 },
      { $limit: options.limit || 50 }
    ]);

    return histories;
  }
}

module.exports = new ModerationHistoryRepository();
