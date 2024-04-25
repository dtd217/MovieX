import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderByIdAction, payOrderAction } from '../Redux/Actions/orderActions'
import { PayPalButton } from 'react-paypal-button-v2'
import Loader from '../Components/Notifications/Loader'
import Axios from '../Redux/APIs/Axios'

const PayOrder = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { isError: orderError, order } = useSelector((state) => state.getOrderById)
   const { isLoading: payLoading, isSuccess: paySuccess } = useSelector((state) => state.payOrder)

   const [sdkReady, setSdkReady] = useState(false)

   const paymentSuccessHandler = (paymentResult) => {
      console.log(paymentResult);
      dispatch(payOrderAction(id, paymentResult))
   }

   useEffect(() => {
      const addPayPalScript = async () => {
         const { data: clientId } = await Axios.get("/config/paypal")
         const script = document.createElement('script')
         script.type = 'text/javascript'
         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
         script.async = true
         script.onload = () => { setSdkReady(true) }
         document.body.appendChild(script)
      }
      if (!order || paySuccess) {
         dispatch({ type: 'PAY_ORDER_RESET' })
      }
      else if (!order?.isPaid) {
         if (!window?.paypal) { addPayPalScript() }
         else { setSdkReady(true) }
      }
      dispatch(getOrderByIdAction(id))
   }, [dispatch, id, order, paySuccess,])

   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-6xl p-4 mx-auto bg-black xl:rounded">
               <div className='flex justify-between lg:flex-row flex-col'>
                  <div className='w-full flex flex-col justify-center rounded-md h-full bg-gray-800 p-6'>
                     <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Thanh toán</h1>
                     <div className='border-gray-600 border-2 rounded-md mt-2 transitions text-white bg-[#78909c] bg-opacity-20'>
                        <dl class="flex items-center border-gray-900 p-4 justify-start">
                           <img src={order?.user?.avatar} alt={order?.user?.name} className='rounded-full size-16' />
                           <div className='flex sm:flex-row flex-col'>
                              <div className='ml-6'>
                                 <dt class="font-semibold text-lg hidden sm:block">Tên người dùng</dt>
                                 <dd>{order?.user?.name}</dd>
                              </div>
                              <div className='ml-6 mt-2 sm:mt-0'>
                                 <dt class="font-semibold text-lg hidden sm:block">Email</dt>
                                 <dd>{order?.user?.email}</dd>
                              </div>
                           </div>
                        </dl>
                     </div>
                     <form className='mt-12 md:grid md:grid-cols-12 md:items-start md:gap-x-12'>
                        <section className='col-span-7'>
                           <ul className='border-t border-gray-300'>
                              {order?.orderItems?.length > 0 && order?.orderItems?.map((movie, index) => (
                                 <li className='flex py-6 sm:py-10 border-gray-300 border-b' key={index}>
                                    <div className="shrink-0">
                                       <Link to={`/movies/${movie?._id}`} className='hover:opacity-80 transitions'>
                                          <img src={movie?.image} alt={movie?.title} className='h-24 w-20 rounded-md object-fit object-center sm:w-40 sm:h-48' />
                                       </Link>
                                    </div>
                                    <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                                       <div className='relative pr-6'>
                                          <Link to={`/movies/${movie?._id}`} className='hover:text-gray-300 text-xl transitions'>{movie?.title}</Link>
                                          <p className='text-gray-400 text-sm'>{`${movie?.desc}`.substring(0, 150).slice(0) + " ..."}</p>
                                       </div>
                                       <p className='mt-4 text-lg text-white'>$10</p>
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        </section>
                        <section className='mt-16 rounded-lg px-4 py-6 sm:p-6 md:col-span-5 md:mt-0 md:p-8 bg-[#78909c] bg-opacity-20'>
                           <h2 className='text-2xl font-bold'>Chi tiết đơn hàng</h2>
                           <dl className="mt-6">
                              <div className="py-4 flex items-center justify-between border-b border-gray-400">
                                 <dt>Tiền hàng</dt>
                                 <dd>${order?.itemsPrice}</dd>
                              </div>
                              <div className="py-4 flex items-center justify-between border-b border-gray-400">
                                 <dt>Thuế</dt>
                                 <dd>${order?.taxPrice}</dd>
                              </div>
                              <div className="py-4 flex items-center justify-between">
                                 <dt className='font-bold text-lg'>Tổng hoá đơn</dt>
                                 <dd>${order?.totalPrice}</dd>
                              </div>
                           </dl>
                           {!order?.isPaid && (
                              <div className="mt-6">
                                 {payLoading && <Loader />}
                                 {!sdkReady ?
                                    <Loader /> :
                                    <PayPalButton amount={order?.totalPrice} onSuccess={paymentSuccessHandler} />
                                 }
                              </div>
                           )}
                        </section>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </Layout >

   )
}

export default PayOrder