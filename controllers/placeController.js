const Place = require('../models/placesModel');
const Mood = require('../models/moodsModel');

// Create a new place
exports.createPlace = async (req, res) => {
  try {
    let placesData = Array.isArray(req.body) ? req.body : [req.body];

    // Extract first words from incoming place names
    const firstWords = placesData.map(place => {
      if (!place.name) throw new Error("Place name is required");
      return place.name.trim().split(/\s+/)[0].toLowerCase();
    });

    // Check if any existing place starts with same first word
    const existingPlaces = await Place.find({
      name: { 
        $regex: `^(${firstWords.join('|')})\\b`, 
        $options: 'i' 
      }
    });

    if (existingPlaces.length > 0) {
      const existingNames = existingPlaces.map(p => p.name);
      return res.status(400).json({
        success: false,
        error: `Place with first word already exists: ${existingNames.join(', ')}`
      });
    }

    // Insert
    let inserted;
    if (Array.isArray(req.body)) {
      inserted = await Place.insertMany(req.body, { ordered: false });
    } else {
      inserted = await Place.create(req.body);
    }

    res.status(201).json({
      success: true,
      count: Array.isArray(inserted) ? inserted.length : 1,
      data: inserted
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
    const places = await Place.find()
      .populate('category', 'name')    // join Category collection, only get "name"
      .populate('moodTags', 'name')   // join Mood collection, only get "title"
      .populate('placeType', 'name');  // join PlaceType collection, only get "name"

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


