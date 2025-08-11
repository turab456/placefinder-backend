const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController.js');

router.post('/', moodController.createMoods);
router.get('/', moodController.getAllMoods);
router.post('/create-place', moodController.createPlaceTypes);
router.get('/get-moods', moodController.getAllPlaceTypes);

module.exports = router;
