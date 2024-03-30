import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   userName: { type: String, required: true },
   userImage: { type: String },
   rate: { type: Number, required: true },
   comment: { type: String, required: true },
}, { timestamps: true })

const MovieSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   title: {
      type: String,
      required: true
   },
   desc: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   banner: {
      type: String,
      required: true
   },
   categories: [{
      type: String,
      required: true
   }],
   language: {
      type: String,
      required: true
   },
   year: [{
      type: String,
      required: true
   }],
   episode: {
      type: String,
      required: true
   },
   status: {
      type: String,
      required: true
   },
   type: [{
      type: String,
      required: true
   }],
   video: {
      type: String,
      required: true
   },
   rate: {
      type: Number,
      required: true,
      default: 0
   },
   reviewNumber: {
      type: Number,
      required: true,
      default: 0
   },
   reviews: [reviewSchema],
   rateNumber: {
      type: Number,
      required: true,
      default: 0
   },
   comment: {
      type: Number,
      required: true,
      default: 0
   },
   characters: [{
      name: { type: String, required: true },
      image: { type: String, required: true },
   }],
   director: {
      type: String,
      required: true
   },
   studio: {
      type: String,
      required: true
   },
   age: {
      type: String,
      required: true
   },
   viewNumber: {
      type: Number,
      required: true,
      default: 0
   },
   followNumber: {
      type: Number,
      required: true,
      default: 0
   },
}, { timestamps: true })

export default mongoose.model('Movie', MovieSchema)