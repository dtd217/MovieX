import React from 'react'
import { useDropzone } from 'react-dropzone'

const Uploader = () => {
   const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      maxSize: 2 * 1024 * 1024,
      onDrop: acceptedFiles => {
         alert(acceptedFiles[0].name)
      }
   })

   return (
      <div className="rounded-lg py-8 cursor-pointer bg-gray-200 border-dashed border-gray-400 hover:opacity-80 border-2 text-center" {...getRootProps()}>
         <input {...getInputProps()} />
         <span className='text-gray-800 flex flex-col items-center'>
            <i className="fa-solid fa-cloud-arrow-up sm:fa-4x fa-3x text-red-600"></i>
            <p className='sm:text-xl text-lg leading-5 mt-3 mb-2'>Drag and drop your image here.</p>
            <em className='sm:text-base text-sm'>(Only *.jpeg and *.png images will be accepted)</em>
         </span>
      </div>
   )
}

export default Uploader