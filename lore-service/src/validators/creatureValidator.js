const Joi = require('joi');
const { VALIDATION } = require('../constants');

const createCreatureSchema = Joi.object({
  name: Joi.string()
    .min(VALIDATION.CREATURE_NAME_MIN)
    .max(VALIDATION.CREATURE_NAME_MAX)
    .required()
    .messages({
      'string.min': `name must be at least ${VALIDATION.CREATURE_NAME_MIN} characters`,
      'string.max': `name must not exceed ${VALIDATION.CREATURE_NAME_MAX} characters`,
      'any.required': 'name is required'
    }),
  origin: Joi.string()
    .max(VALIDATION.CREATURE_ORIGIN_MAX)
    .optional()
    .allow('')
    .messages({
      'string.max': `origin must not exceed ${VALIDATION.CREATURE_ORIGIN_MAX} characters`
    })
});

const updateCreatureSchema = Joi.object({
  name: Joi.string()
    .min(VALIDATION.CREATURE_NAME_MIN)
    .max(VALIDATION.CREATURE_NAME_MAX)
    .optional()
    .messages({
      'string.min': `name must be at least ${VALIDATION.CREATURE_NAME_MIN} characters`,
      'string.max': `name must not exceed ${VALIDATION.CREATURE_NAME_MAX} characters`
    }),
  origin: Joi.string()
    .max(VALIDATION.CREATURE_ORIGIN_MAX)
    .optional()
    .allow('')
    .messages({
      'string.max': `origin must not exceed ${VALIDATION.CREATURE_ORIGIN_MAX} characters`
    })
}).min(1);

const creatureIdParamSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Invalid creature ID format'
  })
});

const getCreaturesQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).optional(),
  skip: Joi.number().integer().min(0).optional(),
  authorId: Joi.string().optional(),
  search: Joi.string().optional()
});

module.exports = {
  createCreatureSchema,
  updateCreatureSchema,
  creatureIdParamSchema,
  getCreaturesQuerySchema
};
