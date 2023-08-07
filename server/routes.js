
const express = require('express');
const multer = require('multer');
const router = express.Router();

const LandmarkController = require('./controllers/LandmarkController');
const UserController = require('./controllers/UserController');

const upload = multer({ dest: 'uploads/' });

router.post('/landmark/save', upload.single('image'), LandmarkController.saveLandmark);
router.post('/detect', upload.single('image'), LandmarkController.detect);
router.get('/user/:id', UserController.getUser);
router.get('/user/:id/landmarks', UserController.getUserLandmarks);
router.post('/landmark/save', LandmarkController.saveLandmark);
router.delete('/landmark/delete/:id', LandmarkController.deleteLandmark);



module.exports = router;