const router = require('express').Router();

const sightingRoutes = require('./sighting-routes.js');
const userRoutes = require('./user-routes');

router.use('/sightings', sightingRoutes);
router.use('/user', userRoutes);

module.exports = router;