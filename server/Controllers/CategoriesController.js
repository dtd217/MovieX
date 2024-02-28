import express from 'express'
import Categories from '../Models/CategoriesModel.js'
import * as categoriesController from '../Controllers/CategoriesController.js'
import { protect, admin } from '../middlewares/Auth.js'

// ********** PUBLIC CONTROLLERS **********

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
   try {
      // Tìm tất cả categories trong db
      const categories = await Categories.find({})
      // Gửi categories đến client
      res.json(categories)
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// ********** ADMIN CONTROLLERS **********

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
   try {
      const { title } = req.body
      const category = new Categories({ title, value })
      const createdCategory = await category.save()
      res.status(201).json(createdCategory)
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

export { getCategories, createCategory }