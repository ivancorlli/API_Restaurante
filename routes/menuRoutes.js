const express = require('express');
const api = express.Router();

// Middlewares
const auth = require('../middlewares/auth')

// controllers
const menuControllers = require('../controllers/menuControllers');


api.post('/menu',auth, menuControllers.createMenu);
api.get('/menu',auth, menuControllers.getMenus)

module.exports = api