var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');

//Obtener listado de proyectos de una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/2/proyectos
router.get('/:idUsuario/carpetas/:idCarpeta/proyectos', function (req, res){
});

//Obtener un proyecto de una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/2/proyectos/7
router.get('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto', function (req, res){
});

//Crear un proyecto de una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/2/proyectos
router.post('/:idUsuario/carpetas/:idCarpeta/proyectos', function (req, res){
});

//Actualizar un proyecto de una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/2/proyectos/7
router.put('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto', function (req, res){
});

//Eliminar un proyecto de una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/2/proyectos/7
router.delete('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto', function (req, res){
});

module.exports = router;