const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController.js');

router.post('/', moodController.createMoods);
router.get('/', moodController.getAllMoods);

module.exports = router;
