const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || 'mongodb+srv://mypersonalusedev:netMFj1ZNg38PM45@cluster0.cd7mtyg.mongodb.net/PlaceFinder?retryWrites=true&w=majority&appName=Cluster0';

function connectDB() {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectDB;