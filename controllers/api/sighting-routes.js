const router = require('express').Router();
const { Sightings } = require('../../models');

router.get('/:state', async (req, res) => {
  try {
    const sightingsData = await Sightings.findAll({
        where: {
            state_id: req.params.state,
        }
    });
    console.log(sightingsData)
    res.status(200).json(sightingsData);
  } catch(err) {
    console.error(err);
    res.status(500).json(err)
  }
});

module.exports = router;