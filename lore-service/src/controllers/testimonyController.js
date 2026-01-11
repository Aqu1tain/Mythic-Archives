const testimonyService = require('../services/testimonyService');
const { HTTP_STATUS } = require('../constants');
const { extractUserId, parsePaginationParams } = require('../utils/helpers');

class TestimonyController {
  async createTestimony(req, res, next) {
    try {
      const authorId = extractUserId(req);

      if (!authorId) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          error: {
            message: 'Unauthorized: authorId is required',
            status: HTTP_STATUS.UNAUTHORIZED
          }
        });
      }

      const { creatureId, description } = req.body;

      if (!creatureId || !description) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          error: {
            message: 'Validation error: creatureId and description are required',
            status: HTTP_STATUS.BAD_REQUEST
          }
        });
      }

      const testimony = await testimonyService.createTestimony(authorId, {
        creatureId,
        description
      });

      res.status(HTTP_STATUS.CREATED).json({
        message: 'Testimony created successfully',
        testimony
      });
    } catch (error) {
      next(error);
    }
  }

  async getTestimoniesByCreatureId(req, res, next) {
    try {
      const { id: creatureId } = req.params;
      const { limit, skip } = req.query;

      const options = parsePaginationParams(limit, skip);

      const result = await testimonyService.getTestimoniesByCreatureId(creatureId, options);

      res.status(HTTP_STATUS.OK).json({
        testimonies: result.testimonies,
        pagination: {
          total: result.total,
          limit: result.limit,
          skip: result.skip,
          hasMore: result.skip + result.testimonies.length < result.total
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async validateTestimony(req, res, next) {
    try {
      const { id } = req.params;
      const validatorId = extractUserId(req);
      const validatorRole = req.user?.role;

      if (!validatorId || !validatorRole) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          error: {
            message: 'Unauthorized: authentication required',
            status: HTTP_STATUS.UNAUTHORIZED
          }
        });
      }

      const testimony = await testimonyService.validateTestimony(id, validatorId, validatorRole);

      res.status(HTTP_STATUS.OK).json({
        message: 'Testimony validated successfully',
        testimony
      });
    } catch (error) {
      next(error);
    }
  }

  async rejectTestimony(req, res, next) {
    try {
      const { id } = req.params;
      const rejecterId = extractUserId(req);

      if (!rejecterId) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          error: {
            message: 'Unauthorized: rejecterId is required',
            status: HTTP_STATUS.UNAUTHORIZED
          }
        });
      }

      const testimony = await testimonyService.rejectTestimony(id, rejecterId);

      res.status(HTTP_STATUS.OK).json({
        message: 'Testimony rejected successfully',
        testimony
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTestimony(req, res, next) {
    try {
      const { id } = req.params;
      const moderatorId = extractUserId(req);
      const result = await testimonyService.deleteTestimony(id, moderatorId);
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getUserModerationHistory(req, res, next) {
    try {
      const { id: userId } = req.params;
      const { limit, skip } = req.query;
      const options = parsePaginationParams(limit, skip);

      const histories = await testimonyService.getModerationHistoryByUser(userId, options);

      res.status(HTTP_STATUS.OK).json({
        histories,
        total: histories.length
      });
    } catch (error) {
      next(error);
    }
  }

  async getCreatureModerationHistory(req, res, next) {
    try {
      const { id: creatureId } = req.params;
      const { limit, skip } = req.query;
      const options = parsePaginationParams(limit, skip);

      const histories = await testimonyService.getModerationHistoryByCreature(creatureId, options);

      res.status(HTTP_STATUS.OK).json({
        histories,
        total: histories.length
      });
    } catch (error) {
      next(error);
    }
  }

  async restoreTestimony(req, res, next) {
    try {
      const { id } = req.params;
      const moderatorId = extractUserId(req);
      const result = await testimonyService.restoreTestimony(id, moderatorId);
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TestimonyController();
