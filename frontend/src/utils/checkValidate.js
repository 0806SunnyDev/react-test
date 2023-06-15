import { formValidator } from "./formValidator"

export const checkValidate = (formData) => {
  let errorArr = Object.entries(formData).map(data => formValidator(data[0], data[1]))

  let flags = errorArr.map(error => Object.values(error)[0] === null ? true : false)

  let result = flags.find(flag => !flag)
  return result === false ? result : true
}