import React from 'react'
import Layout from '../../../Layout/Layout'
import DashboardLayout from '../../../Components/DashboardLayout';
import SubTable from '../../../Components/SubTable';
import { CategoriesData } from '../../../Data/categoriesData';

const Categories = () => {
   return (
      <Layout>
         <DashboardLayout children={<SubTable data={CategoriesData} user={false} />} title='Thể loại phim' />
      </Layout >
   )
}

export default Categories