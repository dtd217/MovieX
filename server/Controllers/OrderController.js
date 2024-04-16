import asyncHandler from 'express-async-handler'
import Order from '../Models/OrderModel.js'

// ********** USER CONTROLLERS **********

// @desc    Create order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
   const { user, orderItems, paymentMethod, itemsPrice, taxPrice, totalPrice } = req.body
   if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('Không có đơn hàng')
   }
   else {
      const order = new Order({ user, orderItems, paymentMethod, itemsPrice, taxPrice, totalPrice })
      const createOrder = await order.save()
      res.status(201).json(createOrder)
   }
})

// ********** ADMIN CONTROLLERS **********

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
   try {
      const order = await Order.findById(req.params.id).populate('orderItems').populate('user')
      if (order) {
         res.json(order)
      }
      else {
         res.status(404)
         throw new Error('Không tìm thấy đơn hàng')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
   try {
      const orders = await Order.find({}).populate('orderItems').populate('user')
      res.json(orders)
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Delete all orders
// @route   DELETE /api/orders
// @access  Private/Admin
const deleteAllOrders = asyncHandler(async (req, res) => {
   try {
      const orders = await Order.deleteMany({})
      res.json(orders)
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

export { createOrder, getOrderById, getAllOrders, deleteAllOrders }