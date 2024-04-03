import React, { useEffect } from 'react'
import Widget from '../Components/Home/Widget'
import Layout from '../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { RegisterValidation } from '../Components/Validation/UserValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { InlineError } from '../Components/Notifications/Error'
import { registerAction } from '../Redux/Actions/userActions'
import toast from 'react-hot-toast'

const Register = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { isLoading, isError, userInfo, isSuccess } = useSelector((state) => state.userRegister);

   // Validate user
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({
      resolver: yupResolver(RegisterValidation)
   });

   // On submit
   const onSubmit = (data) => {
      dispatch(registerAction(data))
   }

   useEffect(() => {
      if (userInfo?.isAdmin) navigate('/movie-list');
      else if (userInfo) navigate('/');
      if (isSuccess) {
         toast.success(`Chào mừng ${userInfo?.name}`);
         dispatch({ type: "USER_REGISTER_RESET" });
      }
      if (isError) {
         toast.error(isError);
         dispatch({ type: "USER_REGISTER_RESET" });
      }
   }, [userInfo, isSuccess, isError, navigate, dispatch]);
   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-6xl p-4 mx-auto bg-black xl:rounded">
               <div className='flex justify-between lg:flex-row flex-col'>
                  <div className='lg:w-3/4 w-full flex flex-col justify-center items-center lg:pr-1 rounded-md h-full bg-[#78909c] bg-opacity-20'>
                     <div className='w-full md:w-2/4 p-5 lg:p-6'>
                        <p className='text-white font-bold text-3xl text-center'>Đăng ký</p>
                        <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
                           <div>
                              <label className="block text-lg font-semibold text-white" htmlFor="password">Tên người dùng</label>
                              <input
                                 type="text"
                                 name="name"
                                 value={userInfo?.name}
                                 {...register("name")}
                                 className='border mt-2 text-sm rounded-lg block w-full p-2.5 text-gray-800 border-gray-600 placeholder-gray-400'
                                 placeholder='Nhập tên người dùng'
                                 required
                              />
                              {errors?.name && <InlineError error={errors?.name.message} />}
                           </div>
                           <div className='mt-4'>
                              <label className="block text-lg font-semibold text-white" htmlFor="email">Email</label>
                              <input
                                 type="email"
                                 name="email"
                                 value={userInfo?.email}
                                 {...register("email")}
                                 className='border mt-2 text-sm rounded-lg block w-full p-2.5 text-gray-800 border-gray-600 placeholder-gray-400'
                                 placeholder='Nhập email'
                                 required
                              />
                              {errors?.email && <InlineError error={errors?.email.message} />}
                           </div>
                           <div className='mt-4'>
                              <label className="block text-lg font-semibold text-white" htmlFor="password">Mật khẩu</label>
                              <input
                                 type="password"
                                 name="password"
                                 value={userInfo?.password}
                                 {...register("password")}
                                 className='border mt-2 text-sm rounded-lg block w-full p-2.5 text-gray-800 border-gray-600 placeholder-gray-400'
                                 placeholder='Nhập mật khẩu'
                                 required
                              />
                              {errors?.password && <InlineError error={errors?.password.message} />}
                           </div>
                           <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full mt-6 text-white bg-red-600 hover:bg-red-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                           </button>
                           <p className="text-sm mt-6 font-light text-gray-300">
                              Đã có tài khoản?
                              <Link to="/login" className="font-medium inline-flex text-base rounded-2xl bg-red-600 text-white justify-center items-center px-3 py-1 mx-1 hover:text-white hover:bg-gray-500">Đăng nhập</Link>ngay
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

export default Register