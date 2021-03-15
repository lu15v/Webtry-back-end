const authorResolvers = require('./authors');
const writingResolvers = require('./writings');

module.exports = {
    Query:{
        ...authorResolvers.Query,
        ...writingResolvers.Query
    },
    Mutation:{
        ...authorResolvers.Mutation,
        ...writingResolvers.Mutation
    }   
}
