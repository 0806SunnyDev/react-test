import types from '../actionTypes'

export const setAlert = (alert, severity) => dispatch => {
  dispatch({
    type: types.SET_ALERT,
    payload: {
      alert: alert,
      severity: severity
    }
  })
}
