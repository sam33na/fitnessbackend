const express = require('express');
const router = express.Router();
const Register = require('../model/login_model');
const OTP=require('../model/otp')
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const auth=require('../middleware/auth')
const asyncHandler = require("../middleware/async");
const upload = require('../middleware/upload');
//------------------Sending OTP----------------//
router.post('/forgot-password',(req,res)=>{
    const email=req.body.email;
    if(!email){
      return res.status(401).json({message:"Enter email address"})
    }
    Register.findOne({email:email})
        .then(function(user){
            if(user===null){
                return res.status(201).json({message:"Email not registered"})
            }
            else{
             console.log("here")
              let otpcode=Math.floor((Math.random()*100000)+1)
              console.log(otpcode)
              console.log(email)
              let otpData=new OTP({
                email:email,
                code:otpcode,
                expireIn: new Date().getTime()+300*1000
              })
              console.log(otpData)
              otpData.save().then(function(result){
                  console.log(result)
                  mailer(email,otpcode)
                res.status(200).json({
                   message:"Success",
                   data : result
                });           
              })   
              .catch(function(err){
                res.status(500).json({message:"err"}) 
            })
            }
        }).catch(function(err){
            res.status(500).json({message:"err"}) 
        })
    })
    //--------------------------------------------------//
    
    //----------------------email sending-------------//
    const mailer=(email,otp)=>{
      var nodemailer=require('nodemailer')
      var transporter=nodemailer.createTransport({
        service:'gmail',
        port:507,
        secure:false,
        auth:{
          user:'muzor11s2@gmail.com',
          pass:'C@lamit3'
        }
      });
      var mailOptions={
        from:'muzor11s2@gmail.com',
        to:`${email}`,
        subject:'Fitness Buddy OTP-CODE',
        text:`Dear Sir/Madam,
        ATTN : Please do not reply to this email.This mailbox is not monitored and you will not receive a response.
        Your OTP code is ${otp}
    
        If you have any queries, Please contact us at,
    
        Fitness Buddy,
        Kathmandu, Nepal.
        Phone # 9808278098
        Email Id: support@nchl.com.np
    
        Warm Regards,
        Fitness Buddy.
            `,
      };
      transporter.sendMail(mailOptions,function(error,info){
        if(error){
        }
        else{
          console.log('Email sent:'+info.response)
          return res.status(200).json({
            message:"Success"
         }); 
        }
      })
    }
    //---------------------------------------------------//
    
    //-------------Authenticate OTP-----------------------//
    router.post('/checkOTP',function(req,res){
      const code=req.body.code
      const email=req.body.email
      OTP.findOne({email:email, code:code})
      .then(function(data){
          if(data===null){
              return res.status(401).json({message:"Invalid OTP"})
          }
          let currentTime=new Date().getTime()
          let diff=data.expireIn-currentTime
          if(diff < 0){
            return res.status(401).json({message:"OTP Expired"})
          }
          const token=jwt.sign({userid:data._id},'anysecretkey')
        
          res.status(200).json({
            message: "success"
          });
      })
      .catch(function(e){
          res.status(500).json({message:e})
      })
    })//------------------------------------------------//
    
    
    //-------------------------Password Reset----------------------//
    router.put('/reset-password', function(req,res){
      const email=req.body.email
      const password=req.body.password
      bcryptjs.hash(password,10,function(err,hash){
    Register.updateOne({email:email},{password:hash})
    .then(function(data){
      console.log(data)
          })
        })
        res.status(200).json({
          message: "success"
        });
    })
    //------------------------------------------------------------------//
    
    
    //-------------------------Removing Token---------------------------//
    router.delete('/delete-token/:email',(req,res,next)=>{
      const email=req.params.email
      OTP.findOneAndDelete({email:email})
      .then((response)=>{
        console.log(response)
      })
      .catch((err)=>{
        console.log(err)
      })
        res.status(200).json({
          message: "success",
        });
      });
    //------------------------------------------------//
    module.exports = router;