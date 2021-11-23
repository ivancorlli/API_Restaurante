const express = require('express');
const api = express.Router();


// controllers
const menuControllers = require('../controllers/menuControllers');


api.post('/menu', menuControllers.createMenu);
api.get('/menu', menuControllers.getMenus)

module.exports = api