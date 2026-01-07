import prisma from '../utils/db.js';

export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const create = async (userData: {
  email: string;
  username: string;
  password: string;
}) => {
  return prisma.user.create({ data: userData });
};
