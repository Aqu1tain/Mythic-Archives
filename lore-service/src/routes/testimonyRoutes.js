const express = require('express');
const router = express.Router();
const testimonyController = require('../controllers/testimonyController');
const validate = require('../middlewares/validate');
const {
  createTestimonySchema,
  validateTestimonySchema,
  rejectTestimonySchema,
  testimonyIdParamSchema
} = require('../validators/testimonyValidator');
const { testimonyCreationLimiter, validationLimiter } = require('../middlewares/security');

router.post(
  '/',
  testimonyCreationLimiter,
  validate(createTestimonySchema, 'body'),
  testimonyController.createTestimony.bind(testimonyController)
);

router.post(
  '/:id/validate',
  validationLimiter,
  validate(testimonyIdParamSchema, 'params'),
  validate(validateTestimonySchema, 'body'),
  testimonyController.validateTestimony.bind(testimonyController)
);

router.post(
  '/:id/reject',
  validationLimiter,
  validate(testimonyIdParamSchema, 'params'),
  validate(rejectTestimonySchema, 'body'),
  testimonyController.rejectTestimony.bind(testimonyController)
);

module.exports = router;
