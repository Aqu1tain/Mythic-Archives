const BaseRepository = require('./baseRepository');
const Creature = require('../models/Creature');

class CreatureRepository extends BaseRepository {
  constructor() {
    super(Creature);
  }

  async findByName(name) {
    return await this.model.findOne({ name });
  }

  async findByAuthor(authorId, options = {}) {
    return await this.findAll({ authorId }, options);
  }

  async search(searchTerm, options = {}) {
    const regex = new RegExp(searchTerm, 'i');
    return await this.findAll(
      {
        $or: [
          { name: regex },
          { origin: regex }
        ]
      },
      options
    );
  }
}

module.exports = new CreatureRepository();
