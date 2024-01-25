import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import Movie from '../Movie';

const Banner = ({ movies }) => {
   return (
      <div className='h-full mb-4 flex items-center'>
         <Swiper
            spaceBetween={20}
            slidesPerView={8}
            modules={[FreeMode]}
            freeMode={true}
            breakpoints={{
               0: {
                  slidesPerView: 2,
               },
               400: {
                  slidesPerView: 3,
               },
               640: {
                  slidesPerView: 4,
               },
               768: {
                  slidesPerView: 5,
               },
               900: {
                  slidesPerView: 5,
               },
               1024: {
                  slidesPerView: 6,
               },
               1200: {
                  slidesPerView: 7,
               },
               1280: {
                  slidesPerView: 8,
               }
            }}
         >
            {movies.map((movie, index) => (
               <SwiperSlide key={index}>
                  <Movie movie={movie} />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}

export default Banner