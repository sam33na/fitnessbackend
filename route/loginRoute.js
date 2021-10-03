const express = require('express');
const router = express.Router();
const Register = require('../model/login_model');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

//user register
router.post('/register/user',  function (req, res) {
    const errors = validationResult(req);
    //(!errors.isEmpty())
    if (errors.isEmpty()) {
        //valid
        const name = req.body.name;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const phone = req.body.phone;
        bcryptjs.hash(password, 10, function (err, hide) {
            const store = new Register({ name: name, email: email, username: username, password: hide, phone: phone});
            console.log(hide);
            store.save().then(function (result) {
                res.status(200).json({ success: true, message: "Registeration sucessfull" }) 
            }).catch(function (error) {
                res.status(500).json({ err: error })
            })
        })

    }
    else {
        //invalid bhaye
        res.status(201).json(errors.array());
    }
})

//login 
router.post('/login/user', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    Register.findOne({ username: username }).then(function (pulledData) {
        if (pulledData === null) {
            return res.status(201).json({ success: false, message: "Invalid Details" }) //username false huda
        }
        //if username exists(database ma bha, taneko)
        bcryptjs.compare(password, pulledData.password, function (err, result) {
            if (result === false) {
                return res.status(201).json({ msg: "Invalid credentials" })//pw incorct
            }
            const token = jwt.sign({ userId: pulledData._id }, 'anysecretkey');
            return res.status(200).json({ success: true, 
                msg: "successfull authentication", 
                token: token, 
                role: pulledData.role,
                data: pulledData._id })
        })
    })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})


//updating the profile pic of user
router.put('/dp/update',auth.verifyUser, function(req, res) {
   
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const phone = req.body.phone;
    const id = req.body.id;

        Register.updateOne({ _id: id }, { name: name, email: email, username: username, password: password, phone: phone })
        .then(function(re) {
            console.log(re)
            res.status(200).json({ message: "updated profile" })
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })
    })
   
    //updating the profile of user
    router.put('/profile/image/:id',upload.single('dp'),auth.verifyUser, function(req, res) {
        console.log(req.file)
        if (req.file == undefined) {
            return res.status(400).json({
                message: "Invalid file format"
            })
        }1
        const dp = req.body.dp;
        const path    = req.file.path;
        const id = req.params.id;
        
            Register.updateOne({ _id: id }, { dp:path })
            .then(function(re) {
                console.log(re)
                res.status(200).json({ message: "updated Image" })
            })
            .catch(function(e) {
                res.status(500).json({ error: e })
            })
    })  



module.exports = router;
