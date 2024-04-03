import React from 'react'
import { Link } from 'react-router-dom'

const Movie = ({ movie }) => {
   return (
      <Link to={`/movies/${movie?._id}`} className='relative movie-card w-full h-full block'>
         <div className='absolute left-1.5 top-1.5 px-2 py-1.5 bg-opacity-70 bg-black flex justify-between rounded-3xl z-20 text-yellow-200'>
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <span className='text-sm'>{movie?.rate}</span>
         </div>
         <div className='absolute right-1.5 mt-1.5 bg-opacity-80 h-[52px] w-[52px] bg-red-700 flex text-center justify-center items-center rounded-full z-20 text-white'>
            <span className='text-xs uppercase font-semibold'>{movie?.status === 'completed' ? 'Hoàn thành' : 'Đang chiếu'}</span>
         </div>
         <img src={`${movie?.image ? movie?.image : '/images/movie-default.jpg'}`} alt={`/images/${movie?.title}`} className='movie-image' />
         <span className='movie-title bg-opacity-40 text-sm'>{movie?.title}</span>
         <div div className='overlay rounded-md'>
            <div className="play-icon">
               <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 16">
                  <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
               </svg>
            </div>
         </div>
      </Link>
   )
}

export default Movie