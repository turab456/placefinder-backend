require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Enable CORS for all origins
app.use(cors()); // Accepts all origins by default

// Route files
const userRoutes = require('./routes/userRoutes');
const placeRoutes = require('./routes/placeRoutes');
const moodRoutes = require('./routes/moodRoutes');
const locationRoutes = require('./routes/locationRoutes');
// Health check / basic route
app.get('/', (req, res) => {
  res.send('Welcome to PlaceFinder Backvfvsfend!');
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/location', locationRoutes);

// Start the server after DB connection
(async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
})();
