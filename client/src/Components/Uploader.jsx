import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import uploadImageService from '../Redux/APIs/imageUploadServices';

const Uploader = ({ setImageUrl }) => {
   const [loading, setLoading] = useState(false);

   // Upload image
   const onDrop = useCallback(
      async (acceptedFiles) => {
         const file = new FormData();
         file.append('file', acceptedFiles[0]);
         const data = await uploadImageService(file, setLoading);
         setImageUrl(data);
      }, [setImageUrl])

   const { getRootProps, getInputProps } = useDropzone({ multiple: false, onDrop })

   return (
      <div className="rounded-lg py-8 cursor-pointer bg-gray-200 border-dashed border-gray-400 hover:opacity-80 border-2 text-center" {...getRootProps()}>
         <input {...getInputProps()} />
         <span className='text-gray-800 flex flex-col items-center'>
            <i className="fa-solid fa-cloud-arrow-up sm:fa-4x fa-3x text-red-600"></i>
            <p className='sm:text-xl text-lg leading-5 mt-3 mb-2'>Tải ảnh tại đây.</p>
         </span>
      </div>
   )
}

export default Uploader