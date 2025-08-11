const Place = require('../models/placesModel');
const Mood = require('../models/moodsModel');

// Create a new place
exports.createPlace = async (req, res) => {
  try {
    let places;

    if (Array.isArray(req.body)) {
      // Multiple places → bulk insert
      places = await Place.insertMany(req.body, { ordered: false });
    } else {
      // Single place
      places = await Place.create(req.body);
    }

    res.status(201).json({
      success: true,
      count: Array.isArray(places) ? places.length : 1,
      data: places
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a place by ID
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a place by ID
exports.updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a place by ID
exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json({ message: 'Place deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


