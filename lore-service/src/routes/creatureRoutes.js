const express = require('express');
const router = express.Router();
const creatureController = require('../controllers/creatureController');

router.post('/', creatureController.createCreature.bind(creatureController));

router.get('/', creatureController.getAllCreatures.bind(creatureController));

router.get('/:id', creatureController.getCreatureById.bind(creatureController));

router.put('/:id', creatureController.updateCreature.bind(creatureController));

router.delete('/:id', creatureController.deleteCreature.bind(creatureController));

module.exports = router;
