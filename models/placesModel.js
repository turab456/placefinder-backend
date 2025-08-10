const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: String,
  category: String, // e.g., cafe, restaurant, event
  address: String,
  city: String,
  state: String,
  moodTags:String, // optional: ["romantic", "fun", "peaceful"]
  rating: Number,
  imageUrl: String,
  description: String,
  lat:Number,
  long:Number,
});

module.exports = mongoose.model('Place', placeSchema);
