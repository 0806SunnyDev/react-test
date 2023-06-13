import { apiJson } from './api';

const setAuthToken = (token) => {
  if (token) {
    apiJson.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('token', token);
  } else {
    delete apiJson.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
