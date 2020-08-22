const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const userSchema = require("../models/usuario");
const authorize = require("../middlewares/autorizacion");
var mongoose = require('mongoose');

// Registrarse (Crear usuario)
//http://localhost:4321/usuario/registrarse
router.post("/registrarse", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userSchema({
            primerNombre: req.body.primerNombre,
            primerApellido: req.body.primerApellido,
            email: req.body.email,
            nickName: req.body.nickName,
            password: hash,
            plan: "gratis",
            carpetas: [],
            snippets: [],
            ventanas:{
                html:'<div class="clase" style="margin-bottom: 20px;">Borra todo el código</div><br>',
                css:'.clase{ color: red; font-size: 50px;}',
                js:'document.write("Todo funciona!")'
            }
        });
        user.save().then((response) => {
            res.status(201).json({
                message: "Usuario creado correctamente!",
                result: response
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
    });
});

// Ingresar
//http://localhost:4321/usuario/ingresar
router.post("/ingresar", (req, res, next) => {
    let getUser;
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "El correo no existe en la Base de Datos"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Contraseña incorrecta"
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "100h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 360000,
            msg: getUser
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Falló la autenticación"
        });
    });
});

// Obtener un usuario
//http://localhost:4321/usuario/idUsuario
router.route('/:idUsuario').get(authorize, (req, res, next) => {
    userSchema.findById(req.params.idUsuario, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

// Actualizar un usuario
//http://localhost:4321/usuario/idUsuario
router.route('/:idUsuario').put((req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        req.body.password = hash;
        userSchema.findByIdAndUpdate(req.params.idUsuario, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                return next(error);
                console.log(error);
            } else {
                res.json(data)
                console.log('Usuario actualizado correctamente!');
            }
        });
    });
});

// Actualizar el plan de un usuario
//http://localhost:4321/usuario/idUsuario/actualizar-plan
router.route('/:idUsuario/actualizar-plan').put((req, res, next) => {
    userSchema.findByIdAndUpdate(req.params.idUsuario, {
        $set: {
            plan: req.body.plan
        }
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error);
        } else {
            res.json(data)
            console.log('Plan actualizado correctamente!');
        }
    });
});


/* Seccion para Snippets
--------------------------------------------------------*/

// Crear un snippet del usuario
//http://localhost:4321/usuario/idUsuario/snippet/crear-snippet
router.post('/:idUsuario/snippet/crear-snippet', (req, res) => {
    userSchema.update(
        {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
        {
            $push: { 
                snippets: {
                    _id: mongoose.Types.ObjectId(),
                    nombreSnippet: req.body.nombreSnippet,
                    extension: req.body.extension,
                    contenidoSnippet: req.body.contenidoSnippet
                }
            }
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

// Obtener snippets del usuario
//http://localhost:4321/usuario/idUsuario/snippet
router.route('/:idUsuario/snippet').get((req, res) => {
    userSchema.find(
        {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
        {snippets:true}
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

// Obtener un snippet del usuario
//http://localhost:4321/usuario/idUsuario/snippet/idSnippet
router.route('/:idUsuario/snippet/:idSnippet').get((req, res) => {
    userSchema.find(
        {_id: mongoose.Types.ObjectId(req.params.idUsuario), 'snippets._id': mongoose.Types.ObjectId(req.params.idSnippet)},
        {'snippets.$':true}
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

// Actualizar un snippet del usuario
//http://localhost:4321/usuario/idUsuario/snippet/idSnippet
router.route('/:idUsuario/snippet/:idSnippet').put((req, res) => {
    userSchema.update(
        {_id: mongoose.Types.ObjectId(req.params.idUsuario), 'snippets._id': mongoose.Types.ObjectId(req.params.idSnippet)},
        {
            $set: {
                'snippets.$': {
                    _id: mongoose.Types.ObjectId(req.params.idSnippet),
                    nombreSnippet: req.body.nombreSnippet,
                    extension: req.body.extension,
                    contenidoSnippet: req.body.contenidoSnippet
                }
            }
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

// Eliminar un snippet del usuario
//http://localhost:4321/usuario/idUsuario/snippet/idSnippet
router.route('/:idUsuario/snippet/:idSnippet').delete((req, res) => {
    userSchema.update(
        {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
        {
            $pull: {
                snippets: {_id: mongoose.Types.ObjectId(req.params.idSnippet)}
            }
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

module.exports = router;



// // Obtener usuarios
// //http://localhost:4321/usuario
// router.route('/').get(authorize, (req, res) => {
//     userSchema.find((error, response) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.status(200).json(response)
//         }
//     })
// });

// // Eliminar un usuario (No borra carpetas ni proyectos)
// //http://localhost:4321/usuario/idUsuario
// router.route('/:idUsuario').delete((req, res, next) => {
//     userSchema.findByIdAndRemove(req.params.idUsuario, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.status(200).json({
//                 msg: data
//             })
//         }
//     })
// });


// /* Seccion para Ventana
// --------------------------------------------------------*/

// // Obtener valores de las ventanas del usuario
// //http://localhost:4321/usuario/idUsuario/ventana
// router.route('/:idUsuario/ventana').get((req, res) => {
//     userSchema.find(
//         {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
//         {ventanas:true}
//     ).then(result => {
//         res.send(result[0]);
//         res.end();
//     }).catch(error => {
//         res.send(error);
//         res.end();
//     });
// });

// // Actualizar valores de las ventanas del usuario
// //http://localhost:4321/usuario/idUsuario/ventana/actualizar
// router.route('/:idUsuario/ventana').put((req, res) => {
//     userSchema.update(
//         {_id: mongoose.Types.ObjectId(req.params.idUsuario)},
//         {
//             $set: {
//                 ventanas: {
//                     html: req.body.html,
//                     css: req.body.css,
//                     js: req.body.js
//                 }
//             }
//         }
//     ).then(result => {
//         res.send(result);
//         res.end();
//     }).catch(error => {
//         res.send(error);
//         res.end();
//     });
// });