var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');

//Obtener listado de snippets de un usuario
//http://localhost:4321/usuarios/1/snippets
router.get('/:idUsuario/snippets', function (req, res){
});

//Obtener un snippet de un usuario
//http://localhost:4321/usuarios/1/snippets/5
router.get('/:idUsuario/snippets/:idSnippet', function (req, res){
});

//Crear un snippet de un usuario
//http://localhost:4321/usuarios/3/snippets
router.post('/:idUsuario/snippets', function (req, res){
});

//Actualizar un snippet de un usuario
//http://localhost:4321/usuarios/1/snippets/5
router.put('/:idUsuario/snippets/:idSnippet', function (req, res){
});

//Eliminar un snippet de un usuario
//http://localhost:4321/usuarios/1/snippets/5
router.delete('/:idUsuario/snippets/:idSnippet', function (req, res){
});

module.exports = router;