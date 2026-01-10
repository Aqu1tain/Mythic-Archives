const testimonyRepository = require('../repositories/testimonyRepository');
const creatureRepository = require('../repositories/creatureRepository');
const mongoose = require('mongoose');
const axios = require('axios');
const {
  ValidationError,
  NotFoundError,
  AuthorizationError,
  RateLimitError
} = require('../utils/errors');
const {
  ERROR_MESSAGES,
  TESTIMONY_STATUS,
  TIME_CONSTRAINTS,
  PAGINATION
} = require('../constants');

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
const SERVICE_SECRET = process.env.SERVICE_SECRET || 'default-secret-change-in-production';

class TestimonyService {
  async updateReputation(userId, points) {
    try {
      await axios.post(
        `${AUTH_SERVICE_URL}/users/${userId}/reputation`,
        { points },
        { headers: { 'x-service-secret': SERVICE_SECRET } }
      );
    } catch (error) {
      console.error(`Failed to update reputation for user ${userId}:`, error.message);
    }
  }
  async createTestimony(authorId, testimonyData) {
    const { creatureId, description } = testimonyData;

    if (!mongoose.Types.ObjectId.isValid(creatureId)) {
      throw new ValidationError(ERROR_MESSAGES.INVALID_CREATURE_ID);
    }

    const creature = await creatureRepository.findById(creatureId);
    if (!creature) {
      throw new NotFoundError(ERROR_MESSAGES.CREATURE_NOT_FOUND);
    }

    const recentTestimony = await testimonyRepository.findRecentByAuthorAndCreature(
      authorId,
      creatureId,
      TIME_CONSTRAINTS.TESTIMONY_COOLDOWN
    );

    if (recentTestimony) {
      throw new RateLimitError(ERROR_MESSAGES.TESTIMONY_DUPLICATE);
    }

    const testimony = await testimonyRepository.create({
      creatureId,
      authorId,
      description,
      status: TESTIMONY_STATUS.PENDING
    });

    return testimony;
  }

  async getTestimoniesByCreatureId(creatureId, options = {}) {
    if (!mongoose.Types.ObjectId.isValid(creatureId)) {
      throw new ValidationError(ERROR_MESSAGES.INVALID_CREATURE_ID);
    }

    const testimonies = await testimonyRepository.findByCreatureId(creatureId, options);
    const total = await testimonyRepository.count({ creatureId });

    return {
      testimonies,
      total,
      limit: options.limit || PAGINATION.DEFAULT_LIMIT,
      skip: options.skip || PAGINATION.DEFAULT_SKIP
    };
  }

  async getTestimonyById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ValidationError(ERROR_MESSAGES.INVALID_TESTIMONY_ID);
    }

    const testimony = await testimonyRepository.findById(id);
    if (!testimony) {
      throw new NotFoundError(ERROR_MESSAGES.TESTIMONY_NOT_FOUND);
    }

    return testimony;
  }

  async validateTestimony(testimonyId, validatorId, validatorRole) {
    if (!mongoose.Types.ObjectId.isValid(testimonyId)) {
      throw new ValidationError(ERROR_MESSAGES.INVALID_TESTIMONY_ID);
    }

    const testimony = await testimonyRepository.findById(testimonyId);
    if (!testimony) {
      throw new NotFoundError(ERROR_MESSAGES.TESTIMONY_NOT_FOUND);
    }

    if (String(testimony.authorId) === String(validatorId)) {
      throw new AuthorizationError(ERROR_MESSAGES.SELF_VALIDATION);
    }

    if (testimony.status !== TESTIMONY_STATUS.PENDING) {
      throw new ValidationError(ERROR_MESSAGES.ALREADY_VALIDATED(testimony.status));
    }

    const updatedTestimony = await testimonyRepository.update(testimonyId, {
      status: TESTIMONY_STATUS.VALIDATED,
      validatedBy: validatorId,
      validatedAt: new Date()
    });

    const basePoints = 3;
    const expertBonus = validatorRole === 'EXPERT' ? 1 : 0;
    await this.updateReputation(testimony.authorId, basePoints + expertBonus);

    return updatedTestimony;
  }

  async rejectTestimony(testimonyId, rejecterId) {
    if (!mongoose.Types.ObjectId.isValid(testimonyId)) {
      throw new ValidationError(ERROR_MESSAGES.INVALID_TESTIMONY_ID);
    }

    const testimony = await testimonyRepository.findById(testimonyId);
    if (!testimony) {
      throw new NotFoundError(ERROR_MESSAGES.TESTIMONY_NOT_FOUND);
    }

    if (String(testimony.authorId) === String(rejecterId)) {
      throw new AuthorizationError(ERROR_MESSAGES.SELF_REJECTION);
    }

    if (testimony.status !== TESTIMONY_STATUS.PENDING) {
      throw new ValidationError(ERROR_MESSAGES.ALREADY_VALIDATED(testimony.status));
    }

    const updatedTestimony = await testimonyRepository.update(testimonyId, {
      status: TESTIMONY_STATUS.REJECTED,
      validatedBy: rejecterId,
      validatedAt: new Date()
    });

    await this.updateReputation(testimony.authorId, -1);

    return updatedTestimony;
  }
}

module.exports = new TestimonyService();
