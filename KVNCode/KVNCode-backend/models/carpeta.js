const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let folderSchema = new Schema(
{
    nombreCarpeta: String,
    proyectos: Array
},
{
    collection: 'carpetas'
})

module.exports = mongoose.model('Carpeta', folderSchema)