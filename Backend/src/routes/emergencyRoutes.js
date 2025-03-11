const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect these routes with authentication middleware
router.post('/trigger', authMiddleware.authenticate, emergencyController.triggerEmergency);
router.put('/update/:alertId', authMiddleware.authenticate, emergencyController.updateEmergencyStatus);

module.exports = router;
