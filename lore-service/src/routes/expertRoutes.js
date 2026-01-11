const express = require('express');
const router = express.Router();
const testimonyController = require('../controllers/testimonyController');
const { authenticate } = require('../middlewares/auth');
const { authorize } = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const { creatureIdParamSchema } = require('../validators/creatureValidator');

router.get(
  '/creatures/:id/history',
  authenticate,
  authorize('EXPERT', 'ADMIN'),
  validate(creatureIdParamSchema, 'params'),
  testimonyController.getCreatureModerationHistory.bind(testimonyController)
);

module.exports = router;
