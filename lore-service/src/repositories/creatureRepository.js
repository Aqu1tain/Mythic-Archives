const Creature = require('../models/Creature');

class CreatureRepository {
  async create(creatureData) {
    const creature = new Creature(creatureData);
    return await creature.save();
  }

  async findById(id) {
    return await Creature.findById(id);
  }

  async findAll(filters = {}, options = {}) {
    const { limit = 50, skip = 0, sort = { createdAt: -1 } } = options;
    return await Creature.find(filters)
      .sort(sort)
      .limit(limit)
      .skip(skip);
  }

  async findByName(name) {
    return await Creature.findOne({ name });
  }

  async update(id, updateData) {
    return await Creature.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await Creature.findByIdAndDelete(id);
  }

  async count(filters = {}) {
    return await Creature.countDocuments(filters);
  }
}

module.exports = new CreatureRepository();
