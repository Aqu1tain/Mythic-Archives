const { HTTP_STATUS } = require('../constants');

/**
 * Base Application Error
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation Error (400)
 */
class ValidationError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.BAD_REQUEST);
    this.name = 'ValidationError';
  }
}

/**
 * Authentication Error (401)
 */
class AuthenticationError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.UNAUTHORIZED);
    this.name = 'AuthenticationError';
  }
}

/**
 * Authorization Error (403)
 */
class AuthorizationError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.FORBIDDEN);
    this.name = 'AuthorizationError';
  }
}

/**
 * Not Found Error (404)
 */
class NotFoundError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

/**
 * Conflict Error (409)
 */
class ConflictError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.CONFLICT);
    this.name = 'ConflictError';
  }
}

/**
 * Rate Limit Error (429)
 */
class RateLimitError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS);
    this.name = 'RateLimitError';
  }
}

/**
 * Internal Server Error (500)
 */
class InternalError extends AppError {
  constructor(message = 'Internal Server Error') {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    this.name = 'InternalError';
  }
}

module.exports = {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  InternalError
};
