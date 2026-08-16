const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    // console.log('In Middleware');

    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);

    if(authHeader == null)
    {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1)
    {
        console.log('Not enough tokens in Auth Header: ' +
            headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);

    if(token == null)
    {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    // console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));
    const verified = jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, verified) => {
            if(err)
            {
                return res
                    .sendStatus(401)
                    .json('Token Validation Error!');
            }

            // Set the auth param to the decoded object
            req.auth = verified;
        }
    );

    // We need to continue or this will hang forever
    next();
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

// DELETE a trip by trip code
router.delete(
    '/trips/:tripCode',
    tripsController.tripsDeleteTrip
);

module.exports = router;