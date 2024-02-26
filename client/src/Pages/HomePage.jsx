import React from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Home/Banner'
import Hero from '../Components/Home/Hero'
import Widget from '../Components/Home/Widget'
import { Movies } from '../Data/movieData'

const HomePage = () => {
   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-6xl p-4 mx-auto bg-black xl:rounded">
               <Banner movies={Movies}/>
               <div className='flex justify-between lg:flex-row flex-col'>
                  <Hero />
                  <Widget />
               </div>
            </div>
         </div>
      </Layout>
   )
}

export default HomePage