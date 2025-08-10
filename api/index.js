require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../db');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', require('../routes/userRoutes'));
app.use('/api/places', require('../routes/placeRoutes'));
app.use('/api/moods', require('../routes/moodRoutes'));
app.use('/api/location', require('../routes/locationRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to PlaceFinder Backend!');
});

// Connect to DB once
connectDB().then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ DB connection failed:', err.message));

module.exports = serverless(app);
