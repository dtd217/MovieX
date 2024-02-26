import React from 'react'
import Layout from '../../../Layout/Layout'
import MainTable from '../../../Components/MainTable';
import { Movies } from '../../../Data/movieData';
import DashboardLayout from '../../../Components/DashboardLayout';

const MovieList = () => {
   return (
      <Layout>
         <DashboardLayout children={<MainTable data={Movies} admin={true} type={'movieList'} />} title='Danh sách phim' />
      </Layout >
   )
}

export default MovieList