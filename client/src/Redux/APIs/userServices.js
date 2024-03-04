import Axios from './Axios.js';

// Đăng ký người dùng gọi API
const registerService = async (user) => {
   const { data } = await Axios.post('/user', user);
   if (data) {
      localStorage.setItem('userInfo', JSON.stringify(data));
   }
   return data;
}

// Đăng xuất người dùng gọi API
const logoutService = async () => {
   localStorage.removeItem('userInfo');
   return null;
}

// Đăng nhập người dùng gọi API
const loginService = async (user) => {
   const { data } = await Axios.post('/user/login', user);
   if (data) {
      localStorage.setItem('userInfo', JSON.stringify(data));
   }
   return data;
}

export { registerService, logoutService, loginService };

