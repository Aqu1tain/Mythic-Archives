const BaseRepository = require('./baseRepository');
const Testimony = require('../models/Testimony');
const { TIME_CONSTRAINTS } = require('../constants');

class TestimonyRepository extends BaseRepository {
  constructor() {
    super(Testimony);
    this.populate = { path: 'creatureId', select: 'name origin' };
  }

  _addSoftDeleteFilter(filters) {
    return { ...filters, deletedAt: null };
  }

  async findById(id) {
    return await this.findOne({ _id: id }, this.populate);
  }

  async findByCreatureId(creatureId, options = {}) {
    return await this.findAll(
      this._addSoftDeleteFilter({ creatureId }),
      { ...options, populate: this.populate }
    );
  }

  async findRecentByAuthorAndCreature(authorId, creatureId, minutesAgo = TIME_CONSTRAINTS.TESTIMONY_COOLDOWN) {
    const timeThreshold = new Date(Date.now() - minutesAgo * 60 * 1000);
    return await this.findOne(this._addSoftDeleteFilter({
      authorId,
      creatureId,
      createdAt: { $gte: timeThreshold }
    }));
  }

  async update(id, updateData) {
    const updated = await super.update(id, updateData);
    if (updated) {
      return await this.findById(id);
    }
    return updated;
  }

  async findOne(filters, populate = null) {
    return await super.findOne(
      this._addSoftDeleteFilter(filters),
      populate || this.populate
    );
  }

  async findAll(filters = {}, options = {}) {
    return await super.findAll(this._addSoftDeleteFilter(filters), {
      ...options,
      populate: this.populate
    });
  }

  async count(filters = {}) {
    return await super.count(this._addSoftDeleteFilter(filters));
  }

  async softDelete(id) {
    return await super.update(id, { deletedAt: new Date() });
  }
}

module.exports = new TestimonyRepository();
