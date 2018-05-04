const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterImput(data) {
    let errors = {};
    console.log("register fired")
    console.log(data)

    if(!Validator.isLength(data.name, { min: 2, max:30 })){
        errors.name = "name must be between 2 and 30 characters";
        console.log("errored out on name")
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}