const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Roles =[
    'USER_ROLE',
    'ADMIN_ROLE',
    'EMPLOYEE_ROLE',
]


const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    phone: Number,
    role: { type: String, required: true, default: 'USER_ROLE' },
    avatar: { type: String, default: 'default.png'},
    active: { type: Boolean, default: true }
})


module.exports = mongoose.model('User', UserSchema);