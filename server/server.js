require('./config/config')

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/user'));
   
/** APP LISTEN **/
mongoose.connect(process.env.urlDB,{ useNewUrlParser: true , useCreateIndex:true},(err, res)=>{
    if(err)throw new err;
    console.info('BASE DE DATOS ONLINE')
});

app.listen(process.env.PORT,()=>{
    console.log('Escuchando en el puerto', process.env.PORT)
});