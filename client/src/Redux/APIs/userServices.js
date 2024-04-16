import Axios from './Axios.js';

// ********** PUBLIC APIS **********

// Register user call API
const registerService = async (user) => {
   const { data } = await Axios.post('/user', user);
   if (data) {
      localStorage.setItem('userInfo', JSON.stringify(data));
   }
   return data;
}

// Logout user call API
const logoutService = async () => {
   localStorage.removeItem('userInfo');
   localStorage.removeItem('cartItems');
   return null;
}

// Login user call API
const loginService = async (user) => {
   const { data } = await Axios.post('/user/login', user);
   if (data) {
      localStorage.setItem('userInfo', JSON.stringify(data));
   }
   return data;
}

// ********** PRIVATE APIS **********

// Update profile call API
const updateProfileService = async (user, token) => {
   const { data } = await Axios.put('/user/profile', user, {
      headers: { Authorization: `Bearer ${token}` }
   });
   if (data) {
      localStorage.setItem('userInfo', JSON.stringify(data));
   }
   return data;
}

// Delete profile call API
const deleteProfileService = async (token) => {
   const { data } = await Axios.delete('/user', {
      headers: { Authorization: `Bearer ${token}` }
   });
   if (data) {
      localStorage.removeItem('userInfo');
   }
   return data;
}

// Change password call API
const changePasswordService = async (password, token) => {
   const { data } = await Axios.put('/user/password', password, {
      headers: { Authorization: `Bearer ${token}` }
   });
   return data;
}

// Get all bookmarks 
const getBookmarks = async (token) => {
   const { data } = await Axios.get('/user/bookmarks', {
      headers: { Authorization: `Bearer ${token}` }
   })
   return data
}

// Delete bookmarks
const deleteBookmarks = async (token) => {
   const { data } = await Axios.delete(`/user/bookmarks`, {
      headers: { Authorization: `Bearer ${token}` }
   })
   return data
}

// Delete bookmark by id
const deleteBookmarkById = async (id, token) => {
   const { data } = await Axios.delete(`/user/bookmarks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
   })
   return data
}

// Add new bookmarks
const addBookmarks = async (movieId, token) => {
   const { data } = await Axios.post(`/user/bookmarks`, movieId, {
      headers: { Authorization: `Bearer ${token}` }
   })
   return data
}

// Get cart
const getCart = async (token) => {
   const { data } = await Axios.get('/user/cart', {
      headers: { Authorization: `Bearer ${token}` }
   })
   if (data) {
      localStorage.setItem('cartItems', JSON.stringify(data));
   }
   return data
}

// Add movie to cart
const addMovieToCart = async (movieId, token) => {
   const { data } = await Axios.post(`/user/cart`, movieId, {
      headers: { Authorization: `Bearer ${token}` }
   })
   return data
}

// Delete cart
const deleteMovieFromCart = async (id, token) => {
   const { data } = await Axios.delete(`/user/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
   })
   return data
}

// ********** ADMIN APIS **********

// Admin get all users
const getAllUsersService = async (token) => {
   const { data } = await Axios.get('/user', {
      headers: { Authorization: `Bearer ${token}` }
   })
   return data
}

// Admin delete user
const deleteUserService = async (id, token) => {
   const { data } = await Axios.delete(`/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
   })
   return data
}

// Admin update user
const updateUserService = async (user, token) => {
   const { data } = await Axios.put(`/user/${user._id}`, user, {
      headers: { Authorization: `Bearer ${token}` }
   })
   return data
}

export {
   registerService,
   logoutService,
   loginService,
   updateProfileService,
   deleteProfileService,
   changePasswordService,
   getBookmarks,
   deleteBookmarks,
   deleteBookmarkById,
   getAllUsersService,
   deleteUserService,
   updateUserService,
   addBookmarks,
   getCart,
   addMovieToCart,
   deleteMovieFromCart
};

