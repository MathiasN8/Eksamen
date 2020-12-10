const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// viser ccs filer som static
router.use(express.static( './views/'));

const User = require('../models/userModel');
//const match = require('../models/matchModel');


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
                    res.render('index');
                } else {
                    res.status(404).json({message: "fejl i oprettelse"});
                }
            })
            .catch(err => {
                if (err) {
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
        } else {
            return res.status(404).json({
                message: 'Login failed'
            });
        }
    })
    .catch(err => {
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
    User.find({_id: req.body.id})
    .then(result =>{
        if(result.length < 1){
            return res.status(400).json({
                message: 'User does not exist' 
            }); 
        }
        User.deleteOne({_id: req.body.id})
        .then(user =>{
            res.json({Message: 'User deleted', user: user});
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


//Like funktionalitet
router.post('/like/:id',(req, res) =>{
    var firstId = req.params.id; // First user = den person der liker
    var secondId = req.body.id;  // Second user = den person der bliver liked

    // Smider den user2 ID ind in den user1 likes property
    // Kun hvis det ikke allerede er der
    User.updateOne({_id: firstId}, {$addToSet: {"likes": secondId}})
    .then( like =>{
        //Finder bruger 2
        const user2 = User.findOne({_id: secondId})
        .then( userLike =>{
            let user2Likes = user2.likes
            // Looper igennem user2 likes 
            for(i = 0; i < user2Likes.length; i++){
                // Hvis user2 likes = user1 id er det et match 
                if( user2Likes[i] == firstId){
                    User.updateOne({_id: firstId}, {$addToSet: {"matches": secondId}})
                    .then(
                        User.updateOne({_id: secondId}, {$addToSet: {"matches": firstId}})
                    );
                break;
                } else {
                console.log('Not a Match!!!');
                }
            }
       });
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });
});

// Dislike funktionalitet
router.post('/dislike', (req, res) =>{
    res.status(200).json({message: 'It is not a match'});
});

//Se alle brugerens matches
router.post('/matches/:id', (req, res) =>{
    
    //Finder først useren 
    User.findOne({_id: req.body.id})
    .then( userId => {
        //Finder alle brugerne der har samme id, som dem der er i match property
         User.find({_id: {$in: userId.matches}})
        .then(matches =>{
            res.render('match', {'match': matches, 'user': userId});
        })
        .catch( err => {
            res.status(500).json({
                error: err
            });
        });
    })    
});

// Slet sine matches
router.post('/matches/:id/delete', (req, res) =>{
    // $pull fjerner element i array der matcher en given værdi
    User.update({_id: req.params.id}, {$pull: {matches:{$in: req.body.id}, likes: req.body.id}})
    .then(
        User.update({_id: req.body.id}, {$pull: {matches:{$in: req.params.id}, likes: req.params.id}})
        .then(
            res.send('Match deleted --- press back arrow')
        )
    )
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;