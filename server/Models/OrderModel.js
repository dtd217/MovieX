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
   itemsPrice: {
      type: Number,
      required: true,
      default: 0
   },
   taxPrice: {
      type: Number,
      required: true,
      default: 0
   },
   totalPrice: {
      type: Number,
      required: true,
      default: 0
   },
   paymentMethod: {
      type: String,
      required: true,
      default: 'Paypal'
   },
   paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
   },
   isPaid: {
      type: Boolean,
      required: true,
      default: false
   },
   paidAt: {
      type: Date
   }
}, { timestamps: true })

export default mongoose.model('Order', OrderSchema)
