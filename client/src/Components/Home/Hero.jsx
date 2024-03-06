import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Movies } from '../../Data/movieData'
import ListMovies from '../ListMovies';
import { Tooltip } from 'antd';

const Hero = () => {
   const [arrow, setArrow] = useState('Show');

   const mergedArrow = useMemo(() => {
      if (arrow === 'Hide') {
         return false;
      }

      if (arrow === 'Show') {
         return true;
      }

      return {
         pointAtCenter: true,
      };
   }, [arrow]);
   return (
      <div className='lg:w-3/4 lg:inline-block w-full block lg:pr-1 h-full'>
         <Swiper
            direction={'horizontal'}
            slidesPerView={1}
            spaceBetween={30}
            modules={[Autoplay, Pagination]}
            loop={true}
            autoplay={{
               delay: 5000,
               disableOnInteraction: false,
            }}
            pagination={{
               clickable: true,
               type: 'bullets',
            }}
         >
            {Movies?.slice(0, 6).map((movie, index) => (
               <SwiperSlide>
                  <div key={index}>
                     <Link to={`/movie/${movie?.slug}`} className='relative w-full h-full block'>
                        <img src={movie?.banner} alt={movie?.title} className='w-full max-h-[440px] rounded-md object-cover lg:object-fill max-w-full object-top hover:opacity-90 duration-100 ease-in' />
                     </Link>
                     {/* PC */}
                     <div className='absolute lg:block hidden w-1/2 bg-opacity-40 h-full text-white top-0 left-0 bg-black rounded-l-md overflow min-w-min'>
                        <div className="p-5 block">
                           <Link to={`/movie/${movie?.slug}`} className='font-semibold hover:text-red-500 transitions'>
                              <div className='pb-0.5 text-3xl max-h-16 p-0 mb-2.5 leading-none text-left overflow-hidden'>{movie?.title}</div>
                           </Link>
                           {/* Info */}
                           <p className="mb-2.5 flex justify-start">
                              <span className='font-bold align-top text-sm leading-5 mr-4 mt-1 flex items-center text-[#b5e745]'>
                                 <svg className="w-4 h-4 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                 </svg>
                                 <span className='h-4'>{movie?.rateNumber}</span>
                              </span>
                              <span className='align-top text-sm leading-5 mr-4 mt-1 flex items-center'>
                                 <svg className="w-4 h-4 mr-1 text-[#b5e745]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                 </svg>
                                 {movie?.status}
                              </span>
                              <span className='align-top text-sm leading-5 mr-4 mt-1 flex items-center'>
                                 <svg className="w-4 h-4 mr-1 text-[#b5e745]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z" />
                                 </svg>
                                 {movie?.year[0]}
                              </span>
                              <span className='align-top leading-5 mt-1 bg-red-600 px-2.5 py-0.5 text-xs uppercase my-0 rounded-xl font-semibold'>HD</span>
                           </p>
                           {/* Description */}
                           <div className='text-sm mb-2 lg:opacity-80 opacity-100'>
                              <p className='mb-2.5 text-justify'>{`${movie?.desc}`.substring(0, 240).slice(0) + " . . ."}</p>
                              <p className='flex items-center justify-start'>
                                 <svg className="w-3 h-3 mr-2 text-[#b5e745]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-7.5 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM2 16V8h16v8H2Z" />
                                 </svg>
                                 Thể loại: {movie?.category.join(", ")}
                              </p>
                           </div>
                           {/* Cast */}
                           <div className='mb-2'>
                              {movie?.characters.slice(0, 5).map((c, index) => (
                                 <Tooltip placement="bottom" title={c} arrow={mergedArrow} key={index}>
                                    <span className='w-10 h-10 rounded-full bg-black/40 inline-flex items-center justify-center align-top mr-2.5 mb-2.5'>
                                       <i className="fa-solid fa-user fa-xs"></i>
                                    </span>
                                 </Tooltip>
                              ))}
                              <button className='text-[#b5e745] rounded bg-transparent shadow-none border border-solid border-[#b5e745] hover:bg-[#b5e745] hover:text-white w-10 h-10 transitions'>
                                 <i className="fa-solid fa-ellipsis"></i>
                              </button>
                           </div>
                           <Link to={`/movie/${movie?.slug}`} className="font-semibold bg-red-600 mr-1.5 flex items-center justify-center rounded py-2.5 px-5 max-w-fit hover:bg-gray-600 duration-200 ease-in">
                              <svg className="w-4 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                                 <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                              </svg>
                              Watch Now
                           </Link>
                        </div>
                     </div>
                     {/* Mobile & Tablet */}
                     <div className='relative block lg:hidden w-full h-full text-white'>
                        <div className="p-5 block bg-[#78909c] bg-opacity-30 h-full rounded-b-md">
                           <Link to={`/movie/${movie?.slug}`} className='font-semibold hover:text-red-500 transitions'>
                              <div className='pb-0.5 text-3xl p-0 mb-2.5 leading-none text-left overflow-hidden'>{movie?.title}</div>
                           </Link>
                           {/* Info */}
                           <p className="mb-2.5 flex justify-start">
                              <span className='font-bold align-top text-sm leading-5 mr-4 mt-1 flex items-center text-[#b5e745]'>
                                 <svg className="w-4 h-4 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                 </svg>
                                 <span className='h-4'>{movie?.rateNumber}</span>
                              </span>
                              <span className='align-top text-sm leading-5 mr-4 mt-1 flex items-center'>
                                 <svg className="w-4 h-4 mr-1 text-[#b5e745]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                 </svg>
                                 Full
                              </span>
                              <span className='align-top text-sm leading-5 mr-4 mt-1 flex items-center'>
                                 <svg className="w-4 h-4 mr-1 text-[#b5e745]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z" />
                                 </svg>
                                 {movie?.year[0]}
                              </span>
                              <span className='align-top leading-5 mt-1 bg-red-600 px-2.5 py-0.5 text-xs uppercase my-0 rounded-xl font-semibold'>HD</span>
                           </p>
                           {/* Description */}
                           <div className='text-sm mb-2 lg:opacity-80 opacity-100'>
                              <p className='mb-2.5 text-justify'>{`${movie?.desc}`.substring(0, 280).slice(0) + " ..."}</p>
                              <p className='flex items-center justify-start'>
                                 <svg className="w-3 h-3 mr-2 text-[#b5e745]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-7.5 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM2 16V8h16v8H2Z" />
                                 </svg>
                                 Thể loại: {movie?.category.join(", ")}
                              </p>
                           </div>
                           {/* Cast */}
                           <div className='mb-2'>
                              <span className='w-10 h-10 rounded-full bg-gray-400/40 inline-flex items-center justify-center align-top mr-2.5 mb-2.5'>
                                 <i className="fa-solid fa-user fa-xs"></i>
                              </span>
                              <span className='w-10 h-10 rounded-full bg-gray-400/40 inline-flex items-center justify-center align-top mr-2.5 mb-2.5'>
                                 <i className="fa-solid fa-user fa-xs"></i>
                              </span>
                              <span className='w-10 h-10 rounded-full bg-gray-400/40 inline-flex items-center justify-center align-top mr-2.5 mb-2.5'>
                                 <i className="fa-solid fa-user fa-xs"></i>
                              </span>
                              <span className='w-10 h-10 rounded-full bg-gray-400/40 inline-flex items-center justify-center align-top mr-2.5 mb-2.5'>
                                 <i className="fa-solid fa-user fa-xs"></i>
                              </span>
                              <span className='w-10 h-10 rounded-full bg-gray-400/40 inline-flex items-center justify-center align-top mr-2.5 mb-2.5'>
                                 <i className="fa-solid fa-user fa-xs"></i>
                              </span>
                              <button className='text-[#b5e745] rounded bg-transparent shadow-none border border-solid border-[#b5e745] hover:bg-[#b5e745] hover:text-white w-10 h-10 transitions'>
                                 <i className="fa-solid fa-ellipsis"></i>
                              </button>
                           </div>
                           <Link to={`/movie/${movie?.slug}`} className="font-semibold bg-red-600 mr-1.5 flex items-center justify-center rounded py-2.5 px-5 max-w-fit hover:bg-gray-600">
                              <svg className="w-4 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                                 <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                              </svg>
                              Watch Now
                           </Link>
                        </div>
                     </div>
                  </div>
               </SwiperSlide >
            ))}
         </Swiper >
         <ListMovies movies={Movies} title={"Tất cả phim"} />
      </div>
   )
}

export default Hero