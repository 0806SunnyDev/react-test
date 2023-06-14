import types from '../action-types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

function authReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case types.AUTH_ERROR:
    case types.REGISTER_FAIL:
    case types.LOGIN_FAIL:
    case types.LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}

export default authReducer