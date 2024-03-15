import React, { useEffect, useState } from 'react'
import Layout from '../../../Layout/Layout'
import DashboardLayout from '../../../Components/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createCategoryAction, deleteCategoryAction, getAllCategoriesAction, updateCategoryAction } from '../../../Redux/Actions/categoriesActions';
import Loader from '../../../Components/Notifications/Loader';
import { Empty } from '../../../Components/Notifications/Empty';
import { Input, Modal } from 'antd';

const Categories = () => {
   const dispatch = useDispatch()

   const { categories, isLoading } = useSelector((state) => state.getAllCategories)
   const { isSuccess, isError } = useSelector((state) => state.deleteCategory)
   const {
      isLoading: createLoading,
      isError: createError,
      isSuccess: createSuccess
   } = useSelector((state) => state.createCategory)
   const {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess
   } = useSelector((state) => state.updateCategory)

   const [openModalAddCategory, setOpenModalAddCategory] = useState(false);
   const [openModalEditCategory, setOpenModalEditCategory] = useState(false);
   const [category, setCategory] = useState('');
   const [categoryLabel, setCategoryLabel] = useState('')
   const [categoryDesc, setCategoryDesc] = useState('')
   const [categoryValue, setCategoryValue] = useState('')

   const adminCreateCategoryHandler = () => {
      if (window.confirm('Bạn có muốn tạo thể loại phim mới?')) {
         dispatch(createCategoryAction({ label: categoryLabel, desc: categoryDesc, value: categoryValue }));
         setOpenModalAddCategory(false)
         setCategoryLabel('')
         setCategoryDesc('')
         setCategoryValue('')
      }
   }
   const adminDeleteCategoryHandler = (id) => {
      if (window.confirm('Bạn có muốn xoá thể loại phim này?')) {
         dispatch(deleteCategoryAction(id))
      }
   }

   const adminEditCategoryHandler = (id) => {
      if (window.confirm('Bạn có muốn sửa thể loại phim này?')) {
         dispatch(updateCategoryAction(id, { label: categoryLabel, desc: categoryDesc, value: categoryValue }));
         setOpenModalEditCategory(false)
      }
   }

   useEffect(() => {
      dispatch(getAllCategoriesAction())
      if (isError) {
         toast.error(isError)
         dispatch({ type: 'DELETE_CATEGORY_RESET' })
      }
      if (isSuccess) {
         dispatch({ type: 'DELETE_CATEGORY_RESET' })
      }
      if (updateError || createError) {
         toast.error(updateError || createError)
         dispatch({ type: updateError ? 'UPDATE_CATEGORY_RESET' : 'CREATE_CATEGORY_RESET' })
      }
      if (updateSuccess || createSuccess) {
         dispatch({ type: updateSuccess ? 'UPDATE_CATEGORY_RESET' : 'CREATE_CATEGORY_RESET' })
      }
   }, [dispatch, isError, isSuccess, createError, createSuccess, updateError, updateSuccess])

   return (
      <Layout>
         <DashboardLayout title='Thể loại phim' >
            <div className="relative overflow-x-auto">
               <button
                  onClick={() => {
                     setOpenModalAddCategory(true)
                     setCategoryLabel('')
                     setCategoryDesc('')
                     setCategoryValue('')
                  }}
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
                        onChange={(e) => setCategoryLabel(e.target.value)}
                        value={categoryLabel}
                     />
                  </div>
                  <div className='mt-2 flex flex-col'>
                     <label className='font-semibold text-xl'>Mô tả</label>
                     <Input.TextArea
                        rows={5}
                        className='!placeholder-gray-400 border-gray-500 tex'
                        onChange={(e) => setCategoryDesc(e.target.value)}
                        value={categoryDesc}
                     />
                  </div>
                  <div className='mt-2 flex flex-col'>
                     <label className='font-semibold text-xl'>Nhãn</label>
                     <Input
                        className='!placeholder-gray-400 rounded-md'
                        onChange={(e) => setCategoryValue(e.target.value)}
                        value={categoryValue}
                     />
                  </div>
                  <button
                     disabled={createLoading}
                     onClick={() => adminCreateCategoryHandler()}
                     className='rounded-md mt-3 text-lg flex items-center justify-center text-white bg-red-600 hover:bg-gray-600 cursor-pointer transitions py-2 w-full'
                  >
                     <i className="fa-solid fa-plus fa-lg mr-1.5"></i>
                     {createLoading ? 'Đang thêm...' : 'Thêm'}
                  </button>
               </Modal>

               {isLoading ?
                  <Loader /> :
                  categories?.length > 0 ?
                     <table className="min-w-full text-left rtl:text-right table-fixed border border-green-800 overflow-hidden">
                        <thead className="text-gray-800 uppercase bg-gray-100">
                           <tr className='*:text-sm *:px-4 *:py-2 *:border-2 *:whitespace-nowrap'>
                              <th scope="col" className="text-center">Id</th>
                              <th scope="col" className="text-center">Tên</th>
                              <th scope="col" className="text-center">Mô tả</th>
                              <th scope="col" className="text-center">Nhãn</th>
                              <th scope="col" className="text-center">Hành động</th>
                           </tr>
                        </thead>
                        <tbody>
                           {categories.map((c, i) => (
                              <tr key={i} className="bg-gray-100 *:border-2 *:px-4 *:py-2 *:text-gray-500">
                                 <td className="text-center">{c._id ? (c._id).slice(0, 8) : `c${i + 1}`}</td>
                                 <td className="text-center whitespace-nowrap">{c.label}</td>
                                 <td className="text-left min-w-[390px]">{c.desc}</td>
                                 <td className="text-center">{c.value}</td>
                                 <td className="text-center min-w-[190px]">
                                    <div className="flex gap-2 *:py-2.5 *:px-4 *:rounded-lg *:sm:text-sm *:flex *:items-center *:justify-center">
                                       <button
                                          onClick={() => {
                                             setOpenModalEditCategory(true);
                                             setCategoryLabel(c.label);
                                             setCategoryDesc(c.desc)
                                             setCategoryValue(c.value)
                                             setCategory(c._id)
                                          }}
                                          className='text-gray-100 bg-green-500 transitions hover:bg-gray-600'>
                                          <i className="fa-solid fa-pen-to-square fa-lg mr-1"></i> Sửa
                                       </button>
                                       <button onClick={() => adminDeleteCategoryHandler(c._id)} className='text-gray-100 bg-red-500 transitions hover:bg-gray-600'>
                                          <i className="fa-solid fa-trash fa-lg mr-1"></i> Xoá
                                       </button>
                                    </div>
                                 </td>
                              </tr >
                           ))}
                        </tbody>
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
                                 onChange={(e) => setCategoryLabel(e.target.value)}
                                 value={categoryLabel}
                              />
                           </div>
                           <div className='mt-2 flex flex-col'>
                              <label className='font-semibold text-xl'>Mô tả</label>
                              <Input.TextArea
                                 rows={5}
                                 className='!placeholder-gray-400 border-gray-500 text-base'
                                 onChange={(e) => setCategoryDesc(e.target.value)}
                                 value={categoryDesc}
                              />
                           </div>
                           <div className='mt-2 flex flex-col'>
                              <label className='font-semibold text-xl'>Nhãn</label>
                              <Input
                                 className='!placeholder-gray-400 rounded-md'
                                 onChange={(e) => setCategoryValue(e.target.value)}
                                 value={categoryValue}
                              />
                           </div>
                           <button
                              onClick={() => adminEditCategoryHandler(category)}
                              className='rounded-md mt-3 text-lg flex items-center justify-center text-white bg-red-600 hover:bg-gray-600 cursor-pointer transitions py-2 w-full'
                           >
                              <i className="fa-solid fa-pen-to-square fa-lg mr-1.5"></i>
                              {updateLoading ? 'Đang xử lý...' : 'Sửa'}
                           </button>
                        </Modal>
                     </table> :
                     <Empty message="Không tìm thấy thể loại phim" />
               }
            </div >
         </DashboardLayout>
      </Layout >
   )
}

export default Categories