const express = require('express');
const router = express.Router();
const testimonyController = require('../controllers/testimonyController');
const { authenticate } = require('../middlewares/auth');
const { authorize } = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const { userIdParamSchema } = require('../validators/userValidator');
const { creatureIdParamSchema } = require('../validators/creatureValidator');

router.get(
  '/users/:id/history',
  authenticate,
  authorize('ADMIN'),
  validate(userIdParamSchema, 'params'),
  testimonyController.getUserModerationHistory.bind(testimonyController)
);

module.exports = router;
