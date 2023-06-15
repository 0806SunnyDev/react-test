export const checkValidate = errors => {
  let result = true

  Object.values(errors).map(error => {
    error && (result = false);
  })

  return result
}