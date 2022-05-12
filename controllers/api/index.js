const router = require('express').Router();

const sightingRoutes = require('./sighting-routes.js');
const userRoutes = require('./user-routes.js');
const commentsRoutes = require('./comments-routes.js')

router.use('/sightings', sightingRoutes);
router.use('/user', userRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;