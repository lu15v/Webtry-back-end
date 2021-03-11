const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers/resolvers');
const {MONGODB} =require('../config');

const __PORT__ = 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers //the 3rd argument is the context
});

mongoose
.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    return server.listen({port: __PORT__});
})
.then(res => {
        console.log(`Server running ${res.url}`)
});