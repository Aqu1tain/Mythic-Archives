const testimonyService = require('../services/testimonyService');

class TestimonyController {
  async createTestimony(req, res, next) {
    try {
      const authorId = req.user?.id || req.body.authorId;

      if (!authorId) {
        return res.status(401).json({
          error: {
            message: 'Unauthorized: authorId is required',
            status: 401
          }
        });
      }

      const { creatureId, description } = req.body;

      if (!creatureId || !description) {
        return res.status(400).json({
          error: {
            message: 'Validation error: creatureId and description are required',
            status: 400
          }
        });
      }

      const testimony = await testimonyService.createTestimony(authorId, {
        creatureId,
        description
      });

      res.status(201).json({
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

      const options = {
        limit: limit ? parseInt(limit) : 50,
        skip: skip ? parseInt(skip) : 0
      };

      const result = await testimonyService.getTestimoniesByCreatureId(creatureId, options);

      res.status(200).json({
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
      const validatorId = req.user?.id || req.body.validatorId;
      const validatorRole = req.user?.role;

      if (!validatorId || !validatorRole) {
        return res.status(401).json({
          error: {
            message: 'Unauthorized: authentication required',
            status: 401
          }
        });
      }

      const testimony = await testimonyService.validateTestimony(id, validatorId, validatorRole);

      res.status(200).json({
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
      const rejecterId = req.user?.id || req.body.rejecterId;

      if (!rejecterId) {
        return res.status(401).json({
          error: {
            message: 'Unauthorized: rejecterId is required',
            status: 401
          }
        });
      }

      const testimony = await testimonyService.rejectTestimony(id, rejecterId);

      res.status(200).json({
        message: 'Testimony rejected successfully',
        testimony
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TestimonyController();
