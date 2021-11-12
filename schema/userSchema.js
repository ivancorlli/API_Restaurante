var mongoose = require ('mongoose');
const Schema = mongoose.Schema;


var rolesValidos = [
    'USUARIO',
    'ADMIN'
]

const UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number},
    password: {type: String, required: true},
    active: {type: Boolean, default: false},
    role: {type: String, required: true, default: 'USUARIO'},
    orders:[{
        type: Schema.Types.ObjectId,
        ref:'Orders'
    }]
})

module.exports = mongoose.model('User', UserSchema)