import asyncHandler from 'express-async-handler'
import User from '../Models/UserModels.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../middlewares/Auth.js'

// @desc Register user
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password, avatar } = req.body
   try {
      const userExists = await User.findOne({ email })
      // Kiem tra user da ton tai chua
      if (userExists) {
         res.status(400)
         throw new Error('Người dùng đã tồn tại')
      }

      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Neu chua => tao user
      const user = await User.create({
         name,
         email,
         password: hashedPassword,
         avatar
      })

      // Neu co => tra ve cho client
      if (user) {
         res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
         })
      }
      else {
         res.status(400)
         throw new Error('Không thêm được người dùng')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body
   try {
      // Tìm user trong db
      const user = await User.findOne({ email })

      // Nếu user tồn tại => so sánh password với hased password => gửi dữ liệu và token cho client
      if (user && (await bcrypt.compare(password, user.password))) {
         res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
         })
      }
      // Nếu user không có hoặc password không giống => gửi thông báo lỗi
      else {
         res.status(400)
         throw new Error('Sai email hoặc password')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})


// Private Controller
// @desc Update /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
   const { name, email, avatar } = req.body
   try {
      // Tìm user trong db
      const user = await User.findById(req.user._id)
      // Nếu user tồn tại => update user
      if (user) {
         user.name = name || user.name
         user.email = email || user.email
         user.avatar = avatar || user.avatar

         const updatedUser = await user.save()

         // Gửi dữ liệu và token của user cho client
         res.json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
         })
      }
      // Nếu user không có hoặc password không giống => gửi thông báo lỗi
      else {
         res.status(400)
         throw new Error('Người dùng không tồn tại')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc Delete user
// @route DELETE /api/user
// @access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
   try {
      // Tìm user trong db
      const user = await User.findById(req.user._id)
      // Nếu user tồn tại => xóa user
      if (user) {
         // Nếu user là admin => gửi lỗi
         if (user.isAdmin) {
            res.status(400)
            throw new Error('Không thể xoá admin')
         }
         // Xoá user
         await user.remove()
         res.json({ message: 'Xoá người dùng thành công' })
      }
      // Nếu user không có trong db => gửi lỗi
      else {
         res.status(404)
         throw new Error('Người dùng không tồn tại')
      }
   }
   catch (error) {
      ré.status(400).json({ message: error.message })
   }
})

export { registerUser, loginUser, updateUserProfile, deleteUserProfile }