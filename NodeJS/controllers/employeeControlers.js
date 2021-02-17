const express=require('express');
var router=express.Router();
var ObjectId=require('mongoose').Types.ObjectId

var {Employee}=require('../models/employee');
const { json } = require('body-parser');

const http = require("http")



//==>  localhost:3000/employees/
router.get('/',(req,res)=>{
    Employee.find((err,docs)=>{
if(!err){
    res.send({status:200,result:docs});
console.log(docs);}
else{ console.log('Error' +JSON.stringify(err,undefined,2))}
    })
});

//==> localhost:3000/employees/id
router.get('/:id',(req,res)=>{
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    Employee.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.send({status:200,result:doc});
        }
        else{
            console.log('error '+JSON.stringify(err,undifined,2))
                            return res.status(400).send('No record with this Id')

    }
    })
})
let urlCall='http//localhost:3000/employees'
// router.post('/',(req,res)=>{
// })
// router.get('/',(req,res)=>{ 
// })

//==> localhost:3000/employees
router.post('/',(req,res)=>{
var emp=new Employee({
    name:req.body.name,
    position:req.body.position,
    office:req.body.office,
    salary:req.body.salary
});
emp.save((err,doc)=>{
    if(!err){
        res.send({requestLocation:urlCall,status:200,result:doc})
    }
    else{ 
        console.log('Error' +JSON.stringify(err,undefined,2))
                    return res.status(400).send('No record with this Id')
}

    console.log(doc);
})
})

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record with this Id')
    }
    var emp=
    {
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary     
    }
    Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},
        (err,doc)=>{
            if(!err){res.send({status:200,result:doc})}
            else{console.log('error '+JSON.stringify(err,undefined,2));
                return res.status(400).send('No record with this Id')
}
        })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`no record with given id : ${req.params.id} `)
    }
    else{
          Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send({status:200,result:doc}); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); 
                    return res.status(400).send('No record with this Id')
}
    });
    }
})

module.exports=router;