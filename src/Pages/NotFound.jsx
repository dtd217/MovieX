import React from 'react'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'

const NotFound = () => {
   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-screen-xl py-16 mx-auto bg-gray-200 xl:rounded-lg">
               <div className='flex flex-col text-black justify-center items-center'>
                  <img src="/images/404.png" alt="Not Found" className='max-w-3xl w-full h-auto' />
                  <h1 className='text-4xl mt-10 font-semibold'>Whoops...</h1>
                  <p className='text-xl mt-4 text-center'>
                     Xin lỗi, Trang bạn truy cập không có hoặc đã bị xóa trước đó.
                     <br />Trở về <Link to="/" className='text-gray-500 hover:underline'>trang chủ</Link> hoặc <Link to="/" className='text-gray-500 hover:underline'>trang trước</Link>.</p>
               </div>
            </div>
         </div>
      </Layout>
   )
}

export default NotFound