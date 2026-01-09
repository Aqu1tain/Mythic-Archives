const express = require('express');
const router = express.Router();
const creatureController = require('../controllers/creatureController');
const testimonyController = require('../controllers/testimonyController');
const { authenticate } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const {
  createCreatureSchema,
  updateCreatureSchema,
  creatureIdParamSchema,
  getCreaturesQuerySchema
} = require('../validators/creatureValidator');
const { getTestimoniesByCreatureSchema } = require('../validators/testimonyValidator');

router.post(
  '/',
  authenticate,
  validate(createCreatureSchema, 'body'),
  creatureController.createCreature.bind(creatureController)
);

router.get(
  '/',
  validate(getCreaturesQuerySchema, 'query'),
  creatureController.getAllCreatures.bind(creatureController)
);

router.get(
  '/:id',
  validate(creatureIdParamSchema, 'params'),
  creatureController.getCreatureById.bind(creatureController)
);

router.put(
  '/:id',
  authenticate,
  validate(creatureIdParamSchema, 'params'),
  validate(updateCreatureSchema, 'body'),
  creatureController.updateCreature.bind(creatureController)
);

router.delete(
  '/:id',
  authenticate,
  validate(creatureIdParamSchema, 'params'),
  creatureController.deleteCreature.bind(creatureController)
);

router.get(
  '/:id/testimonies',
  validate(creatureIdParamSchema, 'params'),
  validate(getTestimoniesByCreatureSchema, 'query'),
  testimonyController.getTestimoniesByCreatureId.bind(testimonyController)
);

module.exports = router;
