import express from 'express'
import * as userController from '../Controllers/UserController.js'
import { protect, admin } from '../middlewares/Auth.js'

const router = express.Router()

// ********** PUBLIC ROUTES **********
router.post('/', userController.registerUser)
router.post('/login', userController.loginUser)

// ********** PRIVATE ROUTES **********
router.put('/profile', protect, userController.updateUserProfile)
router.delete('/', protect, userController.deleteUserProfile)
router.put('/password', protect, userController.changeUserPassword)
router.get('/bookmarks', protect, userController.getUserBookmarks)
router.post('/bookmarks', protect, userController.addBookmarks)
router.delete('/bookmarks', protect, userController.deleteBookmarks)
router.delete('/bookmarks/:id', protect, userController.deleteBookmarkById)
router.get('/cart', protect, userController.getUserCart)
router.post('/cart', protect, userController.addMovieToCart)
router.delete('/cart/:id', protect, userController.deleteMovieFromCart)
router.delete('/cart', protect, userController.deleteAllMoviesFromCart)

// ********** ADMIN ROUTES **********
router.get('/', protect, admin, userController.getUsers)
router.delete('/:id', protect, admin, userController.deleteUsers)
router.put('/:id', protect, admin, userController.updateUser)

export default router