import express from 'express';
import * as creatureController from '../controllers/creatureController.js';

const router = express.Router();

router.post('/creatures', creatureController.createCreature);
router.get('/creatures/:id', creatureController.getCreature);
router.get('/creatures', creatureController.getAllCreatures);

export default router;
