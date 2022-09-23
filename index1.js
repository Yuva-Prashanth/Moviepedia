const mongoose = require('mongoose');
const customers = require('./routes/customers');
const debug =require('debug')('app:startup'); 
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');

const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const logger1 = require('./middleware/logger1');

const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/generes')
.then(()=> console.log('connected to MongoDB...'))
.catch(err => console.log('could not connect to MongoDB...'));

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses',courses);
app.use('/api/generes',generes);
app.use('/api/customers',customers);
app.use('/',home);

console.log('Application Name: '+config.get('name'));
console.log('Mail server: '+config.get('mail.host'));
console.log('Mail Password: '+config.get('mail.password'));

if(app.get('env')==='development'){
app.use(morgan('tiny'));
console.log('morgan enabled..');
}

app.use(logger);



const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening ${port}....`));