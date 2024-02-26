import React from 'react'
import Layout from '../../Layout/Layout'
import DashboardLayout from '../../Components/DashboardLayout';

const Password = () => {
   return (
      <Layout>
         <DashboardLayout title='Đổi mật khẩu' >
            <div className="flex flex-col *:flex">
               <div className="w-full flex flex-col mr-6">
                  <label className='text-gray-800 font-semibold text-lg'>Mật khẩu cũ</label>
                  <input
                     required
                     type="password"
                     className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
               </div>
               <div className="w-full flex flex-col mt-2">
                  <label className='text-gray-800 font-semibold text-lg'>Mật khẩu mới</label>
                  <input
                     required
                     type="password"
                     className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
               </div>
               <div className="w-full flex flex-col mt-2">
                  <label className='text-gray-800 font-semibold text-lg'>Xác nhận mật khẩu</label>
                  <input
                     required
                     type="password"
                     className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
               </div>
            </div>
            <div className="flex justify-between md:flex-row flex-col mt-4 *:p-2.5 *:rounded-md *:transitions">
               <button className='hover:bg-gray-700 bg-gray-600'>Cập nhật thông tin</button>
               <button className='hover:bg-red-700 bg-red-600 md:mt-0 mt-2'>Xoá tài khoản</button>
            </div>
         </DashboardLayout>
      </Layout >
   )
}

export default Password