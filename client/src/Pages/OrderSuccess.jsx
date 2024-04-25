import React from 'react'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-6xl py-16 mx-auto bg-gray-200">
               <div className='flex flex-col text-black justify-center items-center'>
                  <i className="fa-solid fa-circle-check text-9xl text-green-500"></i>
                  <h1 className='text-4xl mt-10 font-semibold'>Mua phim thành công</h1>
                  <p className='text-xl mt-4 text-center'>Bây giờ bạn có thể thưởng thức phim ngoại tuyến miễn phí.</p>
                  <button className='mt-6 bg-blue-500 text-white px-4 py-3 hover:bg-blue-600 transitions rounded-md'>
                     <Link to='/' className='text-xl size-full'>Trang chủ</Link>
                  </button>
               </div>
            </div>
         </div>
      </Layout>
   )
}

export default OrderSuccess