import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../Redux/Actions/userActions';
import toast from 'react-hot-toast';

const DashboardLayout = ({ children, title }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { userInfo } = useSelector((state) => state.userLogin);

   const logoutHandler = () => {
      dispatch(logoutAction());
      navigate('/login');
      toast.success('Bạn đã đăng xuất');
   }

   const [collapsed, setCollapsed] = useState(false);
   const currentTab = window.location.href

   const SideLinks =
      userInfo?.isAdmin ?
         ([
            {
               key: 0,
               icon: '/images/dashboard-icon/movie-list.png',
               href: '/movie-list',
               title: 'Danh sách phim',
            },
            {
               key: 1,
               icon: '/images/dashboard-icon/add-movie.png',
               href: '/add-movie',
               title: 'Thêm phim ',
            },
            {
               key: 2,
               icon: '/images/dashboard-icon/categories.png',
               href: '/categories',
               title: 'Thể loại phim',
            },
            {
               key: 3,
               icon: '/images/dashboard-icon/users.png',
               href: '/users',
               title: 'Người dùng',
            },
            {
               key: 4,
               icon: '/images/dashboard-icon/update-profile.png',
               href: '/profile',
               title: 'Cập nhật thông tin',
            },
            {
               key: 5,
               icon: '/images/dashboard-icon/change-password.png',
               href: '/password',
               title: 'Đổi mật khẩu',
            },
            {
               key: 6,
               icon: '/images/dashboard-icon/bookmark.png',
               href: '/bookmarks',
               title: 'Theo dõi',
            },
         ]) :
         userInfo ?
            ([
               {
                  key: 1,
                  icon: '/images/dashboard-icon/update-profile.png',
                  href: '/profile',
                  title: 'Cập nhật thông tin',
               },
               {
                  key: 2,
                  icon: '/images/dashboard-icon/change-password.png',
                  href: '/password',
                  title: 'Đổi mật khẩu',
               },
               {
                  key: 3,
                  icon: '/images/dashboard-icon/bookmark.png',
                  href: '/bookmarks',
                  title: 'Theo dõi',
               },
            ]) : []
   return (
      <div className="bg-gray-700 py-4">
         <div className="max-w-screen-lg mx-auto p-8 bg-black z-10">
            <div className="flex relative">
               <Drawer
                  placement='left'
                  closable
                  onClose={() => setCollapsed(false)}
                  open={collapsed}
                  key='left'
                  getContainer={false}
                  zIndex={0}
                  bodyStyle={{ padding: 0 }}
                  headerStyle={{ display: 'none' }}
                  width={220}
                  className='!bg-gray-700 !rounded-l-md'
               >
                  <aside className='bg-gray-700 text-white bg-opacity-60 flex flex-col'>
                     <ul className='p-2 rounded-lg grid gap-1 *:p-2 sm:*:py-2 sm:*:pl-2 sm:*:pr-4 *:text-lg *:rounded-lg'>
                        {SideLinks.map((item, index) => (
                           <li
                              key={index}
                              className={`${currentTab.includes(item.href) ? 'bg-red-600 hover:bg-red-600' : ''}hover:bg-gray-500 duration-200 ease-linear`}
                           >
                              <Link to={item.href} className='flex items-center text-base w-full'>
                                 <img src={`${item.icon}`} alt="" className='size-7 mr-3 invert' />
                                 <span className=''>{item.title}</span>
                              </Link>
                           </li>
                        ))}
                        <button onClick={logoutHandler} className="hover:bg-gray-500 duration-200 ease-linear">
                           <Link to="/login" className='flex items-center text-base w-full'>
                              <img src="/images/dashboard-icon/logout.png" alt="" className='size-7 mr-3 invert' />
                              <span>Đăng xuất</span>
                           </Link>
                        </button>
                     </ul>
                  </aside>
               </Drawer>
               <div className="slide-top rounded-md bg-gray-300 transition-all ease-linear duration-300 w-full">
                  <header className='sticky rounded-t-md top-0 z-10 bg-gray-400 border-b-2 border-gray-400 border-opacity-30 overflow-hidden flex items-center'>
                     <button
                        onClick={() => setCollapsed(!collapsed)}
                        className='flex items-center p-4 size-fit hover:bg-gray-500 hover:bg-opacity-20'>
                        {collapsed ?
                           <img src="/images/dashboard-icon/fold-in.png" alt="Open" className='size-5' /> :
                           <img src="/images/dashboard-icon/fold-out.png" alt="Close" className='size-5' />}
                     </button>
                     <h1 className='ml-2 md:ml-6 text-black text-xl sm:text-2xl font-bold'>{title}</h1>
                  </header>
                  <main className='p-6'>
                     <div className="rounded-lg size-full ">
                        {children}
                     </div>
                  </main>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DashboardLayout