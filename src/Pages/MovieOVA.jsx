import React from 'react'
import Layout from '../Layout/Layout'
import Widget from '../Components/Home/Widget'
import ListMovies from '../Components/ListMovies'
import { Movies } from '../Data/movieData'
import { Breadcrumb } from 'antd'

const MovieOVA = () => {
   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-screen-xl p-4 mx-auto bg-black xl:rounded-lg">
               <div className='flex justify-between lg:flex-row flex-col '>
                  <div className='lg:w-3/4 w-full flex flex-col justify-center items-start lg:pr-1 rounded-md h-full'>
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
                     <ListMovies movies={Movies.filter(movie => movie.type.includes("movie/ova"))} title={"Danh sách phim bộ (Movie/OVA)"} />
                  </div>
                  <Widget />
               </div>
            </div>
         </div>
      </Layout>
   )
}

export default MovieOVA