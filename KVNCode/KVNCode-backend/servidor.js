const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/conexion');


// APIs Express
const usuarioRoutes = require('./routes/usuario.routes');
const carpetaRoutes = require('./routes/carpeta.routes');
const proyectoRoutes = require('./routes/proyecto.routes');


// Configuracion Express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());


//Middlewares para Usuario
app.use('/usuario', usuarioRoutes);
app.use('/usuario', carpetaRoutes);
app.use('/carpeta', proyectoRoutes);


// Coneccion MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Base de Datos conectada')
},
    error => {
        console.log("No se puede conectar a la Base de Datos: " + error)
    }
)


// Remover error de advertencia de MongoDB
mongoose.set('useCreateIndex', true);


// Recursos estaticos del servidor
app.use('/public', express.static('public'));


// Definicion de puerto
const port = process.env.PORT || 4321;
const servidor = app.listen(port, () => {
    console.log('Conectado al puerto ' + port)
})


// Captura de error de Express
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Algo salió mal'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});