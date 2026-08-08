const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// GET all trips
router.get('/trips', tripsController.tripsList);

// POST a new trip
router.post('/trips', tripsController.tripsAddTrip);

// GET a single trip by trip code
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

// PUT update a trip by trip code
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);

module.exports = router;

// DELETE a trip by trip code
router.delete('/trips/:tripCode', tripsController.tripsDeleteTrip);