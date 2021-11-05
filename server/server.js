const express = require ('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');

const app = express()
const cors =require('cors');

const formRoute = require('./routes/formRoute');
const pageRoute = require('./routes/pageRoute');
const entryRoute = require('./routes/entryRoute')


mongoose.connect('mongodb://localhost:27017/formbuilderdb',
{ useNewUrlParser: true ,  useUnifiedTopology: true})
.then((result)=>console.log('connection to database established'))
.catch((err)=>console.log('err'))

app.use(bodyParser.json());

app.use(cors());

  app.use('/form' , formRoute);
  app.use('/page' , pageRoute);
  app.use('/entry', entryRoute);
   
  app.listen(3001)