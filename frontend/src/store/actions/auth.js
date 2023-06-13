import api from '../../utils/api';
import types from '../action-types'
import setAuthToken from '../../utils/setAuthToken'

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/users/me')

    dispatch({
      type: types.USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.AUTH_ERROR
    });
  }
}

export const register = (data) => async (dispatch) => {
  try {
    const res = await api.post('/register', data);
    console.log('register data', data)

    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data
    });

    setAuthToken(res.data.token)

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error.msg));
    }
  }
}

export const login = (data) => async (dispatch) => {
  try {
    const res = await api.post('/login', data);
    console.log('token: ', res.data)

    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data
    });

    setAuthToken(res.data.token)

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error.msg));
    }
  }
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: types.LOGOUT
  })
  
  setAuthToken(null)
}