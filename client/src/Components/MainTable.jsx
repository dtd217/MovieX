import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Input, Modal, notification } from 'antd';
import Pagination from './Pagination';
import SubModal from './Modals/SubModal';

const total = [
   {
      title: 'Tổng số bộ phim',
      value: 12,
      background: 'bg-red-500',
      icon: <i className="fa-solid fa-film fa-xl"></i>,
   },
   {
      title: 'Tổng số thể loại',
      value: 10,
      background: 'bg-blue-500',
      icon: <i className="fa-solid fa-layer-group fa-xl"></i>,
   },
   {
      title: 'Tổng số người dùng',
      value: 120,
      background: 'bg-green-500',
      icon: <i className="fa-solid fa-user fa-xl"></i>,
   }
]

const MainTable = ({ data, admin, type, user, onDeleteHandler }) => {
   const [api, contextHolderNotification] = notification.useNotification();
   const openNotificationWithIcon = (type) => {
      api[type]({
         message: 'Bỏ theo dõi',
         description: 'Bạn đã bỏ theo dõi thành công phim này',
         duration: 2,
      })
   };

   const [modal, contextHolderModal] = Modal.useModal();

   const confirm = (typeConfirm) => {
      if (typeConfirm === 'unfollow') {
         modal.confirm({
            title: 'Thông báo',
            content: 'Bạn có xác nhận bỏ theo dõi phim này?',
            maskClosable: true,
            closable: true,
            okButtonProps: { className: 'bg-blue-500' },
            cancelButtonProps: { className: 'bg-white hover:bg-gray-50' },
            okText: 'Xác nhận ',
            cancelText: 'Huỷ',
            onOk: () => openNotificationWithIcon('success')
         })
      }
   }

   const [openModal, setOpenModal] = useState(false);
   const [openModalAddCategory, setOpenModalAddCategory] = useState(false);
   const [openModalEditCategory, setOpenModalEditCategory] = useState(false);

   const showModal = (selectType) => {
      selectType === 'editCategory' ?
         setOpenModalEditCategory(true) :
         selectType === 'addCategory' ?
            setOpenModalAddCategory(true) :
            console.log('Failed')
   }

   const [category, setCategory] = useState();
   const OnEditFunction = (id) => {
      setCategory(id)
      showModal('editCategory')
   }

   useEffect(() => {
      if (!openModalEditCategory) setCategory()
   }, [openModalEditCategory])

   return (
      <div className="relative overflow-x-auto">
         {type === 'bookmarks' && admin ?
            <div className='flex justify-end flex-col'>
               <button className="rounded-md self-end mb-4 bg-red-600 hover:bg-gray-400 cursor-pointer transitions p-2 w-fit">
                  <i className="fa-solid fa-trash fa-md mr-2"></i>Xoá tất cả
               </button>
               <table className="w-full text-left rtl:text-right">
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
                  {data.map((movie, i) => (
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
                        <td>{movie.categories.join(', ')}</td>
                        <td className="text-center">{movie.language}</td>
                        <td className="text-center">{movie.year}</td>
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
               </table>
            </div>
            : type === 'categories' && admin ?
               <>
                  <button
                     onClick={() => showModal('addCategory')}
                     className="rounded-md mb-6 bg-red-600 hover:bg-gray-400 cursor-pointer transitions py-3 px-2.5 w-fit">
                     <i className="fa-solid fa-plus fa-lg mr-2"></i>Thêm mới
                  </button>
                  <SubModal
                     openModal={openModalAddCategory}
                     handleCancel={() => setOpenModalAddCategory(false)}
                     handleOk={() => setOpenModalAddCategory(false)}
                  />
                  <table className="w-full text-left rtl:text-right">
                     <thead className="text-gray-800 uppercase bg-gray-100">
                        <tr className='*:text-sm *:px-4 *:py-2 *:border-2 *:whitespace-nowrap'>
                           <th scope="col" className="text-center">Id</th>
                           <th scope="col" className="text-center">Tên</th>
                           <th scope="col" className="text-center">Ngày tạo</th>
                           <th scope="col" className="text-center">Hành động</th>
                        </tr>
                     </thead>
                     {data.map((c, i) => (
                        <tr key={i} className="bg-gray-100 *:border-2 *:px-4 *:py-2 *:text-gray-500">
                           <td className="text-center">{c.id}</td>
                           <td className="text-center whitespace-nowrap">{c.title}</td>
                           <td className="text-center">{c.createAt ? c.createAt : '02, Jan 2024'}</td>
                           <td className="text-center">
                              <div className="flex flex-col sm:flex-row justify-center *:py-2.5 *:px-4 *:rounded-lg *:whitespace-nowrap *:sm:text-sm *:flex *:items-center *:justify-center">
                                 <button
                                    onClick={() => showModal('editCategory')}
                                    className='text-gray-100 bg-green-500 transitions hover:bg-gray-600 sm:mr-2'>
                                    <i className="fa-solid fa-pen-to-square fa-lg mr-1"></i> Sửa
                                 </button>
                                 <SubModal
                                    openModal={openModalEditCategory}
                                    handleCancel={() => setOpenModalEditCategory(false)}
                                    handleOk={() => setOpenModalEditCategory(false)}
                                    category={c.title}
                                 />
                                 <button className='text-gray-100 bg-red-500 transitions hover:bg-gray-600 mt-2 sm:mt-0'>
                                    <i className="fa-solid fa-trash fa-lg mr-1"></i> Xoá
                                 </button>
                              </div>
                           </td>
                        </tr >
                     ))}
                     <td colSpan="4" className="bg-gray-100">
                        <Pagination />
                     </td>
                  </table>
               </>
               : null
         }
      </div >
   )
}

export default MainTable