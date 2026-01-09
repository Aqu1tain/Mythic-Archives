const creatureRepository = require('../repositories/creatureRepository');
const mongoose = require('mongoose');
const { ValidationError, NotFoundError, ConflictError } = require('../utils/errors');
const { ERROR_MESSAGES } = require('../constants');

class CreatureService {
  async createCreature(authorId, creatureData) {
    const { name, origin } = creatureData;

    const existingCreature = await creatureRepository.findByName(name);
    if (existingCreature) {
      throw new ConflictError(`A creature with the name "${name}" already exists`);
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
      throw new ValidationError(ERROR_MESSAGES.INVALID_CREATURE_ID);
    }

    const creature = await creatureRepository.findById(id);
    if (!creature) {
      throw new NotFoundError(ERROR_MESSAGES.CREATURE_NOT_FOUND);
    }

    return creature;
  }

  async getAllCreatures(options = {}) {
    const creatures = await creatureRepository.findAll({}, options);
    const total = await creatureRepository.count({});

    return {
      creatures,
      total,
      limit: options.limit || 50,
      skip: options.skip || 0
    };
  }

  async getCreaturesByAuthor(authorId, options = {}) {
    const creatures = await creatureRepository.findByAuthor(authorId, options);
    const total = await creatureRepository.count({ authorId });

    return {
      creatures,
      total,
      limit: options.limit || 50,
      skip: options.skip || 0
    };
  }

  async searchCreatures(searchTerm, options = {}) {
    const creatures = await creatureRepository.search(searchTerm, options);
    const regex = new RegExp(searchTerm, 'i');
    const total = await creatureRepository.count({
      $or: [
        { name: regex },
        { origin: regex }
      ]
    });

    return {
      creatures,
      total,
      limit: options.limit || 50,
      skip: options.skip || 0
    };
  }

  async updateCreature(id, authorId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ValidationError(ERROR_MESSAGES.INVALID_CREATURE_ID);
    }

    const creature = await creatureRepository.findById(id);
    if (!creature) {
      throw new NotFoundError(ERROR_MESSAGES.CREATURE_NOT_FOUND);
    }

    if (String(creature.authorId) !== String(authorId)) {
      throw new ConflictError('You can only update your own creatures');
    }

    if (updateData.name && updateData.name !== creature.name) {
      const existingCreature = await creatureRepository.findByName(updateData.name);
      if (existingCreature) {
        throw new ConflictError(`A creature with the name "${updateData.name}" already exists`);
      }
    }

    const updatedCreature = await creatureRepository.update(id, updateData);
    return updatedCreature;
  }

  async deleteCreature(id, authorId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ValidationError(ERROR_MESSAGES.INVALID_CREATURE_ID);
    }

    const creature = await creatureRepository.findById(id);
    if (!creature) {
      throw new NotFoundError(ERROR_MESSAGES.CREATURE_NOT_FOUND);
    }

    if (String(creature.authorId) !== String(authorId)) {
      throw new ConflictError('You can only delete your own creatures');
    }

    await creatureRepository.delete(id);
    return { message: 'Creature deleted successfully' };
  }
}

module.exports = new CreatureService();
