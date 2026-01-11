import * as userService from '../services/userService.js';
export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await userService.updateUserRole(parseInt(id), role);
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const updateReputation = async (req, res) => {
    try {
        const { id } = req.params;
        const { points } = req.body;
        const userId = parseInt(id);
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        if (typeof points !== 'number' || !Number.isFinite(points)) {
            return res.status(400).json({ error: 'Invalid points value' });
        }
        if (points < -10 || points > 10) {
            return res.status(400).json({ error: 'Points must be between -10 and 10' });
        }
        const user = await userService.updateReputation(userId, points);
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
