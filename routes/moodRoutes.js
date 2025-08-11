const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController.js');

router.post('/', moodController.createMoods);
router.get('/', moodController.getAllMoods);
router.post('/create-place', moodController.createPlaceTypes);
router.get('/get-moods', moodController.getAllPlaceTypes);
router.post('/create-category', moodController.createCategory);
router.get('/get-category', moodController.getAllCategories);

module.exports = router;
