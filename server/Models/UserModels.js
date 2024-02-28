import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Xin hãy nhập tên']
   },
   email: {
      type: String,
      required: [true, 'Xin hãy nhập email'],
      unique: true,
      trim: true,
   },
   password: {
      type: String,
      required: [true, 'Xin hãy nhập mật khẩu'],
      minlength: [6, 'Mật này phải chứa ít nhất 6 ký tự'],
   },
   avatar: {
      type: String,
   },
   isAdmin: {
      type: Boolean,
      default: false,
   },
   bookmarks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
   }],
}, { timestamps: true })

export default mongoose.model('User', UserSchema)