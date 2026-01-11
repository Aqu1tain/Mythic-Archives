const SERVICE_SECRET = process.env.SERVICE_SECRET || 'default-secret-change-in-production';
export const authenticateService = (req, res, next) => {
    const secret = req.headers['x-service-secret'];
    if (!secret || secret !== SERVICE_SECRET) {
        return res.status(403).json({ error: 'Forbidden: Invalid service credentials' });
    }
    next();
};
