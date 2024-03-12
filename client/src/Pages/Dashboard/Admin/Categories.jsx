import React, { useEffect, useState } from 'react'
import Layout from '../../../Layout/Layout'
import DashboardLayout from '../../../Components/DashboardLayout';
import { CategoriesData } from '../../../Data/categoriesData';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Modal } from 'antd';
import { getAllCategoriesAction } from '../../../Redux/Actions/categoriesActions';
import Loader from '../../../Components/Notifications/Loader';
import { Empty } from '../../../Components/Notifications/Empty';

const Categories = () => {
   const [openModalAddCategory, setOpenModalAddCategory] = useState(false);
   const [openModalEditCategory, setOpenModalEditCategory] = useState(false);
   const [category, setCategory] = useState('');

   const dispatch = useDispatch()
   const { isLoading, categories } = useSelector((state) => state.getAllCategories)


   const OnEditFunction = (id) => {
      setCategory(id)
      setOpenModalEditCategory(!openModalEditCategory)
   }

   useEffect(() => {
      dispatch(getAllCategoriesAction())
      if (openModalEditCategory === false) setCategory()
   }, [openModalEditCategory, dispatch])

   return (
      <Layout>
         <DashboardLayout title='Thể loại phim' >
            <div className="relative overflow-x-auto">
               <button
                  onClick={() => setOpenModalAddCategory(true)}
                  className="rounded-md mb-6 bg-red-600 hover:bg-gray-400 cursor-pointer transitions py-3 px-2.5 w-fit">
                  <i className="fa-solid fa-plus fa-lg mr-2"></i>Thêm mới
               </button>
               <Modal
                  title="Thêm thể loại mới"
                  open={openModalAddCategory}
                  onCancel={() => setOpenModalAddCategory(false)}
                  centered
                  okButtonProps={{ className: 'hidden' }}
                  cancelButtonProps={{ className: 'hidden' }}
                  className='!w-4/5 md:!w-[500px]'
               >
                  <div>
                     <label className='font-semibold text-xl'>Tiêu đề</label>
                     <Input
                        className='!placeholder-gray-400 rounded-md'
                        onChange={(e) => console.log(e.target.value)}
                     />
                  </div>
                  <div className='mt-2 flex flex-col'>
                     <label className='font-semibold text-xl'>Mô tả</label>
                     <Input.TextArea
                        rows={5}
                        className='!placeholder-gray-400 border-gray-500 tex'
                        onChange={(e) => console.log(e.target.value)}
                     />
                  </div>
                  <button
                     onClick={() => setOpenModalEditCategory(false)}
                     className='rounded-md mt-3 text-lg flex items-center justify-center text-white bg-red-600 hover:bg-gray-600 cursor-pointer transitions py-2 w-full'
                  >
                     <i className="fa-solid fa-plus fa-lg mr-1.5"></i>
                     Thêm
                  </button>
               </Modal>

               {isLoading ?
                  <Loader /> :
                  categories.length > 0 ?
                     <table className="w-full text-left rtl:text-right">
                        <thead className="text-gray-800 uppercase bg-gray-100">
                           <tr className='*:text-sm *:px-4 *:py-2 *:border-2 *:whitespace-nowrap'>
                              <th scope="col" className="text-center">Id</th>
                              <th scope="col" className="text-center">Tên</th>
                              <th scope="col" className="text-center">Mô tả</th>
                              <th scope="col" className="text-center">Ngày tạo</th>
                              <th scope="col" className="text-center">Hành động</th>
                           </tr>
                        </thead>
                        {categories.map((c, i) => (
                           <tr key={i} className="bg-gray-100 *:border-2 *:px-4 *:py-2 *:text-gray-500">
                              <td className="text-center">{c.id}</td>
                              <td className="text-center whitespace-nowrap">{c.label}</td>
                              <td className="text-justify">{c.desc}</td>
                              <td className="text-center whitespace-nowrap">{c.createdAt ? c.createdAt : '02, Jan 2024'}</td>
                              <td className="text-center">
                                 <div className="flex flex-col sm:flex-row justify-center *:py-2.5 *:px-4 *:rounded-lg *:whitespace-nowrap *:sm:text-sm *:flex *:items-center *:justify-center">
                                    <button
                                       onClick={() => {
                                          OnEditFunction(c.label)
                                       }}
                                       className='text-gray-100 bg-green-500 transitions hover:bg-gray-600 sm:mr-2'>
                                       <i className="fa-solid fa-pen-to-square fa-lg mr-1"></i> Sửa
                                    </button>
                                    <button className='text-gray-100 bg-red-500 transitions hover:bg-gray-600 mt-2 sm:mt-0'>
                                       <i className="fa-solid fa-trash fa-lg mr-1"></i> Xoá
                                    </button>
                                 </div>
                              </td>
                           </tr >
                        ))}
                        <Modal
                           title="Sửa thông tin thể loại"
                           open={openModalEditCategory}
                           onCancel={() => setOpenModalEditCategory(false)}
                           onOk={() => setOpenModalEditCategory(false)}
                           centered
                           okButtonProps={{ className: 'hidden' }}
                           cancelButtonProps={{ className: 'hidden' }}
                           className='!w-4/5 sm:!w-3/5 md:!w-[500px]'
                        >
                           <div>
                              <label className='font-semibold text-xl'>Tiêu đề</label>
                              <Input
                                 placeholder={category}
                                 className='!placeholder-gray-400 rounded-md'
                                 onChange={(e) => console.log(e.target.value)}
                              />
                           </div>
                           <div className='mt-2 flex flex-col'>
                              <label className='font-semibold text-xl'>Mô tả</label>
                              <Input.TextArea
                                 rows={5}
                                 className='!placeholder-gray-400 border-gray-500 text-base'
                                 placeholder='Mô tả thể loại phim'
                                 onChange={(e) => console.log(e.target.value)}
                              />
                           </div>
                           <button
                              type='button'
                              className='rounded-md mt-3 text-lg flex items-center justify-center text-white bg-red-600 hover:bg-gray-600 cursor-pointer transitions py-2 w-full'
                           >
                              <i className="fa-solid fa-pen-to-square fa-lg mr-1.5"></i>
                              Sửa
                           </button>
                        </Modal>
                        {/* <td colSpan="4" className="bg-gray-100">
               <Pagination />
            </td> */}
                     </table> :
                     <Empty message="Không tìm thấy thể loại phim" />
               }

            </div >
         </DashboardLayout>
      </Layout >
   )
}

export default Categories