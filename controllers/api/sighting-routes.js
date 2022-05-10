const router = require('express').Router();
const { Sightings } = require('../../models');

router.get('/:state', async (req, res) => {
  try {
    const dbSightingsData = await Sightings.findAll({
        where: {
            state_id: req.params.state,
        }
    });

    res.status(200).json(dbSightingsData);
  } catch(err) {
    console.error(err);
    res.status(500).json(err)
  }
});

module.exports = router;