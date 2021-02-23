const mongoose= require('mongoose');

var Coustomerr=mongoose.model('Coustomerr',{
    name:String,
    loan:String,
    email:String,
    ammount:String,
    status:String,
    emi:String,
    intrestRate:String,
    duration:Number

});

module.exports={Coustomerr}
//or it can be writen like this  as well 
//module.exports =mongoose.model('emp',Emlpoyee)