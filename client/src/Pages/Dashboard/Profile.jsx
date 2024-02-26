import React from 'react'
import Layout from '../../Layout/Layout'
import { useDropzone } from 'react-dropzone'
import DashboardLayout from '../../Components/DashboardLayout';

const Profile = () => {
   const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      maxSize: 2 * 1024 * 1024,
      onDrop: acceptedFiles => {
         alert(acceptedFiles[0].name)
      }
   })

   return (
      <Layout>
         <DashboardLayout title='Thông tin cá nhân' >
            <div className="rounded-lg py-8 cursor-pointer bg-gray-200 border-dashed border-gray-400 hover:opacity-80 border-2 text-center" {...getRootProps()}>
               <input {...getInputProps()} />
               <span className='text-gray-800 flex flex-col items-center'>
                  <i className="fa-solid fa-cloud-arrow-up sm:fa-4x fa-3x text-red-600"></i>
                  <p className='sm:text-xl text-lg leading-5 mt-3 mb-2'>Tải ảnh tại đây.</p>
               </span>
            </div>
            <div className="flex md:mt-6 mt-2 flex-col">
               <div className="w-full flex flex-col mr-6">
                  <label className='text-gray-800 font-semibold text-lg'>Tên tài khoản</label>
                  <input
                     required
                     placeholder='vd: Dong Tran Duy'
                     type="text"
                     className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
               </div>
               <div className="w-full flex flex-col mt-2">
                  <label className='text-gray-800 font-semibold text-lg'>Email</label>
                  <input
                     required
                     placeholder='vd: tranduy.neu@gmail.com'
                     type="email"
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

export default Profile