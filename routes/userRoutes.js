const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// serves up static CSS files 
router.use(express.static( './views/'));

const User = require('../models/userModel');

//Create a new user in the sign up Div
router.post('/signup', function(req, res){
    //Looks if the email is already in use
    User.find({ email: req.body.email})
    .then(user =>{
        if (user.length >= 1){
            return res.status(409).json({
                message: 'Email exists'
            });
        } else{
            //creates user from the userschema
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
                    //res.render('home', {result: result});
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
        }
    });
});

//Login route. se om der er en bruger i databasen med de informationer
router.post('/login', (req, res) => {
    User.find({ email: req.body.email})
        .then(users => {
            if (users.length < 1){
                return res.status(404).json({
                    message: 'User does not exist' 
                });
            }
        
            if(users[0].password == req.body.password){
                //res.status(404).json(users[0]);
                res.render('home', { 'user': users[0]})
            } else {
                return res.status(404).json({
                    message: 'Login failed'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


//Skal kunne slet sin egen profil
//router.delete()

module.exports = router;