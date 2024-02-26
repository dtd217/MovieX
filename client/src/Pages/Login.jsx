import React from 'react'
import Widget from '../Components/Home/Widget'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'

const Login = () => {
   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-6xl p-4 mx-auto bg-black xl:rounded">
               <div className='flex justify-between lg:flex-row flex-col'>
                  <div className='lg:w-3/4 w-full flex flex-col justify-center items-center lg:pr-1 rounded-md h-full bg-[#78909c] bg-opacity-20'>
                     <div className='w-full md:w-2/4 p-5 lg:p-6'>
                        <p className='text-white font-bold text-3xl text-center'>Đăng nhập</p>
                        <form action="#" className='mt-4'>
                           <div>
                              <label
                                 className="block text-lg font-semibold text-white"
                                 for="email">Email</label>
                              <input
                                 type="email"
                                 name="email"
                                 className='border mt-2 text-sm rounded-lg block w-full p-2.5 text-gray-800 border-gray-600 placeholder-gray-400'
                                 placeholder='Nhập email'
                                 required
                              />
                           </div>
                           <div className='mt-4'>
                              <label
                                 className="block text-lg font-semibold text-white"
                                 for="password">Mật khẩu</label>
                              <input
                                 type="password"
                                 name="password"
                                 className='border mt-2 text-sm rounded-lg block w-full p-2.5 text-gray-800 border-gray-600 placeholder-gray-400'
                                 placeholder='Nhập mật khẩu'
                                 required
                              />
                           </div>
                           <div className='flex justify-between items-center mt-5'>
                              <div className='flex items-start'>
                                 <div className="flex items-center h-5">
                                    <input
                                       id="remember"
                                       aria-describedby="remember"
                                       type="checkbox"
                                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-4 focus:ring-red-200 focus:text-red-500"
                                       required=""
                                    />
                                 </div>
                                 <div className="ml-3 text-sm">
                                    <label for="remember" className="text-gray-300">Lưu mật khẩu</label>
                                 </div>
                              </div>
                              <Link className='text-sm font-medium hover:underline text-red-400'>Quên mật khẩu?</Link>
                           </div>
                           <button
                              type="submit"
                              className="w-full mt-4 text-white bg-red-600 hover:bg-red-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                              Đăng nhập
                           </button>
                           <p className="text-sm mt-6 font-light text-gray-300">
                              Chưa có tài khoản?
                              <Link to="/register" className="font-medium inline-flex text-base rounded-2xl bg-red-600 text-white justify-center items-center px-3 py-1 mx-1 hover:text-white hover:bg-gray-500">Đăng ký</Link>ngay
                           </p>
                        </form>
                     </div>
                  </div>
                  <Widget />
               </div>
            </div>
         </div>
      </Layout >
   )
}

export default Login