const Joi = require('joi');

const userIdParamSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'User ID is required'
  })
});

module.exports = {
  userIdParamSchema
};
