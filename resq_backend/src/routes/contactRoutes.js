const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect these routes with authentication middleware
router.post('/add', authMiddleware.authenticate, contactController.addContact);
router.get('/', authMiddleware.authenticate, contactController.getAllContacts);
router.get('/:userId', authMiddleware.authenticate, contactController.getContacts);
router.patch('/:userId', authMiddleware.authenticate, contactController.patchContacts);
router.delete('/:userId', authMiddleware.authenticate, contactController.deleteContacts);

module.exports = router;
