const debug =require('debug')('app:startup'); 
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

console.log('Application Name: '+config.get('name'));
console.log('Mail server: '+config.get('mail.host'));
console.log('Mail Password: '+config.get('mail.password'));

if(app.get('env')==='development'){
app.use(morgan('tiny'));
console.log('morgan enabled..');
}

app.use(logger);

const courses = [
    {id:1,name:'courses1'},
    {id:2,name:'courses2'},
    {id:3,name:'courses3'}
];

app.get('/',(req,res)=>{
   res.render('index',{title:'My Express App',message:'Hello'});
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.post('/api/courses',(req,res)=>{
    const{error}=validateCourse(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    const course={
        id:courses.lenght+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(req,res)=>{
    const course =  courses.find(c => c.id === pareseInt(req.params.id));
      if(!course) res.status(404).send('give id not found');

      const{error} = validateCourse(req.body);
      if(error)return res.status(400).send(error.details[0].message);

      course.name=req.body.name;
      res.send(course);
  });
  
  app.delete('/api/courses/:id',(req,res)=>{
    const course =  courses.find(c => c.id === pareseInt(req.params.id));
      if(!course) res.status(404).send('give id not found');

    const index = courses.indexOf(course);
    course.splice(index,1);

      res.send(course);
  });
  
app.get('/api/courses/:id',(req,res)=>{
  const course =  courses.find(c => c.id === pareseInt(req.params.id));
    if(!course) res.status(404).send('give id not found');
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).required()
    };

    return Joi.valiate(course,schema);
}

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening ${port}....`));