import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { useDropzone } from 'react-dropzone'
import DashboardLayout from '../../Components/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileValidation } from '../../Components/Validation/UserValidation';
import { InlineError } from '../../Components/Notifications/Error';
import { ImagePreview } from '../../Components/ImagePreview';
import { updateProfileAction } from '../../Redux/Actions/userActions';
import Loader from '../../Components/Notifications/Loader';
import uploadImageService from '../../Redux/APIs/imageUploadServices';

const Profile = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { userInfo } = useSelector((state) => state.userLogin);
   const [imageUrl, setImageUrl] = useState(userInfo ? userInfo?.avatar : '');
   const { isLoading, isError, isSuccess } = useSelector((state) => state.userUpdateProfile);

   const [loading, setLoading] = useState(false);

   // Upload image
   const onDrop = useCallback(
      async (acceptedFiles) => {
         const file = new FormData();
         file.append('file', acceptedFiles[0]);
         const data = await uploadImageService(file, setLoading);
         setImageUrl(data);
      }, [setImageUrl])

   // Validate user
   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors }
   } = useForm({
      resolver: yupResolver(ProfileValidation)
   });

   // On submit
   const onSubmit = (data) => {
      dispatch(updateProfileAction({ ...data, avatar: imageUrl }));
   }

   useEffect(() => {
      if (userInfo) {
         setValue('name', userInfo?.name);
         setValue('email', userInfo?.email);
      }
      if (isSuccess) {
         dispatch({ type: 'USER_UPDATE_PROFILE_RESET' });
         // toast.success('Cập nhật thành công');
      }
      if (isError) {
         toast.error(isError);
      }
   }, [userInfo, setValue, isSuccess, isError, dispatch]);

   const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({ multiple: false, onDrop })

   return (
      <Layout>
         <DashboardLayout title='Thông tin cá nhân' >
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="rounded-lg py-8 cursor-pointer bg-gray-200 border-dashed border-gray-400 hover:opacity-80 border-2 text-center" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <span className='text-gray-800 flex flex-col items-center'>
                     <i className="fa-solid fa-cloud-arrow-up sm:fa-4x fa-3x text-red-600"></i>
                     <p className='sm:text-xl text-lg leading-5 mt-3 mb-2'>Tải ảnh tại đây.</p>
                     {
                        isDragActive ?
                           "Drop the files here" :
                           isDragReject ?
                              "Unsupported file type" :
                              "Drag and drop your image here"
                     }
                  </span>
               </div>
               {loading ? (<div className="text-center"><Loader /></div>) : (<></>)}
               <ImagePreview image={imageUrl} name={userInfo ? userInfo?.name : 'MovieX'} />
               <div className="flex md:mt-6 mt-2 flex-col">
                  <div className="w-full flex flex-col">
                     <label className='text-gray-800 font-semibold text-lg' htmlFor="email">Email</label>
                     <input
                        type="email"
                        name="email"
                        {...register("email")}
                        required
                        disabled
                        placeholder='vd: tranduy.neu@gmail.com'
                        className="bg-gray-200 cursor-not-allowed rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400"
                     />
                     {errors.email && <InlineError error={errors.email.message} />}
                  </div>
                  <div className="w-full flex flex-col mt-2">
                     <label className='text-gray-800 font-semibold text-lg' htmlFor="name">Tên tài khoản</label>
                     <input
                        type="text"
                        name="name"
                        {...register("name")}
                        required
                        placeholder='vd: Dong Tran Duy'
                        className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400"
                     />
                     {errors.name && <InlineError error={errors.name.message} />}
                  </div>
               </div>
               <div className="flex justify-between md:flex-row flex-col mt-4 *:p-2.5 *:rounded-md *:transitions">
                  <button className='hover:bg-gray-700 bg-gray-600'>
                     {isLoading ? "Đang cập nhật..." : "Cập nhật thông tin"}
                  </button>
                  <button className='hover:bg-red-700 bg-red-600 md:mt-0 mt-2'>Xoá tài khoản</button>
               </div>
            </form>
         </DashboardLayout>
      </Layout >
   )
}

export default Profile