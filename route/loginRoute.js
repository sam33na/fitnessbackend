const express = require('express');
const router = express.Router();
const Register = require('../model/login_model');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
// const auth = require('../middleware/auth');
// const upload = require('../middleware/upload');

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
        const role = req.body.role;
        bcryptjs.hash(password, 10, function (err, hide) {
            const store = new Register({ name: name, email: email, username: username, password: hide, phone: phone, role: role});
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
   
})

module.exports = router;
