const express = require('express');
const api = express.Router();


// controllers
const menuControllers = require('../controllers/menuControllers');


api.post('/menu', menuControllers.createMenu);
api.get('/menu', menuControllers.getMenus)
api.put('/updateMenu/:id', menuControllers.updateMenu)
api.delete('/deleteMenu/:id', menuControllers.deleteMenu)


module.exports = api