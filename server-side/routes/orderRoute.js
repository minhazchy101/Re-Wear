import express from 'express'
import { addOrder, confirmOrder, declineOrder, deleteOrderHistory, getMyOrders, getMyOrdersRequest, removeSelect } from '../controllers/orderController.js'
import { takerAuth } from '../middleware/takerAuth copy.js';
import { giverAuth } from '../middleware/giverAuth.js';

const orderRouter = express.Router()

orderRouter.post('/add-order', takerAuth, addOrder)
orderRouter.get('/remove-select/:id', takerAuth, removeSelect)
orderRouter.get('/my-orders', takerAuth, getMyOrders)
orderRouter.get('/my-orders-request', giverAuth, getMyOrdersRequest)
orderRouter.get('/decline-order/:id', giverAuth, declineOrder)
orderRouter.delete('/delete-order-history/:id', giverAuth, deleteOrderHistory)
orderRouter.put('/confirm-order/:id', giverAuth, confirmOrder)

export default orderRouter ;