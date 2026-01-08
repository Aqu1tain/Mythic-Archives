const BaseRepository = require('./baseRepository');
const Testimony = require('../models/Testimony');
const { TIME_CONSTRAINTS } = require('../constants');

class TestimonyRepository extends BaseRepository {
  constructor() {
    super(Testimony);
    this.populate = { path: 'creatureId', select: 'name origin' };
  }

  async findById(id) {
    return await super.findById(id, this.populate);
  }

  async findByCreatureId(creatureId, options = {}) {
    return await this.findAll(
      { creatureId },
      { ...options, populate: this.populate }
    );
  }

  async findRecentByAuthorAndCreature(authorId, creatureId, minutesAgo = TIME_CONSTRAINTS.TESTIMONY_COOLDOWN) {
    const timeThreshold = new Date(Date.now() - minutesAgo * 60 * 1000);
    return await this.findOne({
      authorId,
      creatureId,
      createdAt: { $gte: timeThreshold }
    });
  }

  async update(id, updateData) {
    const updated = await super.update(id, updateData);
    if (updated) {
      return await this.findById(id);
    }
    return updated;
  }

  async findAll(filters = {}, options = {}) {
    return await super.findAll(filters, {
      ...options,
      populate: this.populate
    });
  }
}

module.exports = new TestimonyRepository();
