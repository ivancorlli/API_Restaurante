const express = require('express');
const api = express.Router();


// Controllers
const userControllers = require('../controllers/userControllers')

api.post('/register', userControllers.crearUsuario )


module.exports = api