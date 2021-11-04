const express = require('express');
const api = express.Router();


// Controllers
const userControllers = require('../controllers/userControllers')

api.post('/regist', userControllers.createUser );
api.get('/users',userControllers.getUsers)


module.exports = api