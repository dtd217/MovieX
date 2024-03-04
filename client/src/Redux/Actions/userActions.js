import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userServices";
import { ErrorsAction } from "../Protection";

// LOGIN ACTIONS
const loginAction = (data) => async (dispatch) => {
   try {
      dispatch({ type: userConstants.USER_LOGIN_REQUEST });
      const response = await userApi.loginService(data);
      dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
   }
   catch (error) {
      ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
   }
}

// REGISTER ACTIONS
const registerAction = (data) => async (dispatch) => {
   try {
      dispatch({ type: userConstants.USER_REGISTER_REQUEST });
      const response = await userApi.registerService(data);
      dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
      dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
   }
   catch (error) {
      ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
   }
}

// LOGOUT ACTIONS
const logoutAction = () => async (dispatch) => {
   userApi.logoutService();
   dispatch({ type: userConstants.USER_LOGOUT });
   dispatch({ type: userConstants.USER_LOGIN_RESET });
   dispatch({ type: userConstants.USER_REGISTER_RESET });
}

export { loginAction, registerAction, logoutAction }