const express = require('express');
const api = express.Router();


// controllers
const orderControllers = require('../controllers/orderControllers');


api.post('/order', orderControllers.newOrder)
api.get('/order')

module.exports = api