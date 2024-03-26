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
            {movie?.characters?.length > 0 && movie?.characters?.map((character, index) => (
               <SwiperSlide key={index}>
                  <div className='flex items-center justify-center flex-col'>
                     <img src={character?.image ? character?.image : '/images/user-img.jpg'} alt="" className='rounded-full mb-2 opacity-60 hover:opacity-90' />
                     <span className='font-semibold text-sm text-center'>{character?.name}</span>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}

export default MovieCasts