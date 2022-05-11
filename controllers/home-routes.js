const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('map', {
      loggedIn: req.session.loggedIn
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup-login')
});

module.exports = router;