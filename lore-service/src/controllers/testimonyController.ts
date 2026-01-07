import { Request, Response } from 'express';
import * as testimonyService from '../services/testimonyService.js';

export const createTestimony = async (req: Request, res: Response) => {
  try {
    const { creatureId, authorId, description } = req.body;
    const testimony = await testimonyService.createTestimony(creatureId, authorId, description);
    res.status(201).json(testimony);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getCreatureTestimonies = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const testimonies = await testimonyService.getCreatureTestimonies(id);
    res.json(testimonies);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const validateTestimony = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { validatedBy } = req.body;
    const testimony = await testimonyService.validateTestimony(id, validatedBy);
    res.json(testimony);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const rejectTestimony = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { validatedBy } = req.body;
    const testimony = await testimonyService.rejectTestimony(id, validatedBy);
    res.json(testimony);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
