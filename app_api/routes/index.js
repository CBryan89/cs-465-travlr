const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Middleware to authenticate JSON Web Tokens
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];

    // Authorization header must be present
    if (!authHeader) {
        return res.status(401).json({
            message: 'Authorization header required.'
        });
    }

    // Expected format: Bearer <token>
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
        return res.status(401).json({
            message: 'Invalid authorization header format.'
        });
    }

    const token = parts[1];

    // Verify the JWT before allowing access to the protected route
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Invalid or expired authentication token.'
            });
        }

        req.auth = decoded;
        next();
    });
}

// Register a new user
router
    .route('/register')
    .post(authController.register);

// Login endpoint
router
    .route('/login')
    .post(authController.login);

// GET all trips
router.get(
    '/trips',
    tripsController.tripsList
);

// POST a new trip - requires authentication
router.post(
    '/trips',
    authenticateJWT,
    tripsController.tripsAddTrip
);

// GET a single trip by trip code
router.get(
    '/trips/:tripCode',
    tripsController.tripsFindByCode
);

// PUT update a trip by trip code - requires authentication
router.put(
    '/trips/:tripCode',
    authenticateJWT,
    tripsController.tripsUpdateTrip
);

// DELETE a trip by trip code - requires authentication
router.delete(
    '/trips/:tripCode',
    authenticateJWT,
    tripsController.tripsDeleteTrip
);

module.exports = router;