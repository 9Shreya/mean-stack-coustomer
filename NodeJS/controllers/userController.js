const express=require('express');
var router=express.Router();
var ObjectId=require('mongoose').Types.ObjectId
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
var {User}=require('../models/user');
const mongoose = require('mongoose');
//const User = mongoose.model('User');

router.post('/register',(req,res,next)=>{
var userData=new User();
console.log(req.body);
   userData.fullName = req.body.fullName;
    userData.email = req.body.email;
    userData.password = req.body.password;

userData.save((err,doc)=>{
    console.log(doc);
 if(!err){
        res.send({status:200,result:doc})
    }
    else{ 
    if (err.code == 11000){
  res.status(422).send(['Duplicate email adrress found.']);
    }
    else{
         return next(err);//this is for error validation by nodejs
         //we are calling next()
    }
        console.log('Error' +JSON.stringify(err,undefined,2))}

    console.log(doc);

})
});
 
router.post('/login',async (req,res)=>{
    const {email,password}=req.body
    const user = User.findOne({email,password})

 if (!user){
   return res.json({status:'error',  message: 'Email is not registered or Password is wrong' })
    }
    console.log(user );
    if( bcrypt.compare(password,user.password)){

        const token=jwt.sign({
            id:user._id,email:user.email
        },process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXP})

   return res.json({status:'200',  data: token })
    }
    res.json({status:'error',error:'Email is not registered or Password is wrong'})
})
module.exports=router