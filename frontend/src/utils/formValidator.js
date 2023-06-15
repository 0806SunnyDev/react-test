const isValidEmail = email => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(email)
}

const containsNumber = password => {
  const numberRegex = /\d/
  return numberRegex.test(password)
}

const validateField = (fieldName, fieldValue) => {
  let errorMessage = ''

  switch (fieldName) {
    case "firstName":
    case "lastName":
      if (fieldValue.length < 2 || fieldValue.length > 25) {
        errorMessage = "This field must be at between 2 and 25"
      }
      break;
    case "email":
      if (!isValidEmail(fieldValue)) {
        errorMessage = "Invalid email address"
      }
      break;
      case "password":
      case "confirmPassword":
      if (fieldValue.length < 6) {
        errorMessage = "Password case number is at least 6"
      }
      if (!containsNumber(fieldValue)) {
        errorMessage = "Password must includes at least 1 number"
      }
      break;
    case "photos":
      if (fieldValue.length < 4) {
        errorMessage = "Photo number must be at least 4"
      }
      break;
    default:
      break;
  }

  if (!fieldValue) {
    errorMessage = "This field is required"
  }

  return (errorMessage !== '') ? errorMessage : null
}

export const formValidator = (name, value) => {
  let error = {}
  
  if (name) {
    error[name] = validateField(name, value)
    return error
  }
}