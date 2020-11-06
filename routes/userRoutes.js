const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/userModel');


router.post('/signup', function(req, res){
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        interest: req.body.interest,
        email: req.body.email,
        password: req.body.password
    });
   user.save()
    .then(result => {
        if (result) {
            console.log(result);
            res.status(200).json(result);
        } else {
            res.status(404).json({message: "fejl i oprettelse"});
        }
    })
    .catch(err => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
    });
});

module.exports = router;