import * as testimonyRepository from '../repositories/testimonyRepository.js';
import * as creatureRepository from '../repositories/creatureRepository.js';

export const createTestimony = async (
  creatureId: string,
  authorId: number,
  description: string
) => {
  const creature = await creatureRepository.findById(creatureId);
  if (!creature) {
    throw new Error('Creature not found');
  }

  return testimonyRepository.create({ creatureId, authorId, description });
};

export const getCreatureTestimonies = async (creatureId: string) => {
  const creature = await creatureRepository.findById(creatureId);
  if (!creature) {
    throw new Error('Creature not found');
  }

  return testimonyRepository.findByCreatureId(creatureId);
};

export const validateTestimony = async (id: string, validatedBy: number) => {
  const testimony = await testimonyRepository.findById(id);
  if (!testimony) {
    throw new Error('Testimony not found');
  }

  if (testimony.status !== 'PENDING') {
    throw new Error('Testimony has already been processed');
  }

  return testimonyRepository.updateStatus(id, 'VALIDATED', validatedBy);
};

export const rejectTestimony = async (id: string, validatedBy: number) => {
  const testimony = await testimonyRepository.findById(id);
  if (!testimony) {
    throw new Error('Testimony not found');
  }

  if (testimony.status !== 'PENDING') {
    throw new Error('Testimony has already been processed');
  }

  return testimonyRepository.updateStatus(id, 'REJECTED', validatedBy);
};
