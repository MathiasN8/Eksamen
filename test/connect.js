const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Matti:famnielsen@restapi.rsmlk.mongodb.net/RestApi?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});