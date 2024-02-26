import React from 'react'
import Layout from '../Layout/Layout'
import Widget from '../Components/Home/Widget'
import ListMovies from '../Components/ListMovies'
import { Movies } from '../Data/movieData'
import { Breadcrumb } from 'antd'

const TvSeries = () => {
   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-6xl p-4 mx-auto bg-black xl:rounded">
               <div className='flex justify-between lg:flex-row flex-col'>
                  <div className='lg:w-3/4 w-full flex flex-col justify-center items-start lg:pr-1 rounded-md h-full'>
                     <nav className="flex">
                        <Breadcrumb
                           separator=">"
                           items={[
                              {
                                 title: 'Trang chủ',
                                 href: '/',
                              },
                              {
                                 title: "Danh sách phim bộ (Tv/Series)",
                                 href: '/tv-series'
                              },
                           ]}
                        />
                     </nav>
                     <ListMovies movies={Movies.filter(movie => movie.type.includes("tv/series"))} title={"Danh sách phim bộ (TV/Series)"} />
                  </div>
                  <Widget />
               </div>
            </div>
         </div>
      </Layout>
   )
}

export default TvSeries