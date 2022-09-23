const debug =require('debug')('app:startup');
const morgan = require('morgan');
const express = require('express');
const app = express();

if(app.get('env')==='development'){
app.use(morgan('tiny'));
debug('morgan enabled..');
}

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening ${port}....`));