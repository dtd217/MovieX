import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react'
import Layout from '../../../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Components/Notifications/Loader';
import { Empty } from '../../../Components/Notifications/Empty';
import DashboardLayout from '../../../Components/DashboardLayout';
import { getAllOrdersAction } from '../../../Redux/Actions/orderActions';

const Orders = () => {
   const dispatch = useDispatch()
   const { isLoading, isError, orders } = useSelector((state) => state.getAllOrders)
   console.log(orders)

   useEffect(() => {
      dispatch(getAllOrdersAction())
   }, [dispatch])

   return (
      <Layout>
         <DashboardLayout title='Quản lý đơn hàng' >
            <div className='overflow-x-auto flex flex-col gap-y-6'>
               {orders?.length > 0 && orders?.map((order, index) => (
                  <div className='border-gray-400 border-2 rounded-md text-black bg-gray-100'>
                     <div class="flex items-center border-gray-900 p-4 sm:grid sm:grid-cols-4 gap-x-6 sm:p-6">
                        <dl class="grid flex-1 grid-cols-2 gap-x-6 sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                           <div>
                              <dt class="font-semibold">Order number</dt>
                              <dd class="mt-1">WU88191111</dd>
                           </div>
                           <div class="hidden sm:block">
                              <dt class="font-semibold">Date placed</dt>
                              <dd class="mt-1">
                                 <time datetime="2021-07-06">Jul 6, 2021</time>
                              </dd>
                           </div>
                           <div>
                              <dt class="font-semibold">Total amount</dt>
                              <dd class="font-semibold mt-1">$160.00</dd>
                           </div>
                        </dl>
                        <div class="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end">
                           <Link to="#" class="flex items-center justify-center rounded-sm border-1 border-red-600 bg-sky-200 px-3 py-2">
                              <span>View Order</span>
                           </Link>
                        </div>
                     </div>
                     <ul>
                        {order?.orderItems?.length > 0 && order?.orderItems?.map((item, index) => (
                           <li class="p-4 sm:p-6 border-t-2 border-gray-400" key={item?._id}>
                              <div class="flex items-center sm:items-start">
                                 <div class="sm:w-40 sm:h-40 size-20 shrink-0 overflow-hidden rounded-lg aij sm:size-40">
                                    <img src={item?.image} alt="Garment bag with two layers of grey and tan zipper pouches for folded shirts and pants." class="size-full object-cover object-center" />
                                 </div>
                                 <div class="ml-6 flex-1">
                                    <div class="font-semibold sm:flex sm:justify-between">
                                       <h5>{item?.title}</h5>
                                       <p class="sm:block sm:mt-2">${item?.price}</p>
                                    </div>
                                    <p class="md axq bwy bxl">{`${item?.desc}`.substring(0, 240).slice(0) + " . . ."}</p>
                                 </div>
                              </div>
                              <div class="justify-between sm:flex mt-6">
                                 <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="text-green-500 size-6">
                                       <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path>
                                    </svg>
                                    <p class="ml-2 font-semibold">Bought on <time datetime="2021-01-05">January 5, 2021</time></p>
                                 </div>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
            {/* <Empty message={"Không tìm thấy đơn hàng"} /> */}
         </DashboardLayout>
      </Layout>
   )
}

export default Orders