var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');

//Obtener listado de usuarios
//http://localhost:4321/usuarios
router.get('/', function (req, res){
    usuario.find({}, {})
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Obtener un usuario
//http://localhost:4321/usuarios/1
router.get('/:idUsuario', function (req, res){
    usuario.find(
        {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
        {primerNombre: true, primerApellido: true, email: true, nickName: true, contrasenia: true, plan: true}
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

//Crear un usuario
//http://localhost:4321/usuarios
router.post('/', function (req, res){
    let user = new usuario(
        {
            _id: mongoose.Types.ObjectId(),
            primerNombre: req.body.primerNombre,
            primerApellido: req.body.primerApellido,
            email: req.body.email,
            nickName: req.body.nickName,
            contrasenia: req.body.contrasenia,
            plan: "gratis",
            carpetas: [],
            snippets: [],
            ventanas:{
                html:"<html></html>",
                css:".clase{}",
                js:'var variable = "";'
            }
        }
    );

    user.save()
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Actualizar un usuario
//http://localhost:4321/usuarios/1
router.put('/:idUsuario', function (req, res){
    usuario.update(
        {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
        {
            primerNombre: req.body.primerNombre,
            primerApellido: req.body.primerApellido,
            email: req.body.email,
            nickName: req.body.nickName,
            contrasenia: req.body.contrasenia
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

//Eliminar un usuario
//http://localhost:4321/usuarios/1
router.delete('/:idUsuario', function (req, res){
    usuario.remove({_id: mongoose.Types.ObjectId(req.params.idUsuario)})
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