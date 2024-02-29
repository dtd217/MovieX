import mongoose from 'mongoose'

const CategoriesSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   value: {
      type: String,
      // required: true
   },

}, { timestamps: true })

export default mongoose.model('Categories', CategoriesSchema)