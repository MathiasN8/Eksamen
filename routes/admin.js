const express = require('express');
const router = express.Router();

//Admin see list of users
router.get("/users", function(req,res){
    res.send("Get");
});

//add a new user
router.post("/users", function(req,res){
    res.send("Post");
});

//Update a user. /: takes the id of the user
router.put("/users/:id", function(req,res){
    res.send("Put");
});

//Delete a user
router.delete("/users/:id", function(req,res){
    res.send("Delete");
});

module.exports = router;