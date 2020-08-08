var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');

//Obtener los 3 archivos del iframe de un usuario
//http://localhost:4321/usuarios/1/ventanas
router.get('/:idUsuario/ventanas', function (req, res){
    usuario.find(
        {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
        {"ventanas":true}
    )        
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Actualizar los 3 archivos del iframe de un usuario
//http://localhost:4321/usuarios/1/ventanas
router.put('/:idUsuario/ventanas', function (req, res){
    usuario.update(
        { _id: mongoose.Types.ObjectId(req.params.idUsuario)},
        {
            $set:{
                "ventanas":{
                    html: req.body.html,
                    css: req.body.css,
                    js: req.body.js
                }
            }
        }
    )
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

module.exports = router;