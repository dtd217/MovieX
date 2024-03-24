import { MoviesData } from '../Data/movieData.js'
import Movie from '../Models/MoviesModel.js'
import asyncHandler from 'express-async-handler'

// ********** PUBLIC CONTROLLERS **********

// @desc    Import movies
// @route   POST /api/movies/import
// @access  Public
const importMovies = asyncHandler(async (req, res) => {
   // Đầu tiên xoá toàn hết phim trong bảng PHIM
   await Movie.deleteMany({})
   // Sau đó thêm phim từ MoviesData
   const movies = await Movie.insertMany(MoviesData)
   res.status(201).json(movies)
})

// @desc    Get all filterd movies
// @route   GET /api/movies
// @access  Public
const getMovies = asyncHandler(async (req, res) => {
   try {
      // Phân loại phim theo thể loại, lượt đánh giá, năm sản xuất và tìm kiếm
      const { categories, year, type, search } = req.query

      let query = {
         ...(categories && { categories: { $all: categories } }),
         ...(type && { type: { $in: type } }),
         ...(year && { year: { $in: year } }),
         ...(search && { title: { $regex: search, $options: 'i' } })
      }

      // Chức năng tải thêm phim
      const page = Number(req.query.pageNumber) || 1 //Nếu pageNumber trống => set băng 1
      const limit = 16
      const skip = (page - 1) * limit // bỏ qua 2 movies trong mỗi page

      // Tìm phim bằng câu lệnh, tiếp theo và giới hạn trang
      const movies = await Movie.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)

      // Tổng số bộ phim
      const count = await Movie.countDocuments(query)

      // Trả về phim và tổng số phim
      res.json({
         movies,
         page,
         pages: Math.ceil(count / limit),
         totalMovies: count
      })

   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Get movie by id
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = asyncHandler(async (req, res) => {
   try {
      // Tìm phim theo id trong db
      const movie = await Movie.findById(req.params.id)
      // Nếu có phim => gửi phim đến client
      if (movie) {
         res.json(movie)
      }
      // Nếu không có => gửi lỗi
      else {
         res.status(404)
         throw new Error('Không tìm thấy phim')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Get top rated movies
// @route   GET /api/movies/rated/top
// @access  Public
const getTopRatedMovies = asyncHandler(async (req, res) => {
   try {
      // Tìm phim được đánh giá cao
      const movies = await Movie.find({}).sort({ rate: -1 }).limit(10)
      // Gửi phim đến client
      res.json(movies)
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Get random movies
// @route   GET /api/movies/random/all
// @access  Public
const getRandomMovies = asyncHandler(async (req, res) => {
   try {
      // Tìm phim ngẫu nhiên
      const movies = await Movie.aggregate([{ $sample: { size: 8 } }])
      // Gửi phim đến client
      res.json(movies)
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// ********** PRIVATE CONTROLLERS **********

// @desc    Create movie review
// @route   POST /api/movies/:id/review
// @access  Private
const createMovieReview = asyncHandler(async (req, res) => {
   const { rate, comment } = req.body
   try {
      // Tìm phim theo id trong db
      const movie = await Movie.findById(req.params.id)

      if (movie) {
         const alreadyReviewed = movie.reviews.find(
            (r) => r.userId.toString() === req.user._id.toString()
         )
         if (alreadyReviewed) {
            res.status(400)
            throw new Error('Bạn đã đánh giá phim này!')
         }
         const review = {
            userName: req.user.name,
            userId: req.user._id,
            userImage: req.user.avatar,
            rate: Number(rate),
            comment
         }
         movie.reviews.push(review)
         movie.reviewNumber = movie.reviews.length

         movie.rate = movie.reviews.reduce((acc, item) => item.rate + acc, 0) / movie.reviews.length

         await movie.save()
         res.status(201).json({ message: 'Đã thêm đánh giá!' })
      }
      else {
         res.status(404)
         throw new Error('Không tìm thấy phim')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// ********** ADMIN CONTROLLERS **********

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
const updateMovie = asyncHandler(async (req, res) => {
   const {
      title,
      desc,
      image,
      banner,
      categories,
      language,
      year,
      episode,
      video,
      rate,
      reviewNumber,
      reviews,
      characters } = req.body

   const movie = await Movie.findById(req.params.id)

   try {
      if (movie) {
         movie.title = req.body.title || movie.title
         movie.desc = req.body.desc || movie.desc
         movie.image = req.body.image || movie.image
         movie.banner = req.body.banner || movie.banner
         movie.categories = req.body.categories || movie.categories
         movie.language = req.body.language || movie.language
         movie.year = req.body.year || movie.year
         movie.episode = req.body.episode || movie.episode
         movie.video = req.body.video || movie.video
         movie.rate = req.body.rate || movie.rate
         movie.reviewNumber = req.body.reviewNumber || movie.reviewNumber
         movie.reviews = req.body.reviews || movie.reviews
         movie.characters = req.body.characters || movie.characters

         const updateMovie = await movie.save()
         res.status(200).json(updateMovie)
      }
      else {
         res.status(404)
         throw new Error('Không tìm thấy phim')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
const deleteMovie = asyncHandler(async (req, res) => {
   try {
      const movie = await Movie.findById(req.params.id)
      if (movie) {
         await movie.deleteOne()
         res.json({ message: 'Xóa phim thành công!' })
      }
      else {
         res.status(404)
         throw new Error('Không tìm thấy phim')
      }
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Delete all movie
// @route   DELETE /api/movies
// @access  Private/Admin
const deleteAllMovie = asyncHandler(async (req, res) => {
   try {
      await Movie.deleteMany({})
      res.json({ message: 'Xóa tất cả phim thành công!' })
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
})

// @desc    Create movie
// @route   POST /api/movies
// @access  Private/Admin
const createMovie = asyncHandler(async (req, res) => {
   const { title, desc, image, banner, categories, language, year, episode, video, rate, reviewNumber, reviews, characters } = req.body

   const movie = new Movie({ title, desc, image, banner, categories, language, year, episode, video, rate, reviewNumber, reviews, characters, userId: req.user._id })

   if (movie) {
      const createdMovie = await movie.save()
      res.status(201).json(createdMovie)
   }
   else {
      res.status(400)
      throw new Error('Không thêm được phim')
   }
})

export {
   importMovies,
   getMovies,
   getMovieById,
   getTopRatedMovies,
   getRandomMovies,
   createMovieReview,
   updateMovie,
   deleteMovie,
   deleteAllMovie,
   createMovie
}