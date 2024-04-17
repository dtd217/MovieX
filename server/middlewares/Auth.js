// @desc Xác thực user và lấy token
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../Models/UserModels.js'

const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
   })
}

// protection middleware
const protect = asyncHandler(async (req, res, next) => {
   let token
   // Kiểm tra token trong headers
   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Gán token từ Bearer vào headers
      try {
         token = req.headers.authorization.split(' ')[1]
         // Xác thực token và lấy user.id
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
         // Lấy user.id từ decoded token
         req.user = await User.findById(decoded.id).select('-password')
         next()
      }
      catch (error) {
         res.status(401)
         throw new Error('Xác thực token thất bại')
      }
   }
   // nếu token không tồn tại trong headers => gửi lỗi
   if (!token) {
      res.status(401)
      throw new Error('Không xác thực được token')
   }
})

// Admin middleware
const admin = (req, res, next) => {
   if (req.user && req.user.isAdmin) {
      next()
   }
   else {
      res.status(401)
      throw new Error('Bạn không có quyền truy cập')
   }
}

export { generateToken, protect, admin }