import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getTopRatedMoviesAction } from '../../Redux/Actions/moviesActions';
import toast from 'react-hot-toast';
import Loader from '../Notifications/Loader';
import { Empty } from '../Notifications/Empty';

const Widget = () => {
   const dispatch = useDispatch()
   const [isClicked, setIsClicked] = useState(1);
   const { isLoading, isError, movies } = useSelector((state) => state.getTopRatedMovies)

   useEffect(() => {
      dispatch(getTopRatedMoviesAction())
      if (isError) {
         toast.error(isError)
      }
   }, [dispatch, isError])

   return (
      <div className='lg:w-1/4 lg:inline-block w-full block lg:pl-4 lg:mt-0 mt-5'>
         {/* Filter */}
         <section className="p-3 h-auto mb-5 rounded-md bg-[#78909c] bg-opacity-20 w-full">
            <div className="text-white mb-6 font-semibold pb-4 text-base border-b-4 border-[#b5e745]">Hôm nay xem gì?</div>
            <p className='text-sm text-gray-400 tracking-tight text-justify mb-6'><strong>MẸO SỬ DỤNG:</strong> Sử dụng chức năng Lọc Phim trên thanh công cụ để lọc những phim bạn đang cần xem chính xác nhất.</p>
            <Link to="/filters" className='rounded bg-red-600 text-white font-semibold px-3 py-2.5 leading-9 hover:bg-gray-600 duration-100 ease-in tracking-tight'>
               <i className="fa-solid fa-filter fa-lg"></i> Lọc phim
            </Link>
         </section>

         {/* New update */}
         <section className="p-3 h-auto mb-5 rounded-md bg-[#78909c] bg-opacity-20">
            <div className="text-white mb-6 font-semibold pb-4 text-base border-b-4 border-[#b5e745]">Phim mới cập nhật</div>
            <ul className='m-0 p-0 list-none'>
               {movies?.slice(0, 5).map((movie, index) => (
                  <li key={index} className='py-1 hover:border-l-8 text-red-400 hover:border-red-600 hover:pl-2 hover:text-white duration-100 ease-linear'>
                     <Link className='flex justify-between'>
                        <span className='text-sm'>{`${movie?.title}`.substring(0, 18).slice(0) + " ..."}</span>
                        <span className='text-gray-600 italic'>{movie?.episode}</span>
                     </Link>
                  </li>
               ))}
            </ul>
         </section>

         {/* Hot search */}
         <section className="p-3 h-auto mb-5 rounded-md bg-[#78909c] bg-opacity-20">
            <div className="text-white mb-6 font-semibold pb-4 text-base flex flex-col">
               <span className='text-lg font-bold text-center mb-4 uppercase'>phim đề cử</span>
               <div className='flex *:w-1/2 *:text-center *:p-2 *:rounded-t-md *:border-b-4 *:text-lg *:cursor-pointer *:duration-200 *:font-bold *:ease-in'>
                  <button
                     className={`${isClicked ? '!border-[#b5e745] text-red-400' : 'border-transparent text-white'} hover:text-red-700 hover:bg-gray-200`}
                     onClick={() => { setIsClicked(status => 1) }}
                  >TV/Series</button>
                  <button
                     className={`${!isClicked ? 'border-[#b5e745] text-red-400' : 'border-transparent text-white'} hover:text-red-700 hover:bg-gray-200`}
                     onClick={() => { setIsClicked(status => 0) }}
                  >Movie/OVA</button>
               </div>
            </div>

            <ul className='m-0 p-0 list-none'>
               {isLoading ?
                  <Loader /> :
                  movies?.length > 0 ?
                     <>
                        {isClicked ?
                           <>
                              {movies?.filter(movie => movie?.type.includes("tv-series")).slice(0, 5).map((movie, index) => (
                                 <li className="mb-5" key={index}>
                                    <div className='flex'>
                                       <Link to={`/movies/${movie?._id}`} className="w-[70px] h-24 lg:h-[85px] relative topSearchCard" key={index}>
                                          <img src={`${movie?.image}`} className='h-full rounded-md w-full' alt="" />
                                          <div className='absolute top-0'>
                                             <div className='bg-[#b5e745] w-6 h-6 relative flex items-center justify-center text-xs font-bold rounded-tl-md text-black'>#{index + 1}</div>
                                             <div className='w-0 h-0 border-y-8 border-[#b5e745] border-l-[10px] border-y-transparent absolute left-0 -bottom-2'></div>
                                             <div className='w-0 h-0 border-y-8 border-[#b5e745] border-r-[10px] border-y-transparent absolute right-0 -bottom-2'></div>
                                          </div>
                                          <div className='overlay'>
                                             <div className="play-icon !h-8 !w-8">
                                                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 16">
                                                   <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                                                </svg>
                                             </div>
                                          </div>
                                       </Link>
                                       <div className="ml-2 w-60">
                                          <Link to={`/movies/${movie?._id}`} className='font-semibold tracking-tight hover:text-gray-500 duration-200 ease-in'>{movie?.title}</Link>
                                          <div className='flex justify-between flex-wrap mt-2'>
                                             <span className='font-bold text-sm inline-flex items-center lg:mr-3 text-[#b5e745]'>
                                                <svg className="w-3 h-3 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                   <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <span className='h-4'>{movie?.rate}</span>
                                             </span>
                                             <span className='text-sm inline-flex items-center lg:mr-3'>
                                                <svg className="w-3 h-3 mr-1 text-[#b5e745]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                   <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                {movie?.episode}
                                             </span>
                                             <span className='block lg:hidden w-10 bg-red-600 px-2.5 py-0.5 text-xs uppercase my-0 rounded-xl font-semibold text-center'>HD</span>
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                              ))}
                           </> :
                           <>
                              {movies?.filter(movie => movie?.type.includes("movie-ova")).slice(0, 5).map((movie, index) => (
                                 <li className="mb-5" key={index}>
                                    <div className='flex'>
                                       <Link to={`/movies/${movie?._id}`} className="w-[70px] h-24 lg:h-[85px] relative topSearchCard" key={index}>
                                          <img src={`${movie?.image}`} className='h-full rounded-md w-full' alt="" />
                                          <div className='absolute top-0'>
                                             <div className='bg-[#b5e745] w-6 h-6 relative flex items-center justify-center text-xs font-bold rounded-tl-md text-black'>#{index + 1}</div>
                                             <div className='w-0 h-0 border-y-8 border-[#b5e745] border-l-[10px] border-y-transparent absolute left-0 -bottom-2'></div>
                                             <div className='w-0 h-0 border-y-8 border-[#b5e745] border-r-[10px] border-y-transparent absolute right-0 -bottom-2'></div>
                                          </div>
                                          <div div className='overlay'>
                                             <div className="play-icon !h-8 !w-8">
                                                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 16">
                                                   <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                                                </svg>
                                             </div>
                                          </div>
                                       </Link>
                                       <div className="ml-2 w-60">
                                          <Link to={`/movies/${movie?._id}`} className='font-semibold tracking-tight hover:text-gray-500 duration-200 ease-in'>{movie?.title}</Link>
                                          <div className='flex justify-between flex-wrap mt-2'>
                                             <span className='font-bold text-sm inline-flex items-center text-[#b5e745]'>
                                                <svg className="w-3 h-3 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                   <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <span className='h-4'>{movie?.rate}</span>
                                             </span>
                                             <span className='text-sm inline-flex items-center'>
                                                <svg className="w-3 h-3 mr-1 text-[#b5e745]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                   <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                {movie?.episode}
                                             </span>
                                             <span className='block lg:hidden w-10 bg-red-600 px-2.5 py-0.5 text-xs uppercase my-0 rounded-xl font-semibold text-center'>HD</span>
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                              ))}
                           </>
                        }
                     </> :
                     <Empty message="Không tìm thấy phim" />
               }
            </ul>
         </section>
      </div>
   )
}

export default Widget