const isValidEmail = email => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(email)
}

const containsNumber = password => {
  const numberRegex = /\d/
  return numberRegex.test(password)
}

const validateField = (title, value) => {
  let errorMessage = ''
  
  if (!value) {
    errorMessage = "This field is required"
  }

  switch (title) {
    case "fistName":
    case "lastName":
      if (value.length < 2 || value.length > 25) {
        errorMessage = "This field must be at between 2 and 25"
      }
      break;
    case "email":
      if (!isValidEmail(value)) {
        errorMessage = "Invalid email address"
      }
      break;
    case "password":
    case "confirmPassword":
      if (value.length < 6) {
        errorMessage = "Password case number is at least 6"
      }
      if (!containsNumber(value)) {
        errorMessage = "Password must includes at least 1 number"
      }
      break;
    case "photos":
      if (value.length < 4) {
        errorMessage = "Photo number must be at least 4"
      }
      break;
    default:
      break;
  }

  return (errorMessage !== '') ? errorMessage : null
}

export const formValidator = formData => {
  let errors = {}
  Object.entries(formData).map(data => {
    let error = validateField(data[0], data[1]);
    (error) && Object.assign(errors, { [data[0]]: error });
  })

  return errors
}