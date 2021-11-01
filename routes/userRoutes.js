const express = require('express');
const api = express();


// Controllers
const userControllers = require('../controllers/userControllers')

api.post('/register', userControllers.crearUsuario )