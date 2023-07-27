
const express = require('express');
const router = express.Router();

const LandmarkController = require('./controllers/LandmarkController');

// Landmark routes
router.post('/detect', LandmarkController.detect);


module.exports = router;
