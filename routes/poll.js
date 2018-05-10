const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Pusher = require('pusher');

const vote = require('../models/vote');

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
    console.log(req.body);
    const newVote = {
        name: req.body.name,
        points: req.body.points
    }

    new vote(newVote).save().then(vote => {
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            name: vote.name
          });
    
          return res.json({sucess: true, message: 'Thanks for voting'});
    });
});

module.exports = router;