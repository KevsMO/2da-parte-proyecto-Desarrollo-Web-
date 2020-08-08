var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');

//Obtener los 3 archivos de un proyecto de una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/2/proyectos/4/archivos
router.get('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto/archivos/', function (req, res){
});

//Crear los 3 archivos de un proyecto de una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/2/proyectos/4/archivos
router.post('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto/archivos', function (req, res){
});

//Actualizar los 3 archivos de un proyecto de una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/2/proyectos/4/archivos
router.put('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto/archivos', function (req, res){
});

module.exports = router;