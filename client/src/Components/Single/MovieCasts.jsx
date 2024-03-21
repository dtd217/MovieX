import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

const MovieCasts = ({ movie }) => {
   return (
      <div className="w-full p-6">
         <Swiper
            spaceBetween={20}
            modules={[FreeMode]}
            freeMode={true}
            breakpoints={{
               0: { slidesPerView: 2 },
               400: { slidesPerView: 3 },
               560: { slidesPerView: 4 },
               720: { slidesPerView: 5 },
               900: { slidesPerView: 6 },
            }}
         >
            {/* {movies.map((movie, index) => (
               <SwiperSlide key={index}>
                  <Movie movie={movie} />
               </SwiperSlide>
            ))} */}
            {movie.characters.map((character, index) => (
               <SwiperSlide key={index}>
                  <div className='flex items-center justify-center flex-col'>
                     <img src="/images/user-img.jpg" alt="" className='rounded-full mb-2 opacity-60 hover:opacity-90' />
                     <span className='font-semibold text-sm text-center'>{character}</span>
                  </div>
               </SwiperSlide>
               // <li className='bg-transparent rounded-full flex flex-col items-center' key={index}>
               //    <img src="/images/user-img.jpg" alt="" className='rounded-full w-4/5 mb-2 opacity-60 hover:opacity-90' />
               //    <span className='font-semibold text-sm text-center text-white'>{character}</span>
               // </li>
            ))}
         </Swiper>
         {/* <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:lg:grid-cols-6 gap-5 grid-flow-row'>
         </ul> */}
      </div>
   )
}

export default MovieCasts