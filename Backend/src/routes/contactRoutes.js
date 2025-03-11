const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect these routes with authentication middleware
router.post('/add', authMiddleware.authenticate, contactController.addContact);
router.get('/:userId', authMiddleware.authenticate, contactController.getContacts);

module.exports = router;
