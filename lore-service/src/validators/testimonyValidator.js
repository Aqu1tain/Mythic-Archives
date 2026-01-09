const Joi = require('joi');
const { VALIDATION, TESTIMONY_STATUS } = require('../constants');

const createTestimonySchema = Joi.object({
  authorId: Joi.string().required().messages({
    'string.empty': 'authorId cannot be empty',
    'any.required': 'authorId is required'
  }),
  creatureId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'creatureId must be a valid MongoDB ObjectId',
    'any.required': 'creatureId is required'
  }),
  description: Joi.string()
    .min(VALIDATION.TESTIMONY_DESC_MIN)
    .max(VALIDATION.TESTIMONY_DESC_MAX)
    .required()
    .messages({
      'string.min': `description must be at least ${VALIDATION.TESTIMONY_DESC_MIN} characters`,
      'string.max': `description must not exceed ${VALIDATION.TESTIMONY_DESC_MAX} characters`,
      'any.required': 'description is required'
    })
});

const validateTestimonySchema = Joi.object({
  validatorId: Joi.string().required().messages({
    'string.empty': 'validatorId cannot be empty',
    'any.required': 'validatorId is required'
  })
});

const rejectTestimonySchema = Joi.object({
  rejecterId: Joi.string().required().messages({
    'string.empty': 'rejecterId cannot be empty',
    'any.required': 'rejecterId is required'
  })
});

const getTestimoniesByCreatureSchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).optional(),
  skip: Joi.number().integer().min(0).optional()
});

const testimonyIdParamSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Invalid testimony ID format'
  })
});

module.exports = {
  createTestimonySchema,
  validateTestimonySchema,
  rejectTestimonySchema,
  getTestimoniesByCreatureSchema,
  testimonyIdParamSchema
};
