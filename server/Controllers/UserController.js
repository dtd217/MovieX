import asyncHandler from 'express-async-handler'
import User from '../Models/UserModels.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../middlewares/Auth.js'

// ********** PUBLIC CONTROLLERS **********

// @desc    Register user
// @route   POST /api/users/
// @access  Public
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
         avatar,
      })

      // Neu co => tra ve cho client
      if (user) {
         res.status(201).json({
            _id: user._id,
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

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body
   try {
      // Tìm user trong db
      const user = await User.findOne({ email })

      // Nếu user tồn tại => so sánh password với hased password => gửi dữ liệu và token cho client
      if (user && (await bcrypt.compare(password, user.password))) {
         res.json({
            _id: user._id,
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

// ********** PRIVATE CONTROLLERS **********

// @desc    Update /api/user/profile
// @route   PUT /api/user
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
   const { name, email, avatar } = req.body
   try {
      const user = await User.findById(req.user._id)
      if (user) {
         user.name = name || user.name
         user.email = email || user.email
         user.avatar = avatar || user.avatar

         const updatedUser = await user.save()
         res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
         })
      }
      else {
         res.status(400)
         throw new Error('Người dùng không tồn tại')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Delete user
// @route   DELETE /api/user
// @access  Private
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
         await user.deleteOne()
         res.json({ message: 'Xoá người dùng thành công' })
      }
      // Nếu user không có trong db => gửi lỗi
      else {
         res.status(404)
         throw new Error('Người dùng không tồn tại')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Change password
// @route   PUT /api/user/password
// @access  Private
const changeUserPassword = asyncHandler(async (req, res) => {
   const { oldPassword, newPassword } = req.body
   try {
      // Tìm user trong db
      const user = await User.findById(req.user._id)
      // Nếu có user => so sánh password cũ với hased password => update và save
      if (user && await bcrypt.compare(oldPassword, user.password)) {
         const salt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(newPassword, salt)
         user.password = hashedPassword
         await user.save()
         res.json({ message: 'Đổi mật khẩu thành công!' })
      }
      // Nếu không có user => gửi lỗi
      else {
         res.status(401)
         throw new Error('Sai mật khẩu')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Get all liked movie
// @route   GET /api/user/bookmarks
// @access  Private
const getUserBookmarks = asyncHandler(async (req, res) => {
   try {
      // Tìm user trong db
      const user = await User.findById(req.user._id).populate('bookmarks')
      // Nếu có user => gửi dữ liệu phim đã theo dõi cho client
      if (user) {
         res.json(user.bookmarks)
      }
      // Nếu không có user => gửi lỗi
      else {
         res.status(404)
         throw new Error('Người dùng không tồn tại')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Add movie to bookmarks
// @route   POST /api/user/bookmarks
// @access  Private
const addBookmarks = asyncHandler(async (req, res) => {
   const { movieId } = req.body
   try {
      // Tìm user trong db
      const user = await User.findById(req.user._id)
      // Nếu có user => gửi dữ liệu phim đã theo dõi cho client
      if (user) {
         // Kiểm tra phim đã được đánh dấu hay chưa
         // Nếu phim đã được đánh dấu => thông báo
         if (user.bookmarks.includes(movieId)) {
            res.status(400)
            throw new Error('Phim đã được đánh dấu')
         }
         // Nếu phim chưa được đánh dâu => đánh dấu và lưu vào db
         user.bookmarks.push(movieId)
         await user.save()
         res.json(user.bookmarks)
      }
      // Nếu không có user => gửi lỗi
      else {
         res.status(404)
         throw new Error('Không tìm thấy phim')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Delete movie from bookmarks
// @route   DELETE /api/user/bookmarks
// @access  Private
const deleteBookmarks = asyncHandler(async (req, res) => {
   try {
      // Tìm user trong db
      const user = await User.findById(req.user._id)
      // Nếu có user => xoá phim đã đánh dấu
      if (user) {
         user.bookmarks = []
         await user.save()
         res.json({ message: 'Xoá tất cả phim đã đánh dấu thành công!' })
      }
      // Nếu không có user => gửi lỗi
      else {
         res.status(404)
         throw new Error('Người dùng không tồn tại')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Delete movie from bookmarks by id
// @route   DELETE /api/user/bookmarks/:id
// @access  Private
const deleteBookmarkById = asyncHandler(async (req, res) => {
   try {
      // Tìm user trong db
      const user = await User.findById(req.user._id)
      if (user) {
         // Nếu không có phim => gửi thông báo
         if (!user.bookmarks.includes(req.params.id)) {
            res.status(400)
            throw new Error('Không tìm thấy phim')
         }
         // Nếu có phim => xoá phim
         user.bookmarks = user.bookmarks.filter((movieId) => movieId.toString() !== req.params.id)
         await user.save()
         res.json({ message: 'Bỏ theoi dõi phim thành công!' })
      }
      // Nếu không có user => gửi lỗi
      else {
         res.status(404)
         throw new Error('Người dùng không tồn tại')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Get user cart
// @route   GET /api/user/cart
// @access  Private
const getUserCart = asyncHandler(async (req, res) => {
   try {
      const user = await User.findById(req.user._id).populate('cart')
      if (user) {
         res.json(user.cart)
      }
      else {
         res.status(404)
         throw new Error('Người dùng không tồn tại')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Add movie to cart
// @route   POST /api/user/cart
// @access  Private
const addMovieToCart = asyncHandler(async (req, res) => {
   const { movieId } = req.body
   try {
      const user = await User.findById(req.user._id)
      if (user) {
         if (user.cart.includes(movieId)) {
            res.status(400)
            throw new Error('Phim đã được thêm vào giỏ hàng')
         }
         user.cart.push(movieId)
         await user.save()
         res.json(user.cart)
      }
      else {
         res.status(404)
         throw new Error('Không tìm thấy phim')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Delete movie from cart
// @route   DELETE /api/user/cart
// @access  Private
const deleteMovieFromCart = asyncHandler(async (req, res) => {
   try {
      const user = await User.findById(req.user._id)
      if (user) {
         if (!user.cart.includes(req.params.id)) {
            res.status(400)
            throw new Error('Không tìm thấy phim')
         }
         user.cart = user.cart.filter((movieId) => movieId.toString() !== req.params.id)
         await user.save()
         res.json({ message: 'Xoá phim thành công!' })
      }
      else {
         res.status(404)
         throw new Error('Người dùng không tồn tại')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Delete all movie from cart
// @route   DELETE /api/user/cart
// @access  Private
const deleteAllMoviesFromCart = asyncHandler(async (req, res) => {
   try {
      const user = await User.findById(req.user._id)
      if (user) {
         user.cart = []
         await user.save()
         res.json({ message: 'Xoá tất cả giờ hàng thành công!' })
      }
      else {
         res.status(404)
         throw new Error('Người dùng không tồn tại')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// ********** ADMIN CONTROLLERS **********

// @desc    Get all users
// @route   GET /api/user
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
   try {
      const users = await User.find({})
      res.json(users)
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Delete users
// @route   DELETE /api/user/:id
// @access  Private/Admin
const deleteUsers = asyncHandler(async (req, res) => {
   try {
      const user = await User.findById(req.params.id)
      if (user) {
         if (user.isAdmin) {
            res.status(400)
            throw new Error('Không thể xoá admin')
         }
         await user.deleteOne()
         res.json({ message: 'Xoá người dùng thành công' })
      }
      else {
         res.status(404)
         throw new Error('Người dùng không tồn tại')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Update user
// @route   PUT /api/user/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
   try {
      const user = await User.findById(req.params.id)
      if (user) {
         user.isAdmin = req.body.isAdmin
         const updatedUser = await user.save()
         res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
         })
      }
      else {
         res.status(400)
         throw new Error('Người dùng không tồn tại')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

export {
   registerUser,
   loginUser,
   updateUserProfile,
   deleteUserProfile,
   changeUserPassword,
   getUserBookmarks,
   addBookmarks,
   deleteBookmarks,
   deleteBookmarkById,
   getUsers,
   deleteUsers,
   updateUser,
   getUserCart,
   addMovieToCart,
   deleteMovieFromCart,
   deleteAllMoviesFromCart
}