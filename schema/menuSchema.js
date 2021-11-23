const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const menuSchema = new Schema ({
    nombre:{type:String, required:true},
    categoria:{type:String, required:true},
    precio:{type:Number, required:true},
    descripcion:{type:String, required:true},
    imagen:{type:String},
})

module.exports = mongoose.model('Menu',menuSchema)