const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

// Public routes
router.get('/', placeController.getAllPlaces);
router.get('/:id', placeController.getPlaceById);

// Protected routes (uncomment `auth` middleware if needed)
router.post('/', /* auth, */ placeController.createPlace);
router.put('/:id', /* auth, */ placeController.updatePlace);
router.delete('/:id', /* auth, */ placeController.deletePlace);



module.exports = router;
