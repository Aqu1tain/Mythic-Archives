import * as authService from '../services/authService.js';
export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const result = await authService.register(email, username, password);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.json(result);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
export const me = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await authService.getUserById(userId);
        res.json(user);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
