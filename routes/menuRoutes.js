const express = require('express');
const api = express.Router();


// controllers
const menuControllers = require('../controllers/menuControllers');


api.post('/menu', menuControllers.createMenu)

module.exports = api