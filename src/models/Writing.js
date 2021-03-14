const {model, Schema} = require('mongoose');

const poemSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    collection:{
        type: String,
        default: 'Default'
    },
    author:{
        type: String,
        default: 'Anonymous'
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


module.exports = model('Writing', poemSchema);