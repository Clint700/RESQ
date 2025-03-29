const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect these routes with authentication middleware
router.post('/trigger', authMiddleware.authenticate, emergencyController.triggerEmergency);
router.patch('/:id', authMiddleware.authenticate, emergencyController.updateEmergencyStatus);
router.get('/', authMiddleware.authenticate, emergencyController.getAllAlerts);
router.get('/:id', authMiddleware.authenticate, emergencyController.getAlertById);
router.delete('/:id', authMiddleware.authenticate, emergencyController.deleteAlert);

module.exports = router;
