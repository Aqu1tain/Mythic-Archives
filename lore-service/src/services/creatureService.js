const creatureRepository = require('../repositories/creatureRepository');
const mongoose = require('mongoose');

class CreatureService {
  async createCreature(authorId, creatureData) {
    const { name, origin } = creatureData;

    const existingCreature = await creatureRepository.findByName(name);
    if (existingCreature) {
      const error = new Error('A creature with this name already exists');
      error.status = 409;
      throw error;
    }

    const creature = await creatureRepository.create({
      authorId,
      name,
      origin
    });

    return creature;
  }

  async getCreatureById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('Invalid creature ID');
      error.status = 400;
      throw error;
    }

    const creature = await creatureRepository.findById(id);
    if (!creature) {
      const error = new Error('Creature not found');
      error.status = 404;
      throw error;
    }

    return creature;
  }

  async getAllCreatures(filters = {}, options = {}) {
    const creatures = await creatureRepository.findAll(filters, options);
    const total = await creatureRepository.count(filters);

    return {
      creatures,
      total,
      limit: options.limit || 50,
      skip: options.skip || 0
    };
  }

  async updateCreature(id, authorId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('Invalid creature ID');
      error.status = 400;
      throw error;
    }

    const creature = await creatureRepository.findById(id);
    if (!creature) {
      const error = new Error('Creature not found');
      error.status = 404;
      throw error;
    }

    if (creature.authorId !== authorId) {
      const error = new Error('Unauthorized: You can only update your own creatures');
      error.status = 403;
      throw error;
    }

    if (updateData.name && updateData.name !== creature.name) {
      const existingCreature = await creatureRepository.findByName(updateData.name);
      if (existingCreature) {
        const error = new Error('A creature with this name already exists');
        error.status = 409;
        throw error;
      }
    }

    const updatedCreature = await creatureRepository.update(id, updateData);
    return updatedCreature;
  }

  async deleteCreature(id, authorId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('Invalid creature ID');
      error.status = 400;
      throw error;
    }

    const creature = await creatureRepository.findById(id);
    if (!creature) {
      const error = new Error('Creature not found');
      error.status = 404;
      throw error;
    }

    if (creature.authorId !== authorId) {
      const error = new Error('Unauthorized: You can only delete your own creatures');
      error.status = 403;
      throw error;
    }

    await creatureRepository.delete(id);
    return { message: 'Creature deleted successfully' };
  }
}

module.exports = new CreatureService();
