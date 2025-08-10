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


exports.createMoods = async (req, res) => {
  console.log("hello")
  try {
    let moods = req.body;

    // Accept single mood object too
    if (!Array.isArray(moods)) {
      moods = [moods];
    }

    // Remove duplicates from incoming data (case insensitive)
    const uniqueMoods = Array.from(
      new Map(
        moods.map(m => [m.name.toLowerCase(), { name: m.name.trim(), description: m.description || '' }])
      ).values()
    );

    if (!uniqueMoods.length) {
      return res.status(400).json({ error: 'No valid moods provided' });
    }

    // Insert only those not already in DB
    const existing = await Mood.find({
      name: { $in: uniqueMoods.map(m => m.name) }
    }).select('name');

    const existingNames = existing.map(e => e.name);
    const toInsert = uniqueMoods.filter(m => !existingNames.includes(m.name));

    if (!toInsert.length) {
      return res.status(200).json({ message: 'All moods already exist', inserted: [] });
    }

    const inserted = await Mood.insertMany(toInsert, { ordered: false });

    res.status(201).json({ insertedCount: inserted.length, inserted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMoods = async (req, res) => {
  try {
    const moods = await Mood.find().sort({ name: 1 });
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}