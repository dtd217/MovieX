import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import DashboardLayout from '../../Components/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { userDeleteBookmarkByIdAction, userDeleteBookmarksAction, userGetBookmarksAction } from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast';
import Loader from '../../Components/Notifications/Loader';
import { Link } from 'react-router-dom';
import { Empty } from '../../Components/Notifications/Empty';

const Bookmarks = () => {
   const dispatch = useDispatch()
   // Get bookmarks
   const { isLoading, isError, bookmarks } = useSelector((state) => state.userGetBookmarks)
   // Delete bookmarks
   const {
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: deleteSuccess
   } = useSelector((state) => state.userDeleteBookmarks)

   // Delete bookmark by id 
   const {
      isLoading: deleteByIdLoading,
      isError: deleteByIdError,
      isSuccess: deleteByIdSuccess
   } = useSelector((state) => state.userDeleteBookmarkById)

   // Delete bookmarks handler
   const deleteBookmarksHandler = () => {
      window.confirm('Bạn có muốn bỏ theo dõi toàn bộ phim?') && dispatch(userDeleteBookmarksAction())
   }

   // Delete bookmark by id handler
   const deleteBookmarkByIdHandler = (id) => {
      window.confirm('Bạn có muốn bỏ theo dõi phim này?') && dispatch(userDeleteBookmarkByIdAction(id))
   }

   useEffect(() => {
      dispatch(userGetBookmarksAction())
      if (isError || deleteError || deleteByIdError) {
         toast.error(isError || deleteError || deleteByIdError)
         dispatch({
            type: isError ?
               'GET_BOOKMARKS_RESET' :
               deleteSuccess ?
                  'DELETE_BOOKMARKS_RESET' :
                  'DELETE_BOOKMARK_BY_ID_RESET'
         })
      }
   }, [dispatch, isError, deleteError, deleteByIdError, deleteSuccess, deleteByIdSuccess])

   return (
      <Layout>
         <DashboardLayout title='Theo dõi' >
            {isLoading ?
               <Loader /> :
               bookmarks.length > 0 ?
                  <div className='flex flex-col'>
                     {bookmarks?.length > 0 &&
                        <button
                           disabled={deleteLoading}
                           onClick={deleteBookmarksHandler}
                           className='py-2 px-4 self-end text-lg mb-4 w-fit tracking-wide bg-red-600 hover:opacity-80 rounded-md'>
                           {deleteLoading ? "Đang xử lý..." : "Bỏ theo dõi toàn bộ phim"}
                        </button>
                     }
                     <ul className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
                        {bookmarks?.map((movie, index) => (
                           <li className='col-span-1 rounded-2xl' key={index}>
                              <Link to={`/movies/${movie?._id}`} className='relative movie-card h-auto w-full block'>
                                 <div className='absolute left-1.5 top-1.5 px-2 py-1.5 bg-opacity-70 bg-black flex justify-between rounded-3xl z-20 text-yellow-200'>
                                    <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                       <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <span className='text-sm'>{movie?.rate}</span>
                                 </div>
                                 <div className='absolute right-1.5 mt-1.5 bg-opacity-80 h-[52px] w-[52px] bg-red-700 flex text-center justify-center items-center rounded-full z-20 text-white'>
                                    <span className='text-xs uppercase font-semibold'>{movie?.status}</span>
                                 </div>
                                 <div className='relative'>
                                    <img src={`${movie?.image}`} alt={`/images/${movie?.title}`} className='movie-image' />
                                    <div div className='overlay !absolute top-0'>
                                       <div className="play-icon">
                                          <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 16">
                                             <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                                          </svg>
                                       </div>
                                    </div>
                                 </div>
                                 <p className='text-center mt-2 text-lg font-semibold text-gray-600 hover:text-gray-500 transitions whitespace-nowrap text-ellipsis overflow-hidden'>{movie.title}</p>
                              </Link>
                              <button
                                 disabled={deleteByIdLoading}
                                 onClick={() => deleteBookmarkByIdHandler(movie._id)}
                                 className='py-1.5 mt-1 w-full tracking-wide bg-red-600 hover:opacity-90 rounded-md'>
                                 {deleteByIdLoading ? "Đang xử lý..." : "Bỏ theo dõi"}
                              </button>
                           </li>
                        ))}
                     </ul>
                  </div> :
                  <Empty message="Bạn chưa theo dõi phim nào" />
            }
         </DashboardLayout>
      </Layout >
   )
}

export default Bookmarks