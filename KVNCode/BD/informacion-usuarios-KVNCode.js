db.usuarios.insertMany([
    {
        "primerNombre":"Pedro",
        "primerApellido":"Lopez",
        "email":"correo123@gmail.com",
        "nickName":"elMalote",
        "contrasenia":"asd.123",
        "plan":"gratis",
        "carpetas":[
            {
                "_id":ObjectId(),
                "nombreCarpeta":"Desarrollo Web",
                "proyectos":[
                    {
                        "_id":ObjectId(),
                        "nombreProyecto":"proyecto-clase",
                        "archivos":{
                            "_id":ObjectId(),
                            "html":{
                                "nombreHTML": "proyecto-clase.html",
                                "contenidoHTML": "Codigo HTML de proyecto-clase"
                            },
                            "css":{
                                "nombreCSS": "proyecto-clase.css",
                                "contenidoCSS": "Codigo CSS de proyecto-clase"
                            },
                            "js":{
                                "nombreJS": "proyecto-clase.js",
                                "contenidoJS": "Codigo JS de proyecto-clase"
                            }
                        }
                    },
                    {
                        "_id":ObjectId(),
                        "nombreProyecto":"formulario-farmacia",
                        "archivos":{
                            "_id":ObjectId(),
                            "html":{
                                "nombreHTML": "formulario-farmacia.html",
                                "contenidoHTML": "Codigo HTML de formulario-farmacia"
                            },
                            "css":{
                                "nombreCSS": "formulario-farmacia.css",
                                "contenidoCSS": "Codigo CSS de formulario-farmacia"
                            },
                            "js":{
                                "nombreJS": "formulario-farmacia.js",
                                "contenidoJS": "Codigo JS de formulario-farmacia"
                            }
                        }
                    }
                ]
            },
            {
                "_id":ObjectId(),
                "nombreCarpeta":"Carpeta 2",
                "proyectos":[
                    {
                        "_id":ObjectId(),
                        "nombreProyecto":"otro-proyecto-web",
                        "archivos":{
                            "_id":ObjectId(),
                            "html":{
                                "nombreHTML": "otro-proyecto-web.html",
                                "contenidoHTML": "Codigo HTML de otro-proyecto-web"
                            },
                            "css":{
                                "nombreCSS": "otro-proyecto-web.css",
                                "contenidoCSS": "Codigo CSS de otro-proyecto-web"
                            },
                            "js":{
                                "nombreJS": "otro-proyecto-web.js",
                                "contenidoJS": "Codigo JS de otro-proyecto-web"
                            }
                        }
                    },
                    {
                        "_id":ObjectId(),
                        "nombreProyecto":"software-banco",
                        "archivos":{
                            "_id":ObjectId(),
                            "html":{
                                "nombreHTML": "software-banco.html",
                                "contenidoHTML": "Codigo HTML de software-banco"
                            },
                            "css":{
                                "nombreCSS": "software-banco.css",
                                "contenidoCSS": "Codigo CSS de software-banco"
                            },
                            "js":{
                                "nombreJS": "software-banco.js",
                                "contenidoJS": "Codigo JS de software-banco"
                            }
                        }
                    }
                ]
            }
        ],
        "snippets":[
            {
                "_id":ObjectId(),
                "nombreSnippet":"Conexion DB",
                "extension":"js",
                "contenidoSnippet":"Codigo de Snippet de Conexion DB"
            },
            {
                "_id":ObjectId(),
                "nombreSnippet":"Snippet 2",
                "extension":"json",
                "contenidoSnippet":"Codigo de Snippet de Snippet 2"
            }
        ],
        "ventanas":{
            "html":"HTML al cargar la pagina de usuario 1",
            "css":"CSS al cargar la pagina de usuario 1",
            "js":"JS al cargar la pagina de usuario 1"
        }
    },
    {
        "primerNombre":"Laura",
        "primerApellido":"Caceres",
        "email":"lauracace@yahoo.es",
        "nickName":"Laures",
        "contrasenia":"lauca20",
        "plan":"basico",
        "carpetas":[
            {
                "_id":ObjectId(),
                "nombreCarpeta":"Proyectos colegio",
                "proyectos":[
                    {
                        "_id":ObjectId(),
                        "nombreProyecto":"computacion",
                        "archivos":{
                            "_id":ObjectId(),
                            "html":{
                                "nombreHTML": "computacion.html",
                                "contenidoHTML": "Codigo HTML de computacion"
                            },
                            "css":{
                                "nombreCSS": "computacion.css",
                                "contenidoCSS": "Codigo CSS de computacion"
                            },
                            "js":{
                                "nombreJS": "computacion.js",
                                "contenidoJS": "Codigo JS de computacion"
                            }
                        }
                    },
                    {
                        "_id":ObjectId(),
                        "nombreProyecto":"fisica",
                        "archivos":{
                            "_id":ObjectId(),
                            "html":{
                                "nombreHTML": "fisica.html",
                                "contenidoHTML": "Codigo HTML de fisica"
                            },
                            "css":{
                                "nombreCSS": "fisica.css",
                                "contenidoCSS": "Codigo CSS de fisica"
                            },
                            "js":{
                                "nombreJS": "fisica.js",
                                "contenidoJS": "Codigo JS de fisica"
                            }
                        }
                    }
                ]
            },
            {
                "_id":ObjectId(),
                "nombreCarpeta":"Proyectos del negocio",
                "proyectos":[
                    {
                        "_id":ObjectId(),
                        "nombreProyecto":"calcular-costos",
                        "archivos":{
                            "_id":ObjectId(),
                            "html":{
                                "nombreHTML": "calcular-costos.html",
                                "contenidoHTML": "Codigo HTML de calcular-costos"
                            },
                            "css":{
                                "nombreCSS": "calcular-costos.css",
                                "contenidoCSS": "Codigo CSS de calcular-costos"
                            },
                            "js":{
                                "nombreJS": "calcular-costos.js",
                                "contenidoJS": "Codigo JS de calcular-costos"
                            }
                        }
                    },
                    {
                        "_id":ObjectId(),
                        "nombreProyecto":"desarrollo-plataforma",
                        "archivos":{
                            "_id":ObjectId(),
                            "html":{
                                "nombreHTML": "desarrollo-plataforma.html",
                                "contenidoHTML": "Codigo HTML de desarrollo-plataforma"
                            },
                            "css":{
                                "nombreCSS": "desarrollo-plataforma.css",
                                "contenidoCSS": "Codigo CSS de desarrollo-plataforma"
                            },
                            "js":{
                                "nombreJS": "desarrollo-plataforma.js",
                                "contenidoJS": "Codigo JS de desarrollo-plataforma"
                            }
                        }
                    }
                ]
            }
        ],
        "snippets":[
            {
                "_id":ObjectId(),
                "nombreSnippet":"Conexion DB",
                "extension":"js",
                "contenidoSnippet":"Codigo de Snippet de Conexion DB"
            },
            {
                "_id":ObjectId(),
                "nombreSnippet":"Snippet 2",
                "extension":"json",
                "contenidoSnippet":"Codigo de Snippet de Snippet 2"
            }
        ],
        "ventanas":{
            "html":"HTML al cargar la pagina de usuario 2",
            "css":"CSS al cargar la pagina de usuario 2",
            "js":"JS al cargar la pagina de usuario 2"
        }
    }
]);