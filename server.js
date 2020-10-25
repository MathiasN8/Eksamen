const express = require('express');
const app = express();
const routes = require('./routes/admin');

//initialize routes
app.use(routes);

//viser filer i mappen View. HTML filen bliver vist på localhost: 3000
app.use(express.static('view'));

app.get("/", function(req,res){
    res.send("Hello World");
});

//Server bliver aktiveret på port 3000
app.listen(3000, function(){
    console.log("Server kører");
});