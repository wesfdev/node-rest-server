require('./config/config')

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/user', function (req, res) {
    res.json('GET USERS')
});
   
app.post('/user', function (req, res) {

    let body = req.body;

    if(!body.nombre){ 
        res.status(400).json({
            ok:false,
            message:'El nombre es necesario.'
        });
    }else{
        res.json({persona:body});
    }


});

app.put('/user/:id', function (req, res) {
    let id = req.params.id;
    res.json({id})
});
   

app.delete('/user', function (req, res) {
    res.json('DELETE USERS')
});
   
   

  app.listen(process.env.PORT,()=>{
      console.log('Escuchando en el puerto', process.env.PORT)
  });