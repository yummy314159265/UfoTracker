const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('map');
});

module.exports = router;