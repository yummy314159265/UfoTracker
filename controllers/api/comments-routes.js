const router = require('express').Router();
const {Comments, Users} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comments.create({
      body: req.body.body,
      user_id: req.session.userId,
      sighting_id: req.body.sightingId,
    });

    res.status(200).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:sightingId', async (req, res) => {
  try {
    const commentData = await Comments.findAll({
      include: { 
        model: Users,
      },
      where: {
        sighting_id: req.params.sightingId
      },
    })

    res.status(200).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err)
  }
});

module.exports = router;
