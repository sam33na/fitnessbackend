const { text } = require('body-parser');
const mongoose= require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/FitnessBuddy',
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(function(data){
    console.log("Connected")
}).catch(function(e){
    console.log("unable to connect")
})