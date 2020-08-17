var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');

//Obtener listado de proyectos de una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/2/proyectos
router.get('/:idUsuario/carpetas/:idCarpeta/proyectos', function (req, res){
    usuario.find(
        {
            _id: mongoose.Types.ObjectId(req.params.idUsuario),
            "carpetas._id":mongoose.Types.ObjectId(req.params.idCarpeta)
        },
        {"carpetas.$": true}
        // "proyectos.nombreProyecto":true, "proyectos._id":true
        // 
    )        
    .then(result=>{
        res.send(result[0].carpetas[0].proyectos);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Obtener un proyecto de una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/2/proyectos/7
router.get('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto', function (req, res){
    usuario.find(
        {
            _id: mongoose.Types.ObjectId(req.params.idUsuario),
            "carpetas._id": mongoose.Types.ObjectId(req.params.idCarpeta),
            // "proyecto._id": mongoose.Types.ObjectId(req.params.idProyecto)
        },
        {
            // $match:{
                "$.carpetas.$.proyectos": true
                // {
                //     nombreProyecto: "formulario-farmacia"
                // }
            // }
        }
        // "proyectos.nombreProyecto":true, "proyectos._id":true
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