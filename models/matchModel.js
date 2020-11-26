const mongoose = require('mongoose');


const matchSchema = mongoose.Schema({
    name: String,
    age: Number,
    interest: String
});

module.exports = mongoose.model('Matches', matchSchema);