const { AppError } = require('../utils/errors');
const { HTTP_STATUS } = require('../constants');

/**
 * Enhanced Error Handler Middleware
 * Handles all application errors with proper formatting
 */
const errorHandler = (err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (err instanceof AppError) {
    if (isDevelopment) {
      console.error(`[${err.name}] ${err.message}`);
      console.error(err.stack);
    }

    return res.status(err.statusCode).json({
      error: {
        name: err.name,
        message: err.message,
        status: err.statusCode,
        ...(isDevelopment && { stack: err.stack })
      }
    });
  }

  if (err.name === 'ValidationError' && err.errors) {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: {
        name: 'ValidationError',
        message: messages.join(', '),
        status: HTTP_STATUS.BAD_REQUEST
      }
    });
  }

  if (err.name === 'CastError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: {
        name: 'CastError',
        message: 'Invalid ID format',
        status: HTTP_STATUS.BAD_REQUEST
      }
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    return res.status(HTTP_STATUS.CONFLICT).json({
      error: {
        name: 'DuplicateError',
        message: `${field} "${value}" already exists`,
        status: HTTP_STATUS.CONFLICT
      }
    });
  }

  console.error('Unexpected Error:', err);
  if (isDevelopment) {
    console.error(err.stack);
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: {
      name: 'InternalError',
      message: isDevelopment ? err.message : 'Internal Server Error',
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ...(isDevelopment && { stack: err.stack })
    }
  });
};

module.exports = errorHandler;
