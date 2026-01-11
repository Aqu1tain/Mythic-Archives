import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';
const SALT_ROUNDS = 10;
const hashPassword = async (password) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};
const comparePasswords = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};
export const register = async (email, username, password) => {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error('Email already exists');
    }
    const hashedPassword = await hashPassword(password);
    const user = await userRepository.create({
        email,
        username,
        password: hashedPassword,
    });
    const token = generateToken(user.id);
    return {
        user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            reputation: user.reputation,
        },
        token,
    };
};
export const login = async (email, password) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    const token = generateToken(user.id);
    return {
        user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            reputation: user.reputation,
        },
        token,
    };
};
export const getUserById = async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        reputation: user.reputation,
        createdAt: user.createdAt,
    };
};
