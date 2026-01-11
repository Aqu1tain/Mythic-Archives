const mythologyService = require('../services/mythologyService');

class MythologyController {
  async getStats(req, res, next) {
    try {
      const stats = await mythologyService.getStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MythologyController();
