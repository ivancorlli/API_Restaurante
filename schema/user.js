var mongoose = require ('mongoose');
const Schema = mongoose.Schema;


var rolesValidos = [
    'RESTAURANTE',
    'USUARIO',
    'ADMIN'
]

const UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    status: {type: Boolean, default: false},
    role: {type: String, required: true, default: 'USUARIO' }
})

module.exports = mongoose.model('User', UserSchema)