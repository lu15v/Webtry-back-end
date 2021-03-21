const { UniqueEnumValueNamesRule } = require("graphql");

module.exports.validateInput = (input) => {
    const errors = {};

    Object.entries(input).forEach(([key, value]) =>{
        if(!value.trim()){
            errors[key] = `${key} cannot be empty`;
        }
    })

    if(Object.keys(errors).length === 0 && input.password && input.confirmPassword){
        if(input.password.trim() !== input.confirmPassword.trim()){
            errors.password = "passwords don't match";
        }
    }
    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}