const mongoose = require('mongoose');
const express = require('express');
const { string } = require('joi');
const generes = express.Generes();

const genreSchema = new mongoose.Schema({
    name:{
        type:string,
        required:true,
        minlength:5,
        maxlength:50
    }
});

const Genre = new mongoose.model('Genre',genreSchema);

const genere = [
    {id:1,name:'Action'},
    {id:2,name:'Horror'},
    {id:3,name:'Romance'},
    {id:4,name:'Thriller'},
    {id:5,name:'Comedy'}
];

genere.get('/',(req,res)=>{
    res.send(genere);
});

genere.post('/',(req,res)=>{
    const{error}=validategenere(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    const genere={
        id:genere.lenght+1,
        name:req.body.name
    };
    genere
s.push(genere);
    res.send(genere);
});

genere.put('/:id',(req,res)=>{
    const genere =  genere
s.find(c => c.id === pareseInt(req.params.id));
      if(!genere) res.status(404).send('give id not found');

      const{error} = validategenere(req.body);
      if(error)return res.status(400).send(error.details[0].message);

      genere.name=req.body.name;
      res.send(genere);
  });
  
  genere.delete('/:id',(req,res)=>{
    const genere =  genere.find(c => c.id === pareseInt(req.params.id));
      if(!genere) res.status(404).send('give id not found');

    const index = genere.indexOf(genere);
    genere.splice(index,1);

      res.send(genere);
  });
  
genere.get('/:id',(req,res)=>{
  const genere =  genere.find(c => c.id === pareseInt(req.params.id));
    if(!genere) res.status(404).send('give id not found');
    res.send(genere);
});

function validategenere(genere){
    const schema = {
        name:Joi.string().min(3).required()
    };

    return Joi.valiate(genere,schema);
}

module.export = generes;