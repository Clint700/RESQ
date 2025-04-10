const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

router.post('/sms-status', webhookController.smsStatusHandler);

module.exports = router;