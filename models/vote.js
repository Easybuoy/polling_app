const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
});


//create collection and add schema
const vote = mongoose.model('vote', voteSchema);

module.exports = vote;