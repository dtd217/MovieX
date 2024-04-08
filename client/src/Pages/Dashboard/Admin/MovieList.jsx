import toast from 'react-hot-toast';
import React, { useEffect } from 'react'
import Layout from '../../../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Components/Notifications/Loader';
import { Empty } from '../../../Components/Notifications/Empty';
import DashboardLayout from '../../../Components/DashboardLayout';
import { adminGetAllUsersAction } from '../../../Redux/Actions/userActions';
import { deleteAllMoviesAction, deleteMovieAction } from '../../../Redux/Actions/moviesActions';
import { Link } from 'react-router-dom';

const MovieList = () => {
   window.scroll(0, 0)
   const dispatch = useDispatch()
   const { isLoading, isError, movies } = useSelector((state) => state.getAllMovies)
   const { isLoading: categoriesLoading, isError: categoriesError, categories } = useSelector((state) => state.getAllCategories)
   const { isLoading: usersLoading, isError: usersError, users } = useSelector((state) => state.adminGetAllUsers)
   const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.deleteMovie)
   const { isLoading: deleteAllLoading, isError: deleteAllError } = useSelector((state) => state.deleteAllMovies)

   const total = [
      {
         title: 'Tổng số bộ phim',
         value: isLoading ? 'Đang tải...' : movies?.length || 0,
         background: 'bg-red-500',
         icon: <i className="fa-solid fa-film fa-xl"></i>,
      },
      {
         title: 'Tổng số thể loại',
         value: categoriesLoading ? 'Đang tải...' : categories?.length || 0,
         background: 'bg-blue-500',
         icon: <i className="fa-solid fa-layer-group fa-xl"></i>,
      },
      {
         title: 'Tổng số người dùng',
         value: usersLoading ? 'Đang tải...' : users?.length || 0,
         background: 'bg-green-500',
         icon: <i className="fa-solid fa-user fa-xl"></i>,
      }
   ]

   const deleteMovieHandler = (id) => {
      window.confirm('Bạn có muốn xoá phim này?') && dispatch(deleteMovieAction(id))
   }

   const deleteAllMoviesHandler = (id) => {
      window.confirm('Bạn có muốn xoá toàn bộ phim?') && dispatch(deleteAllMoviesAction())
   }

   useEffect(() => {
      dispatch(adminGetAllUsersAction())
      if (isError || categoriesError || usersError || deleteError || deleteAllError) {
         toast.error(isError || categoriesError || usersError || deleteError, deleteAllError)
      }
   }, [dispatch, isError, categoriesError, usersError, deleteError, deleteAllError])

   return (
      <Layout>
         <DashboardLayout title='Danh sách phim' >
            {isLoading || deleteLoading ?
               <Loader /> :
               movies?.length > 0 ?
                  <div className='overflow-x-auto'>
                     <div className="rounded-md mb-6 flex justify-evenly gap-8 w-[800px] min-w-full">
                        {total.map((item, index) => (
                           <div key={index} className="flex justify-start items-center bg-gray-400 w-full rounded-md px-4 py-6">
                              <div className={`rounded-full mr-2 p-4 size-12 flex items-center justify-center ${item.background}`}>{item.icon}</div>
                              <div className="*:block lg:*:text-lg">
                                 <span>{item.title}</span>
                                 <span className='font-bold'>{item.value}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                     <table className="min-w-full w-[800px] text-left rtl:text-right">
                        <thead className="text-gray-800 uppercase bg-gray-100">
                           <tr className='*:text-sm *:px-4 *:py-2 *:border-2 *:whitespace-nowrap'>
                              <th scope="col" className="">Hình ảnh</th>
                              <th scope="col" className="">Tên phim</th>
                              <th scope="col" className="">Thể loại</th>
                              <th scope="col" className="text-center">Năm</th>
                              <th scope="col" className="text-center">Thời lượng</th>
                              <th scope="col" className="text-center">Cài đặt</th>
                           </tr>
                        </thead>
                        {movies?.map((movie, i) => (
                           <tr key={i} className="bg-gray-100 *:border-2 *:px-4 *:py-2 *:text-gray-500">
                              <td>
                                 <div className="flex justify-center items-center">
                                    <img src={movie.image} className='size-12 rounded-md object-cover' alt={movie.title} />
                                 </div>
                              </td>
                              <td>{`${movie?.title}`.substring(0, 30).slice(0) + "..."}</td>
                              <td>{categories?.map((category) => (movie?.categories?.map((cate) => (cate === category.value ? category.label + ', ' : null))))}</td>
                              <td className="text-center">{movie.year[0]}</td>
                              <td className="text-center">{movie.episode}</td>
                              <td className="text-center">
                                 <div className="flex flex-col sm:flex-row justify-center *:p-2.5 *:rounded *:whitespace-nowrap *:sm:text-sm *:flex *:items-center *:justify-center">
                                    <button className='text-gray-100 bg-green-500 transitions hover:bg-gray-600 sm:mr-2'>
                                       <Link to={`/update/${movie?._id}`}>
                                          <i className="fa-solid fa-pen-to-square fa-lg mr-1"></i> Sửa
                                       </Link>
                                    </button>
                                    <button
                                       onClick={() => deleteMovieHandler(movie?._id)}
                                       disabled={deleteLoading}
                                       className='text-gray-100 bg-red-500 transitions hover:bg-gray-600 mt-2 sm:mt-0'>
                                       <i className="fa-solid fa-trash fa-lg mr-1"></i> Xoá
                                    </button>
                                 </div>
                              </td>
                           </tr >
                        ))}
                     </table>
                     {movies?.length > 0 &&
                        <div className="flex justify-end">
                           <button
                              disabled={deleteAllLoading}
                              onClick={deleteAllMoviesHandler}
                              className='text-gray-100 text-xl font-semibold bg-red-500 transitions hover:bg-gray-600 mt-6 py-3 px-4 rounded'>
                              {deleteAllLoading ? 'Đang xoá phim...' : 'Xoá toàn bộ phim'}
                           </button>
                        </div>
                     }
                  </div> :
                  <Empty message={"Không tìm thấy phim"} />
            }
         </DashboardLayout>
      </Layout >
   )
}

export default MovieList