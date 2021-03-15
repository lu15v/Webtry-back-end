const {model, Schema} = require('mongoose');

const writingSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    compilation:{
        type: String,
        default: 'Default'
    },
    type:{
        type: String,
        default: 'Unknown'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    likes: [
        {
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Authors'
    }
});


module.exports = model('Writing', writingSchema);