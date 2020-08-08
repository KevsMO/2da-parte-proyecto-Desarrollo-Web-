var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');

//Obtener listado de carpetas de un usuario
//http://localhost:4321/usuarios/1/carpetas
router.get('/:idUsuario/carpetas', function (req, res){
    usuario.find(
        {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
        {"carpetas.nombreCarpeta":true, "carpetas._id":true}
    )        
    .then(result=>{
        res.send(result[0].carpetas);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Obtener una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/5
router.get('/:idUsuario/carpetas/:idCarpeta', function (req, res){
    usuario.find(
        {
            _id: mongoose.Types.ObjectId(req.params.idUsuario),
            "carpetas._id" : mongoose.Types.ObjectId(req.params.idCarpeta)
        },
        {"carpetas.nombreCarpeta.$":true, "carpetas._id":true}
    )        
    .then(result=>{
        res.send(result[0].carpetas[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Crear una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas
router.post('/:idUsuario/carpetas', function (req, res){
    usuario.update(
        {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
        {
            $push:{
                carpetas:{
                    _id: mongoose.Types.ObjectId(),
                    nombreCarpeta: req.body.nombreCarpeta,
                    proyectos: []
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

//Actualizar una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/5
router.put('/:idUsuario/carpetas/:idCarpeta', function (req, res){
    usuario.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idUsuario),
            "carpetas._id": mongoose.Types.ObjectId(req.params.idCarpeta)
        },
        {
            $set:{
                "carpetas.$":{
                    // _id: mongoose.Types.ObjectId(req.params.idCarpeta),
                    nombreCarpeta: req.body.nombreCarpeta
                    // proyectos: proyectosTemp
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

//Eliminar una carpeta de un usuario
//http://localhost:4321/usuarios/1/carpetas/5
router.delete('/:idUsuario/carpetas/:idCarpeta', function (req, res){
    usuario.update(
        {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
        {
            $pull:{
                carpetas: {_id: mongoose.Types.ObjectId(req.params.idCarpeta)}
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