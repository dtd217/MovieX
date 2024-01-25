import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { Link } from 'react-router-dom'
import Uploader from '../../Components/Uploader';

const Profile = () => {
   const [collapsed, setCollapsed] = useState(false);
   const [clickedTab, setClickedTab] = useState(0)

   const SideLinks = [
      {
         key: 1,
         icon: '/images/profile-icon/dashboard.png',
         href: '#1',
         title: 'Dashboard',
      },
      {
         key: 2,
         icon: '/images/profile-icon/movie-list.png',
         href: '#2',
         title: 'Movies List',
      },
      {
         key: 3,
         icon: '/images/profile-icon/add-movie.png',
         href: '#3',
         title: 'Add Movie',
      },
      {
         key: 4,
         icon: '/images/profile-icon/categories.png',
         href: '#4',
         title: 'Categories',
      },
      {
         key: 5,
         icon: '/images/profile-icon/users.png',
         href: '#5',
         title: 'Users',
      },
      {
         key: 6,
         icon: '/images/profile-icon/update-profile.png',
         href: '#6',
         title: 'Update Profile',
      },
      {
         key: 7,
         icon: '/images/profile-icon/favourite-movies.png',
         href: '#7',
         title: 'Favourites Movies',
      },
      {
         key: 8,
         icon: '/images/profile-icon/change-password.png',
         href: '#8',
         title: 'Change Password',
      }
   ]

   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-screen-xl p-4 mx-auto bg-black xl:rounded-md">
               <div className='lg:w-full lg:inline-block size-full block'>
                  <div className="flex relative h-[584px] *:h-[584px]">
                     <aside className='sm:w-[220px] bg-gray-800 absolute left-0'>
                        <ul className='p-2 rounded-lg grid gap-1 *:p-2 sm:*:py-2 sm:*:pl-2 sm:*:pr-4 *:text-lg *:rounded-lg'>
                           {SideLinks.map((item, index) => (
                              <li
                                 onClick={() => setClickedTab(index)}
                                 className={`${clickedTab === index ? 'bg-red-600 hover:bg-red-600' : ''} hover:bg-gray-500 duration-200 ease-linear`}
                              >
                                 <Link to={item.href} className='flex items-center text-base w-fit'>
                                    <img src={`${item.icon}`} alt="" className='size-7 sm:mr-3 invert' />
                                    <span className='hidden sm:block'>{item.title}</span>
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </aside>
                     <div className={`right-0 bg-gray-300 absolute transition-all ease-linear duration-300 ${collapsed ? 'w-full' : 'sm:w-[calc(100%-220px)] w-[calc(100%-60px)]'}`}>
                        <header className=' border-b-2 border-gray-400 border-opacity-30 overflow-hidden flex items-center'>
                           <button
                              onClick={() => setCollapsed(!collapsed)}
                              className='flex items-center p-4 size-fit hover:bg-gray-500 hover:bg-opacity-20'>
                              {collapsed ?
                                 <img src="/images/profile-icon/fold-out.png" alt="" className='size-5' /> :
                                 <img src="/images/profile-icon/fold-in.png" alt="" className='size-5' />}
                           </button>
                           <h1 className='ml-4 text-black text-xl sm:text-2xl font-bold tracking-wider'>Profile</h1>
                        </header>
                        <main className='p-6'>
                           <div className="rounded-lg size-full">
                              <Uploader />
                              <div className="flex mt-6 flex-col">
                                 <div className="w-full flex flex-col mr-6">
                                    <label className='text-gray-800'>Tên tài khoản</label>
                                    <input
                                       required
                                       placeholder='Dong Tran Duy'
                                       type="text"
                                       className="bg-gray-100 rounded focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-800" />
                                 </div>
                                 <div className="w-full flex flex-col mt-3">
                                    <label className='text-gray-800'>Email</label>
                                    <input
                                       required
                                       placeholder='tranduy.neu@gmail.com'
                                       type="email"
                                       className="bg-gray-100 rounded text-gray-800 focus:ring-2 border-gray-400 placeholder:text-gray-800" />
                                 </div>
                              </div>
                              <div className="flex justify-between md:flex-row flex-col mt-4">
                                 <button className='flex justify-center items-center py-2 px-2.5 rounded-md transitions hover:bg-gray-700 bg-gray-600'>Cập nhật thông tin</button>
                                 <button className='flex justify-center items-center py-2 px-2.5 rounded-md transitions hover:bg-red-700 bg-red-600 md:mt-0 mt-2'>Xoá tài khoản</button>
                              </div>
                           </div>
                        </main>
                     </div>
                  </div>
               </div >
            </div>
         </div>
      </Layout >
   )
}

export default Profile