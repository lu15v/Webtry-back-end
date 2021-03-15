const authorResolvers = require('./authors');
const writingResolvers = require('./writings');

module.exports = {
    Query:{
        ...authorResolvers.Query
    },
    Mutation:{
        ...authorResolvers.Mutation,
        ...writingResolvers.Mutation
    }   
}
