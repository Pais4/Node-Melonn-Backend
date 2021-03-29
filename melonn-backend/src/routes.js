const express = require('express')

/* Controllers */
const SellOrderController = require('./controllers/sellOrder.controller')

const routes = express.Router()

/* Sell Order Routes */
routes.post('/api/sellorder', SellOrderController.createSellOrder)
routes.get('/api/sellorder', SellOrderController.getSellOrders)
routes.get('/api/sellorder/:sellOrderId', SellOrderController.getSellOrderById)

module.exports = routes;