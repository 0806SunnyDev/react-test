import axios from 'axios'
// import { store, logout } from '../store'

// Create an instance of axios
export const apiJson = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const apiFormData = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response.status === 401) {
//       store.dispatch(logout())
//     }
//     return Promise.reject(err)
//   }
// )
