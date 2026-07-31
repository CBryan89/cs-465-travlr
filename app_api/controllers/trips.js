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

module.exports = {
    tripsList,
    tripsFindByCode
};