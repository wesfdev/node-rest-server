const express = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

app.get('/user', function (req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limit = req.query.limit || 5;
    limit = Number(limit);

    Usuario.find({status:true},'name email role status google img')
        .skip(desde)   
        .limit(limit)
        .exec((err, users)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }else{
                Usuario.count({status:true}, (err, conteo)=>{
                    res.json({
                        ok:true,
                        size:conteo,
                        users
                    });
                });
            }

        });
});
   
app.post('/user', function (req, res) {

    let body = req.body;
    let usuario = new Usuario({
        name:body.name,
        email:body.email,
        password: bcrypt.hashSync(body.password,10),
        role:body.role
    });

    usuario.save((err, userDB)=>{
        if(err){
           return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true, 
            user:userDB
        })
    });     

});

app.put('/user/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body,['name','email','img','role','status']);   
    Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, userDB)=>{
        if(err){
            return res.status(400).json({
                 ok:false,
                 err
             });
         }
         res.json({
             ok:true, 
             user:userDB
         })
    });
});
   

app.delete('/user/:id', function (req, res) {
    let id = req.params.id;
    //Usuario.findByIdAndDelete(id,(err, userDB)=>{
    Usuario.findByIdAndUpdate(id,{status:false},{new:true, runValidators:true},(err, userDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }else{
            if(!userDB){
                return res.status(400).json({
                    ok:false,
                    err:{
                        message:'Usuario no encontrado'
                    }
                });
            }else{
                res.json({
                    ok: true,
                    user:userDB
                })
            }

        }
    });
});
   
module.exports = app;