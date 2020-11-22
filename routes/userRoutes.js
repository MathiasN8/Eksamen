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
                    res.render('index')
                
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
                User.find()
                .then(list => {
                    res.render('home', { 'user': users[0], 'ul': list});
                })
                
            } 
            
            else {
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

router.post('/update', function(req, res){
    var updateUser = {
        name: req.body.name,
        age: req.body.age,
        interest: req.body.interest,
        email: req.body.email,
        password: req.body.password
    }
    User.updateOne({_id: req.body.id}, {$set: updateUser})
    .then(result =>{
        res.render('home', {result: result});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
// Opdatere sin egen bruger https://docs.mongodb.com/manual/reference/method/db.collection.update/
/*
router.post('/update', function(req, res){
    //Looks if the email is already in use
    User.find({_id: req.body.id})
    .then(user =>{
        if (user.length >= 1){
            return res.status(409).json({
                message: 'Email exists'
            });
        } else {
            ///mangler
            user.save()
            .then(result => {
                if (result) {
                    //res.status(200).json(result);
                    res.render('home', {result: result});
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
*/
/*
router.post('/update', (req, res) =>{
    User.updateOne({_id: req.body.id}),
    { $set:
        {
            age: req.body.age,
            interest: req.body.age,
            email: req.body.email
        }
    }
});
*/

//Skal kunne slet sin egen profil
router.post('/delete', (req, res) =>{
    //User.deleteOne({_id: req.body._id})
    User.find({_id: req.body.id})
    .then(result =>{
        if(result.length < 1){
            return res.status(404).json({
                message: 'User does not exist' 
            }); 
        }
        User.deleteOne({_id: req.body.id})
        .then(user =>{
            res.json({Message: 'User deleted', user: user})
        })
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;