import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';

const router = express.Router();

router.get('/admin/users', authenticate, authorize('ADMIN'), userController.getAllUsers);
router.patch('/users/:id/role', authenticate, authorize('ADMIN'), userController.updateUserRole);

export default router;
