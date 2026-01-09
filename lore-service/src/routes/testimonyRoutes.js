const express = require('express');
const router = express.Router();
const testimonyController = require('../controllers/testimonyController');
const { authenticate } = require('../middlewares/auth');
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
  authenticate,
  testimonyCreationLimiter,
  validate(createTestimonySchema, 'body'),
  testimonyController.createTestimony.bind(testimonyController)
);

router.post(
  '/:id/validate',
  authenticate,
  validationLimiter,
  validate(testimonyIdParamSchema, 'params'),
  validate(validateTestimonySchema, 'body'),
  testimonyController.validateTestimony.bind(testimonyController)
);

router.post(
  '/:id/reject',
  authenticate,
  validationLimiter,
  validate(testimonyIdParamSchema, 'params'),
  validate(rejectTestimonySchema, 'body'),
  testimonyController.rejectTestimony.bind(testimonyController)
);

module.exports = router;
