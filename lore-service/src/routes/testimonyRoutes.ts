import express from 'express';
import * as testimonyController from '../controllers/testimonyController.js';

const router = express.Router();

router.post('/testimonies', testimonyController.createTestimony);
router.get('/creatures/:id/testimonies', testimonyController.getCreatureTestimonies);
router.post('/testimonies/:id/validate', testimonyController.validateTestimony);
router.post('/testimonies/:id/reject', testimonyController.rejectTestimony);

export default router;
