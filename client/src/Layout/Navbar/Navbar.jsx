import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast';

const Navbar = () => {
   const dispatch = useDispatch();
   const { userInfo } = useSelector((state) => state.userLogin);
   // const [bookmarks] = useSelector((state) => state.userGetBookmarks)

   const navigate = useNavigate();
   const [search, setSearch] = useState('')

   const handleSearch = (e) => {
      e.preventDefault()
      if (search.trim()) {
         navigate(`/movies/search/${search}`)
         setSearch(search)
      }
      else {
         navigate('/movies')
      }
   }

   const logoutHandler = () => {
      dispatch(logoutAction());
      navigate('/login');
      toast.success('Bạn đã đăng xuất');
   }

   const items = userInfo?.isAdmin ?
      ([
         {
            key: '1',
            label: (<Link to="/movie-list" className="block whitespace-nowrap px-6 py-2 hover:bg-gray-600 !text-white text-lg">Bảng điều khiển</Link>),
         },
         {
            key: '2',
            label: (<Link to="/cart" className="block whitespace-nowrap px-6 py-2 hover:bg-gray-600 !text-white text-lg">Giỏ phim</Link>),
         },
         {
            key: '3',
            label: (
               <button onClick={logoutHandler} className='w-full block whitespace-nowrap px-6 py-2 hover:bg-gray-600 !text-white text-lg'>
                  <Link to="/login" className='float-left'>
                     <span>Đăng xuất</span>
                  </Link>
               </button>
            ),
         },
      ]) :
      ([
         {
            key: '1',
            label: (<Link to="/profile" className="block whitespace-nowrap px-6 py-2 hover:bg-gray-600 !text-white text-lg">Thông tin cá nhân</Link>),
         },
         {
            key: '2',
            label: (<Link to="/cart" className="block whitespace-nowrap px-6 py-2 hover:bg-gray-600 !text-white text-lg">Giỏ phim</Link>),
         },
         {
            key: '3',
            label: (<Link to="/bookmarks" className="block whitespace-nowrap px-6 py-2 hover:bg-gray-600 !text-white text-lg">Hộp phim</Link>),
         },
         {
            key: '4',
            label: (
               <button onClick={logoutHandler} className='w-full block whitespace-nowrap px-6 py-2 hover:bg-gray-600 !text-white text-lg'>
                  <Link to="/login" className='float-left'>
                     <span>Đăng xuất</span>
                  </Link>
               </button>
            ),
         },
      ]);
   const [isOpened, setIsOpened] = useState(false);
   const [isClicked, setIsClicked] = useState(false);
   const [activedTab, setActivedTab] = useState('/');
   const activeTab = window.location.href
   const tabLink = window.location.href

   const isActive = (tab) => {
      return activeTab.includes(tab)
   }

   return (
      <>
         <nav className="bg-black sticky top-0 z-50">
            <div className="max-w-6xl flex flex-wrap items-center justify-between mx-auto p-4 xl:px-0">
               <Link to="/" className="flex items-center">
                  <span className="self-center text-3xl font-extrabold whitespace-nowrap tracking-wide text-red-600">MovieX</span>
               </Link>

               {userInfo ?
                  (<div className="flex lg:order-2">
                     <form onSubmit={handleSearch} className="relative hidden lg:block">
                        <button
                           type='submit'
                           className="absolute inset-y-0 left-0 flex items-center px-3 bg-red-600 rounded-l-lg">
                           <svg className="w-4 h-4 text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                           </svg>
                           <span className="sr-only">Search icon</span>
                        </button>
                        <input
                           type="search"
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                           id="search-navbar"
                           className="block w-full p-2 pl-14 text-sm rounded-md outline-0 border-0 bg-gray-600 border-gray-700 placeholder-gray-100 text-gray-100 focus:placeholder-white" placeholder="Tìm kiếm. . ." />
                     </form>
                     {/* User icon */}
                     <Dropdown
                        menu={{ items }}
                        placement="bottomRight"
                        trigger={["click"]}
                        overlayStyle={{ backgroundColor: '#374151', borderBlock: '#4B5563', borderRadius: '10px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                        arrow={{ pointAtCenter: true }}
                     >
                        <button
                           type="button"
                           className="mr-0 flex justify-between items-center lg:ml-4 focus:outline-none"
                        >
                           <div className='w-9 h-9 mr-1 rounded-full transitions flex items-center justify-center text-center bg-gray-600 hover:opacity-80'>
                              <span className="sr-only">Open user menu</span>
                              <img src={userInfo?.avatar ? userInfo?.avatar : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} alt={userInfo?.name} className='size-full rounded-full object-cover' />
                           </div>
                        </button>
                     </Dropdown>

                     {/* Menu icon */}
                     <button
                        type="button"
                        onClick={() => {
                           setIsOpened(prev => !prev)
                           setIsClicked(status => !status)
                        }}
                        className={`${isClicked ? 'bg-red-600' : 'bg-gray-600'} inline-flex transitions items-center p-2 w-9 h-9 ml-4 justify-center text-sm rounded-md lg:hidden hover:opacity-80`}
                     >
                        <span className="sr-only">Open main menu</span>
                        {!isClicked ? (
                           <svg className="block w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                           </svg>
                        ) : (
                           <svg className="block w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                           </svg>
                        )}
                     </button>
                  </div>) :
                  (<div className="flex lg:order-2">
                     <form onSubmit={handleSearch} className="relative hidden lg:block">
                        <button
                           type='submit'
                           className="absolute inset-y-0 left-0 flex items-center px-3 bg-red-600 rounded-l-md">
                           <svg className="w-4 h-4 text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                           </svg>
                           <span className="sr-only">Search icon</span>
                        </button>
                        <input
                           type="search"
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                           id="search-navbar"
                           className="block w-full p-2 pl-14 text-sm rounded-md outline-0 border-0 bg-gray-600 border-gray-700 placeholder-gray-100 text-gray-100 focus:placeholder-white" placeholder="Tìm kiếm. . ." />
                     </form>
                     <Link to="/login" className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-md text-sm px-4 py-2 text-center mx-3 lg:mr-0 uppercase transitions">Đăng nhập</Link>
                     {/* Menu icon */}
                     <button
                        type="button"
                        onClick={() => {
                           setIsOpened(prev => !prev)
                           setIsClicked(status => !status)
                        }}
                        className={`${isClicked ? 'bg-red-600' : 'bg-gray-600'} inline-flex transitions items-center p-2 w-9 h-9 justify-center text-sm rounded-md lg:hidden hover:opacity-80`}
                     >
                        <span className="sr-only">Open main menu</span>
                        {!isClicked ? (
                           <svg className="block w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                           </svg>
                        ) : (
                           <svg className="block w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                           </svg>
                        )}
                     </button>
                  </div>)}

               {/* Dropdown menu */}
               {isOpened ?
                  (<div className="items-center justify-between block w-full lg:hidden lg:w-auto lg:order-1">
                     <form onSubmit={handleSearch} className="relative mt-3 lg:hidden">
                        <button
                           type='submit'
                           className="absolute inset-y-0 left-0 flex items-center px-3 bg-red-600 rounded-l-lg">
                           <svg className="w-4 h-4 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                           </svg>
                        </button>
                        <input
                           type="search"
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                           id="search-navbar"
                           className="block w-full p-2 pl-14 text-sm rounded-md outline-0 border-0 bg-gray-600 placeholder-gray-100 text-gray-100 focus:placeholder-white" placeholder="Search . . ." />
                     </form>
                     <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium rounded-md lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 bg-gray-800 lg:bg-black">
                        <li>
                           <Link to="/" className={`${!isActive('tv-series') && !isActive('movie-ova') && 'bg-red-600 text-white hover:bg-red-600 hover:text-white'} block py-1.5 px-3 rounded hover:bg-gray-200 hover:text-red-700 transitions uppercase font-bold`} aria-current="page">Trang chủ</Link>
                        </li>
                        <li>
                           <Link to="/tv-series" className={`${isActive('tv-series') ? 'bg-red-600 text-white hover:bg-red-600 hover:text-white' : ''} block py-1.5 px-3 rounded hover:bg-gray-200 hover:text-red-700 transitions uppercase font-bold`}>TV/Series</Link>
                        </li>
                        <li>
                           <Link to="/movie-ova" className={`${isActive('movie-ova') ? 'bg-red-600 text-white hover:bg-red-600 hover:text-white' : ''} block py-1.5 px-3 rounded hover:bg-gray-200 hover:text-red-700 transitions uppercase font-bold`}>Movie/OVA</Link>
                        </li>
                     </ul>
                  </div>) :
                  (<div className="items-center justify-between lg:flex w-auto hidden">
                     <ul className="flex p-0 font-medium rounded-md flex-row space-x-8 mt-0 border-0 bg-black">
                        <li>
                           <Link to="/" className={`${!isActive('tv-series') && !isActive('movie-ova') && 'bg-red-600 text-white hover:bg-red-600 hover:text-white'} block py-1.5 px-3 rounded hover:bg-gray-200 hover:text-red-700 transitions uppercase font-bold`} aria-current="page">Trang chủ</Link>
                        </li>
                        <li>
                           <Link to="/tv-series" className={`${isActive('tv-series') ? 'bg-red-600 text-white hover:bg-red-600 hover:text-white' : ''} block py-1.5 px-3 rounded hover:bg-gray-200 hover:text-red-700 transitions uppercase font-bold`}>TV/Series</Link>
                        </li>
                        <li>
                           <Link to="/movie-ova" className={`${isActive('movie-ova') ? 'bg-red-600 text-white hover:bg-red-600 hover:text-white' : ''} block py-1.5 px-3 rounded hover:bg-gray-200 hover:text-red-700 transitions uppercase font-bold`}>Movie/OVA</Link>
                        </li>
                     </ul>
                  </div>)}
            </div>
         </nav >
      </>
   )
}

export default Navbar