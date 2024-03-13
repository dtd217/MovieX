import mongoose from 'mongoose'

const CategoriesSchema = new mongoose.Schema({
   label: {
      type: String,
      required: true
   },
   value: {
      type: String,
      // required: true
   },
   desc: {
      type: String,
      required: true
   }

}, { timestamps: true })

export default mongoose.model('Categories', CategoriesSchema)