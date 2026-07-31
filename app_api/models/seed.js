// Establish the database connection
require('./db');

// Load Mongoose directly
const mongoose = require('mongoose');
const Trip = require('./travlr');

// Read seed data from json file
const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./app_server/data/trips.json', 'utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await mongoose.connection.close();
    process.exit(0);
}).catch(async (err) => {
    console.error(err);
    await mongoose.connection.close();
    process.exit(1);
});