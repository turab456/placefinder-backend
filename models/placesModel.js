
// models/Place.js
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  moodTags: { type: mongoose.Schema.Types.ObjectId, ref: 'Mood' },
  rating: { type: Number, min: 0, max: 5 },
  imageUrl: Array,
  description: String,
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  placeType: { type: mongoose.Schema.Types.ObjectId, ref: 'PlaceType' }
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
