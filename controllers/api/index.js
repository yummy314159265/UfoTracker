const router = require('express').Router();

const sightingRoutes = require('./sighting-routes.js');

router.use('/sightings', sightingRoutes);

module.exports = router;