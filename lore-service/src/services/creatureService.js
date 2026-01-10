const creatureRepository = require('../repositories/creatureRepository');
const mongoose = require('mongoose');
const { ValidationError, NotFoundError, ConflictError } = require('../utils/errors');
const { ERROR_MESSAGES } = require('../constants');

class CreatureService {
  /**
   * Helper method to fetch creatures with optional legendScore
   * @private
   */
  async _fetchCreatures(filters, options, repositoryMethod) {
    const { sortBy } = options;

    let creatures;
    if (sortBy === 'legendScore') {
      creatures = await creatureRepository.findAllWithLegendScore(filters, options);
    } else {
      creatures = await repositoryMethod(filters, options);
    }

    const total = await creatureRepository.count(filters);

    return {
      creatures,
      total,
      limit: options.limit || 50,
      skip: options.skip || 0
    };
  }

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

  async getCreatureById(id, includeScore = false) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ValidationError(ERROR_MESSAGES.INVALID_CREATURE_ID);
    }

    let creature;
    if (includeScore) {
      const objectId = new mongoose.Types.ObjectId(id);
      creature = await creatureRepository.findByIdWithLegendScore(objectId);
    } else {
      creature = await creatureRepository.findById(id);
    }

    if (!creature) {
      throw new NotFoundError(ERROR_MESSAGES.CREATURE_NOT_FOUND);
    }

    return creature;
  }

  async getAllCreatures(options = {}) {
    return this._fetchCreatures(
      {},
      options,
      (filters, opts) => creatureRepository.findAll(filters, opts)
    );
  }

  async getCreaturesByAuthor(authorId, options = {}) {
    return this._fetchCreatures(
      { authorId },
      options,
      (filters, opts) => creatureRepository.findByAuthor(authorId, opts)
    );
  }

  async searchCreatures(searchTerm, options = {}) {
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedTerm, 'i');
    const filters = {
      $or: [
        { name: regex },
        { origin: regex }
      ]
    };

    return this._fetchCreatures(
      filters,
      options,
      () => creatureRepository.search(escapedTerm, options)
    );
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
