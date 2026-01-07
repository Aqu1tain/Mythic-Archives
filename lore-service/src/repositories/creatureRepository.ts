import Creature from '../models/Creature.js';

export const create = async (creatureData: {
  name: string;
  origin: string;
  authorId: number;
}) => {
  return Creature.create(creatureData);
};

export const findById = async (id: string) => {
  return Creature.findById(id);
};

export const findAll = async () => {
  return Creature.find();
};

export const findByName = async (name: string) => {
  return Creature.findOne({ name });
};
