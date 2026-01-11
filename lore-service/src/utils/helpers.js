const { PAGINATION } = require('../constants');

const extractUserId = (req) => req.user?.id || req.body.authorId;

const parsePaginationParams = (limit, skip) => ({
  limit: limit ? parseInt(limit, 10) : PAGINATION.DEFAULT_LIMIT,
  skip: skip ? parseInt(skip, 10) : PAGINATION.DEFAULT_SKIP
});

const isOwner = (resourceOwnerId, userId) =>
  String(resourceOwnerId) === String(userId);

module.exports = {
  extractUserId,
  parsePaginationParams,
  isOwner
};
