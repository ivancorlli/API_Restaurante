const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const menuSchema = new Schema ({
    nombre:{type:String, required:true},
    precio:{type:Number, required:true},
    description:{type:String, required:true},
    imagen:{type:String},
})

module.exports = mongoose.Model('Menu',menuSchema)