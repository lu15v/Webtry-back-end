const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers/resolvers');

const __PORT__ = process.env.port || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers //the 3rd argument is the context
});

mongoose
.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    return server.listen({port: __PORT__});
})
.then(res => {
        console.log(`Server running ${res.url}`)
});