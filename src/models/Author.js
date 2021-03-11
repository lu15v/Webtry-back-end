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
    avatar: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
});


module.exports = model('Author', authorSchema);