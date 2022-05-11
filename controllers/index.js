const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api/');
const commentsRoutes = require('./api/comments-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/api', commentsRoutes);
module.exports = router;