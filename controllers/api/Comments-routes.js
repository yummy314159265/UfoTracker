const router = require('express').Router();
const {Comments} = require('../../models');

router.post('/', async (req, res) => {
    try {
      const commentData = await Comments.create({
            username: req.body.username,
            body: req.params.body,
        });
        req.session.save(() => {
            req.session.loggedIn = true;
      
            res.status(200).json(commentData);
          });
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
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
    
  
  module.exports = router;
