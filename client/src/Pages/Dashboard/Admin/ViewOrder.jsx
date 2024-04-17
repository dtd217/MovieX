import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DashboardLayout from '../../../Components/DashboardLayout';
import { getOrderByIdAction } from '../../../Redux/Actions/orderActions';
import Layout from '../../../Layout/Layout';

const ViewOrder = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { isError, order } = useSelector((state) => state.getOrderById)

   useEffect(() => {
      dispatch(getOrderByIdAction(id))
      if (isError) {
         toast.error(isError)
      }
   }, [dispatch, isError, id])

   return (
      <Layout>
         <DashboardLayout title='Quản lý đơn hàng'>
            <div className='overflow-x-auto flex flex-col gap-y-2'>
               <div className='border-gray-300 border-2 rounded-md transitions text-black bg-gray-100 overflow-x-auto w-[640px] min-w-full'>
                  <dl class="flex items-center border-gray-900 p-4 justify-start">
                     <div>
                        <img src={order?.user?.avatar} alt={order?.user?.name} className='rounded-full size-16' />
                     </div>
                     <div className='ml-6'>
                        <dt class="font-semibold text-lg">Tên người dùng</dt>
                        <dd>{order?.user?.name}</dd>
                     </div>
                     <div className='ml-6'>
                        <dt class="font-semibold text-lg">Email</dt>
                        <dd>{order?.user?.email}</dd>
                     </div>
                  </dl>
               </div>
               <div className='border-gray-300 border-2 rounded-md transitions text-black bg-gray-100 overflow-x-auto w-[640px] min-w-full'>
                  <dl class="flex items-center border-gray-900 p-4 justify-between">
                     <div>
                        <dt class="font-semibold text-lg">Mã đơn hàng</dt>
                        <dd class="mt-1">{order?._id ? (order?._id).slice(0, 8) : 'MovieX'}</dd>
                     </div>
                     <div>
                        <dt class="font-semibold text-lg">Ngày giao dịch</dt>
                        <dd class="mt-1">
                           <time datetime="2021-07-06">{moment(order?.createdAt).format('DD/MM/YYYY HH:mm')}</time>
                        </dd>
                     </div>
                     <div>
                        <dt class="font-semibold text-lg">Tổng</dt>
                        <dd class="font-semibold mt-1 text-center">${order?.totalPrice}</dd>
                     </div>
                  </dl>
                  <ul>
                     {order?.orderItems?.length > 0 && order?.orderItems?.map((item) => (
                        <li class="p-4 sm:p-6 border-t-2 border-gray-400" key={item?._id}>
                           <div class="flex items-center sm:items-start">
                              <div class="sm:w-32 sm:h-48 w-28 h-36 shrink-0 overflow-hidden rounded-lg">
                                 <img src={item?.image} alt={item?.title} class="size-full object-cover object-center" />
                              </div>
                              <div class="ml-6 sm:h-48 h-36 flex flex-col sm:justify-between justify-start">
                                 <div>
                                    <h5 className='font-bold sm:text-xl text-lg'>{item?.title}</h5>
                                    <p class="mt-2 sm:block hidden">{`${item?.desc}`.substring(0, 210).slice(0) + " . . ."}</p>
                                 </div>
                                 <p class="sm:block sm:mt-2 sm:text-xl text-lg font-bold">${item?.price}</p>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </DashboardLayout>
      </Layout>
   )
}

export default ViewOrder