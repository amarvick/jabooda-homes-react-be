const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : ''

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required'
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Email field is required'
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid Email Address'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    } 

    if (Validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = 'Please re-enter your password'
    }
    
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    
    if (!Validator.equals(data.password, data.passwordConfirm)) {
        errors.passwordConfirm = 'Password Confirmation must match the Password'
    } 

    return {
        errors,
        isValid: isEmpty(errors)
    };

};