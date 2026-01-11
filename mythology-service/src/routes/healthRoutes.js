const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    service: 'mythology-service',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
