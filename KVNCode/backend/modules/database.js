var mongoose = require('mongoose');

var servidor = 'localhost:27017';
var db = 'KVNCode';

class Database{
    constructor(){
        //Promesas
        mongoose.connect(`mongodb://${servidor}/${db}`)
        .then(()=>{
            console.log('Se conectó a la base de datos KVNCode desde mongoDB');
        })
        .catch((error)=>{
            console.log(error);
        });
    }
}

module.exports = new Database();