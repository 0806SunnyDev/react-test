import types from '../actionTypes'

const initialState = {}

function alertReducer(state = initialState, action) {
  const { type, payload } = action
  console.log('error payload =>', payload)

  switch (type) {
    case types.SET_ALERT:
      return {
        ...state,
        [payload.alert.errorType]: payload.alert.msg
      }
    default:
      return state
  }
}

export default alertReducer
