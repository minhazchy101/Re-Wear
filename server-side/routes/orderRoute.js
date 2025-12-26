import express from 'express'
import { addOrder, getMyOrders, getMyOrdersRequest } from '../controllers/orderController.js'
import { takerAuth } from '../middleware/takerAuth copy.js';
import { giverAuth } from '../middleware/giverAuth.js';

const orderRouter = express.Router()

orderRouter.post('/add-order', takerAuth, addOrder)
orderRouter.get('/my-orders', takerAuth, getMyOrders)
orderRouter.get('/my-orders-request', giverAuth, getMyOrdersRequest)

export default orderRouter ;