const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// Escape special regular-expression characters in user search input
const escapeRegex = (value) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Format Mongoose validation errors into a clear API response
const formatValidationErrors = (err) => {
    if (err.name === 'ValidationError') {
        const errors = {};

        Object.keys(err.errors).forEach((field) => {
            errors[field] = err.errors[field].message;
        });

        return {
            message: 'Trip validation failed.',
            errors: errors
        };
    }

    return {
        message: 'Unable to process trip data.'
    };
};

// GET: /api/trips
// Returns trips with optional search, filtering, sorting, and pagination
const tripsList = async (req, res) => {

    // Build database query from request parameters
    const query = {};

    // Search trips by name, resort, or description
    if (req.query.search) {
        if (typeof req.query.search !== 'string') {
            return res.status(400).json({
                message: 'Search must be a single text value.'
            });
        }

        const searchTerm = escapeRegex(req.query.search.trim());

        if (searchTerm.length > 0) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { resort: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ];
        }
    }

    // Filter trips by resort
    if (req.query.resort) {
        if (typeof req.query.resort !== 'string') {
            return res.status(400).json({
                message: 'Resort must be a single text value.'
            });
        }

        const resortFilter = escapeRegex(req.query.resort.trim());

        if (resortFilter.length > 0) {
            query.resort = {
             $regex: resortFilter,
             $options: 'i'
            };
        }
    }

    // Set sorting option
    let sortOption = {};

    if (req.query.sort) {
        switch (req.query.sort) {
            case 'name':
                sortOption = { name: 1 };
                break;
            case 'name-desc':
                sortOption = { name: -1 };
                break;
            case 'price':
                sortOption = { perPerson: 1 };
                break;
            case 'price-desc':
                sortOption = { perPerson: -1 };
                break;
            case 'start':
                sortOption = { start: 1 };
                break;
            case 'start-desc':
                sortOption = { start: -1 };
                break;
            default:
                sortOption = {};
        }
    }

    // Set and validate pagination options
    const page = req.query.page === undefined
        ? 1
        : Number(req.query.page);

    const limit = req.query.limit === undefined
        ? 10
        : Number(req.query.limit);

    if (!Number.isInteger(page) || page < 1) {
        return res.status(400).json({
            message: 'Page must be a positive whole number.'
        });
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
        return res.status(400).json({
            message: 'Limit must be a whole number between 1 and 100.'
        });
    }

    const skip = (page - 1) * limit;

    Trip
        .find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .exec()
        .then((trips) => {
            return res
                .status(200)
                .json(trips);
        })
        .catch((err) => {
            console.error('Error retrieving trips:', err);

            return res
                .status(500)
                .json({
                    message: 'Unable to retrieve trips.'
                });
        });
};

// GET: /api/trips/:tripCode
// Returns a single trip
const tripsFindByCode = async (req, res) => {
    Trip
        .find({ code: req.params.tripCode })
        .exec()
        .then((trip) => {
            if (!trip || trip.length === 0) {
                return res
                    .status(404)
                    .json({
                        message: 'Trip not found'
                    });
            }

            return res
                .status(200)
                .json(trip);
        })
        .catch((err) => {
            console.error('Error retrieving trip:', err);

            return res
                .status(500)
                .json({
                    message: 'Unable to retrieve trip.'
                });
        });
};

// POST: /api/trips
// Adds a new trip
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const trip = await newTrip.save();

        return res
            .status(201)
            .json(trip);

    } catch (err) {
        if (err.name === 'ValidationError') {
            return res
                .status(400)
                .json(formatValidationErrors(err));
        }

        if (err.code === 11000) {
            return res
                .status(409)
                .json({
                    message: 'A trip with this code already exists.'
                });
        }

        console.error('Error adding trip:', err);

        return res
            .status(500)
            .json({
                message: 'Unable to add trip.'
            });
    }
};

// PUT: /api/trips/:tripCode
// Updates an existing trip
const tripsUpdateTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!trip) {
            return res
                .status(404)
                .json({
                    message: 'Trip not found'
                });
        }

        return res
            .status(200)
            .json(trip);

    } catch (err) {
        if (err.name === 'ValidationError') {
            return res
                .status(400)
                .json(formatValidationErrors(err));
        }

        if (err.code === 11000) {
            return res
                .status(409)
                .json({
                    message: 'A trip with this code already exists.'
                });
        }

        console.error('Error updating trip:', err);

        return res
            .status(500)
            .json({
                message: 'Unable to update trip.'
            });
    }
};

// DELETE: /api/trips/:tripCode
// Deletes an existing trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({
            code: req.params.tripCode
        });

        if (!trip) {
            return res
                .status(404)
                .json({
                    message: 'Trip not found'
                });
        }

        return res
            .status(200)
            .json({
                message: 'Trip deleted successfully'
            });

    } catch (err) {
        console.error('Error deleting trip:', err);

        return res
            .status(500)
            .json({
                message: 'Unable to delete trip.'
            });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};