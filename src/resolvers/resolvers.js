const authorResolvers = require('./authors');
const writingResolvers = require('./writings');

module.exports = {
    Query:{
        sayHi:  () => 'Hello World'
    },
    Mutation:{
        ...authorResolvers.Mutation,
        ...writingResolvers.Mutation
    }   
}
