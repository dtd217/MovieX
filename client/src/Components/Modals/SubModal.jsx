import React from 'react'
import { Input, Modal } from 'antd';

const { TextArea } = Input;

const SubModal = ({ openModal, handleCancel, handleOk, category }) => {
   return (
      <>
         {category ?
            <Modal
               title="Sửa thông tin thể loại"
               open={openModal}
               onCancel={handleCancel}
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
                  <TextArea
                     rows={5}
                     className='!placeholder-gray-400 border-gray-500'
                     placeholder='Mô tả thể loại phim'
                     onChange={(e) => console.log(e.target.value)}
                  />
               </div>
               <button
                  type='button'
                  className='rounded-md mt-3 text-lg flex items-center justify-center text-white bg-red-600 hover:bg-gray-600 cursor-pointer transitions py-2 w-full'
                  onClick={handleOk}
               >
                  <i className="fa-solid fa-pen-to-square fa-lg mr-1.5"></i>
                  Sửa
               </button>
            </Modal> :
            <Modal
               title="Thêm thể loại mới"
               open={openModal}
               onCancel={handleCancel}
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
                  <TextArea
                     rows={5}
                     className='!placeholder-gray-400 border-gray-500'
                     onChange={(e) => console.log(e.target.value)}
                  />
               </div>
               <button
                  className='rounded-md mt-3 text-lg flex items-center justify-center text-white bg-red-600 hover:bg-gray-600 cursor-pointer transitions py-2 w-full'
                  onClick={handleOk}
               >
                  <i className="fa-solid fa-plus fa-lg mr-1.5"></i>Thêm
               </button>
            </Modal>
         }

      </>
   )
}

export default SubModal