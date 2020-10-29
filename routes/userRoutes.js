const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userSchema = require('../models/userModel');


//Admin see list of users
router.get("/users", function(req,res){
    res.send("Get");
});

//add a new user
router.post("/users", function(req,res){
    const user = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age
    });
    //save is a method provided by mongoose to use on mongoose models
    user
        .save()
        .then(function(result){
        console.log(result);
        
    }) 
    .catch(function(err){
        console.log(err);
    })
    // its returning the user which is the mongoose object
     res.send({message: "Post", createdUser: user});
});
//
//
//
// Se en enkelt bruger -- Virker ikke !!!!
router.get("/:Id", function(req,res,){
    const id = req.params.userId;

    userSchema.findById(id)
        .exec()
        .then(doc => {
        console.log(doc);
    
            res.status(200).json(doc);
        })
    
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err });
        });    
});


//Update a user. /: takes the id of the user ---ID--https://www.youtube.com/watch?v=FV1Ugv1Temg&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=3 ---10 min
router.put("/users/:id", function(req,res){
    res.send("Put");
});

//Delete a user
router.delete("/users/:id", function(req,res){
    res.send("Delete");
});

module.exports = router;