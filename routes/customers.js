const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const { string } = require('joi');
const generes = express.Generes();

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name:{
        type:string,
        required:true,
        minlength:5,
        maxlength:50
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type:string,
        required:true,
        minlength:5,
        maxlength:50
    }
})); 

const Genre = new mongoose.model('Customer',genreSchema);

const genere = [
    {id:1,name:'Action'},
    {id:2,name:'Horror'},
    {id:3,name:'Romance'},
    {id:4,name:'Thriller'},
    {id:5,name:'Comedy'}
];

genere.get('/',async(req,res)=>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

genere.post('/',async(req,res)=>{
    const{error}=validategenere(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name:req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();

    res.send(customer);
});

function validateCustomer(customer){
    const schema = {
        name: Jio.string().min(5).max(50).required(),
        phone: Jio.string().min(5).max(50).required(),
        isGold: Jio.Boolean()
    };
    return Jio.validate(customer,schema);
}

module.export = generes;