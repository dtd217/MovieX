import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as Categories from "./Reducers/categoriesReducers";
import * as Movies from "./Reducers/moviesReducers";

const rootReducer = combineReducers({
   // User Reducers
   userLogin: User.userLoginReducer,
   userRegister: User.userRegisterReducer,
   userUpdateProfile: User.userUpdateProfileReducer,
   userDeleteProfile: User.userDeleteProfileReducer,
   userChangePassword: User.userChangePasswordReducer,
   userGetBookmarks: User.userGetBookmarksReducer,
   userDeleteBookmarks: User.userDeleteBookmarksReducer,
   userDeleteBookmarkById: User.userDeleteBookmarkByIdReducer,
   userAddBookmarks: User.userAddBookmarksReducer,
   adminGetAllUsers: User.adminGetAllUsersReducer,
   adminDeleteUser: User.adminDeleteUserReducer,

   // Category Reducers
   getAllCategories: Categories.getAllCategoriesReducer,
   createCategory: Categories.createCategoryReducer,
   updateCategory: Categories.updateCategoryReducer,
   deleteCategory: Categories.deleteCategoryReducer,

   // Movie Reducers
   getAllMovies: Movies.getAllMoviesReducer,
   getRandomMovies: Movies.getRandomMoviesReducer,
   getTopRatedMovies: Movies.getTopRatedMoviesReducer,
   getMovieById: Movies.getMovieByIdReducer,
   reviewMovie: Movies.reviewMovieReducer,
   deleteMovie: Movies.deleteMovieReducer,
   deleteAllMovies: Movies.deleteAllMoviesReducer,
   createMovie: Movies.createMovieReducer,
   updateMovie: Movies.updateMovieReducer,
   charactersCRUD: Movies.charactersReducer,
});

// Lấy userInfo từ localStorage
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// InitialState
const initialState = {
   userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
   reducer: rootReducer,
   preloadedState: initialState,
});