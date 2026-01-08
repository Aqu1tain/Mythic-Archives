import { Request, Response, NextFunction } from 'express';
import * as userRepository from '../repositories/userRepository.js';

export const authorize = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).userId;
      const user = await userRepository.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: 'Access forbidden' });
      }

      (req as any).user = user;
      next();
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  };
};
