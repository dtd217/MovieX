import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userDeleteCartAction, userGetCartAction, userDeleteAllCartAction } from '../Redux/Actions/userActions'
import { createOrderAction } from '../Redux/Actions/orderActions'
import toast from 'react-hot-toast'

const MovieCart = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { isError, isSuccess, cart } = useSelector((state) => state.userGetCart)
   const { isLoading: orderLoading, isError: orderError } = useSelector((state) => state.createOrder)
   const { userInfo } = useSelector((state) => state.userLogin)

   const [paymentMethod, setPaymentMethod] = useState('Paypal')

   const deleteMovieInCartHandler = (id) => {
      window.confirm('Bạn có muốn xoá phim này?') && dispatch(userDeleteCartAction(id))
   }

   const subTotal = cart?.reduce((acc, item) => acc + item?.price, 0)
   const tax = subTotal > 50 ? subTotal * 0.5 : subTotal * 0.2
   const total = subTotal + tax

   const placeOrderHandler = (e) => {
      e.preventDefault()
      dispatch(createOrderAction({
         user: userInfo,
         orderItems: cart,
         paymentMethod: paymentMethod,
         itemsPrice: subTotal,
         taxPrice: tax,
         totalPrice: total
      }))
      dispatch(userDeleteAllCartAction())
      setTimeout(() => {
         navigate('/order-success')
      }, 1000)
   }

   useEffect(() => {
      dispatch(userGetCartAction())
      if (isError || orderError) {
         toast.error(isError || orderError)
         dispatch({ type: isError ? 'USER_GET_CART_RESET' : 'CREATE_ORDER_RESET' })
      }
      if (isSuccess) {
         toast.success('Đặt hàng thành công')
      }
   }, [dispatch, isError, orderError, isSuccess])

   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-6xl p-4 mx-auto bg-black xl:rounded">
               <div className='flex justify-between lg:flex-row flex-col'>
                  <div className='w-full flex flex-col justify-center rounded-md h-full bg-gray-800 p-6'>
                     <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Movie Cart</h1>
                     <form className='mt-12 md:grid md:grid-cols-12 md:items-start md:gap-x-12'>
                        <section className='col-span-7'>
                           <ul className='border-t border-gray-300'>
                              {cart?.length > 0 && cart?.map((movie, index) => (
                                 <li className='flex py-6 sm:py-10 border-gray-300 border-b'>
                                    <div className="shrink-0">
                                       <Link to={`/movies/${movie?._id}`} className='hover:opacity-80 transitions'>
                                          <img src={movie?.image} alt={movie?.title} className='h-24 w-20 rounded-md object-fit object-center sm:w-40 sm:h-48' />
                                       </Link>
                                    </div>
                                    <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                                       <div className='relative pr-6'>
                                          <Link to={`/movies/${movie?._id}`} className='hover:text-gray-300 text-xl transitions'>{movie?.title}</Link>
                                          <p className='text-gray-400 text-sm'>{`${movie?.desc}`.substring(0, 150).slice(0) + " ..."}</p>
                                          <div className='absolute right-0 top-0'>
                                             <button onClick={() => deleteMovieInCartHandler(movie?._id)}>
                                                <i className="fa-solid fa-xmark fa-xl hover:text-red-600 transitions"></i>
                                             </button>
                                          </div>
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
                                 <dd>${subTotal}</dd>
                              </div>
                              <div className="py-4 flex items-center justify-between border-b border-gray-400">
                                 <dt>Thuế</dt>
                                 <dd>${tax}</dd>
                              </div>
                              <div className="py-4 flex items-center justify-between">
                                 <dt className='font-bold text-lg'>Tổng hoá đơn</dt>
                                 <dd>${total}</dd>
                              </div>
                           </dl>
                           <div className="mt-6">
                              <button
                                 disabled={orderLoading}
                                 onClick={placeOrderHandler}
                                 className='w-full rounded-md border-1 border-transparent bg-red-600 px-4 py-3 text-lg font-semibold text-white hover:bg-red-800 transitions'>
                                 Thanh toán
                              </button>
                           </div>
                        </section>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </Layout >

   )
}

export default MovieCart