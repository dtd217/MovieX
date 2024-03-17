import React, { useEffect, useState } from 'react'
import { Movies } from '../Data/movieData';
import Movie from './Movie';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Loader from '../Components/Notifications/Loader';

const ListMovies = ({ moviess, title }) => {
   const dispatch = useDispatch()


   const { isLoading, isError, movies, page, pages } = useSelector((state) => state.getAllMovies)
   const { categories } = useSelector((state) => state.getAllCategories)

   useEffect(() => {
      if (isError) {
         toast.error(isError)
      }
   }, [dispatch, isError])

   return (
      <section className='text-center w-full block rounded-md mt-5'>
         <div className='xs:text-xl uppercase font-semibold tracking-wide flex items-center justify-center py-2 bg-gradient-to-tr from-red-700 to-red-400 text-gray-100 rounded-md w-full'>
            {title}
         </div>
         <ul className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 mt-5">
            {isLoading ?
               <Loader /> :
               Movies?.length < 0 ?
                  <>
                     {Movies.slice(0, page)?.map((movie, index) => (
                        <li className='col-span-1' key={index}>
                           <Movie movie={movie} />
                        </li>
                     ))}
                  </> :
                  <div className='bg-[#78909c] col-span-5 py-12 bg-opacity-20 rounded-md flex flex-col items-center justify-center'>
                     <div className="h-28 flex justify-center items-center">
                        <i className="fa-regular fa-circle-xmark fa-4x text-red-500"></i>
                     </div>
                     <p className='text-3xl py-2 font-semibold'>Không có phim nào</p>
                  </div>
            }
         </ul>
         {/* <div className={`${page >= movies.length ? 'hidden' : ''} w-full text-center mt-6`}>
            <button onClick={handleLoadingMore} className='py-3 px-4 font-semibold bg-gradient-to-tr bg-red-600 hover:opacity-70 transitions rounded-lg w-fit'>
               LOAD MORE
            </button>
         </div> */}
      </section>
   )
}

export default ListMovies
