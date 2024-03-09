import * as userConstants from "../Constants/userConstants";

// LOGIN
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

// REGISTER
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

// UPDATE PROFILE
export const userUpdateProfileReducer = (state = {}, action) => {
   switch (action.type) {
      case userConstants.USER_UPDATE_PROFILE_REQUEST:
         return { isLoading: true };
      case userConstants.USER_UPDATE_PROFILE_SUCCESS:
         return { isLoading: false, userInfo: action.payload, isSuccess: true };
      case userConstants.USER_UPDATE_PROFILE_FAIL:
         return { isLoading: false, isError: action.payload };
      case userConstants.USER_UPDATE_PROFILE_RESET:
         return {};
      default:
         return state;
   }
}

// DELETE PROFILE
export const userDeleteProfileReducer = (state = {}, action) => {
   switch (action.type) {
      case userConstants.USER_DELETE_PROFILE_REQUEST:
         return { isLoading: true };
      case userConstants.USER_DELETE_PROFILE_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case userConstants.USER_DELETE_PROFILE_FAIL:
         return { isLoading: false, isError: action.payload };
      case userConstants.USER_DELETE_PROFILE_RESET:
         return {};
      default:
         return state;
   }
}

// CHANGE PASSWORD
export const userChangePasswordReducer = (state = {}, action) => {
   switch (action.type) {
      case userConstants.USER_CHANGE_PASSWORD_REQUEST:
         return { isLoading: true };
      case userConstants.USER_CHANGE_PASSWORD_SUCCESS:
         return { isLoading: false, isSuccess: true, message: action.payload.message };
      case userConstants.USER_CHANGE_PASSWORD_FAIL:
         return { isLoading: false, isError: action.payload };
      case userConstants.USER_CHANGE_PASSWORD_RESET:
         return {};
      default:
         return state;
   }
}

// GET ALL BOOKMARKS
export const userGetBookmarksReducer = (state = { bookmarks: [] }, action) => {
   switch (action.type) {
      case userConstants.GET_BOOKMARKS_REQUEST:
         return { isLoading: true };
      case userConstants.GET_BOOKMARKS_SUCCESS:
         return { isLoading: false, bookmarks: action.payload };
      case userConstants.GET_BOOKMARKS_FAIL:
         return { isLoading: false, isError: action.payload };
      case userConstants.GET_BOOKMARKS_RESET:
         return {};
      default:
         return state;
   }
}

// DELETE ALL BOOKMARKS
export const userDeleteBookmarksReducer = (state = {}, action) => {
   switch (action.type) {
      case userConstants.DELETE_BOOKMARKS_REQUEST:
         return { isLoading: true };
      case userConstants.DELETE_BOOKMARKS_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case userConstants.DELETE_BOOKMARKS_FAIL:
         return { isLoading: false, isError: action.payload };
      case userConstants.DELETE_BOOKMARKS_RESET:
         return {};
      default:
         return state;
   }
}

// ADMIN GET ALL USERS
export const adminGetAllUsersReducer = (state = { users: [] }, action) => {
   switch (action.type) {
      case userConstants.GET_ALL_USERS_REQUEST:
         return { isLoading: true };
      case userConstants.GET_ALL_USERS_SUCCESS:
         return { isLoading: false, users: action.payload };
      case userConstants.GET_ALL_USERS_FAIL:
         return { isLoading: false, isError: action.payload };
      case userConstants.GET_ALL_USERS_RESET:
         return { users: [] };
      default:
         return state;
   }
}

// ADMIN DELETE USER
export const adminDeleteUserReducer = (state = {}, action) => {
   switch (action.type) {
      case userConstants.DELETE_USER_REQUEST:
         return { isLoading: true };
      case userConstants.DELETE_USER_SUCCESS:
         return { isLoading: false, isSuccess: true };
      case userConstants.DELETE_USER_FAIL:
         return { isLoading: false, isError: action.payload };
      case userConstants.DELETE_USER_RESET:
         return {};
      default:
         return state;
   }
}