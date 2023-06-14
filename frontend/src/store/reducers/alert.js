import types from '../action-types';

const initialState = {};

function alertReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_ALERT:
      return payload;
    default:
      return state;
  }
}

export default alertReducer;
