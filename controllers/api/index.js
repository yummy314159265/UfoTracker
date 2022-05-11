const router = require('express').Router();

const sightingRoutes = require('./sighting-routes.js');

router.use('/sightings', sightingRoutes);

const userRoutes = require('./user-routes');

router.use('/user', userRoutes);

module.exports = router;