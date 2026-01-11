import * as userRepository from '../repositories/userRepository.js';
export const getAllUsers = async () => {
    return userRepository.findAll();
};
export const updateUserRole = async (userId, newRole) => {
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
export const updateReputation = async (userId, points) => {
    const user = await userRepository.updateReputation(userId, points);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};
