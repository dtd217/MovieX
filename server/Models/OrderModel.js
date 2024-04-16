import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   orderItems: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
   }],
   paymentMethod: {
      type: String,
      required: true
   },
   itemsPrice: {
      type: Number,
      required: true
   },
   taxPrice: {
      type: Number,
      required: true
   },
   totalPrice: {
      type: Number,
      required: true
   }
}, { timestamps: true })

export default mongoose.model('Order', OrderSchema)
