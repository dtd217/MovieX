import * as orderConstants from "../Constants/orderConstants";

export const createOrderReducer = (state = {}, action) => {
   switch (action.type) {
      case orderConstants.CREATE_ORDER_REQUEST:
         return { isLoading: true };
      case orderConstants.CREATE_ORDER_SUCCESS:
         return { isLoading: false, isSuccess: true, order: action.payload };
      case orderConstants.CREATE_ORDER_FAIL:
         return { isLoading: false, isError: action.payload };
      case orderConstants.CREATE_ORDER_RESET:
         return {};
      default:
         return state;
   }
}

export const getAllOrdersReducer = (state = { orders: [] }, action) => {
   switch (action.type) {
      case orderConstants.GET_ALL_ORDERS_REQUEST:
         return { isLoading: true };
      case orderConstants.GET_ALL_ORDERS_SUCCESS:
         return { isLoading: false, orders: action.payload };
      case orderConstants.GET_ALL_ORDERS_FAIL:
         return { isLoading: false, isError: action.payload };
      case orderConstants.GET_ALL_ORDERS_RESET:
         return { orders: [] };
      default:
         return state;
   }
}

export const getOrderByIdReducer = (state = { order: {} }, action) => {
   switch (action.type) {
      case orderConstants.GET_ORDER_BY_ID_REQUEST:
         return { isLoading: true };
      case orderConstants.GET_ORDER_BY_ID_SUCCESS:
         return { isLoading: false, order: action.payload };
      case orderConstants.GET_ORDER_BY_ID_FAIL:
         return { isLoading: false, isError: action.payload };
      case orderConstants.GET_ORDER_BY_ID_RESET:
         return { order: {} };
      default:
         return state;
   }
}

export const payOrderReducer = (state = {}, action) => {
   switch (action.type) {
      case orderConstants.PAY_ORDER_REQUEST:
         return { isLoading: true };
      case orderConstants.PAY_ORDER_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case orderConstants.PAY_ORDER_FAIL:
         return { isLoading: false, isError: action.payload };
      case orderConstants.PAY_ORDER_RESET:
         return {};
      default:
         return state;
   }
}