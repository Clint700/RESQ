const express = require('express');
const router = express.Router();
const endpointController = require('../controllers/endpointController');

router.get('/', endpointController.getAllEndpoints);

module.exports = router;
