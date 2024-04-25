import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as Categories from "./Reducers/categoriesReducers";
import * as Movies from "./Reducers/moviesReducers";
import * as Order from "./Reducers/orderReducers";

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
   userGetCart: User.userGetCartReducer,
   userAddCart: User.userAddToCartReducer,
   userDeleteCart: User.userDeleteFromCartReducer,
   useDeleteAllCart: User.userDeleteAllCartReducer,
   adminGetAllUsers: User.adminGetAllUsersReducer,
   adminDeleteUser: User.adminDeleteUserReducer,
   adminUpdateUser: User.adminUpdateUserReducer,

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

   // Order Reducers
   createOrder: Order.createOrderReducer,
   getAllOrders: Order.getAllOrdersReducer,
   getOrderById: Order.getOrderByIdReducer,
   payOrder: Order.payOrderReducer,
});

// Lấy userInfo từ localStorage
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const cartFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

// InitialState
const initialState = {
   userLogin: { userInfo: userInfoFromStorage },
   userCart: { cartItems: cartFromStorage },
};

export const store = configureStore({
   reducer: rootReducer,
   preloadedState: initialState,
});