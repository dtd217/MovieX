import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ListMovies = ({ movies, title }) => {
   const maxPage = 10;
   const [page, setPage] = useState(maxPage)
   const handleLoadingMore = () => { setPage(page + maxPage) }

   return (
      <section className='text-center w-full block rounded-md mt-5'>
         <div className='xs:text-xl uppercase font-semibold tracking-wide flex items-center justify-center py-2 bg-gradient-to-tr from-red-700 to-red-400 text-gray-100 rounded-md w-full'>
            {title}
         </div>
         <ul className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 mt-5">
            {movies.slice(0, page)?.map((movie, index) => (
               <li className='col-span-1' key={index}>
                  <div>
                     <Link to={`/movie/${movie?.slug}`} className='relative movie-card h-auto w-full block'>
                        <div className='absolute left-1.5 top-1.5 px-2 py-1.5 bg-opacity-70 bg-black flex justify-between rounded-3xl z-20 text-yellow-200'>
                           <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                           </svg>
                           <span className='text-sm'>{movie?.rate}</span>
                        </div>
                        <div className='absolute right-1.5 mt-1.5 bg-opacity-80 h-[52px] w-[52px] bg-red-700 flex text-center justify-center items-center rounded-full z-20 text-white'>
                           <span className='text-xs uppercase font-semibold'>{movie?.status}</span>
                        </div>
                        <div className='relative'>
                           <img src={`${movie?.image}`} alt={`/images/${movie?.title}`} className='movie-image' />
                           <div div className='overlay !absolute top-0'>
                              <div className="play-icon">
                                 <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 16">
                                    <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                                 </svg>
                              </div>
                           </div>
                        </div>
                        <p className='text-center mt-2 text-lg font-semibold hover:text-gray-500 transitions'>{movie.title}</p>
                        <p className='text-center mt-0.5 text-gray-500'>{movie?.viewNumber}</p>
                     </Link>
                  </div>
               </li>
            ))}
         </ul>
         <div className={`${page >= movies.length ? 'hidden' : ''} w-full text-center mt-6`}>
            <button onClick={handleLoadingMore} className='py-3 px-4 font-semibold bg-gradient-to-tr bg-red-600 hover:opacity-70 transitions rounded-lg w-fit'>
               LOAD MORE
               {/* <i className="fa-solid fa-circle-notch fa-spin ml-2 fa-lg"></i> */}
            </button>
         </div>
      </section>
   )
}

export default ListMovies
