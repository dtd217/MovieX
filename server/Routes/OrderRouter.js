import express from 'express'
import * as orderController from '../Controllers/OrderController.js'
import { protect, admin } from '../middlewares/Auth.js'

const router = express.Router()

// ********** PRIVATE ROUTES **********
router.post('/', protect, orderController.createOrder)
router.put('/:id/pay', protect, orderController.payOrder)

// ********** ADMIN ROUTES **********
router.get('/', protect, orderController.getAllOrders)
router.get('/:id', protect, orderController.getOrderById)
router.delete('/', protect, admin, orderController.deleteAllOrders)

export default router