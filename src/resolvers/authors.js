const {UserInputError} = require('apollo-server');

const Author = require('../models/Author');
const {validateNotEmptyInput} = require('../utils/validators');

module.exports = {
    Query:{
        async getAuthors(){
            try{
                const authors = await Author.find().sort({createdAt: -1});
                return authors;
            }catch(err){
                 throw new Error(err);
            }
        },
        async getAuthorById(_, {authorId}){
            const author = await Author.findById(authorId);

            if(author){
                return author;
            }
            throw new UserInputError('Author not found', {
                errors:{
                    author: 'The author with the specified Id, does not exist'
                }
            })
        }
    },
    Mutation:{
        async createAuthor(_, {authorInput: {username, firstName, surname, avatar}}){
            const author = await Author.findOne({username});

            if(author){
                throw new UserInputError('Username is taken', {
                    errors:{
                        username: 'this username is taken'
                    }
                })
            }
            
            const {valid, errors} = validateNotEmptyInput({username, firstName, surname});

            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            const newAuthor = new Author({
                username,
                firstName,
                surname
            });

            const res = await newAuthor.save();

            return {
                ...res._doc,
                id: res._id
            }
        }
    }
}
