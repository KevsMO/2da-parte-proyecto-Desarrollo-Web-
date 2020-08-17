var mongoose = require('mongoose');
const { json } = require('body-parser');

var esquema = new mongoose.Schema(
    {
        primerNombre: String,
        primerApellido: String,
        email: String,
        nickName: String,
        contrasenia: String,
        plan: String,
        carpetas: Array,
        snippets: Array,
        ventanas: Object
    }
);

module.exports = mongoose.model('usuarios', esquema);