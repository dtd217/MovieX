import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layout/Layout'
import Widget from '../Components/Home/Widget'
import { Breadcrumb, notification } from 'antd';
import MovieRates from '../Components/Single/MovieRates'
import { useDispatch, useSelector } from 'react-redux'
import Movie from '../Components/Movie'
import { getMovieByIdAction } from '../Redux/Actions/moviesActions';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Notifications/Loader';
import { Empty } from '../Components/Notifications/Empty';

const WatchPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { movies } = useSelector((state) => state.getAllMovies)
   const { isLoading, isError, movie } = useSelector((state) => state.getMovieById)

   const videoRef = useRef(null);
   const [isPlayed, setIsPlayed] = useState(false)

   const similarMovies = movies?.filter(m =>
      m.categories &&
      movie &&
      movie.categories &&
      movie.categories.length > 0 &&
      m.categories.includes(movie.categories[0])
   )

   const [isFollowed, setIsFollowed] = useState(false)
   const [errorNotice, setErrorNotice] = useState(false)

   const playVideo = () => {
      if (videoRef.current) {
         videoRef.current.play();
         videoRef.onseeking = () => {
            if (videoRef.current) {
               videoRef.current.pause();
            }
            setIsPlayed(false);
         }
         setIsPlayed(!isPlayed);
      }
   };

   // Notification
   const [api, contextHolder] = notification.useNotification();
   const openNotificationWithIcon = (type) => {
      type === 'success' ?
         api[type]({
            message: 'Theo dõi',
            description: 'Bạn đã theo dõi thành công phim này',
            duration: 2,
         }) : api[type]({
            message: 'Bỏ theo dõi',
            description: 'Bạn đã bỏ theo dõi thành công phim này',
            duration: 2,
         });
   };

   useEffect(() => {
      dispatch(getMovieByIdAction(id))
   }, [dispatch, id])

   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-6xl p-4 mx-auto bg-black xl:rounded">
               <div className='flex justify-between lg:flex-row flex-col'>
                  <div className='relative lg:w-3/4 lg:inline-block block h-full'>
                     <Breadcrumb
                        separator=">"
                        items={[
                           { title: 'Trang chủ', href: '/' },
                           {
                              title: `${movie?.type?.includes("movie-ova") ? "Danh sách phim lẻ (Movie/OVA)" : "Danh sách phim bộ (TV/Series)"}`,
                              href: `${movie?.type?.includes("movie-ova") ? "/movie-ova" : "/tv-series"}`
                           },
                           { title: `${movie?.title}`, href: `/movies/${movie?._id}` },
                           { title: 'Xem phim' },
                        ]}
                     />
                     {isLoading ?
                        <Loader /> :
                        isError ?
                           <Empty message="Không tìm thấy phim" /> :
                           <div className='size-full rounded-md mt-4 relative'>
                              <div onClick={playVideo} className={`${isPlayed ? 'hidden' : 'flex'} cursor-pointer z-10 items-center justify-center size-full absolute`}>
                                 <div className="xs:size-28 size-12 cursor-pointer popBeat flex items-center justify-center text-4xl rounded-full bg-transparent  absolute">
                                    <i className="fa-solid fa-play fa-2xl text-gray-200 ml-2"></i>
                                 </div>
                              </div>
                              <video
                                 ref={videoRef}
                                 controls
                                 onPlay={() => setIsPlayed(true)}
                                 poster='/images/bgBlack.png'
                                 playsInline
                                 controlsList="nodownload"
                                 className='rounded-md h-[520px] w-full cursor-pointer'
                                 src={movie?.video}
                                 title={movie?.title}
                                 type="video/mp4"
                              >
                              </video>
                           </div>
                     }
                     <div className="h-full mb-2 flex justify-center flex-wrap *:text-lg *:p-2 *:font-semibold *:text-gray-400 ">
                        <div className="hover:bg-gray-700 cursor-pointer">
                           <i className="mr-2 fa-solid fa-forward-fast"></i>
                           Tập tiếp
                        </div>
                        <div className="hover:bg-gray-700 cursor-pointer">
                           <button onClick={() => {
                              const element = document.getElementById('beforeComments');
                              if (element) {
                                 element.scrollIntoView({ behavior: 'smooth' });
                              }
                           }}>
                              <i className="mr-2 fa-solid fa-comments"></i>
                              Bình luận
                           </button>
                        </div>
                        <div className="hover:bg-gray-700 cursor-pointer">
                           <i className="mr-2 fa-solid fa-lightbulb"></i>
                           Tắt đèn
                        </div>
                        <div className="hover:bg-gray-700 cursor-pointer">
                           {contextHolder}
                           <button
                              onClick={(e) => {
                                 setIsFollowed(false)
                                 openNotificationWithIcon('error')
                              }}
                              className={`${!isFollowed ? 'hidden' : 'block'} !text-[#b5e745]`}
                           ><i className="fa-solid fa-bookmark mr-2"></i>Đã theo dõi</button>
                           <button
                              onClick={(e) => {
                                 setIsFollowed(true)
                                 openNotificationWithIcon('success')
                              }}
                              className={`${isFollowed ? 'hidden' : 'block'}`}
                           ><i className="fa-regular fa-bookmark mr-2"></i>Theo dõi</button>
                        </div>
                        <div className="hover:bg-gray-700 cursor-pointer">
                           <i className="mr-2 fa-solid fa-expand"></i>
                           Phóng to
                        </div>
                        <div className="hover:bg-gray-700 cursor-pointer">
                           <button
                              onClick={() => setErrorNotice(!errorNotice)}
                              className={`${errorNotice ? '!text-[#b5e745]' : ''}`}
                           ><i className="mr-2 fa-solid fa-circle-exclamation"></i>Báo lỗi</button>
                        </div>
                        <div className="hover:bg-gray-700 cursor-pointer">
                           <i className="mr-2 fa-solid fa-camera"></i>
                           Chụp ảnh
                        </div>
                        <div className="hover:bg-gray-700 cursor-pointer">
                           <i className="mr-2 fa-solid fa-download"></i>
                           Tải về
                        </div>
                        <div className="hover:bg-gray-700 cursor-pointer">
                           <i className="mr-2 fa-solid fa-clock-rotate-left"></i>
                           Lịch sử xem
                        </div>
                     </div>
                     <div className="mb-2.5">
                        <h3 className='text-center text-2xl mb-1.5 text-gray-400 font-semibold'>Chọn Server</h3>
                        <div className='flex justify-center *:bg-[#b5e745] *:py-1.5 *:px-2.5 *:rounded-lg *:font-bold *:text-lg'>
                           <button className='!bg-red-600'>DU</button>
                           <button className='mx-1'>FB</button>
                           <button>HDX(ADS)</button>
                        </div>
                     </div>
                     <div id='beforeComments' className="p-3 bg-opacity-20 bg-[#78909c] size-full rounded text-lg">
                        <div className='text-gray-400 font-semibold '>
                           <i className="fa-solid fa-film mr-2"></i>
                           MovieX
                        </div>
                        <div className="*:mt-2 flex flex-wrap justify-start *:cursor-pointer *:mr-2 *:px-2 *:py-1 font-semibold *:bg-gray-500 *:rounded-md">
                           <div className='hover:bg-red-500 transitions !bg-red-600'>01</div>
                           <div className='hover:bg-red-400 transitions'>02</div>
                           <div className='hover:bg-red-400 transitions'>03</div>
                           <div className='hover:bg-red-400 transitions'>04</div>
                           <div className='hover:bg-red-400 transitions'>05</div>
                           <div className='hover:bg-red-400 transitions'>06</div>
                           <div className='hover:bg-red-400 transitions'>07</div>
                           <div className='hover:bg-red-400 transitions'>08</div>
                           <div className='hover:bg-red-400 transitions'>09</div>
                           <div className='hover:bg-red-400 transitions'>10</div>
                           <div className='hover:bg-red-400 transitions'>11</div>
                           <div className='hover:bg-red-400 transitions'>12</div>
                           <div className='hover:bg-red-400 transitions'>13</div>
                        </div>
                     </div>
                     <div className="bg-gray-200 rounded mt-5 px-6 py-8">
                        <MovieRates movie={movie} />
                     </div>
                     <div className="bg-[#78909c] bg-opacity-20 size-full rounded-md mt-5 p-2">
                        <div className="border-[#b5e745] border-b-4 font-semibold w-fit mb-6 pb-2 text-lg">Phim liên quan</div>
                        <div className="grid md:grid-cols-5 sm:grid-cols-4 min-[360px]:grid-cols-2 min-[420px]:grid-cols-3 grid-cols-2 gap-4">
                           {similarMovies?.slice(0, 5).map((movie, index) => (
                              <Movie movie={movie} key={index} />
                           ))}
                        </div>
                     </div>
                  </div>
                  <Widget />
               </div>
            </div>
         </div>
      </Layout >
   )
}

export default WatchPage