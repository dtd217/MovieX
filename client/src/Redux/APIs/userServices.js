import Axios from './Axios.js';

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

// Update profile call API
const updateProfileService = async (user, token) => {
   const { data } = await Axios.put('/user/profile', user, { headers: { Authorization: `Bearer ${token}` } });
   if (data) {
      localStorage.setItem('userInfo', JSON.stringify(data));
   }
   return data;
}

export { registerService, logoutService, loginService, updateProfileService };

