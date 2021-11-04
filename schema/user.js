var mongoose = require ('mongoose');
const Schema = mongoose.Schema;


var rolesValidos = [
    'CLIENTE',
    'USUARIO',
    'ADMIN'
]

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    status: {type: Boolean, default: true},
    role: {type: String, required: true, default: 'USUARIO' }
})

module.exports = mongoose.model('User', UserSchema)