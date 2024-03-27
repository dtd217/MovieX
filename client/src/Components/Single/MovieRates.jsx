import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Stars from '../Stars';
import { Empty } from '../Notifications/Empty';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReviewValidation } from '../Validation/MovieValidation';
import toast from 'react-hot-toast';
import { InlineError } from '../Notifications/Error';
import { reviewMovieAction } from '../../Redux/Actions/moviesActions';

const MovieRates = ({ movie }) => {
   const dispatch = useDispatch();
   const { isLoading, isError } = useSelector(state => state.reviewMovie)
   const { userInfo } = useSelector(state => state.userLogin)

   const getTimeDifference = (date) => {
      const currentDate = new Date(date);
      return `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}
      ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

   }
   const { register, handleSubmit, watch, formState: { errors } } = useForm({
      resolver: yupResolver(ReviewValidation)
   });

   const onSubmit = (data) => {
      dispatch(reviewMovieAction({
         id: movie?._id,
         review: { ...data }
      }))
   }

   const Rating = [
      { title: '0 - Poor', value: 0 },
      { title: '1 - Terrible', value: 1 },
      { title: '2 - Very Bad', value: 2 },
      { title: '3 - Bad', value: 3 },
      { title: '4 - Not Good', value: 4 },
      { title: '5 - Decent', value: 5 },
      { title: '6 - Ok', value: 6 },
      { title: '7 - Good', value: 7 },
      { title: '8 - Great', value: 8 },
      { title: '9 - Fantastic', value: 9 },
      { title: '10 - Favourite', value: 10 },
   ]

   useEffect(() => {
      if (isError) {
         toast.error(isError)
      }
      dispatch({ type: 'REVIEW_MOVIE_RESET' })
   }, [dispatch, isError, isLoading])

   return (
      <div className='size-full text-black'>
         <h1 className='text-4xl font-bold mb-4'>Đánh giá ({movie?.reviewNumber ? movie?.reviewNumber : 0})</h1>
         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
            <h2 className='text-lg mb-0.5'>Chọn đánh giá</h2>
            <select
               className='w-full md:w-1/3 text-sm'
               options={Rating}
               name="rate"
               {...register("rate")}
            >
               {Rating.map((item, index) => (
                  <option key={index} value={item.value}>{item.title}</option>
               ))}
            </select>
            {errors.rate && <InlineError error={errors.rate?.message} />}
            <div className="mt-2 xs:text-2xl">
               <Stars value={watch('rate', false)} />
            </div>
            <textarea
               placeholder='Viết cảm nhận của bạn'
               className='w-full resize-none mt-2 h-28'
               name="comment"
               {...register("comment")}
            ></textarea>
            {errors.comment && <InlineError error={errors.comment?.message} />}
            <div>
               {userInfo ?
                  <button
                     disabled={isLoading}
                     type='submit'
                     className='rounded-md mt-2 transitions hover:bg-gray-600 bg-red-600 text-lg font-semibold text-white px-4 py-3'>
                     Gửi đánh giá
                  </button> :
                  <button className='rounded-md mt-2 transitions bg-gray-500 hover:bg-red-700 text-lg font-semibold text-white px-4 py-3'>
                     <Link to='/login'>Đăng nhập để đánh giá phim</Link>
                  </button>
               }
            </div>
         </form>
         <div className="mt-5 border-t-2 border-gray-300">
            {movie?.reviews?.length > 0 ?
               movie?.reviews?.map((userReview) => (
                  <div key={userReview?._id} className="pt-6">
                     <div className="flex">
                        <img
                           src={userReview?.userImage ? `${userReview?.userImage}` : '/images/cast-img.jpg'}
                           alt={userReview?.userName}
                           className='rounded-full size-12'
                        />
                        <div className="ml-4">
                           <h4 className='text-lg font-semibold'>{userReview?.userName}</h4>
                           <p className='text-gray-500 text-sm'>{getTimeDifference(userReview?.createdAt)}</p>
                           <div><Stars value={userReview?.rate} /></div>
                        </div>
                     </div>
                     <div className="mt-1 ml-16">
                        <p className='italic text-gray-700'>{userReview?.comment}</p>
                     </div>
                  </div>
               )) :
               <Empty message={`Hãy là người đầu tiên nhận xét ${movie?.title}`} />
            }
         </div>
      </div>
   )
}

export default MovieRates