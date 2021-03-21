const { UserInputError } = require("apollo-server");

const Author = require("../models/Author");
const { validateInput } = require("../utils/validators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Query: {
    async getAuthors() {
      try {
        const authors = await Author.find().sort({ createdAt: -1 });
        return authors;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getAuthorById(_, { authorId }) {
      const author = await Author.findById(authorId);

      if (author) {
        return author;
      }
      throw new UserInputError("Author not found", {
        errors: {
          author: "The author with the specified Id, does not exist",
        },
      });
    },
  },
  Mutation: {
    async register(
      _,
      {
        registerInput: {
          username,
          firstName,
          surname,
          password,
          confirmPassword,
          email,
          avatar
        },
      }
    ) {
      const author = await Author.findOne({username});
      
      if (author) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "this username is taken",
          },
        });
      }

      const { valid, errors } = validateInput({
        username,
        firstName,
        surname,
        email,
        password,
        confirmPassword
      });

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      password = await bcrypt.hash(password, 12);
      
      avatar = avatar || '';

      const newAuthor = new Author({
        username,
        firstName,
        surname,
        email,
        password,
        avatar,
      });

      const res = await newAuthor.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
