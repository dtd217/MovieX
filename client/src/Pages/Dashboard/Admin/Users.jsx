import React, { useEffect } from 'react'
import Layout from '../../../Layout/Layout'
import DashboardLayout from '../../../Components/DashboardLayout';
import MainTable from '../../../Components/MainTable';
import { UsersData } from '../../../Data/usersData';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { adminDeleteUserAction, adminGetAllUsersAction } from '../../../Redux/Actions/userActions';
import Loader from '../../../Components/Notifications/Loader';
import { DateFormat, Empty } from '../../../Components/Notifications/Empty';
import Pagination from '../../../Components/Pagination';

const Users = () => {
   const dispatch = useDispatch()
   // Get bookmarks
   const { isLoading, isError, users } = useSelector((state) => state.adminGetAllUsers)
   // Delete bookmarks
   const {
      isError: deleteError,
      isSuccess
   } = useSelector((state) => state.adminDeleteUser)

   // Delete users handler
   const deleteUsersHandler = (id) => {
      if (window.confirm('Bạn có muốn xoá người dùng này?')) {
         dispatch(adminDeleteUserAction(id))
      }
   }

   useEffect(() => {
      dispatch(adminGetAllUsersAction())
      if (isError || deleteError) {
         toast.error(isError || deleteError)
         dispatch({ type: isError ? 'DELETE_USER_RESET' : 'GET_ALL_USERS_RESET' })
      }
   }, [dispatch, isError, deleteError, isSuccess])
   return (
      <Layout>
         <DashboardLayout title='Danh sách người dùng'>
            {isLoading ?
               <Loader /> :
               users?.length > 0 ?
                  // <MainTable data={users} admin={true} user={true} type={'users'} onDeleteHandler={deleteUsersHandler} /> :
                  <div className="relative overflow-x-auto">
                     {/* <div onClick={showModal} className="rounded-md mb-6 bg-red-600 hover:bg-gray-400 cursor-pointer transitions py-3 px-2.5 w-fit">
                        <i className="fa-solid fa-plus fa-lg mr-2"></i>Thêm mới
                     </div> */}
                     {/* <Modal
                           title="Thêm mới người dùng"
                           open={openModal}
                           onCancel={handleCancel}
                           centered
                           okButtonProps={{ className: 'hidden' }}
                           cancelButtonProps={{ className: 'hidden' }}
                           className='!w-4/5 md:!w-[500px]'
                        >
                           <Input onChange={(e) => setModalText(e.target.value)} />
                           <button
                              className='rounded-md mt-3 text-lg text-white bg-red-600 hover:bg-gray-600 cursor-pointer transitions py-2 w-full'
                              onClick={handleOk}
                           >
                              <i className="fa-solid fa-plus fa-lg mr-1.5"></i>
                              Thêm
                           </button>
                        </Modal> */}
                     <table className="w-full text-left rtl:text-right">
                        <thead className="text-gray-800 uppercase bg-gray-100">
                           <tr className='*:text-sm *:px-4 *:py-2 *:border-2 *:whitespace-nowrap'>
                              <th scope="col" className="text-center">Id</th>
                              <th scope="col" className="text-center">Avatar</th>
                              <th scope="col" className="text-center">Tên</th>
                              <th scope="col" className="text-center">Email</th>
                              <th scope="col" className="text-center">Ngày tạo</th>
                              <th scope="col" className="text-center">Cài đặt</th>
                           </tr>
                        </thead>
                        {users.map((user, i) => (
                           <tr key={i} className="bg-gray-100 *:border-2 *:px-4 *:py-2 *:text-gray-500">
                              <td className="text-left">{user._id ? (user._id).slice(0, 8).toUpperCase() : `user${i + 1}`}</td>
                              <td>
                                 <div className="flex justify-center items-center">
                                    <img className='size-12 rounded-md object-cover' src={user.avatar} alt={user.name} />
                                 </div>
                              </td>
                              <td className="text-left whitespace-nowrap">{user.name}</td>
                              <td className="text-left whitespace-nowrap">{user.email}</td>
                              <td className="text-center whitespace-nowrap">{DateFormat(user.createdAt)}</td>
                              <td className="text-center">
                                 {!user.isAdmin ?
                                    <div className="flex flex-col sm:flex-row justify-center *:py-2.5 *:px-4 *:rounded-lg *:whitespace-nowrap *:sm:text-sm *:flex *:items-center *:justify-center">
                                       <button onClick={deleteUsersHandler} className='text-gray-100 bg-red-500 transitions hover:bg-gray-600 mt-2 sm:mt-0'>
                                          <i className="fa-solid fa-trash fa-lg mr-1"></i> Xoá
                                       </button>
                                    </div> :
                                    <div className="flex flex-col sm:flex-row justify-center *:py-2.5 *:px-4 *:rounded-lg *:whitespace-nowrap *:sm:text-sm *:flex *:items-center *:justify-center">
                                       <button disabled className='text-gray-100 bg-gray-500 transitions mt-2 sm:mt-0 cursor-not-allowed'>
                                          <i className="fa-solid fa-trash fa-lg mr-1"></i> Xoá
                                       </button>
                                    </div>
                                 }

                              </td>
                           </tr >
                        ))}
                        <td colSpan="6" className="bg-gray-100">
                           <Pagination />
                        </td>
                     </table>
                  </div> :
                  <Empty message={'Không có người dùng nào'} />}
         </DashboardLayout>
      </Layout >
   )
}

export default Users