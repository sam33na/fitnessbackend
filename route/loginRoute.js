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
router.post('/user/login', function (req, res) {
    const user = req.body.username;
    const password = req.body.password;
    Register.findOne({ username: user }).then(function (pulledData) {
        if (pulledData === null) {
            return res.status(201).json({ success: false, message: "Invalid Details" }) //username false huda
        }
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
module.exports = router;
