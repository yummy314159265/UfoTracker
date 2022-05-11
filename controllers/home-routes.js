const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('map');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup-login')
});

const { Comments } = require('../models');
router.post('/', async (req, res) => {
  try {
    const newComment = await Comments.create({
      ...req.body.text,
      userId: req.body.username, 
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;