const mongoose = require('mongoose');

//opretter et skema for min user med følgende 
const userSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    interest: String,
    email: String,
    password: String,
    likes: Array,
    matches: Array
});

module.exports = mongoose.model('User', userSchema);



/*
//Local storage for signUp input
const form = document.querySelector('#form2');
const name = document.querySelector("#name");
const birthday = document.querySelector('#birthday');
const gender = document.querySelector('#gender');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btn = document.querySelector('#createBtn');
const output = document.querySelector('.output');


form.addEventListener("submit", function(e){
    e.preventDefault();

});

btn.addEventListener("click", function storeInput(){
    // store the entered input in web storage
    localStorage.setItem("name", name.value);
    localStorage.setItem("birthday", birthday.value);
    localStorage.setItem("gender", gender.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    for(let i = 0; i< localStorage.length; i ++){
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);


        output.innerHTML += `${key}: ${value} <br />`;
    }
});
*/
