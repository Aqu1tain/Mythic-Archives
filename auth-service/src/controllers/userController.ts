import { Request, Response } from 'express';
import * as userService from '../services/userService.js';
import { REPUTATION, HTTP_STATUS } from '../constants/index.js';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await userService.updateUserRole(parseInt(id, 10), role);
    res.json(user);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: (error as Error).message });
  }
};

export const updateReputation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { points } = req.body;

    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid user ID' });
    }

    if (typeof points !== 'number' || !Number.isFinite(points)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid points value' });
    }

    if (points < REPUTATION.MIN_POINTS || points > REPUTATION.MAX_POINTS) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: `Points must be between ${REPUTATION.MIN_POINTS} and ${REPUTATION.MAX_POINTS}`
      });
    }

    const user = await userService.updateReputation(userId, points);
    res.json(user);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: (error as Error).message });
  }
};
