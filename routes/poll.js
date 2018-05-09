const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '522606',
    key: '132881365344c7cb8667',
    secret: 'c74285c8b6d49df29248',
    cluster: 'eu',
    encrypted: true
  });

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