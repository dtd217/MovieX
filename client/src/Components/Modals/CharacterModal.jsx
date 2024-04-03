import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addCharactersAction, editCharactersAction } from '../../Redux/Actions/moviesActions';
import toast from 'react-hot-toast';
import { InlineError } from '../Notifications/Error';
import { ImagePreview } from '../ImagePreview';
import Uploader from '../Uploader';

const CharacterModal = ({ openModal, handleCancel, handleOk, character }) => {
   const dispatch = useDispatch()
   const [characterImage, setCharacterImage] = useState("")
   const generateId = Math.floor(Math.random() * 100000000)
   const image = characterImage ? characterImage : character?.image

   const [loading, setLoading] = useState(false);

   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors }
   } = useForm({
      resolver: yupResolver(yup.object().shape({ name: yup.string().required("Tên diễn viên không được trống!") }))
   });

   const onSubmit = (data) => {
      if (character) {
         dispatch(editCharactersAction({ ...data, image: image, id: character.id }))
         toast.success("Sửa thông tin diễn viên thành công")
      }
      else {
         dispatch(addCharactersAction({ ...data, image: image, id: generateId }))
         toast.success("Thêm diễn viên thành công")
      }
      reset()
      setCharacterImage("")
   }

   useEffect(() => {
      if (character) {
         setValue("name", character?.name)
      }
   }, [character, setValue])

   return (
      <>
         <Modal
            title={character ? "Sửa thông tin diễn viên" : "Thêm diễn viên"}
            open={openModal}
            onCancel={handleCancel}
            centered
            okButtonProps={{ className: 'hidden' }}
            cancelButtonProps={{ className: 'hidden' }}
            className='!w-4/5 sm:!w-3/5 md:!w-[500px]'
         >
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className='flex flex-col'>
                  <label className='font-semibold text-lg mb-1'>Tên diễn viên</label>
                  <input
                     placeholder={character?.name ? character?.name : ""}
                     type="text"
                     name="name"
                     {...register("name")}
                     required
                     className="bg-white rounded border-2 border-gray-400 focus:ring-red-600 focus:border-red-600 text-gray-800 placeholder:text-gray-400" />
                  {errors.name && <InlineError error={errors.name.message} />}
               </div>
               <div className='mt-2'>
                  <label className='font-semibold text-lg'>Hình ảnh</label>
                  <Uploader setImageUrl={setCharacterImage} />
                  <ImagePreview image={image ? image : "images/user-img.jpg"} name="userImage" type='user' />
               </div>
               <button
                  type='submit'
                  className='rounded-md mt-3 text-lg flex items-center justify-center text-white bg-red-600 hover:bg-gray-600 cursor-pointer transitions py-2 w-full'
                  onClick={handleOk}
               ><i className="fa-solid fa-pen-to-square fa-lg mr-1.5"></i>{character ? "Sửa" : "Thêm"}</button>
            </form>
         </Modal >
      </>

   )
}

export default CharacterModal