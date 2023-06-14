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
      payload: { alert: res.data.message, severity: 'success' }
    })
  } catch (err) {
    dispatch({
      type: types.AUTH_ERROR
    });

    dispatch({
      type: types.SET_ALERT,
      payload: { alert: 'Please Login...', severity: 'info' }
    })
  }
}

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: types.SET_ALERT,
      payload: { alert: 'Please Wait...', severity: 'info' }
    })

    const res = await apiFormData.post('/register', formData);

    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch({
      type: types.SET_ALERT,
      payload: { alert: 'Register Success!', severity: 'success' }
    })

    setAuthToken(res.data.token)

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: types.REGISTER_FAIL
    })

    const errors = err.response.data.errors;
    console.log('errors: ', err)

    if (errors) {
      errors.forEach((error) => {
        dispatch({
          type: types.SET_ALERT,
          payload: { alert: error.msg, severity: 'error' }
        })
      });
    } else {
      dispatch({
        type: types.SET_ALERT,
        payload: { alert: 'Check Your Internet Connection', severity: 'error' }
      })
    }
  }
}

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.SET_ALERT,
      payload: { alert: 'Please Wait...', severity: 'info' }
    })

    const res = await apiJson.post('/login', data);

    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch({
      type: types.SET_ALERT,
      payload: { alert: 'User Logged in!', severity: 'success' }
    })

    setAuthToken(res.data.token)

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: types.LOGIN_FAIL
    })

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch({
          type: types.SET_ALERT,
          payload: { alert: error.msg, severity: 'error' }
        })
      });
    } else {
      dispatch({
        type: types.SET_ALERT,
        payload: { alert: 'Check Your Internet Connection', severity: 'error' }
      })
    }
  }
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: types.LOGOUT
  })

  dispatch({
    type: types.SET_ALERT,
    payload: { alert: 'User logged out!', severity: 'info' }
  })
  
  setAuthToken(null)
}