const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set the view engine to ejs
app.set('view engine', 'ejs');

//Routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

//connect to database
mongoose.connect('mongodb+srv://Matti:famnielsen@restapi.rsmlk.mongodb.net/RestApi?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Body-parser?
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//initialize routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes); 

//Show index.html on localhost
//app.use(express.static(path.resolve(__dirname, 'views')));
app.use(express.static(__dirname + '/views/'));

//forside 
app.get('/', function(req, res) {
    res.render('index');
});

//Server running on port 3000
app.listen(3000, function(){
    console.log("Server kører");
});