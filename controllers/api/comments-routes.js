const router = require('express').Router();
const {Comments} = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    if (req.session.loggedIn) {
      console.log(req.session.userId)
      const commentData = await Comments.create({
        body: req.body.body,
        user_id: req.session.userId,
        sighting_id: req.body.sightingId,
      });

      console.log(commentData)
      res.status(200).json(commentData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/comments', async (req, res) => {
  try {
    const commentData = await Comments.findOne({
      where: {
        body: req.body.username,
      },
    });

    if (!commentData) {
      res
        .status(400)
        .json({ message: 'Add a comment' });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
