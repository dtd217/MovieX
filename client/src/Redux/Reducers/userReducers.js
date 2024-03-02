import * as userConstants from "../Constants/userConstants";

// ĐĂNG NHẬP
export const userLoginReducer = (state = {}, action) => {
   switch (action.type) {
      case userConstants.USER_LOGIN_REQUEST:
         return { isLoading: true };
      case userConstants.USER_LOGIN_SUCCESS:
         return { isLoading: false, userInfo: action.payload, isSuccess: true };
      case userConstants.USER_LOGIN_FAIL:
         return { isLoading: false, isError: action.payload };
      case userConstants.USER_LOGIN_RESET:
         return {};
      case userConstants.USER_LOGOUT:
         return {};
      default:
         return state;
   }
};

// ĐĂNG KÝ
export const userRegisterReducer = (state = {}, action) => {
   switch (action.type) {
      case userConstants.USER_REGISTER_REQUEST:
         return { isLoading: true };
      case userConstants.USER_REGISTER_SUCCESS:
         return { isLoading: false, userInfo: action.payload, isSuccess: true };
      case userConstants.USER_REGISTER_FAIL:
         return { isLoading: false, isError: action.payload };
      case userConstants.USER_REGISTER_RESET:
         return {};
      default:
         return state;
   }
};

// THONG TIN TAI KHOAN
export const userDetailsReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case userConstants.USER_DETAILS_REQUEST:
         return { ...state, isLoading: true };
      case userConstants.USER_DETAILS_SUCCESS:
         return { isLoading: false, user: action.payload };
      case userConstants.USER_DETAILS_FAIL:
         return { isLoading: false, isError: action.payload };
      case userConstants.USER_DETAILS_RESET:
         return { user: {} };
      default:
         return state;
   }
};