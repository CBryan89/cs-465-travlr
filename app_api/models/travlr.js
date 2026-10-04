const mongoose = require('mongoose');

// Define the trip schema with server-side validation
const tripSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Trip code is required.'],
        trim: true,
        uppercase: true,
        minlength: [3, 'Trip code must be at least 3 characters.'],
        maxlength: [10, 'Trip code cannot exceed 10 characters.'],
        match: [/^[A-Z0-9]+$/, 'Trip code can only contain letters and numbers.'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Trip name is required.'],
        trim: true,
        maxlength: [100, 'Trip name cannot exceed 100 characters.'],
        index: true
    },
    length: {
        type: String,
        required: [true, 'Trip length is required.'],
        trim: true,
        maxlength: [50, 'Trip length cannot exceed 50 characters.']
    },
    start: {
        type: Date,
        required: [true, 'Start date is required.']
    },
    resort: {
        type: String,
        required: [true, 'Resort is required.'],
        trim: true,
        maxlength: [100, 'Resort cannot exceed 100 characters.']
    },
    perPerson: {
        type: Number,
        required: [true, 'Price per person is required.'],
        min: [0, 'Price per person must be a positive amount.']
    },
    image: {
        type: String,
        required: [true, 'Image filename is required.'],
        trim: true,
        maxlength: [255, 'Image filename cannot exceed 255 characters.']
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters.']
    }
});
const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;