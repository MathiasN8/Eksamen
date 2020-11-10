const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');

router.use(express.static( './views/'));

const userSchema = require('../models/userModel');


//Admin see list of users
router.get("/", function(req,res){
    userSchema.find()
        .then(docs => {
            //res.status(200).json(docs);
            res.render('admin', {'ul': docs});
        })
        .catch( err => {
            res.status(500).json({
                error: err
            });
        });
});

//add a new user
//Skal admin ikke kunne gøre
/*router.post("/", function(req,res){
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
        res.send({message: "Post", createdUser: result});
    }) 
    .catch(function(err){
        console.log(err);
    })
    // its returning the user which is the mongoose object
     
}); 
*/

// Se en enkelt bruger
router.get("/:userId", function(req,res,){
    const id = req.params.userId;

    userSchema.findById({_id: id})
        .then(doc => {
        console.log(doc);
    
            res.status(200).json(doc);
        })
    
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err });
        });    
});


//Update a user. /: takes the id of the user ---ID--https://youtu.be/WDrU305J1yw?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&t=1749
router.put("/:id", function(req,res){
    res.send("Put");
});

//Delete a user
router.delete("/:id", function(req,res){
    const id = req.params.id;
    userSchema.remove({_id: id}).then(result =>{
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
});

module.exports = router;