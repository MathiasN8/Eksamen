const express = require('express');
var app = express();


app.get("/", function(req,res){
    res.send("Hello World");
});

//Server bliver aktiveret på port 3000
app.listen(3000, function(){
    console.log("Server kører");
});