import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userServices";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

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

// UPDATE PROFILE ACTIONS
const updateProfileAction = (user) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
      const response = await userApi.updateProfileService(user, tokenProtection(getState));
      dispatch({ type: userConstants.USER_UPDATE_PROFILE_SUCCESS, payload: response });
      toast.success('Cập nhật thành công');
      dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
   }
   catch (error) {
      ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
   }
}

// DELETE PROFILE ACTIONS
const deleteProfileAction = () => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
      await userApi.deleteProfileService(tokenProtection(getState));
      dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
      toast.success('Xóa tài khoản thành công');
      dispatch(logoutAction())
   }
   catch (error) {
      ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
   }
}

// CHANGE PASSWORD ACTIONS
const changePasswordAction = (password) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
      const response = await userApi.changePasswordService(password, tokenProtection(getState));
      dispatch({ type: userConstants.USER_CHANGE_PASSWORD_SUCCESS, payload: response });
   }
   catch (error) {
      ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
   }
}

// GET ALL BOOKMARKS ACTIONS
const userGetBookmarksAction = () => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.GET_BOOKMARKS_REQUEST });
      const response = await userApi.getBookmarks(tokenProtection(getState));
      dispatch({ type: userConstants.GET_BOOKMARKS_SUCCESS, payload: response });
   }
   catch (error) {
      ErrorsAction(error, dispatch, userConstants.GET_BOOKMARKS_FAIL);
   }
}

// DELETE BOOKMARKS ACTIONS
const userDeleteBookmarksAction = () => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.DELETE_BOOKMARKS_REQUEST });
      await userApi.deleteBookmarks(tokenProtection(getState));
      dispatch({ type: userConstants.DELETE_BOOKMARKS_SUCCESS });
      toast.success('Bỏ theo dõi phim thành công!');
   }
   catch (error) {
      ErrorsAction(error, dispatch, userConstants.DELETE_BOOKMARKS_FAIL);
   }
}

// DELETE BOOKMARKS BY ID ACTIONS
const userDeleteBookmarkByIdAction = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.DELETE_BOOKMARK_BY_ID_REQUEST });
      await userApi.deleteBookmarkById(id, tokenProtection(getState));
      dispatch({ type: userConstants.DELETE_BOOKMARK_BY_ID_SUCCESS });
      toast.success('Xóa phim thành công!');
   }
   catch (error) {
      ErrorsAction(error, dispatch, userConstants.DELETE_BOOKMARK_BY_ID_FAIL);
   }
}

// ADD BOOKMARKS ACTIONS
const userAddBookmarkAction = (movieId) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.ADD_BOOKMARKS_REQUEST });
      const response = await userApi.addBookmarks(movieId, tokenProtection(getState));
      dispatch({ type: userConstants.ADD_BOOKMARKS_SUCCESS, payload: response });
      // toast.success('Theo dõi phim thành công!');
   }
   catch (error) {
      ErrorsAction(error, dispatch, userConstants.ADD_BOOKMARKS_FAIL);
   }
}

// ADMIN GET ALL USERS ACTIONS
const adminGetAllUsersAction = () => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
      const response = await userApi.getAllUsersService(tokenProtection(getState));
      dispatch({ type: userConstants.GET_ALL_USERS_SUCCESS, payload: response });
   }
   catch (error) {
      ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
   }
}

// ADMIN DELETE USER ACTIONS
const adminDeleteUserAction = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.DELETE_USER_REQUEST });
      await userApi.deleteUserService(id, tokenProtection(getState));
      dispatch({ type: userConstants.DELETE_USER_SUCCESS });
      toast.success('Xóa người dùng thành công');
   }
   catch (error) {
      ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL);
   }
}

export {
   loginAction,
   registerAction,
   logoutAction,
   updateProfileAction,
   deleteProfileAction,
   changePasswordAction,
   userGetBookmarksAction,
   userDeleteBookmarksAction,
   userDeleteBookmarkByIdAction,
   userAddBookmarkAction,
   adminGetAllUsersAction,
   adminDeleteUserAction
}