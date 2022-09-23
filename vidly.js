const debug =require('debug')('app:startup'); 
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const generes = require('./generes');
const app = express();

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use('/api/generes',generes);
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

app.get('/',(req,res)=>{
   res.render('index',{title:'My Express App',message:'Hello'});
});

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening ${port}....`));