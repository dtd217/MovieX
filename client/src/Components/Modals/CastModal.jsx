import React from 'react'
import { Input, Modal } from 'antd';
import { useDropzone } from 'react-dropzone'


const CastModal = ({ openModal, handleCancel, handleOk, cast }) => {
   const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      maxSize: 2 * 1024 * 1024,
      onDrop: acceptedFiles => {
         alert(acceptedFiles[0].name)
      }
   })

   return (
      <>
         {cast ?
            <Modal
               title="Sửa thông tin diễn viên"
               open={openModal}
               onCancel={handleCancel}
               centered
               okButtonProps={{ className: 'hidden' }}
               cancelButtonProps={{ className: 'hidden' }}
               className='!w-4/5 sm:!w-3/5 md:!w-[500px]'
            >
               <form action="">
                  <div>
                     <label className='font-semibold text-lg'>Tên diễn viên</label>
                     <Input
                        placeholder={cast.name}
                        className='!placeholder-gray-400'
                        onChange={(e) => console.log(e.target.value)} />
                  </div>
                  <div className='mt-2'>
                     <label className='font-semibold text-lg'>Hình ảnh</label>
                     <div className='rounded-lg py-6 cursor-pointer bg-gray-200 border-dashed border-gray-400 hover:opacity-80 border-2 text-center' {...getRootProps()}>
                        <input {...getInputProps()} className="h-40" />
                        <span className='text-gray-800 flex flex-col items-center'>
                           <i className="fa-solid fa-cloud-arrow-up sm:fa-4x fa-3x text-red-600"></i>
                           <p className='sm:text-xl text-lg leading-5 mt-3 mb-2'>Tải hình ảnh</p>
                        </span>
                     </div>
                     <div className="max-w-xs size-32 rounded mt-3 mx-auto">
                        <img src={cast.avatar} alt="Movie" className='rounded object-cover size-full' />
                     </div>
                  </div>
                  <button
                     type='button'
                     className='rounded-md mt-3 text-lg flex items-center justify-center text-white bg-red-600 hover:bg-gray-600 cursor-pointer transitions py-2 w-full'
                     onClick={handleOk}
                  >
                     <i className="fa-solid fa-pen-to-square fa-lg mr-1.5"></i>
                     Sửa
                  </button>
               </form>
            </Modal> :
            <Modal
               title="Thêm diễn viên"
               open={openModal}
               onCancel={handleCancel}
               centered
               okButtonProps={{ className: 'hidden' }}
               cancelButtonProps={{ className: 'hidden' }}
               className='!w-4/5 sm:!w-3/5 md:!w-[500px]'
            >
               <form action="">
                  <div>
                     <label className='font-semibold text-lg'>Tên diễn viên</label>
                     <Input
                        placeholder={cast}
                        className='!placeholder-gray-400'
                        onChange={(e) => console.log(e.target.value)} />
                  </div>
                  <div className='mt-2'>
                     <label className='font-semibold text-lg'>Hình ảnh</label>
                     <div className='rounded-lg py-6 cursor-pointer bg-gray-200 border-dashed border-gray-400 hover:opacity-80 border-2 text-center' {...getRootProps()}>
                        <input {...getInputProps()} className="h-40" />
                        <span className='text-gray-800 flex flex-col items-center'>
                           <i className="fa-solid fa-cloud-arrow-up sm:fa-4x fa-3x text-red-600"></i>
                           <p className='sm:text-xl text-lg leading-5 mt-3 mb-2'>Tải hình ảnh</p>
                        </span>
                     </div>
                     <div className="max-w-xs size-32 rounded mt-3 mx-auto">
                        <img src="/images/user-avatar/user-1.jpg" alt="Movie" className='rounded object-cover size-full' />
                     </div>
                  </div>
                  <button
                     type='button'
                     className='rounded-md mt-3 text-lg flex items-center justify-center text-white bg-red-600 hover:bg-gray-600 cursor-pointer transitions py-2 w-full'
                     onClick={handleOk}
                  >
                     <i className="fa-solid fa-pen-to-square fa-lg mr-1.5"></i>Thêm
                  </button>
               </form>
            </Modal>
         }
      </>
   )
}

export default CastModal