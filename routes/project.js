const mongoose = require('mongoose');
const Joi = require('joi');
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

const Genre = mongoose.model('Genre',genreSchema);

genere.get('/',(req,res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genere);
});

genere.post('/',async(req,res)=>{
    const{error}=validategenere(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    let genere = new Genre({name:req.body.name
    });

await genere.save();

    res.send(genere);
});

genere.put('/',async(req,res)=>{
    const{error} = validategenere(req.body);
      if(error)return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{
        new:true
    })

      if(!genere) res.status(404).send('give id not found');

      res.send(genere);
  });
  
  genere.delete('/',async(req,res)=>{
    const genre = await Genre.findByIdAndUpdate(req.params.id);

      if(!genere) res.status(404).send('give id not found');

      res.send(genere);
  });
  
genere.get('/',async(req,res)=>{
const genre = await Genre.findById(req.params.id);

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