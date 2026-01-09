import prisma from '../utils/db.js';

export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findById = async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const create = async (userData: {
  email: string;
  username: string;
  password: string;
}) => {
  return prisma.user.create({ data: userData });
};

export const findAll = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      reputation: true,
      createdAt: true,
    },
  });
};

export const updateRole = async (id: number, role: 'USER' | 'EXPERT' | 'ADMIN') => {
  return prisma.user.update({
    where: { id },
    data: { role },
  });
};

export const updateReputation = async (id: number, points: number) => {
  const user = await findById(id);
  if (!user) return null;

  const newReputation = user.reputation + points;
  const shouldPromote = newReputation >= 10 && user.role === 'USER';

  return prisma.user.update({
    where: { id },
    data: {
      reputation: newReputation,
      role: shouldPromote ? 'EXPERT' : user.role,
    },
  });
};
