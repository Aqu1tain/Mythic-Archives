import { Request, Response } from 'express';
import * as creatureService from '../services/creatureService.js';

export const createCreature = async (req: Request, res: Response) => {
  try {
    const { name, origin, authorId } = req.body;
    const creature = await creatureService.createCreature(name, origin, authorId);
    res.status(201).json(creature);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getCreature = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const creature = await creatureService.getCreature(id);
    res.json(creature);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const getAllCreatures = async (req: Request, res: Response) => {
  try {
    const creatures = await creatureService.getAllCreatures();
    res.json(creatures);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
