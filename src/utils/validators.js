module.exports.validateNotEmptyInput = (input) => {
    const errors = {};

    Object.entries(input).forEach(([key, value]) =>{
        if(!value.trim()){
            errors[key] = `${key} cannot be empty`;
        }
    })

    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}