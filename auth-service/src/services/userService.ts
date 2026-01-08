import * as userRepository from '../repositories/userRepository.js';

export const getAllUsers = async () => {
  return userRepository.findAll();
};

export const updateUserRole = async (userId: number, newRole: 'USER' | 'EXPERT' | 'ADMIN') => {
  const validRoles = ['USER', 'EXPERT', 'ADMIN'];
  if (!validRoles.includes(newRole)) {
    throw new Error('Invalid role');
  }

  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return userRepository.updateRole(userId, newRole);
};
