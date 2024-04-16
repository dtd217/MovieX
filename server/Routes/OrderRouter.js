import express from 'express'
import * as orderController from '../Controllers/OrderController.js'
import { protect, admin } from '../middlewares/Auth.js'

const router = express.Router()

// ********** PRIVATE ROUTES **********
router.post('/', protect, orderController.createOrder)

// ********** ADMIN ROUTES **********
router.get('/', protect, admin, orderController.getAllOrders)
router.get('/:id', protect, admin, orderController.getOrderById)
router.delete('/', protect, admin, orderController.deleteAllOrders)

export default router