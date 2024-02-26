import React, { useEffect, useState } from 'react'
import Pagination from './Pagination';
import SubModal from './Modals/SubModal';

const SubTable = ({ data, admin, type, user }) => {
   const [openModalAddCategory, setOpenModalAddCategory] = useState(false);
   const [openModalEditCategory, setOpenModalEditCategory] = useState(false);

   const showModal = (selectType) => {
      selectType === 'editCategory' ?
         setOpenModalEditCategory(true) :
         selectType === 'addCategory' ?
            setOpenModalAddCategory(true) :
            console.log('Failed')
   }

   const [category, setCategory] = useState('');
   const OnEditFunction = (id) => {
      setCategory(id)
      showModal('editCategory')
   }

   useEffect(() => {
      if (!openModalEditCategory) setCategory()
   }, [openModalEditCategory])

   return (
      <div className="relative overflow-x-auto">
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
                  <td className="text-center whitespace-nowrap">{c.label}</td>
                  <td className="text-center">{c.createAt ? c.createAt : '02, Jan 2024'}</td>
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
            <SubModal
               openModal={openModalEditCategory}
               handleCancel={() => setOpenModalEditCategory(false)}
               handleOk={() => setOpenModalEditCategory(false)}
               category={category}
            />

            {/* <tr className="bg-gray-100 *:border-2 *:px-4 *:py-2 *:text-gray-500">
               <td className="text-center">#SADASD</td>
               <td className="text-center whitespace-nowrap">asdasd</td>
               <td className="text-center">02, Jan 2024</td>
               <td className="text-center">
                  <div className="flex flex-col sm:flex-row justify-center *:py-2.5 *:px-4 *:rounded-lg *:whitespace-nowrap *:sm:text-sm *:flex *:items-center *:justify-center">
                     <button
                        onClick={() => {
                           showModal('editCategory')
                           OnEditFunction('asdasd')
                        }}
                        className='text-gray-100 bg-green-500 transitions hover:bg-gray-600 sm:mr-2'>
                        <i className="fa-solid fa-pen-to-square fa-lg mr-1"></i>Sửa
                     </button>
                     <SubModal
                        openModal={openModalEditCategory}
                        handleCancel={() => setOpenModalEditCategory(false)}
                        handleOk={() => setOpenModalEditCategory(false)}
                        category={category}
                     />
                     <button className='text-gray-100 bg-red-500 transitions hover:bg-gray-600 mt-2 sm:mt-0'>
                        <i className="fa-solid fa-trash fa-lg mr-1"></i> Xoá
                     </button>
                  </div>
               </td>
            </tr >
            <tr className="bg-gray-100 *:border-2 *:px-4 *:py-2 *:text-gray-500">
               <td className="text-center">#SADASD</td>
               <td className="text-center whitespace-nowrap">asdasdasdddddasd</td>
               <td className="text-center">02, Jan 2024</td>
               <td className="text-center">
                  <div className="flex flex-col sm:flex-row justify-center *:py-2.5 *:px-4 *:rounded-lg *:whitespace-nowrap *:sm:text-sm *:flex *:items-center *:justify-center">
                     <button
                        onClick={() => {
                           showModal('editCategory')
                           OnEditFunction('asdaasddddsd')
                        }}
                        className='text-gray-100 bg-green-500 transitions hover:bg-gray-600 sm:mr-2'>
                        <i className="fa-solid fa-pen-to-square fa-lg mr-1"></i>Sửa
                     </button>
                     <SubModal
                        openModal={openModalEditCategory}
                        handleCancel={() => setOpenModalEditCategory(false)}
                        handleOk={() => setOpenModalEditCategory(false)}
                        category={category}
                     />
                     <button className='text-gray-100 bg-red-500 transitions hover:bg-gray-600 mt-2 sm:mt-0'>
                        <i className="fa-solid fa-trash fa-lg mr-1"></i> Xoá
                     </button>
                  </div>
               </td>
            </tr > */}
            <td colSpan="4" className="bg-gray-100">
               <Pagination />
            </td>
         </table>
      </div >
   )
}

export default SubTable