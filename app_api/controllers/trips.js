const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /api/trips
// Returns all trips
const tripsList = async (req, res) => {
    Trip
        .find({})
        .exec()
        .then((trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({ message: 'Trips not found' });
            }

            return res
                .status(200)
                .json(trips);
        })
        .catch((err) => {
            return res
                .status(404)
                .json(err);
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
                    .json({ message: 'Trip not found' });
            }

            return res
                .status(200)
                .json(trip);
        })
        .catch((err) => {
            return res
                .status(404)
                .json(err);
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
        return res
            .status(400)
            .json(err);
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
            { new: true }
        );

        if (!trip) {
            return res
                .status(404)
                .json({ message: 'Trip not found' });
        }

        return res
            .status(200)
            .json(trip);

    } catch (err) {
        return res
            .status(400)
            .json(err);
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
                .json({ message: 'Trip not found' });
        }

        return res
            .status(200)
            .json({ message: 'Trip deleted successfully' });

    } catch (err) {
        return res
            .status(400)
            .json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};