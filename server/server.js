import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { errorHandler } from './middlewares/errorMiddleware.js'
import userRouter from './Routes/UserRouter.js'
import moviesRouter from './Routes/MoviesRouter.js'
import categoriesRouter from './Routes/CategoriesRouter.js'
import UploadRouter from './Controllers/UploadFile.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
// Connect DB
connectDB()

// Main route
app.get('/', (req, res) => res.send('API is running...'))

// Other routes
app.use('/api/user', userRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/upload', UploadRouter)

// Error handling middleware
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
