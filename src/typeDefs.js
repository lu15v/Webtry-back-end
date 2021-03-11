const gql = require("graphql-tag");

module.exports = gql`
  input AuthorInput{
      username: String!
      avatar: String
      firstName: String!
      surname: String!
  }
  type Author{
      id: ID!
      username: String!
      firstName: String!
      surname: String!
      avatar: String!
      createdAt: String!
  }
  type Query{
      sayHi:String!
  }
  type Mutation {
      createAuthor(authorInput: AuthorInput): Author
  }
`;
