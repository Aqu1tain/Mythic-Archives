import * as userRepository from '../repositories/userRepository.js';
export const authorize = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const userId = req.userId;
            const user = await userRepository.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({ error: 'Access forbidden' });
            }
            req.user = user;
            next();
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
};
