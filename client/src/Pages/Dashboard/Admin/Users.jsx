import React from 'react'
import Layout from '../../../Layout/Layout'
import DashboardLayout from '../../../Components/DashboardLayout';
import MainTable from '../../../Components/MainTable';
import { UsersData } from '../../../Data/usersData';

const Users = () => {
   return (
      <Layout>
         <DashboardLayout title='Danh sách người dùng'>
            <MainTable data={UsersData} admin={true} user={true} type={'users'} />
         </DashboardLayout>
      </Layout >
   )
}

export default Users