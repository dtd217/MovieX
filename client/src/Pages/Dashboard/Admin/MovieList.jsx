import React, { useEffect } from 'react'
import Layout from '../../../Layout/Layout'
import DashboardLayout from '../../../Components/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMoviesAction } from '../../../Redux/Actions/moviesActions';
import toast from 'react-hot-toast';
import { Empty } from '../../../Components/Notifications/Empty';
import Loader from '../../../Components/Notifications/Loader';

const MovieList = () => {
   const dispatch = useDispatch()
   const { isLoading, isError, movies, page, pages } = useSelector((state) => state.getAllMovies)
   const { categories } = useSelector((state) => state.getAllCategories)

   const total = [
      {
         title: 'Tổng số bộ phim',
         value: movies?.length,
         background: 'bg-red-500',
         icon: <i className="fa-solid fa-film fa-xl"></i>,
      },
      {
         title: 'Tổng số thể loại',
         value: categories?.length,
         background: 'bg-blue-500',
         icon: <i className="fa-solid fa-layer-group fa-xl"></i>,
      },
      {
         title: 'Tổng số người dùng',
         value: 1200000,
         background: 'bg-green-500',
         icon: <i className="fa-solid fa-user fa-xl"></i>,
      }
   ]

   const nextPage = () => {
      dispatch(getAllMoviesAction({ pageNumber: page + 1 }))
   }

   const prevPage = () => {
      dispatch(getAllMoviesAction({ pageNumber: page - 1 }))
   }

   useEffect(() => {
      if (isError) {
         toast.error(isError)
      }
      dispatch(getAllMoviesAction({ pageNumber: 1 }))

   }, [dispatch, isError])

   return (
      <Layout>
         <DashboardLayout title='Danh sách phim' >
            {isLoading ?
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
                              <td>{`${movie.title}`.substring(0, 30).slice(0) + "..."}</td>
                              <td>{categories?.map((category) => (movie?.categories?.map((cate) => (cate === category.value ? category.label + ', ' : null))))}</td>
                              <td className="text-center">{movie.year[0]}</td>
                              <td className="text-center">{movie.episode}</td>
                              <td className="text-center">
                                 <div className="flex flex-col sm:flex-row justify-center *:p-2.5 *:rounded-lg *:whitespace-nowrap *:sm:text-sm *:flex *:items-center *:justify-center">
                                    <button className='text-gray-100 bg-green-500 transitions hover:bg-gray-600 sm:mr-2'>
                                       <i className="fa-solid fa-pen-to-square fa-lg mr-1"></i> Sửa
                                    </button>
                                    <button className='text-gray-100 bg-red-500 transitions hover:bg-gray-600 mt-2 sm:mt-0'>
                                       <i className="fa-solid fa-trash fa-lg mr-1"></i> Xoá
                                    </button>
                                 </div>
                              </td>
                           </tr >
                        ))}
                     </table>
                     <div className='w-full flex gap-2 justify-center text-center mt-6 *:py-1.5 *:px-4 *:bg-red-600 *:rounded *:w-fit'>
                        <button onClick={prevPage} disabled={page === 1} className='hover:opacity-70 transitions disabled:bg-red-800 disabled:opacity-100'>
                           <i className="fa-solid fa-backward"></i>
                        </button>
                        <button onClick={nextPage} disabled={page === pages} className='hover:opacity-70 transitions disabled:bg-red-800 disabled:opacity-100'>
                           <i className="fa-solid fa-forward"></i>
                        </button>
                     </div>
                  </div> :
                  <Empty message={"Không tìm thấy phim"} />
            }
         </DashboardLayout>
      </Layout >
   )
}

export default MovieList