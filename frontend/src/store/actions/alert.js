import types from '../action-types';

export const setAlert = (alert, severity) => dispatch => {
  dispatch({
    type: types.SET_ALERT,
    payload: {
      alert: alert,
      severity: severity
    }
  });
};
