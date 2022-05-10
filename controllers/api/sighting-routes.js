const router = require('express').Router();
const { Sightings } = require('../../models');

router.get('/:state', async (req, res) => {
  try {
    const dbSightingsData = await Sightings.findAll({
        where: {
            state_id: req.params.state,
        }
    });

    const sightings = dbSightingsData.map((sighting) => {
      sighting.get({ plain: true })
    });

    res.render('sighting', {
      sightings
    })
    
  } catch(err) {
    console.error(err);
    res.status(500).json(err)
  }
});

module.exports = router;