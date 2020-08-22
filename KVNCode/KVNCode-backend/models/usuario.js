const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema(
{
    primerNombre: String,
    primerApellido: String,
    email: {
        type: String,
        unique: true
    },
    nickName: String,
    password: String,
    plan: String,
    carpetas: Array,
    snippets: [
        {
            _id: mongoose.Types.ObjectId,
            nombreSnippet: String,
            extension: String,
            contenidoSnippet: String
        }
    ],
    ventanas: {
        html: String,
        css: String,
        js: String
    }
},
{
    collection: 'usuarios'
})

userSchema.plugin(uniqueValidator, { message: 'El email ya está en uso.' });
module.exports = mongoose.model('Usuario', userSchema)