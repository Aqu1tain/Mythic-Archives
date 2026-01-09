const testimonyRepository = require('../repositories/testimonyRepository');
const mongoose = require('mongoose');
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

class TestimonyService {
  async createTestimony(authorId, testimonyData) {
    const { creatureId, description } = testimonyData;

    if (!mongoose.Types.ObjectId.isValid(creatureId)) {
      throw new ValidationError(ERROR_MESSAGES.INVALID_CREATURE_ID);
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

  async validateTestimony(testimonyId, validatorId) {
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

    return updatedTestimony;
  }
}

module.exports = new TestimonyService();
