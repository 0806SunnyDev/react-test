export default mirrorKeys({
  USER_LOADED: null,
  AUTH_ERROR: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAIL: null,
  REGISTER_SUCCESS: null,
  REGISTER_FAIL: null,
});

function mirrorKeys(obj) {
  const mirroredObject = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      mirroredObject[key] = key;
    }
  }
  return mirroredObject;
}
