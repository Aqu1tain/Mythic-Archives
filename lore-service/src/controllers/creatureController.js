const creatureService = require('../services/creatureService');
const { HTTP_STATUS } = require('../constants');
const { extractUserId, parsePaginationParams } = require('../utils/helpers');

class CreatureController {
  async createCreature(req, res, next) {
    try {
      const authorId = extractUserId(req);

      const creature = await creatureService.createCreature(authorId, {
        name: req.body.name,
        origin: req.body.origin
      });

      res.status(HTTP_STATUS.CREATED).json({
        message: 'Creature created successfully',
        creature
      });
    } catch (error) {
      next(error);
    }
  }

  async getCreatureById(req, res, next) {
    try {
      const { id } = req.params;
      const includeScore = req.query.includeScore === 'true';
      const creature = await creatureService.getCreatureById(id, includeScore);

      res.status(HTTP_STATUS.OK).json({ creature });
    } catch (error) {
      next(error);
    }
  }

  async getAllCreatures(req, res, next) {
    try {
      const { limit, skip, authorId, search, sortBy, sortOrder } = req.query;

      const options = {
        ...parsePaginationParams(limit, skip),
        sortBy: sortBy || 'createdAt',
        sortOrder: sortOrder === 'asc' ? 1 : -1
      };

      let result;
      if (search) {
        result = await creatureService.searchCreatures(search, options);
      } else if (authorId) {
        result = await creatureService.getCreaturesByAuthor(authorId, options);
      } else {
        result = await creatureService.getAllCreatures(options);
      }

      res.status(HTTP_STATUS.OK).json({
        creatures: result.creatures,
        pagination: {
          total: result.total,
          limit: result.limit,
          skip: result.skip,
          hasMore: result.skip + result.creatures.length < result.total
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCreature(req, res, next) {
    try {
      const { id } = req.params;
      const authorId = extractUserId(req);
      const { name, origin } = req.body;

      const updatedCreature = await creatureService.updateCreature(id, authorId, {
        name,
        origin
      });

      res.status(HTTP_STATUS.OK).json({
        message: 'Creature updated successfully',
        creature: updatedCreature
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCreature(req, res, next) {
    try {
      const { id } = req.params;
      const authorId = extractUserId(req);

      const result = await creatureService.deleteCreature(id, authorId);

      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getTestimoniesByCreatureId(req, res, next) {
    try {
      const testimonyController = require('./testimonyController');
      return testimonyController.getTestimoniesByCreatureId(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CreatureController();
