const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

/**
 * Helmet security middleware configuration
 */
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

/**
 * General rate limiter for all requests
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    error: {
      message: 'Too many requests from this IP, please try again later.',
      status: 429
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Strict rate limiter for testimony creation
 */
const testimonyCreationLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Limit each IP to 10 testimony creations per 5 minutes
  message: {
    error: {
      message: 'Too many testimonies created, please try again later.',
      status: 429
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Rate limiter for validation/rejection actions
 */
const validationLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // Limit each IP to 20 validations per minute
  message: {
    error: {
      message: 'Too many validation requests, please slow down.',
      status: 429
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  helmetConfig,
  generalLimiter,
  testimonyCreationLimiter,
  validationLimiter
};
