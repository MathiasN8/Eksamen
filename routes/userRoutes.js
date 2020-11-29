const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// viser ccs filer som static
router.use(express.static( './views/'));

const User = require('../models/userModel');
const match = require('../models/matchModel');


//Laver en ny user i sign up diven
router.post('/signup', (req, res) =>{

    //Ser om email allerede bliver brugt
    User.find({ email: req.body.email})
    .then(user =>{
        if (user.length >= 1){
            return res.status(409).json({
                message: 'Email exists'
            });
        } else{

            //Opretter User ud fra mongo Schema 
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
router.post('/login', (req, res) =>{
    User.find({ email: req.body.email})
        .then(users => {
            if (users.length < 1){
                return res.status(404).json({
                    message: 'User does not exist' 
                });
            }
        
            if(users[0].password == req.body.password){
                //res.status(404).json(users[0]);
                //Finder brugerne, så man kan se dem under potentiele mathces
                //Bruger metoden $ne = Not equal. Der viser alle undtagen den person der er logget ind
                User.find({ email:{$ne: req.body.email}})
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

//Updatere user 
router.post('/update', (req, res) =>{
    var updateUser = {
        name: req.body.name,
        age: req.body.age,
        interest: req.body.interest,
        email: req.body.email,
        password: req.body.password
    }
    //Leder efter ID man taster ind, 
    User.updateOne({_id: req.body.id}, {$set: updateUser})
    .then(result =>{
        res.render('index', result)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

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
        res.status(500).json({
            error: err
        });
    });
});

//Like funktionalitet
router.post('/like', (req, res) =>{
   
    match.insertMany({
        name: req.body.name,
        age: req.body.age,
        interest: req.body.interest

    })
    .then(
        res.send('It is a match!!!!')
    )
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

// Dislike funktionalitet
router.post('/dislike', (req, res) =>{
    res.send('It is not a match');
});

//Se alle brugerens matches
router.post('/matches', (req, res) =>{
    match.find()
    .then(matches => {
        res.render('match', {'match': matches});
    })
    .catch( err => {
        res.status(500).json({
        error: err
        });
    });
})

// Slet sine matches
router.post('/matches/delete', (req, res) =>{
    match.find({_id: req.body.id})
//Skal kunne gen indlæse siden 
    match.deleteOne({_id: req.body.id})
    .then( 
        match.find()
        .then(matches => {
            res.render('match', {'match': matches});
        })
        //window.location.reload()
        //res.send('Match deleted')
        //res.render('match', {match: result})
    )
    .catch( err => {
        res.status(500).json({
        error: err
        });
    });
})


module.exports = router;