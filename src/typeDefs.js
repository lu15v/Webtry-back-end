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
    body: String!
    compilation: String
    type: String
    username: String
    createdAt: String
  }
  input RegisterInput{
    username: String!
    firstName: String!
    surname: String!
    password: String!
    confirmPassword: String!
    email:String!
    avatar: String
  }
  type Author {
    id: ID!
    username: String!
    firstName: String!
    surname: String!
    avatar: String!
    createdAt: String!
    token:String!
  }
  type Writing {
    id: ID!
    title: String!
    body: String!
    compilation: String!
    type: String!
    author: Author
    views: Int!
    createdAt: String!
  }
  type Query {
    getAuthors: [Author]
    getWritings: [Writing]
    getAuthorById(authorId: ID!): Author
    getWritingById(writingId: ID!): Writing
    getWritingsByAuthor(username: String!): [Writing]
    getWritingsByCompilation(compilation: String!): [Writing]
  }
  type Mutation {
    createWriting(writingInput: WritingInput): Writing!
    updateViews(writingId: ID!): Int
    register(registerInput: RegisterInput!): Author!
    login(username: String!, password: String!): Author!
  }
`;
