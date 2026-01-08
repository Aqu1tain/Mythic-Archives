const axios = require('axios');

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3000';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.substring(7);

  try {
    const response = await axios.get(`${AUTH_SERVICE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    req.user = response.data;
    next();
  } catch (error) {
    const status = error.response?.status || 401;
    const message = error.response?.data?.error || 'Invalid token';
    return res.status(status).json({ error: message });
  }
};

module.exports = { authenticate };
