require('dotenv').config();
const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Place = require('./models/placesModel');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://mypersonalusedev:netMFj1ZNg38PM45@cluster0.cd7mtyg.mongodb.net/PlaceFinder?retryWrites=true&w=majority&appName=Cluster0';
const EXCEL_FILE = 'placedetails.xlsx'; 

async function seedPlaces() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const workbook = xlsx.readFile(EXCEL_FILE);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Optional: clear existing data
    await Place.deleteMany({});

    // Insert new data
    await Place.insertMany(data);
    console.log('Places data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedPlaces();
