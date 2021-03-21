const {model, Schema} = require('mongoose');

const authorSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    firstName: {
        type: String, 
        required: true
    },
    surname: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    avatar: String,
    createdAt:{
        type: String,
        default: new Date().toISOString()
    }
});


module.exports = model('Author', authorSchema);