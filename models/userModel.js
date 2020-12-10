const mongoose = require('mongoose');

//opretter et skema for min user med følgende 
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    interest: String,
    email: String,
    password: String,
    likes: Array,
    matches: Array
});

module.exports = mongoose.model('User', userSchema);
