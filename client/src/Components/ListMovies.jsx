import React, { useEffect } from 'react'
import Movie from './Movie';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Loader from '../Components/Notifications/Loader';
import { getAllMoviesAction } from '../Redux/Actions/moviesActions';

const ListMovies = ({ movies, title }) => {
   const dispatch = useDispatch()
   const { isLoading, isError, page, pages } = useSelector((state) => state.getAllMovies)

   const nextPage = () => {
      dispatch(getAllMoviesAction({ pageNumber: page + 1 }))
   }

   const prevPage = () => {
      dispatch(getAllMoviesAction({ pageNumber: page - 1 }))
   }

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
               movies?.length > 0 ?
                  <>{movies?.map((movie, index) => (
                     <li className='col-span-1' key={index}>
                        <Movie movie={movie} />
                     </li>
                  ))}</> :
                  <div className='bg-[#78909c] col-span-5 py-12 bg-opacity-20 rounded-md flex flex-col items-center justify-center'>
                     <div className="h-28 flex justify-center items-center">
                        <i className="fa-regular fa-circle-xmark fa-4x text-red-500"></i>
                     </div>
                     <p className='text-3xl py-2 font-semibold'>Không có phim nào</p>
                  </div>
            }
         </ul>
         <div className='w-full flex gap-2 justify-center text-center mt-6 *:py-1.5 *:px-4 *:bg-red-600 *:rounded *:w-fit'>
            <button onClick={prevPage} disabled={page === 1} className='hover:opacity-70 transitions disabled:bg-red-800 disabled:opacity-100'>
               <i className="fa-solid fa-backward"></i>
            </button>
            <button onClick={nextPage} disabled={page === pages} className='hover:opacity-70 transitions disabled:bg-red-800 disabled:opacity-100'>
               <i className="fa-solid fa-forward"></i>
            </button>
         </div>
      </section>
   )
}

export default ListMovies
