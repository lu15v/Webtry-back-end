const gql = require("graphql-tag");

module.exports = gql`
  input AuthorInput {
    username: String!
    avatar: String
    firstName: String!
    surname: String!
  }
  input WritingInput {
    title: String!
    compilation: String
    type: String
    username: String
  }
  type Author {
    id: ID!
    username: String!
    firstName: String!
    surname: String!
    avatar: String!
    createdAt: String!
  }
  type Writing {
    id: ID!
    title: String!
    compilation: String!
    type: String!
    author: String!
    createdAt: String!
  }
  type Query {
    getAuthors: [Author]
    getWritings: [Writing]
    getWritingsByAuthor(username: String!): [Writing]
  }
  type Mutation {
    createAuthor(authorInput: AuthorInput): Author!
    createWriting(writingInput: WritingInput): Writing!
  }
`;
