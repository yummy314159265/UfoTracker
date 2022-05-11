const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const loginRoutes = require('./login-routes.js')
const apiRoutes = require('./api/');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/api', apiRoutes);

module.exports = router;