const express = require('express');
const router = express.Router();
const locationController=require('../controllers/locationController');

router.get('/reverse-geocode', locationController.ReverseLocation);
router.get('/forward-geocode', locationController.ForwardLocation);
module.exports = router;
