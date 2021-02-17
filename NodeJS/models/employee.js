const mongoose= require('mongoose');

var Employee=mongoose.model('Employee',{
    name:String,
    position:String,
    office:String,
    salary:Number
});

module.exports={Employee}
//or it can be writen like this  as well 
//module.exports =mongoose.model('emp',Emlpoyee)