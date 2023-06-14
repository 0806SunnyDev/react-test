import { v4 as uuidv4 } from 'uuid';
import types from '../action-types';

export const setAlert = (alert, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: types.SET_ALERT,
    payload: alert
  });

  setTimeout(() => dispatch({ type: types.REMOVE_ALERT, payload: id }), timeout);
};
