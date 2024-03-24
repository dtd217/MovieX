import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Home/Banner'
import Hero from '../Components/Home/Hero'
import Widget from '../Components/Home/Widget'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getAllMoviesAction, getRandomMoviesAction, getTopRatedMoviesAction } from '../Redux/Actions/moviesActions'
import ListMovies from '../Components/ListMovies'
import Loader from '../Components/Notifications/Loader'
import { Empty } from '../Components/Notifications/Empty'

const HomePage = () => {
   const dispatch = useDispatch()
   const { isLoading, isError, movies } = useSelector((state) => state.getAllMovies)
   const { isLoading: randomLoading, isError: randomError, movies: randomMovies } = useSelector((state) => state.getRandomMovies)

   useEffect(() => {
      dispatch(getRandomMoviesAction())
      dispatch(getTopRatedMoviesAction())
      dispatch(getAllMoviesAction({ pageNumber: 1 }))
      if (isError || randomError) {
         toast.error(isError || randomError)
      }
   }, [dispatch, isError, randomError])

   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-6xl p-4 mx-auto bg-black xl:rounded">
               <Banner />
               <div className='flex justify-between lg:flex-row flex-col'>
                  <div className='lg:w-3/4 lg:inline-block w-full block lg:pr-1 h-full'>
                     <Hero movies={randomMovies} />
                     {isLoading ?
                        <Loader /> :
                        movies?.length > 0 ?
                           <ListMovies movies={movies} title={"Tất cả phim"} /> :
                           <Empty message="Không tìm thấy phim" />
                     }
                  </div>
                  <Widget />
               </div>
            </div>
         </div>
      </Layout>
   )
}

export default HomePage