const express = require('express');
const api = express.Router();


// Controllers
const userControllers = require('../controllers/userControllers')

api.post('/register', userControllers.crearUsuario )

api.post('/login', userControllers.loginUsuario )


module.exports = api