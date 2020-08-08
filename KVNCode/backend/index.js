var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var database = require('./modules/database');

//Exportando usuarios e iframe
var usuariosRouter = require('./routers/usuarios-router');
var carpetasRouter = require('./routers/carpetas-router');
var proyectosRouter = require('./routers/proyectos-router');
var archivosRouter = require('./routers/archivos-router');
var snippetsRouter = require('./routers/snippets-router');
var ventanasRouter = require('./routers/ventanas-router');

var app = express();

//Middleware para cors
app.use(cors());

//Middlewares para body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Middlewares para usuarios
app.use('/usuarios', usuariosRouter);
app.use('/usuarios', carpetasRouter);
app.use('/usuarios', proyectosRouter);
app.use('/usuarios', archivosRouter);
app.use('/usuarios', snippetsRouter);
app.use('/usuarios', ventanasRouter);

app.listen(4321, ()=>{
    console.log('Servidor del backend KVNCode levantado en el puerto 4321');
});