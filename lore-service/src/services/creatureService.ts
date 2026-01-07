import * as creatureRepository from '../repositories/creatureRepository.js';

export const createCreature = async (
  name: string,
  origin: string,
  authorId: number
) => {
  const existing = await creatureRepository.findByName(name);
  if (existing) {
    throw new Error('Creature with this name already exists');
  }

  return creatureRepository.create({ name, origin, authorId });
};

export const getCreature = async (id: string) => {
  const creature = await creatureRepository.findById(id);
  if (!creature) {
    throw new Error('Creature not found');
  }
  return creature;
};

export const getAllCreatures = async () => {
  return creatureRepository.findAll();
};
