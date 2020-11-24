const mongoose = require('mongoose');

//opretter skema for min admin
const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String
});

module.exports = mongoose.model('Admin', adminSchema);