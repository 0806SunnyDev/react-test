import api from './api';

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
