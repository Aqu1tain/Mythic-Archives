import Testimony from '../models/Testimony.js';

export const create = async (testimonyData: {
  creatureId: string;
  authorId: number;
  description: string;
}) => {
  return Testimony.create(testimonyData);
};

export const findByCreatureId = async (creatureId: string) => {
  return Testimony.find({ creatureId });
};

export const findById = async (id: string) => {
  return Testimony.findById(id);
};

export const updateStatus = async (
  id: string,
  status: 'VALIDATED' | 'REJECTED',
  validatedBy: number
) => {
  return Testimony.findByIdAndUpdate(
    id,
    {
      status,
      validatedBy,
      validatedAt: new Date(),
    },
    { new: true }
  );
};
