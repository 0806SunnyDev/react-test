import { apiJson, apiFormData } from '../../utils/api';
import types from '../action-types'
import setAuthToken from '../../utils/setAuthToken'

export const loadUser = () => async (dispatch) => {
  try {
    const res = await apiJson.get('/users/me')

    dispatch({
      type: types.USER_LOADED,
      payload: res.data
    });

    dispatch({
      type: types.SET_ALERT,
      payload: res.data.message
    })
  } catch (err) {
    dispatch({
      type: types.AUTH_ERROR
    });

    dispatch({
      type: types.SET_ALERT,
      payload: 'Please Login...'
    })
  }
}

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: types.SET_ALERT,
      payload: 'Please Wait...'
    })

    const res = await apiFormData.post('/register', formData);

    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch({
      type: types.SET_ALERT,
      payload: 'Register Suceess!'
    })

    setAuthToken(res.data.token)

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch({
          type: types.SET_ALERT,
          payload: error.msg
        })
      });
    }
  }
}

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.SET_ALERT,
      payload: 'Please Wait...'
    })

    const res = await apiJson.post('/login', data);

    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch({
      type: types.SET_ALERT,
      payload: 'User Logged in!'
    })

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

  dispatch({
    type: types.SET_ALERT,
    payload: 'User logged out!'
  })
  
  setAuthToken(null)
}