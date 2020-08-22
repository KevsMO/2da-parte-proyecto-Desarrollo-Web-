const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new Schema(
{
    nombreProyecto: String,
    archivos: {
        html: {
            nombreHTML: String,
            contenidoHTML: String
        },
        css: {
            nombreCSS: String,
            contenidoCSS: String
        },
        js: {
            nombreJS: String,
            contenidoJS: String
        }
    }
},
{
    collection: 'proyectos'
})

module.exports = mongoose.model('Proyecto', projectSchema)