const authorResolvers = require('./authors');

module.exports = {
    Query:{
        sayHi:  () => 'Hello World'
    },
    Mutation:{
        ...authorResolvers.Mutation
    }   
}
