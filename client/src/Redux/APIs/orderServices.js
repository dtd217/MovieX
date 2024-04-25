import Axios from './Axios.js';

// Create order
const createOrderService = async (order, token) => {
   const { data } = await Axios.post('/orders', order, {
      headers: { Authorization: `Bearer ${token}` }
   });
   return data
}

// Get order by id
const getOrderByIdService = async (id, token) => {
   const { data } = await Axios.get(`/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
   });
   return data
}

// Get all orders
const getAllOrdersService = async (token) => {
   const { data } = await Axios.get('/orders', {
      headers: { Authorization: `Bearer ${token}` }
   });
   return data
}

// Pay oder
const payOrderService = async (id, paymentResult, token) => {
   const { data } = await Axios.put(`/orders/${id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${token}` }
   });
   return data
}

export { createOrderService, getAllOrdersService, getOrderByIdService, payOrderService }