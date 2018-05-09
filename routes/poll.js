const express = require('express');
const router = express.Router();
const pusher = require('pusher');
router.get('/', (req, res)=>{
    res.send('POLL');
});

router.post('/', (req, res) => {
    pusher.trigger('my-channel', 'my-event', {
        points: 1,
        os: req.body.os
      });

      return res.json({sucess: true, message: 'Thanks for voting'});
});

module.exports = router;