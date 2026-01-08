const { ValidationError } = require('../utils/errors');

/**
 * Validation middleware factory
 * @param {Object} schema - Joi schema
 * @param {string} property - Request property to validate ('body', 'query', 'params')
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      return next(new ValidationError(errorMessage));
    }

    req[property] = value;
    next();
  };
};

module.exports = validate;
