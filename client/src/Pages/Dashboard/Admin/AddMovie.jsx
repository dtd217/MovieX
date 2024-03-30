import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Input } from 'antd';
import Layout from '../../../Layout/Layout'
import DashboardLayout from '../../../Components/DashboardLayout';
import CastModal from '../../../Components/Modals/CastModal';
import Select from 'react-select';
import { CategoriesData } from '../../../Data/categoriesData';
import { UsersData } from '../../../Data/usersData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const AddMovie = () => {
   const [openModalAddCast, setOpenModalAddCast] = useState(false);
   const [openModalEditCast, setOpenModalEditCast] = useState(false);
   const [cast, setCast] = useState(null)
   const [image, setImage] = useState("")
   const [banner, setBanner] = useState("")
   const [videoUrl, setVideoUrl] = useState("")
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { categories } = useSelector((state) => state.getAllCategories)
   const { isLoading, isError, isSuccess, userInfo } = useSelector((state) => state.createMovie)
   const { characters } = useSelector((state) => state.charactersCRUD)

   const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      maxSize: 2 * 1024 * 1024,
      onDrop: acceptedFiles => {
         alert(acceptedFiles[0].name)
      }
   })

   const videoRef = useRef(null);
   const [isPlayed, setIsPlayed] = useState(false)

   const showModal = (selectedType) => {
      selectedType === 'addCast' ?
         setOpenModalAddCast(true) :
         setOpenModalEditCast(true)
   }

   const selectMovieType = [
      { value: 'movie-ova', label: 'Movie/OVA' },
      { value: 'tv-series', label: 'TV/Series' },
   ]

   const selectMovieStatus = [
      { value: 'in-production', label: 'Đang chiếu' },
      { value: 'completed', label: 'Hoàn thành' },
   ]

   useEffect(() => {
      if (openModalAddCast === false) {
         setCast()
      }
   }, [openModalAddCast])

   return (
      <Layout>
         <DashboardLayout title='Thêm phim mới' >
            <>
               <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 *:flex">
                  {/* Input */}
                  <div className="md:col-span-1 col-span-2 w-full flex flex-col">
                     <label className='text-gray-800 font-semibold text-lg'>Tên phim</label>
                     <input
                        placeholder='Nhập tên phim'
                        type="text"
                        className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
                  </div>
                  <div className="md:col-span-1 col-span-2 w-full flex flex-col">
                     <label className='text-gray-800 font-semibold text-lg'>Thời lượng</label>
                     <input
                        placeholder='Thời lượng phim'
                        type="text"
                        className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
                  </div>
                  <div className="md:col-span-1 col-span-2 w-full flex flex-col">
                     <label className='text-gray-800 font-semibold text-lg'>Ngôn ngữ</label>
                     <input
                        placeholder='Ngôn ngữ phim'
                        type="text"
                        className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
                  </div>
                  <div className="md:col-span-1 col-span-2 w-full flex flex-col">
                     <label className='text-gray-800 font-semibold text-lg'>Năm</label>
                     <input
                        placeholder='Năm sản xuất'
                        type="text"
                        className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
                  </div>
                  <div className="md:col-span-1 col-span-2 w-full flex flex-col text-gray-800">
                     <label className='font-semibold text-lg'>Phân loại</label>
                     <select
                        className='bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400'
                        name="rate"
                     // {...register("rate")}
                     >
                        <option>--Chọn phân loại phim--</option>
                        {selectMovieType.map((item, index) => (
                           <option key={index} value={item.value}>{item.label}</option>
                        ))}
                     </select>
                  </div>
                  <div className="md:col-span-1 col-span-2 w-full flex flex-col text-gray-800">
                     <label className='text-gray-800 font-semibold text-lg'>Trạng thái</label>
                     <select
                        className='bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400'
                        name="rate"
                     // {...register("rate")}
                     >
                        <option className='placeholder:text-gray-200'>--Trạng thái phim--</option>
                        {selectMovieStatus.map((item, index) => (
                           <option key={index} value={item.value}>{item.label}</option>
                        ))}
                     </select>
                  </div>

                  {/* Images */}
                  <div className="flex flex-col lg:col-span-1 col-span-2">
                     <div className=" flex items-center justify-center rounded-lg py-4 cursor-pointer bg-gray-200 border-dashed border-gray-400 hover:opacity-80 border-2 text-center" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <span className='text-gray-800 flex flex-col items-center'>
                           <i className="fa-solid fa-cloud-arrow-up sm:fa-4x fa-3x text-red-600"></i>
                           <p className='sm:text-xl text-lg leading-5 mt-3 mb-2'>Tải ảnh phim</p>
                        </span>
                     </div>
                     <div className="sm:h-40 sm:w-32 h-32 w-28 mt-4 self-center hidden">
                        <img src="/images/one-piece-1.jpg" alt="Movie" className='rounded object-cover size-full' />
                     </div>
                  </div>
                  <div className="flex flex-col lg:col-span-1 col-span-2">
                     <div className="flex items-center justify-center rounded-lg py-4 cursor-pointer bg-gray-200 border-dashed border-gray-400 hover:opacity-80 border-2 text-center" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <span className='text-gray-800 flex flex-col items-center'>
                           <i className="fa-solid fa-cloud-arrow-up sm:fa-4x fa-3x text-red-600"></i>
                           <p className='sm:text-xl text-lg leading-5 mt-3 mb-2'>Tải ảnh bìa</p>
                        </span>
                     </div>
                     <div className="max-w-xs w-full h-40 rounded mt-4 self-center hidden">
                        <img src="/images/one-piece-2.jpg" alt="Movie" className='rounded object-cover size-full' />
                     </div>
                  </div>

                  {/* Description */}
                  <div className="col-span-2 flex flex-col">
                     <label className='text-gray-800 font-semibold text-lg'>Mô tả</label>
                     <TextArea
                        placeholder='Mô tả nội dung phim'
                        className='!resize-none sm:!h-40 !h-44 text-base placeholder:text-gray-600 text-gray-800 tracking-wide !bg-gray-200 border-2 border-gray-400 hover:border-red-400 focus:!bg-gray-100 focus:border-red-600'
                     />
                  </div>

                  {/* Get Category */}
                  <div className="col-span-2 flex flex-col text-gray-800">
                     <label className='font-semibold text-lg'>Chọn thể loại</label>
                     <Select
                        closeMenuOnSelect={false}
                        isMulti
                        placeholder="Chọn thể loại"
                        options={CategoriesData}
                     />
                  </div>

                  {/* Movie Video */}
                  <div className="flex flex-col col-span-2 text-gray-800">
                     <label className='font-semibold text-lg'>Tải phim</label>
                     <div className="flex items-center justify-center rounded-lg py-4 cursor-pointer bg-gray-200 border-dashed border-gray-400 hover:opacity-80 border-2 text-center" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <span className='text-gray-800 flex flex-col items-center'>
                           <i className="fa-solid fa-cloud-arrow-up sm:fa-4x fa-3x text-red-600"></i>
                           <p className='sm:text-xl text-lg leading-5 mt-3 mb-2'>Tải video</p>
                        </span>
                     </div>
                     <div className="mt-5 self-center hidden">
                        <video
                           ref={videoRef}
                           controls
                           poster='/images/bgBlack.png'
                           playsInline
                           controlsList="nodownload"
                           className='rounded-md max-w-md w-full'
                           onPause={() => setIsPlayed(false)}
                        >
                           <source src='/images/doraemon.mp4' />
                        </video>
                     </div>
                  </div>

                  {/* Add casts */}
                  <div className="flex flex-col col-span-2">
                     <label className="font-semibold text-left text-lg text-gray-800 mb-2">Diễn viên</label>
                     <CastModal
                        openModal={openModalAddCast}
                        handleCancel={() => setOpenModalAddCast(false)}
                        handleOk={() => setOpenModalAddCast(false)}
                     />
                     <button
                        onClick={() => showModal('addCast')}
                        className='rounded-md w-fit py-3 px-4 mb-4 font-semibold bg-red-600 hover:bg-gray-600 transitions'>
                        Thêm diễn viên
                     </button>
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {UsersData.map((user, index) => (
                           <div className="w-full text-center flex flex-col rounded-md" key={index}>
                              {user.avatar ?
                                 <img src={user.avatar} alt="User Avatar" className='rounded-t sm:w-full' /> :
                                 <div className="size-full flex justify-center items-center">
                                    <i className="fa-solid fa-user fa-2xl bg-black bg-opacity-80 size-28 flex items-center justify-center rounded-full"></i>
                                 </div>
                              }
                              <div className='flex flex-col p-2 border-2 rounded-b border-t-0 border-gray-400'>
                                 <p className='text-gray-600 italic sm:text-lg font-semibold'>{user.name}</p>
                                 <div className='flex flex-col md:flex-row justify-between mt-1.5 gap-2'>
                                    <button
                                       onClick={() => {
                                          showModal('editCast')
                                          setCast(user)
                                       }}
                                       className='bg-green-500 hover:bg-green-600 cursor-pointer p-2 md:w-1/2 transitions rounded-md'>
                                       <i className='fa-solid fa-edit text-sm sm:text-base'></i>
                                       <span className='ml-1'>Sửa</span>
                                    </button>
                                    <button className='bg-red-600 hover:bg-red-700 cursor-pointer p-2 md:w-1/2 transitions rounded-md'>
                                       <i className='fa-solid fa-trash text-sm sm:text-base'></i> Xoá
                                    </button>
                                 </div>
                              </div>
                           </div>
                        ))}
                        <CastModal
                           openModal={openModalEditCast}
                           handleCancel={() => setOpenModalEditCast(false)}
                           handleOk={() => setOpenModalEditCast(false)}
                           cast={cast}
                        />
                     </div>
                  </div>
               </div>
               <div className="flex justify-center w-full mt-10 mb-2 *:p-2.5 *:rounded-md">
                  <button className='hover:bg-red-700 md:w-1/3 sm:w-3/5 w-full transitions text-xl font-semibold bg-red-600'>Thêm phim</button>
               </div>
            </>
         </DashboardLayout>
      </Layout >
   )
}

export default AddMovie