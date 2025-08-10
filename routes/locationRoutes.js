const express = require('express');
const router = express.Router();
const locationController=require('../controllers/locationController');

router.get('/reverse-geocode', locationController.ReverseLocation);
module.exports = router;
