import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import Movie from '../Movie';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Notifications/Loader';
import { Empty } from '../../Components/Notifications/Empty';
import { getAllMoviesAction } from '../../Redux/Actions/moviesActions';
import toast from 'react-hot-toast';

const Banner = () => {
   const dispatch = useDispatch()
   const { isLoading, isError, movies } = useSelector((state) => state.getAllMovies)

   useEffect(() => {
      dispatch(getAllMoviesAction({}))
      if (isError) {
         toast.error(isError)
      }
   }, [dispatch, isError])

   return (
      <div className='h-full mb-4 flex items-center'>
         <Swiper
            spaceBetween={20}
            slidesPerView={8}
            modules={[FreeMode]}
            freeMode={true}
            breakpoints={{
               0: { slidesPerView: 2 },
               400: { slidesPerView: 3 },
               640: { slidesPerView: 4 },
               768: { slidesPerView: 5 },
               900: { slidesPerView: 5 },
               1024: { slidesPerView: 6 },
               1200: { slidesPerView: 7 },
               1280: { slidesPerView: 8 }
            }}
         >
            {isLoading ?
               <Loader /> :
               movies?.length > 0 ?
                  <>
                     {movies?.map((movie, index) => (
                        <SwiperSlide key={index}>
                           <Movie movie={movie} />
                        </SwiperSlide>
                     ))}
                  </> :
                  <Empty message="Không tìm thấy phim" />
            }
         </Swiper>
      </div>
   )
}

export default Banner