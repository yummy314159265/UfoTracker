const router = require('express').Router();
const { Sightings } = require('../../models');

router.get('/:state', async (req, res) => {
  try {
    const dbSightingsData = await Sightings.findAll({
        where: {
            state_id: req.params.state,
        }
    });
    
    // req.session.save(() => {
    //   if (!req.session.sighting) {
    //     req.session.sighting = {
    //       state: req.params.state,
    //       index: 0
    //     };
    //   }

    //   res.status(200).json({
    //     sightings: dbSightingsData,
    //     cookie: req.session.sighting,
    //   });
    // });

    res.status(200).json(dbSightingsData);
  } catch(err) {
    console.error(err);
    res.status(500).json(err)
  }
});

module.exports = router;