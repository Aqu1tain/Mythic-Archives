const axios = require('axios');

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

const BEARER_PREFIX = 'Bearer ';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(BEARER_PREFIX)) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.slice(BEARER_PREFIX.length);

  try {
    const response = await axios.get(`${AUTH_SERVICE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    req.user = response.data;
    next();
  } catch (error) {
    if (!error.response) {
      return res.status(503).json({ error: 'Authentication service unavailable' });
    }

    const status = error.response.status;
    const message = error.response.data?.error || 'Invalid token';
    return res.status(status).json({ error: message });
  }
};

module.exports = { authenticate };
