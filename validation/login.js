const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email'
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'   
  } 

  return {
    errors,
    isValid: isEmpty(errors)
  }
}