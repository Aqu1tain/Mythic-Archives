import { Request, Response } from 'express';
import * as userService from '../services/userService.js';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await userService.updateUserRole(parseInt(id), role);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
