const express = require('express');
const api = express.Router();

// Middlewares
const auth = require('../middlewares/auth')

// controllers
const menuControllers = require('../controllers/menuControllers');


api.post('/menu', menuControllers.createMenu);
api.get('/menu', menuControllers.getMenus)
api.put('/menu/:id', menuControllers.updateMenu)
api.delete('/menu/:id', menuControllers.deleteMenu)


module.exports = api