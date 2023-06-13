import axios from 'axios';
// import { store, logout } from '../store';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response.status === 401) {
//       store.dispatch(logout());
//     }
//     return Promise.reject(err);
//   }
// );

export default api;
