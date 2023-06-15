export const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(email)
}

export const containsNumber = (password) => {
  const numberRegex = /\d/
  return numberRegex.test(password)
}