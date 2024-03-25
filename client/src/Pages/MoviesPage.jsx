import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import Widget from '../Components/Home/Widget'
import ListMovies from '../Components/ListMovies'
import { Breadcrumb } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAction } from '../Redux/Actions/moviesActions'
import { useParams } from 'react-router-dom'

const MoviesPage = () => {
   const dispatch = useDispatch()
   const { movies } = useSelector((state) => state.getAllMovies)
   const { search } = useParams()

   useEffect(() => {
      dispatch(getAllMoviesAction({ search: search }))
   }, [dispatch, search])

   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-6xl p-4 mx-auto bg-black xl:rounded">
               <div className='flex justify-between lg:flex-row flex-col'>
                  <div className='lg:w-3/4 w-full flex flex-col justify-center items-start lg:pr-1 rounded-md h-full'>
                     <Breadcrumb
                        separator=">"
                        items={[
                           {
                              title: 'Trang chủ',
                              href: '/',
                           },
                           {
                              title: 'Tìm kiếm',
                              href: '/',
                           },
                           {
                              title: `${search}`,
                              href: '#',
                           },
                        ]}
                     />
                     <ListMovies movies={movies} title={`Kết quả tìm kiếm: ${search}`} />
                  </div>
                  <Widget />
               </div>
            </div>
         </div>
      </Layout>
   )
}

export default MoviesPage