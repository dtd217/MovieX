import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import DashboardLayout from '../../Components/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordValidation } from '../../Components/Validation/UserValidation';
import { InlineError } from '../../Components/Notifications/Error';
import { changePasswordAction } from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast';

const Password = () => {
   const dispatch = useDispatch();
   const { isLoading, isError, message, isSuccess } = useSelector((state) => state.userChangePassword);

   // Validate user
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm({
      resolver: yupResolver(PasswordValidation)
   });

   // On submit
   const onSubmit = (data) => {
      dispatch(changePasswordAction(data));
   }

   useEffect(() => {
      if (isSuccess) {
         dispatch({ type: 'USER_CHANGE_PASSWORD_RESET' });
      }
      if (isError) {
         toast.error(isError);
         dispatch({ type: 'USER_UPDATE_PROFILE_RESET' });
      }
      if (message) {
         toast.success(message);
         reset();
      }
   }, [isSuccess, isError, dispatch, message, reset]);

   return (
      <Layout>
         <DashboardLayout title='Đổi mật khẩu' >
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="flex flex-col *:flex">
                  <div className="w-full flex flex-col mr-6">
                     <label className='text-gray-800 font-semibold text-lg' htmlFor="oldPassword">Mật khẩu cũ</label>
                     <input
                        type="password"
                        name="oldPassword"
                        {...register("oldPassword")}
                        required
                        placeholder='Nhập mật khẩu cũ'
                        className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400"
                     />
                     {errors?.oldPassword && <InlineError error={errors?.oldPassword.message} />}
                  </div>
                  <div className="w-full flex flex-col mt-2">
                     <label className='text-gray-800 font-semibold text-lg' htmlFor="oldPassword">Mật khẩu mới</label>
                     <input
                        type="password"
                        name="newPassword"
                        {...register("newPassword")}
                        required
                        placeholder='Nhập mật khẩu mới'
                        className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400"
                     />
                     {errors?.newPassword && <InlineError error={errors?.newPassword.message} />}
                  </div>
                  <div className="w-full flex flex-col mt-2">
                     <label className='text-gray-800 font-semibold text-lg' htmlFor="oldPassword">Mật khẩu mới</label>
                     <input
                        type="password"
                        name="confirmPassword"
                        {...register("confirmPassword")}
                        required
                        placeholder='Xác nhận mật khẩu mới'
                        className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400"
                     />
                     {errors?.confirmPassword && <InlineError error={errors?.confirmPassword.message} />}
                  </div>
               </div>
               <div className="flex justify-between md:flex-row flex-col mt-4 *:p-2.5 *:rounded-md">
                  <button
                     type='submit'
                     disabled={isLoading}
                     className='hover:bg-gray-700 bg-gray-600 transitions'>
                     {isLoading ? 'Đang xử lý...' : 'Cập nhật mật khẩu'}
                  </button>
               </div>
            </form>
         </DashboardLayout>
      </Layout >
   )
}

export default Password