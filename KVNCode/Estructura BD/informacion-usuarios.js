db.usuarios.insertMany([
    {
        "_id":ObjectId("5f3bcd8dae840619b0f53b87"),
        "primerNombre":"Pedro",
        "primerApellido":"Lopez",
        "email":"correo123@gmail.com",
        "nickName":"elMalote",
        "password":"$2a$10$WMzA8BJX8b2ljGl8.Vsx0utMDnZVSPIkTosdiSpqpAedf.tWZiTLm",
        "plan":"gratis",
        "carpetas":[
            ObjectId("5f3bccc1ae840619b0f53b7f"),
            ObjectId("5f3bccc1ae840619b0f53b80")
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
        "_id":ObjectId("5f3bcd8dae840619b0f53b88"),
        "primerNombre":"Laura",
        "primerApellido":"Caceres",
        "email":"lauracace@yahoo.es",
        "nickName":"Laures",
        "password":"$2a$10$/V4EJMHegK102soLhn7xTuGZXgjo7r5FXIhfjgmZQJ0M/SlpgwSX.",
        "plan":"basico",
        "carpetas":[
            ObjectId("5f3bccc1ae840619b0f53b81"),
            ObjectId("5f3bccc1ae840619b0f53b82")
        ],
        "snippets":[
            {
                "_id":ObjectId(),
                "nombreSnippet":"Snippet Angular",
                "extension":"php",
                "contenidoSnippet":"Codigo de Snippet de Snippet Angular"
            },
            {
                "_id":ObjectId(),
                "nombreSnippet":"Query's MongoDB",
                "extension":"html",
                "contenidoSnippet":"Codigo de Snippet de Query's MongoDB"
            }
        ],
        "ventanas":{
            "html":"HTML al cargar la pagina de usuario 2",
            "css":"CSS al cargar la pagina de usuario 2",
            "js":"JS al cargar la pagina de usuario 2"
        }
    }
]);