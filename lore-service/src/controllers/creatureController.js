const creatureService = require('../services/creatureService');

class CreatureController {
  async createCreature(req, res, next) {
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

      const { name, origin } = req.body;

      if (!name) {
        return res.status(400).json({
          error: {
            message: 'Validation error: name is required',
            status: 400
          }
        });
      }

      const creature = await creatureService.createCreature(authorId, { name, origin });

      res.status(201).json({
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
      const creature = await creatureService.getCreatureById(id);

      res.status(200).json({
        creature
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCreatures(req, res, next) {
    try {
      const { limit, skip, authorId } = req.query;

      const filters = {};
      if (authorId) {
        filters.authorId = authorId;
      }

      const options = {
        limit: limit ? parseInt(limit) : 50,
        skip: skip ? parseInt(skip) : 0
      };

      const result = await creatureService.getAllCreatures(filters, options);

      res.status(200).json({
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
      const authorId = req.user?.id || req.body.authorId;

      if (!authorId) {
        return res.status(401).json({
          error: {
            message: 'Unauthorized: authorId is required',
            status: 401
          }
        });
      }

      const { name, origin } = req.body;
      const updateData = {};

      if (name !== undefined) updateData.name = name;
      if (origin !== undefined) updateData.origin = origin;

      const creature = await creatureService.updateCreature(id, authorId, updateData);

      res.status(200).json({
        message: 'Creature updated successfully',
        creature
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCreature(req, res, next) {
    try {
      const { id } = req.params;
      const authorId = req.user?.id || req.body.authorId;

      if (!authorId) {
        return res.status(401).json({
          error: {
            message: 'Unauthorized: authorId is required',
            status: 401
          }
        });
      }

      const result = await creatureService.deleteCreature(id, authorId);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CreatureController();
