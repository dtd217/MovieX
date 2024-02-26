import React from 'react'
import Layout from '../../Layout/Layout'
import DashboardLayout from '../../Components/DashboardLayout';
import MainTable from '../../Components/MainTable';
import { Movies } from '../../Data/movieData';

const Bookmarks = () => {
   return (
      <Layout>
         <DashboardLayout title='Theo dõi' >
            <MainTable data={Movies} admin={true} type={'bookmarks'} />
            {/* <table className="w-full text-left rtl:text-right">
               <thead className="text-gray-800 uppercase bg-gray-100">
                  <tr className='*:text-sm *:px-4 *:py-2 *:border-2 *:whitespace-nowrap'>
                     <th scope="col" className="">Hình ảnh</th>
                     <th scope="col" className="">Tên phim</th>
                     <th scope="col" className="">Thể loại</th>
                     <th scope="col" className="text-center">Ngôn ngữ</th>
                     <th scope="col" className="text-center">Năm</th>
                     <th scope="col" className="text-center">Thời lượng</th>
                     <th scope="col" className="text-center">Hành động</th>
                  </tr>
               </thead>
               {data.slice(0, 10).map((movie, i) => (
                  <tr key={i} className="bg-gray-100 *:border-2 *:px-4 *:py-2 *:text-gray-500">
                     <td>
                        <div className="flex justify-center items-center">
                           <img
                              src={movie.image}
                              className='size-12 rounded-md object-cover'
                              alt={movie.title} />
                        </div>
                     </td>
                     <td>{`${movie.title}`.substring(0, 30).slice(0) + "..."}</td>
                     <td>{movie.category.join(", ")}</td>
                     <td className="text-center">{movie.language}</td>
                     <td className="text-center">{movie.year[0]}</td>
                     <td className="text-center">{movie.episode}</td>
                     <td className="text-center">
                        <div className="flex flex-col sm:flex-row justify-center *:p-2.5 *:rounded-lg *:whitespace-nowrap *:sm:text-sm *:flex *:items-center *:justify-center">
                           <button
                              onClick={() => confirm('unfollow')}
                              className='text-gray-100 bg-red-600 transitions hover:bg-gray-600 sm:mr-2'>
                              <i className="fa-solid fa-bookmark fa-lg mr-1"></i> Bỏ theo dõi
                           </button>
                           {contextHolderModal}
                           {contextHolderNotification}
                           <Link to={`/movie/${movie?.slug}`} className='text-gray-100 bg-blue-600 transitions hover:bg-gray-600 mt-2 sm:mt-0'>
                              <i className="fa-solid fa-eye fa-lg mr-1"></i> Xem
                           </Link>
                        </div>
                     </td>
                  </tr >
               ))}
               <td colSpan="7" className="bg-gray-100">
                  <Pagination />
               </td>
            </table> */}
         </DashboardLayout>
      </Layout >
   )
}

export default Bookmarks