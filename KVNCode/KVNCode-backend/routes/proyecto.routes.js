const express = require("express");
const router = express.Router();
const folderSchema = require("../models/carpeta");
const projectSchema = require("../models/proyecto");
var mongoose = require('mongoose');


// Crear un proyecto de la carpeta
//http://localhost:4321/carpeta/idCarpeta/proyecto/crear-proyecto
router.post("/:idCarpeta/proyecto/crear-proyecto", (req, res) => {
    const proyecto = new projectSchema({
        nombreProyecto: req.body.nombreProyecto,
        archivos: {
            html: {
                nombreHTML: req.body.nombreProyecto + '.html',
                contenidoHTML: "Codigo HTML"
            },
            css: {
                nombreCSS: req.body.nombreProyecto + '.css',
                contenidoCSS: "Codigo CSS"
            },
            js: {
                nombreJS: req.body.nombreProyecto + '.js',
                contenidoJS: "Codigo JS"
            }
        }
    });
    proyecto.save().then(result => {
        
        folderSchema.update(
            {_id: mongoose.Types.ObjectId(req.params.idCarpeta)},
            {
                $push: {
                    proyectos: proyecto._id
                }
            }
        ).then(result2 => {
            res.send(result2);
            res.end();
        }).catch(error2 => {
            res.send(error2);
            res.end();
        });

        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});


// Obtener proyectos de la carpeta
//http://localhost:4321/carpeta/idCarpeta/proyecto
router.route("/:idCarpeta/proyecto").get((req, res) => {
    folderSchema.aggregate([
        {
            $lookup:{
                from: "proyectos",
                localField: "proyectos",
                foreignField: "_id",
                as:"proyectos"
            }
        },
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.idCarpeta)
            }
        },
        {
            $project: {
                _id: true,
                proyectos:true
            }
        }
    ]).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});


// Actualizar un proyecto de la carpeta
//http://localhost:4321/carpeta/idCarpeta/proyecto/idProyecto
router.route("/:idCarpeta/proyecto/:idProyecto").put((req, res) => {
    projectSchema.findByIdAndUpdate(req.params.idProyecto,
    {
        $set:{
            nombreProyecto: req.body.nombreProyecto,
            "archivos.html.nombreHTML": req.body.nombreProyecto + '.html',
            "archivos.css.nombreCSS":req.body.nombreProyecto + '.css',
            "archivos.js.nombreJS": req.body.nombreProyecto + '.js'
        }
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});


// Eliminar un proyecto de la carpeta
//http://localhost:4321/usuario/idUsuario/carpeta/idCarpeta
router.route("/:idCarpeta/proyecto/:idProyecto").delete((req, res) => {
    projectSchema.remove({_id: mongoose.Types.ObjectId(req.params.idProyecto)})
    .then(result => {

        folderSchema.update(
            {_id: mongoose.Types.ObjectId(req.params.idCarpeta)},
            {
                $pull: {
                    proyectos: mongoose.Types.ObjectId(req.params.idProyecto)
                }
            }
        ).then(result2 => {
            res.send(result2);
            res.end();
        }).catch(error2 => {
            res.send(error2);
            res.end();
        });

        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});


module.exports = router;