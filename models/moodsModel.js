
const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true } 
}, { timestamps: true });

module.exports = mongoose.model('Mood', moodSchema);
