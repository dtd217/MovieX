import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react'
import Layout from '../../../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Components/Notifications/Loader';
import { Empty } from '../../../Components/Notifications/Empty';
import DashboardLayout from '../../../Components/DashboardLayout';
import { getAllOrdersAction } from '../../../Redux/Actions/orderActions';
import moment from 'moment';

const Orders = () => {
   const dispatch = useDispatch()
   const { isLoading, isError, orders } = useSelector((state) => state.getAllOrders)
   const { users } = useSelector((state) => state.adminGetAllUsers)
   console.log(orders)

   const total = [
      {
         title: 'Tổng số hoá đơn',
         value: isLoading ? 'Đang tải...' : orders?.length || 0,
         background: 'bg-red-500',
         icon: <i className="fa-solid fa-cart-shopping fa-xl"></i>,
      },
      {
         title: 'Tổng doanh thu',
         value: `$${orders?.reduce((acc, order) => acc + order?.totalPrice, 0)}`,
         background: 'bg-blue-500',
         icon: <i className="fa-solid fa-money-bill-wave fa-xl"></i>,
      },
      {
         title: 'Tổng số người dùng',
         value: users?.length || 0,
         background: 'bg-green-500',
         icon: <i className="fa-solid fa-user fa-xl"></i>,
      }
   ]

   useEffect(() => {
      dispatch(getAllOrdersAction())
      if (isError) {
         toast.error(isError)
      }
   }, [dispatch, isError])

   return (
      <Layout>
         <DashboardLayout title='Quản lý đơn hàng'>
            {isLoading ?
               <Loader /> :
               orders?.length > 0 ?
                  <div className='overflow-x-auto flex flex-col gap-y-2'>
                     <div className="rounded-md mb-4 flex justify-evenly gap-8 w-[800px] min-w-full">
                        {total.map((item, index) => (
                           <div key={index} className="flex justify-start items-center bg-gray-500 w-full rounded-md px-4 py-6">
                              <div className={`rounded-full mr-2 p-4 size-12 flex items-center justify-center ${item.background}`}>{item.icon}</div>
                              <div className="*:block lg:*:text-lg">
                                 <span>{item.title}</span>
                                 <span className='font-bold'>{item.value}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                     {orders?.map((order, index) => (
                        <div className='border-gray-300 border-2 rounded-md transitions text-black bg-gray-100 overflow-x-auto w-[800px] min-w-full'>
                           <dl class="flex items-center border-gray-900 p-4 justify-between">
                              <div>
                                 <dt class="font-semibold text-lg">Mã đơn hàng</dt>
                                 <dd class="mt-1">{order?._id ? (order?._id).slice(0, 8) : `order${index + 1}`}</dd>
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
                              <div>
                                 <Link to={`/orders/${order?._id}`} class="flex items-center justify-center rounded-md bg-red-500 text-white px-4 py-2.5">
                                    <span>Xem đơn hàng</span>
                                 </Link>
                              </div>
                           </dl>
                           <ul className='hidden'>
                              {order?.orderItems?.length > 0 && order?.orderItems?.map((item, index) => (
                                 <li class="p-4 sm:p-6 border-t-2 border-gray-400" key={item?._id}>
                                    <div class="flex items-center sm:items-start">
                                       <div class="sm:w-32 sm:h-48 w-28 h-36 shrink-0 overflow-hidden rounded-lg">
                                          <img src={item?.image} alt={item?.title} class="size-full object-cover object-center" />
                                       </div>
                                       <div class="ml-6 flex flex-col justify-between">
                                          <div></div>
                                          <h5 className='font-bold sm:text-lg'>{item?.title}</h5>
                                          <p class="mt-2 sm:block hidden">{`${item?.desc}`.substring(0, 210).slice(0) + " . . ."}</p>
                                          <p class="sm:block sm:mt-2">${item?.price}</p>
                                       </div>
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div> :
                  <Empty message={"Không tìm thấy đơn hàng"} />
            }
         </DashboardLayout>
      </Layout>
   )
}

export default Orders