const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect these routes with authentication middleware
router.post('/first-aid', authMiddleware.authenticate, botController.getFirstAidGuidance);

module.exports = router;
