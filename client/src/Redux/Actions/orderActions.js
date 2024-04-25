import * as orderConstants from "../Constants/orderConstants";
import * as orderApi from "../APIs/orderServices";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";
import { userDeleteAllCartAction } from "./userActions";

// CREATE ORDER
const createOrderAction = (order) => async (dispatch, getState) => {
   try {
      dispatch({ type: orderConstants.CREATE_ORDER_REQUEST })
      const data = await orderApi.createOrderService(order, tokenProtection(getState))
      dispatch({ type: orderConstants.CREATE_ORDER_SUCCESS, payload: data })
      toast.success('Đặt mua thành công')
   } catch (error) {
      ErrorsAction(error, dispatch, orderConstants.CREATE_ORDER_FAIL)
   }
}

// GET ALL ORDERS
const getAllOrdersAction = () => async (dispatch, getState) => {
   try {
      dispatch({ type: orderConstants.GET_ALL_ORDERS_REQUEST })
      const response = await orderApi.getAllOrdersService(tokenProtection(getState))
      dispatch({ type: orderConstants.GET_ALL_ORDERS_SUCCESS, payload: response })
   }
   catch (error) {
      ErrorsAction(error, dispatch, orderConstants.GET_ALL_ORDERS_FAIL)
   }
}

// GET ORDER BY ID
const getOrderByIdAction = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: orderConstants.GET_ORDER_BY_ID_REQUEST })
      const response = await orderApi.getOrderByIdService(id, tokenProtection(getState))
      dispatch({ type: orderConstants.GET_ORDER_BY_ID_SUCCESS, payload: response })
   } catch (error) {
      ErrorsAction(error, dispatch, orderConstants.GET_ORDER_BY_ID_FAIL)
   }
}

// PAY ORDER
const payOrderAction = (id, paymentResult) => async (dispatch, getState) => {
   try {
      dispatch({ type: orderConstants.PAY_ORDER_REQUEST })
      const response = await orderApi.payOrderService(id, paymentResult, tokenProtection(getState))
      dispatch({ type: orderConstants.PAY_ORDER_SUCCESS, payload: response })
      dispatch(userDeleteAllCartAction())
   } catch (error) {
      ErrorsAction(error, dispatch, orderConstants.PAY_ORDER_FAIL)
   }
}

export { createOrderAction, getAllOrdersAction, getOrderByIdAction, payOrderAction }