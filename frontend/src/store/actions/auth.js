import types from '../action-types'

export const loadUser = () => async (dispatch) => {

}

export const register = (data) => async (dispatch) => {
  try {
    
    // dispatch({
    //   type: types.REGISTER_SUCCESS,
    //   payload: data
    // })
  } catch (error) {
    
  }

  console.log('register data', data)
}

export const login = (data) => async (dispatch) => {
  try {
    console.log('login data', data)
    
  } catch (error) {
    
  }
}

export const logout = () => async (dispatch) => {
  console.log('logged out')
}