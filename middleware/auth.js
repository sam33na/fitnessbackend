const jwt=require('jsonwebtoken')
const User=require('../model/login_model');
const router = require('../route/loginRoute');


module.exports.verifyUser=function(req,res,next)
{
    console.log(req.headers.authorization)
    try{
        const token=req.headers.authorization.split(" ")[1]
        const data=jwt.verify(token, 'anysecretkey');
        User.findOne({_id:data.userId}).then(function(userData)
        {
            req.validUser=userData;
            console.log(userData) 
            next();
        })
        .catch(function(err){
            res.status(401).json({error:err})
        })
    }
    catch(err)
    {
        res.status(401).json({error:err})
    }
}
