const express = require('express');
const router = express.Router();

router.use(express.static( './views/'));

const userSchema = require('../models/userModel');
const adminModel = require('../models/adminModel');

//Se en liste over alle users
router.post('/', (req, res) => {
    //checker om admin findes
    adminModel.find({ name: req.body.name})
        .then(admin => {
            if (admin.length < 1){
                return res.status(404).json({
                    message: 'Admin does not exist' 
                });
            }
        
            if(admin[0].password == req.body.password){
                //renders admin html med en liste over alle users
                userSchema.find()
                .then(docs => {
                    res.render('admin', {'ul': docs});
                })
                .catch( err => {
                    res.status(500).json({
                    error: err
                    });
                });
            } else {
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


module.exports = router;