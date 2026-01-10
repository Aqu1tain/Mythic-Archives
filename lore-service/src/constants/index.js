/**
 * Application-wide constants
 */

// Testimony Status
const TESTIMONY_STATUS = {
  PENDING: 'PENDING',
  VALIDATED: 'VALIDATED',
  REJECTED: 'REJECTED'
};

// Time constraints (in minutes)
const TIME_CONSTRAINTS = {
  TESTIMONY_COOLDOWN: 5,
  SESSION_TIMEOUT: 30
};

// Pagination defaults
const PAGINATION = {
  DEFAULT_LIMIT: 50,
  MAX_LIMIT: 100,
  DEFAULT_SKIP: 0
};

// Reputation system
const REPUTATION = {
  BASE_VALIDATION_POINTS: 3,
  EXPERT_BONUS: 1,
  REJECTION_PENALTY: -1,
  EXPERT_THRESHOLD: 10,
  MIN_POINTS: -10,
  MAX_POINTS: 10
};

// Validation constraints
const VALIDATION = {
  CREATURE_NAME_MIN: 2,
  CREATURE_NAME_MAX: 100,
  CREATURE_ORIGIN_MAX: 200,
  TESTIMONY_DESC_MIN: 10,
  TESTIMONY_DESC_MAX: 2000
};

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
};

// Error Messages
const ERROR_MESSAGES = {
  // Authentication
  UNAUTHORIZED: 'Unauthorized: authorId is required',
  VALIDATOR_REQUIRED: 'Unauthorized: validatorId is required',
  REJECTER_REQUIRED: 'Unauthorized: rejecterId is required',

  // Validation
  INVALID_CREATURE_ID: 'Invalid creature ID',
  INVALID_TESTIMONY_ID: 'Invalid testimony ID',
  MISSING_FIELDS: 'Validation error: creatureId and description are required',

  // Business Logic
  TESTIMONY_DUPLICATE: 'You have already submitted a testimony for this creature in the last 5 minutes',
  SELF_VALIDATION: 'Cannot validate your own testimony',
  SELF_REJECTION: 'Cannot reject your own testimony',
  ALREADY_VALIDATED: (status) => `Testimony is already ${status.toLowerCase()}`,

  // Not Found
  TESTIMONY_NOT_FOUND: 'Testimony not found',
  CREATURE_NOT_FOUND: 'Creature not found',

  // System
  INTERNAL_ERROR: 'Internal Server Error'
};

module.exports = {
  TESTIMONY_STATUS,
  TIME_CONSTRAINTS,
  PAGINATION,
  REPUTATION,
  VALIDATION,
  HTTP_STATUS,
  ERROR_MESSAGES
};
