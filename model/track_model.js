const mongoose=require('mongoose');

const Track= mongoose.model('Track',
{
    act:{type:String, require:true},
    description:{type:String},
    date:{type:String},
    start:{type:String},
    end:{type:String},
    priority:{type:String}
})

module.exports=Track; 