import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import Widget from '../Components/Home/Widget'
import ListMovies from '../Components/ListMovies'
import { Breadcrumb } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAction } from '../Redux/Actions/moviesActions'
import toast from 'react-hot-toast'

const MovieOVA = () => {
   const dispatch = useDispatch()
   const { movies, isError } = useSelector((state) => state.getAllMovies)

   useEffect(() => {
      if (isError) {
         toast.error(isError)
      }
      dispatch(getAllMoviesAction({ type: "movie-ova" }))
   }, [dispatch, isError])

   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-6xl p-4 mx-auto bg-black xl:rounded">
               <div className='flex justify-between lg:flex-row flex-col'>
                  <div className='lg:w-3/4 size-full flex flex-col justify-center items-start lg:pr-1 rounded-md'>
                     <Breadcrumb
                        separator=">"
                        items={[
                           {
                              title: 'Trang chủ',
                              href: '/',
                           },
                           {
                              title: "Danh sách phim lẻ (Movie/OVA)",
                              href: '/movie-ova'
                           },
                        ]}
                     />
                     <ListMovies movies={movies} title={"Danh sách phim bộ (Movie/OVA)"} />
                  </div>
                  <Widget />
               </div>
            </div>
         </div>
      </Layout>
   )
}

export default MovieOVA