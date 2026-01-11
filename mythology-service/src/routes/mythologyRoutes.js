const express = require('express');
const router = express.Router();
const mythologyController = require('../controllers/mythologyController');

router.get('/stats', mythologyController.getStats.bind(mythologyController));

module.exports = router;
