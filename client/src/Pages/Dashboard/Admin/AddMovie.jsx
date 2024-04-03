import React, { useEffect, useState } from 'react'
import Layout from '../../../Layout/Layout'
import DashboardLayout from '../../../Components/DashboardLayout';
import CharacterModal from '../../../Components/Modals/CharacterModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MovieValidation } from '../../../Components/Validation/MovieValidation';
import { createMovieAction, deleteCharactersAction } from '../../../Redux/Actions/moviesActions';
import toast from 'react-hot-toast';
import { InlineError } from '../../../Components/Notifications/Error';
import { ImagePreview } from '../../../Components/ImagePreview';
import Uploader from '../../../Components/Uploader';

const AddMovie = () => {
   const [movieImage, setMovieImage] = useState("")
   const [movieBanner, setMovieBanner] = useState("")
   const [videoUrl, setVideoUrl] = useState("")
   const [selectedCategories, setSelectedCategories] = useState([]);
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { categories } = useSelector((state) => state.getAllCategories)
   const { isLoading, isError, isSuccess } = useSelector((state) => state.createMovie)
   const { characters } = useSelector((state) => state.charactersCRUD)

   const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(MovieValidation) });

   const onSubmit = (data) => {
      dispatch(createMovieAction({ ...data, image: movieImage, banner: movieBanner, video: videoUrl, characters }))
   }

   const deleteCharacterHandler = (id) => {
      dispatch(deleteCharactersAction(id))
      toast.success("Xoá diễn viên thành công")
   }

   const selectMovieType = [
      { value: 'movie-ova', label: 'Movie/OVA' },
      { value: 'tv-series', label: 'TV/Series' },
   ]

   const selectMovieStatus = [
      { value: 'in-production', label: 'Đang chiếu' },
      { value: 'completed', label: 'Hoàn thành' },
   ]

   const [openCharacterModal, setOpenCharacterModal] = useState(false);
   const [character, setCharacter] = useState(null);

   useEffect(() => {
      if (openCharacterModal === false) {
         setCharacter()
      }
      if (isSuccess) {
         reset({ title: "", desc: "", categories: [], language: "", year: [], episode: "", status: "", type: "" })
         setMovieImage("")
         setMovieBanner("")
         setVideoUrl("")
         dispatch({ type: "CREATE_MOVIE_RESET" })
         navigate('/add-movie')
      }
      if (isError) {
         toast.error("Đã xảy ra lỗi, vui lòng thử lại")
         dispatch({ type: "CREATE_MOVIE_RESET" })
      }
   }, [isSuccess, reset, navigate, dispatch, isError, openCharacterModal])

   const handleCheckboxChange = (event) => {
      if (event.target.checked) {
         setSelectedCategories((prevSelected) => [...prevSelected, event.target.value]);
      } else {
         setSelectedCategories((prevSelected) => {
            return prevSelected.filter((category) => category !== event.target.value)
         });
      }
   };

   return (
      <Layout>
         <DashboardLayout title='Thêm phim mới' >
            <form className="grid sm:grid-cols-2 grid-cols-1 gap-4 *:flex">
               {/* Input */}
               <div className="col-span-2 w-full flex flex-col">
                  <label className='text-gray-800 font-semibold text-lg'>Tên phim</label>
                  <input
                     placeholder='Nhập tên phim'
                     type="text"
                     name="title"
                     {...register("title")}
                     required
                     className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
                  {errors.title && <InlineError error={errors.title.message} />}
               </div>
               <div className="md:col-span-1 col-span-2 w-full flex flex-col">
                  <label className='text-gray-800 font-semibold text-lg'>Thời lượng</label>
                  <input
                     placeholder='Thời lượng phim'
                     type="text"
                     name="episode"
                     {...register("episode")}
                     required
                     className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
                  {errors.episode && <InlineError error={errors.episode.message} />}
               </div>
               <div className="md:col-span-1 col-span-2 w-full flex flex-col">
                  <label className='text-gray-800 font-semibold text-lg'>Ngôn ngữ</label>
                  <input
                     placeholder='Ngôn ngữ phim'
                     type="text"
                     name="language"
                     {...register("language")}
                     required
                     className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
                  {errors.language && <InlineError error={errors.language.message} />}
               </div>
               <div className="md:col-span-1 col-span-2 w-full flex flex-col">
                  <label className='text-gray-800 font-semibold text-lg'>Năm</label>
                  <input
                     placeholder='Năm sản xuất'
                     type="text"
                     name="year"
                     {...register("year")}
                     required
                     className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
                  {errors.year && <InlineError error={errors.year.message} />}

               </div>
               <div className="md:col-span-1 col-span-2 w-full flex flex-col">
                  <label className='text-gray-800 font-semibold text-lg'>Độ tuổi phù hợp</label>
                  <input
                     placeholder='Độ tuổi phù hợp'
                     type="text"
                     name="age"
                     {...register("age")}
                     required
                     className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
                  {errors.age && <InlineError error={errors.age.message} />}
               </div>
               <div className="md:col-span-1 col-span-2 w-full flex flex-col">
                  <label className='text-gray-800 font-semibold text-lg'>Studio</label>
                  <input
                     placeholder='Studio'
                     type="text"
                     name="studio"
                     {...register("studio")}
                     required
                     className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
                  {errors.studio && <InlineError error={errors.studio.message} />}

               </div>
               <div className="md:col-span-1 col-span-2 w-full flex flex-col">
                  <label className='text-gray-800 font-semibold text-lg'>Đạo diễn</label>
                  <input
                     placeholder='Đạo diễn'
                     type="text"
                     name="director"
                     {...register("director")}
                     required
                     className="bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
                  {errors.director && <InlineError error={errors.director.message} />}
               </div>
               <div className="md:col-span-1 col-span-2 w-full flex flex-col text-gray-800">
                  <label className='font-semibold text-lg'>Phân loại</label>
                  <select
                     className='bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400'
                     name="type"
                     {...register("type")}
                     required
                  >
                     <option>--Chọn phân loại phim--</option>
                     {selectMovieType.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                     ))}
                  </select>
                  {errors.type && <InlineError error={errors.type.message} />}
               </div>
               <div className="md:col-span-1 col-span-2 w-full flex flex-col text-gray-800">
                  <label className='text-gray-800 font-semibold text-lg'>Trạng thái</label>
                  <select
                     className='bg-gray-100 rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400'
                     name="status"
                     {...register("status")}
                     required
                  >
                     <option className='placeholder:text-gray-200'>--Trạng thái phim--</option>
                     {selectMovieStatus.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                     ))}
                  </select>
                  {errors.status && <InlineError error={errors.status.message} />}
               </div>

               {/* Images */}
               <div className="flex flex-col lg:col-span-1 col-span-2">
                  <Uploader setImageUrl={setMovieImage} />
                  <ImagePreview image={movieImage} name="title" type='movie' />
               </div>
               <div className="flex flex-col lg:col-span-1 col-span-2">
                  <Uploader setImageUrl={setMovieBanner} />
                  <ImagePreview image={movieBanner} name="title" type='movie' className='size-60' />
               </div>

               {/* Description */}
               <div className="col-span-2 flex flex-col">
                  <label className='text-gray-800 font-semibold text-lg'>Mô tả</label>
                  <textarea
                     placeholder='Mô tả nội dung phim'
                     type="text"
                     name='desc'
                     {...register("desc")}
                     className='!resize-none sm:!h-40 !h-44 text-base rounded-md placeholder:text-gray-600 text-gray-800 tracking-wide !bg-gray-200 border-2 border-gray-400 hover:border-red-400 focus:!bg-gray-100 focus:border-red-600'
                  ></textarea>
                  {errors.desc && <InlineError error={errors.desc.message} />}
               </div>

               {/* Get Categories */}
               <div className="col-span-2 flex flex-col text-gray-800">
                  <label className='font-semibold text-lg'>Chọn thể loại</label>
                  <ul className='list-none border-2 border-gray-400 mt-1 font-semibold flex flex-wrap pb-2.5 px-4 bg-gray-200 rounded-md overflow-hidden *:mr-5'>
                     {categories?.map((category, index) => (
                        <li key={index}>
                           <label className='text-gray-700 flex items-center mt-2.5'>
                              <input
                                 type="checkbox"
                                 value={category.value}
                                 className='mr-2 cursor-pointer border-2'
                                 name='categories'
                                 {...register("categories")}
                                 onChange={handleCheckboxChange} />
                              {category.label}
                           </label>
                        </li>
                     ))}
                  </ul>
                  {errors.categories && <InlineError error={errors.categories.message} />}
               </div>

               {/* Movie Video */}
               <div className="flex flex-col col-span-2 text-gray-800">
                  <label className='font-semibold text-lg'>Tải phim</label>
                  <Uploader imageUrl={videoUrl} setImageUrl={setVideoUrl} />
                  <ImagePreview image={videoUrl} name="video" type='video' />
               </div>

               {/* Add characters */}
               <div className="flex flex-col col-span-2">
                  <label className="font-semibold text-left text-lg text-gray-800 mb-2">Diễn viên</label>
                  <button
                     onClick={(e) => {
                        e.preventDefault()
                        setOpenCharacterModal(true)
                     }}
                     className='rounded-md w-fit py-3 px-4 mb-4 font-semibold bg-red-600 hover:bg-gray-600 transitions'>
                     Thêm diễn viên
                  </button>
                  <CharacterModal
                     openModal={openCharacterModal}
                     handleCancel={() => setOpenCharacterModal(false)}
                     handleOk={() => setOpenCharacterModal(false)}
                  />
                  <div className="grid grid-cols-1 min-w-fit:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                     {characters?.length > 0 && characters?.map((user) => (
                        <div className="w-full text-center flex flex-col rounded-md" key={user?.id}>
                           {user?.image ?
                              <img src={user?.image ? user?.image : '/images/user-img.jpg'} alt={user?.name} className='rounded-t sm:w-full' /> :
                              <div className="size-full flex justify-center items-center">
                                 <i className="fa-solid fa-user fa-2xl bg-black bg-opacity-80 size-28 flex items-center justify-center rounded-full"></i>
                              </div>
                           }
                           <div className='flex flex-col p-2 border-2 rounded-b border-t-0 border-gray-400'>
                              <p className='text-gray-600 italic sm:text-lg font-semibold'>{user?.name}</p>
                              <div className='flex flex-col md:flex-row justify-between mt-1.5 gap-2'>
                                 <button
                                    onClick={(e) => {
                                       e.preventDefault()
                                       setOpenCharacterModal(true)
                                       setCharacter(user)
                                    }}
                                    className='bg-green-500 hover:bg-green-600 cursor-pointer p-2 md:w-1/2 transitions rounded-md'>
                                    <i className='fa-solid fa-edit text-sm sm:text-base'></i>
                                    <span className='ml-1'>Sửa</span>
                                 </button>
                                 <button
                                    onClick={() => deleteCharacterHandler(user?.id)}
                                    className='bg-red-600 hover:bg-red-700 cursor-pointer p-2 md:w-1/2 transitions rounded-md'>
                                    <i className='fa-solid fa-trash text-sm sm:text-base'></i> Xoá
                                 </button>
                              </div>
                           </div>
                        </div>
                     ))}
                     <CharacterModal
                        openModal={openCharacterModal}
                        handleCancel={() => setOpenCharacterModal(false)}
                        handleOk={() => setOpenCharacterModal(false)}
                        character={character}
                     />
                  </div>
               </div>
               <div className="flex col-span-2 justify-center w-full mt-10 mb-2 *:p-2.5 *:rounded-md">
                  <button
                     type='submit'
                     onClick={handleSubmit(onSubmit)}
                     // disabled={isLoading || !image || !banner || !videoUrl}
                     className='hover:bg-red-700 md:w-1/3 sm:w-3/5 w-full transitions text-xl font-semibold bg-red-600'>
                     {isLoading ? 'Đang tạo phim...' : 'Thêm phim'}
                  </button>
               </div>
            </form>
         </DashboardLayout>
      </Layout >
   )
}

export default AddMovie