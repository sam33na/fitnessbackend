const mongoose=require('mongoose');

const UserDetails= mongoose.model('UserDetails',
{
    name:{type:String, require:true},
    email:{type:String},
    username:{type:String},
    password:{type:String,  require:true},
    phone:{type:String},
    dp:{type:String, default:"no-img.jpg"},
    role:{type:String, enum: ["Admin", "User"], default:"User"}
})

module.exports=UserDetails; 