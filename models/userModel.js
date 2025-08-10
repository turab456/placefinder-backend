const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  refreshTokens: [String], // Store multiple refresh tokens for multi-device support
});

module.exports = mongoose.model('User', userSchema);
