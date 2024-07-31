// connectToDB.js
const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    throw new Error(`Could not connect to MongoDB: ${err}`);
  }
};

module.exports = connectToDB;
