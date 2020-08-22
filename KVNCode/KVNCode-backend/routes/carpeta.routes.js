const express = require("express");
const router = express.Router();
const userSchema = require("../models/usuario")
const folderSchema = require("../models/carpeta");
var mongoose = require('mongoose');


// Crear una carpeta del usuario
//http://localhost:4321/usuario/idUsuario/carpeta/crear-carpeta
router.post("/:idUsuario/carpeta/crear-carpeta", (req, res) => {
    const carpeta = new folderSchema({
        nombreCarpeta: req.body.nombreCarpeta,
        proyectos: []
    });
    carpeta.save().then(result => {
        
        userSchema.update(
            {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
            {
                $push: {
                    carpetas: carpeta._id
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

// Obtener carpetas del usuario
//http://localhost:4321/usuario/idUsuario/carpeta/
router.route("/:idUsuario/carpeta").get((req, res) => {
    userSchema.aggregate([
        {
            $lookup:{
                from: "carpetas",
                localField: "carpetas",
                foreignField: "_id",
                as:"carpetas"
            }
        },
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.idUsuario)
            }
        },
        {
            $project: {
                _id: true,
                carpetas:true
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


// Actualizar una carpeta del usuario
//http://localhost:4321/usuario/idUsuario/carpeta/idCarpeta
router.route("/:idUsuario/carpeta/:idCarpeta").put((req, res) => {
    folderSchema.findByIdAndUpdate(req.params.idCarpeta,
    {
        $set:{
            nombreCarpeta: req.body.nombreCarpeta
        }
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});


// Eliminar una carpeta del usuario
//http://localhost:4321/usuario/idUsuario/carpeta/idCarpeta
router.route("/:idUsuario/carpeta/:idCarpeta").delete((req, res) => {
    folderSchema.remove({_id: mongoose.Types.ObjectId(req.params.idCarpeta)})
    .then(result => {

        userSchema.update(
            {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
            {
                $pull: {
                    carpetas: mongoose.Types.ObjectId(req.params.idCarpeta)
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