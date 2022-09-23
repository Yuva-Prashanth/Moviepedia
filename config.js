const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

console.log(`NODE_ENV:${process.env.NODE_ENV}`); 

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
    res.send('hello world!!!');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
  const course =  courses.find(c => c.id === pareseInt(req.params.id))
    if(!course) res.status(404).send('give id not found');
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening ${port}....`));