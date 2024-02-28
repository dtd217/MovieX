import express from 'express'
import * as userController from '../Controllers/UserController.js'
import { protect, admin } from '../middlewares/Auth.js'

const router = express.Router()

// ********** PUBLIC ROUTES **********
router.post('/', userController.registerUser)
router.post('/login', userController.loginUser)

// ********** PRIVATE ROUTES **********
router.put('/', protect, userController.updateUserProfile)
router.delete('/', protect, userController.deleteUserProfile)
router.put('/password', protect, userController.changeUserPassword)
router.get('/bookmarks', protect, userController.getUserBookmarks)
router.post('/bookmarks', protect, userController.addBookmarks)
router.delete('/bookmarks', protect, userController.deleteBookmarks)

// ********** ADMIN ROUTES **********
router.get('/', protect, admin, userController.getUsers)
router.delete('/:id', protect, admin, userController.deleteUsers)

export default router